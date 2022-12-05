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

interface IAboutBase {
  title: IMultiLang;
  text: IMultiLang;
  imageId: string;
  image1Id: string;
  image2Id: string;
  image3Id: string;
  image4Id: string;
}

export interface IAboutForm extends IAboutBase {}

export interface IAbout extends IAboutBase, IBasicEntity {
  image: IImage;
  image1: IImage;
  image2: IImage;
  image3: IImage;
  image4: IImage;
}

const aboutCommonValidation = {
  title: multiLangValidation.required(),
  text: multiLangValidation.required(),
  imageId: yup.string().required(),
  image1Id: yup.string().required(),
  image2Id: yup.string().required(),
  image3Id: yup.string().required(),
  image4Id: yup.string().required(),
};

export const aboutFormValidation = yup.object<IAboutForm>({
  ...aboutCommonValidation,
});

export const aboutEditFormValidation = yup.object<IAboutForm>({
  ...aboutCommonValidation,
});

export const aboutFromJson = (json: any): IAbout => {
  const e: IAbout = {
    ...basicEntityFromJson(json),
    title: multiLangFromJson(json, "title"),
    text: multiLangFromJson(json, "text"),
    image: generateImage(json.image),
    imageId: json.image.id,
    image1: generateImage(json.image1),
    image1Id: json.image1.id,
    image2: generateImage(json.image2),
    image2Id: json.image2.id,
    image3: generateImage(json.image3),
    image3Id: json.image3.id,
    image4: generateImage(json.image4),
    image4Id: json.image4.id,
  };

  return e;
};

export const aboutToJson = (form: IAboutForm) => {
  return {
    ...multiLangToJson(form.title, "title"),
    ...multiLangToJson(form.text, "text"),
    image: {
      id: form.imageId,
    },
    image1: {
      id: form.image1Id,
    },
    image2: {
      id: form.image2Id,
    },
    image3: {
      id: form.image3Id,
    },
    image4: {
      id: form.image4Id,
    },
  };
};
