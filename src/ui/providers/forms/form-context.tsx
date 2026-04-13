import { createContext } from "react";

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
