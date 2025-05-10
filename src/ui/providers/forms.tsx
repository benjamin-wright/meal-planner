import { createContext, useContext, useEffect, useState } from "react";

interface FormContextProps {
  has(from: string): boolean;
  push(form: Form): void;
  pop(from: string): FormResult | undefined;
  getReturn(to: string, defaultReturn: string): string;
  setResult(to: string, response: FormResponse): void;
}

export const FormContext = createContext<FormContextProps>({
  has: () => false,
  push: () => { },
  pop: () => undefined,
  getReturn: () => "",
  setResult: () => { }
});

interface FormProviderProps {
  children: React.ReactNode;
}

export type Form = {
  to: string;
  from: string;
  link: string;
  body: unknown;
}

export type FormResponse = {
  field: string;
  response: unknown;
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

  const has = (from: string) => {
    return stack.forms.some(form => form.from === from);
  }

  const pop = (from: string) => {
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
      const result = {
        form,
        response,
      };

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
      value={{ has, push, pop, getReturn, setResult }}
    >
      {children}
    </FormContext.Provider>
  );
}

export type FormState = {
  pushForm: (form: Form) => void;
  setFormResult: (to: string, response: FormResponse) => void;
  returnTo: string;
  formsResult?: FormResult;
}

export function useForms(from: string): FormState {
  const forms = useContext(FormContext);
  const [formsResult, setFormsResult] = useState<FormResult>();

  useEffect(() => {
    if (forms.has(from)) {
      setFormsResult(forms.pop(from));
    }
  }, [forms]);

  const returnTo = forms.getReturn(from, "/" + from);

  return {
    pushForm: forms.push,
    setFormResult: forms.setResult,
    formsResult,
    returnTo
  }
}
