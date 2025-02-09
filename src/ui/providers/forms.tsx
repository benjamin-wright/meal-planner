import { createContext, useEffect, useState } from "react";

interface FormContextProps {
  push(form: Form): void;
  pop(from: string): FormResult | undefined;
  getReturn(to: string, defaultReturn: string): string;
  setResult(to: string, response: FormResponse): void;
}

export const FormContext = createContext<FormContextProps>({
  push: () => {},
  pop: () => undefined,
  getReturn: () => "",
  setResult: () => {}
});

interface FormProviderProps {
  children: React.ReactNode;
}

export type Form = {
  to: string;
  from: string;
  link: string;
  body: any;
}

export type FormResponse = {
  field: string;
  response: any;
}

export type FormStack = {
  forms: Form[];
  response?: FormResponse;
}

export type FormResult = {
  form: Form;
  response?: FormResponse;
}

export function FormProvider({ children }: FormProviderProps) {
  const [stack, setStack] = useState<FormStack>({
    forms: []
  });

  const setStackAndPersist = (stack: FormStack) => {
    localStorage.setItem("form-state", JSON.stringify(stack));
    setStack(stack);
  }

  useEffect(() => {
    const savedStack = localStorage.getItem("form-state");
    if (savedStack) {
      setStack(JSON.parse(savedStack) as FormStack);
    }
  }, [])

  const push = (form: Form) => {
    stack.forms.push(form);
    setStackAndPersist(stack);
  }

  const pop = (from: string) => {
    const [ loaded, setLoaded ] = useState(false);
    const [ result, setResult ] = useState<FormResult | undefined>();

    if (loaded) {
      return result;
    }

    console.info('popping form state');
    
    setLoaded(true);

    if (stack.forms.length === 0) {
      return;
    }

    console.info(`Popping ${from} from ${JSON.stringify(stack)}`);

    if (stack.forms[stack.forms.length - 1].from !== from) {
      return;
    }

    const form = stack.forms.pop();
    const response = stack.response;
    stack.response = undefined;

    setStackAndPersist(stack);

    if (form) {
      let result = {
        form,
        response,
      };
      
      setResult(result);
      return result;
    }
  }

  const getReturn = (to: string, defaultReturn: string) => {
    if (stack.forms.length === 0) {
      return defaultReturn;
    }

    const form = stack.forms[stack.forms.length - 1];
    if (form.to === to) {
      return form.link;
    }

    return defaultReturn;
  }

  const setResult = (to: string, response: FormResponse) => {
    if (stack.forms.length === 0) {
      return;
    }

    const form = stack.forms[stack.forms.length - 1];
    if (form.to !== to) {
      return;
    }

    stack.response = response;
    setStackAndPersist(stack);
  }

  return (
    <FormContext.Provider
      value={{ push, pop, getReturn, setResult }}
    >
      {children}
    </FormContext.Provider>
  );
}
