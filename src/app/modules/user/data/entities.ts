import * as Yup from "yup";

import { basicEntityFromJson, IBasicEntity } from "../../../core/models";

interface IUserBase {
  name: string;
  email: string;
}

export interface IUser extends IUserBase, IBasicEntity {}

export interface IUserForm extends IUserBase {
  password: string;
}

const userCommonValidation = {
  name: Yup.string().required(),
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .min(6)
    .required(),
};

export const userFormValidation = Yup.object<IUserForm>({
  ...userCommonValidation,
});

export const userEditFormValidation = Yup.object<IUserForm>({
  ...userCommonValidation,
});

export const userFromJson = (json: any): IUser => {
  const e: IUser = {
    ...basicEntityFromJson(json),
    name: json.name.toString(),
    email: json.email.toString(),
  };

  return e;
};

export const userToJson = (form: IUserForm) => {
  return {
    name: form.name.toString(),
    email: form.email.toString(),
    password: form.password.toString(),
  };
};
