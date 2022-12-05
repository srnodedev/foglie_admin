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

interface ISliderBase {
  title: IMultiLang;
  subtitle: IMultiLang;
  description: IMultiLang;
  imageId: string;
}

export interface ISliderForm extends ISliderBase {}

export interface ISlider extends ISliderBase, IBasicEntity {
  image: IImage;
}

const sliderCommonValidation = {
  title: multiLangValidation.required(),
  subtitle: multiLangValidation.required(),
  description: multiLangValidation.required(),
  imageId: yup.string().required(),
};

export const sliderFormValidation = yup.object<ISliderForm>({
  ...sliderCommonValidation,
});

export const sliderEditFormValidation = yup.object<ISliderForm>({
  ...sliderCommonValidation,
});

export const sliderFromJson = (json: any): ISlider => {
  const e: ISlider = {
    ...basicEntityFromJson(json),
    title: multiLangFromJson(json, "title"),
    subtitle: multiLangFromJson(json, "subtitle"),
    description: multiLangFromJson(json, "description"),
    imageId: json.image.id,
    image: generateImage(json.image),
  };

  return e;
};

export const sliderToJson = (form: ISliderForm) => {
  return {
    ...multiLangToJson(form.title, "title"),
    ...multiLangToJson(form.subtitle, "subtitle"),
    ...multiLangToJson(form.description, "description"),
    image: {
      id: form.imageId,
    },
  };
};
