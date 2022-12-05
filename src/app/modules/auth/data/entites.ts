import * as Yup from "yup";

export interface ILoginForm {
  email: string;
  password: string;
}

export const loginFormValidation = Yup.object({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string().required(),
});
