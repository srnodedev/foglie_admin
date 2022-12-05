import * as yup from "yup";

import {
  basicEntityFromJson,
  generateImage,
  IBasicEntity,
  IImage,
  IMultiLang,
  multiLangFromJson,
  multiLangToJson,
  multiLangValidation,
} from "../../../core/models";

interface IMemberBase {
  firstName: IMultiLang;
  lastName: IMultiLang;
  position: IMultiLang;
  imageId: string;
}

export interface IMember extends IMemberBase, IBasicEntity {
  image: IImage;
}

export interface IMemberForm extends IMemberBase {}

const memberCommonValidation = {
  firstName: multiLangValidation.required(),
  lastName: multiLangValidation.required(),
  position: multiLangValidation.required(),
  imageId: yup.string().required(),
};

export const memberFormValidation = yup.object<IMemberForm>({
  ...memberCommonValidation,
});

export const memberEditFormValidation = yup.object<IMemberForm>({
  ...memberCommonValidation,
});

export const memberFromJson = (json: any): IMember => {
  const e: IMember = {
    ...basicEntityFromJson(json),
    firstName: multiLangFromJson(json, "firstName"),
    lastName: multiLangFromJson(json, "lastName"),
    position: multiLangFromJson(json, "position"),
    image: generateImage(json.image),
    imageId: json.image.id,
  };

  return e;
};

export const memberToJson = (form: IMemberForm) => {
  return {
    ...multiLangToJson(form.firstName, "firstName"),
    ...multiLangToJson(form.lastName, "lastName"),
    ...multiLangToJson(form.position, "position"),
    image: {
      id: form.imageId,
    },
  };
};
