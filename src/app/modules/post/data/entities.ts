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

interface IPostBase {
  title: IMultiLang;
  description: IMultiLang;
  content: IMultiLang;
  imageId: string;
}

export interface IPostForm extends IPostBase {}

export interface IPost extends IPostBase, IBasicEntity {
  image: IImage;
}

const postCommonValidation = {
  title: multiLangValidation.required(),
  description: multiLangValidation.required(),
  content: multiLangValidation.required(),
  imageId: yup.string().required(),
};

export const postFormValidation = yup.object<IPostForm>({
  ...postCommonValidation,
});

export const postEditFormValidation = yup.object<IPostForm>({
  ...postCommonValidation,
});

export const postFromJson = (json: any): IPost => {
  const e: IPost = {
    ...basicEntityFromJson(json),
    title: multiLangFromJson(json, "title"),
    description: multiLangFromJson(json, "description"),
    content: multiLangFromJson(json, "content"),
    imageId: json.image.id,
    image: generateImage(json.image),
  };

  return e;
};

export const postToJson = (form: IPostForm) => {
  return {
    ...multiLangToJson(form.title, "title"),
    ...multiLangToJson(form.description, "description"),
    ...multiLangToJson(form.content, "content"),
    image: {
      id: form.imageId,
    },
  };
};
