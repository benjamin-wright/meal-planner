import { useContext, useEffect, useState } from "react";
import { FormContext, Form, FormResponse, FormResult } from "./form-context";

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
  }, [forms, from]);

  const returnTo = forms.getReturn(from, "/" + from);

  return {
    pushForm: forms.push,
    setFormResult: forms.setResult,
    formsResult,
    returnTo
  }
}
