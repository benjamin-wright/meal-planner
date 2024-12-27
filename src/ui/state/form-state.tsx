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

export class FormState {
  private stack: FormStack;

  constructor() {
    const savedStack = localStorage.getItem("form-state");
    if (savedStack) {
      this.stack = JSON.parse(savedStack) as FormStack;
    } else {
      this.stack = {
        forms: []
      };
    }
  }

  save() {
    localStorage.setItem("form-state", JSON.stringify(this.stack));
  }

  push(form: Form) {
    this.stack.forms.push(form);
    this.save();
  }

  pop(from: string): FormResult | undefined {
    if (this.stack.forms.length === 0) {
      return;
    }

    console.info(`Popping ${from} from ${JSON.stringify(this.stack)}`);

    if (this.stack.forms[this.stack.forms.length - 1].from !== from) {
      return;
    }

    const form = this.stack.forms.pop();
    const response = this.stack.response;
    this.stack.response = undefined;

    this.save();

    if (form) {
      return {
        form,
        response,
      }
    }
  }

  getReturn(to: string, defaultReturn: string): string {
    if (this.stack.forms.length === 0) {
      return defaultReturn;
    }

    const form = this.stack.forms[this.stack.forms.length - 1];
    if (form.to === to) {
      return form.link;
    }

    return defaultReturn;
  }

  setResult(to: string, response: FormResponse) {
    if (this.stack.forms.length === 0) {
      return;
    }

    const form = this.stack.forms[this.stack.forms.length - 1];
    if (form.to !== to) {
      return;
    }

    this.stack.response = response;
    this.save();
  }
}
