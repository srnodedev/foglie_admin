import * as Yup from "yup";

export interface IPasswordForm {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}

export const passwordFormValidation = Yup.object({
  currentPassword: Yup.string().required(),
  password: Yup.string().required(),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required(),
});
