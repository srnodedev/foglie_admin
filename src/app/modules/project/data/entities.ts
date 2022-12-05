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
import { categoryFromJson, ICategory } from "../../category/data/entities";

interface IProjectBase {
  title: IMultiLang;
  client: IMultiLang;
  location: IMultiLang;
  scale: IMultiLang;
  content: IMultiLang;
  imageId: string;
  categoryId: string;
  date: string;
  noContent: boolean;
}

export interface IProjectForm extends IProjectBase {}

export interface IProject extends IProjectBase, IBasicEntity {
  category: ICategory;
  image: IImage;
}

const projectCommonValidation = {
  title: multiLangValidation.required(),
  noContent: yup.boolean().required(),
  imageId: yup.string().required(),
  client: yup.object<IMultiLang>().when("noContent", {
    is: true,
    then: yup.object<IMultiLang>({
      az: yup.string(),
      en: yup.string(),
      ru: yup.string(),
    }),
    otherwise: yup.object<IMultiLang>({
      az: yup.string().required(),
      en: yup.string().required(),
      ru: yup.string().required(),
    }),
  }),
  location: yup.object<IMultiLang>().when("noContent", {
    is: true,
    then: yup.object<IMultiLang>({
      az: yup.string(),
      en: yup.string(),
      ru: yup.string(),
    }),
    otherwise: yup.object<IMultiLang>({
      az: yup.string().required(),
      en: yup.string().required(),
      ru: yup.string().required(),
    }),
  }),
  scale: yup.object<IMultiLang>().when("noContent", {
    is: true,
    then: yup.object<IMultiLang>({
      az: yup.string(),
      en: yup.string(),
      ru: yup.string(),
    }),
    otherwise: yup.object<IMultiLang>({
      az: yup.string().required(),
      en: yup.string().required(),
      ru: yup.string().required(),
    }),
  }),
  content: yup.object<IMultiLang>().when("noContent", {
    is: true,
    then: yup.object<IMultiLang>({
      az: yup.string(),
      en: yup.string(),
      ru: yup.string(),
    }),
    otherwise: yup.object<IMultiLang>({
      az: yup.string().required(),
      en: yup.string().required(),
      ru: yup.string().required(),
    }),
  }),
  categoryId: yup.string().required(),
  date: yup.string().when("noContent", {
    is: true,
    then: yup.string().nullable(),
    otherwise: yup.string().required(),
  }),
};

export const projectFormValidation = yup.object<IProjectForm>({
  ...projectCommonValidation,
});

export const projectEditFormValidation = yup.object<IProjectForm>({
  ...projectCommonValidation,
});

export const projectFromJson = (json: any): IProject => {
  const e: IProject = {
    ...basicEntityFromJson(json),
    title: multiLangFromJson(json, "title"),
    client: multiLangFromJson(json, "client"),
    location: multiLangFromJson(json, "location"),
    scale: multiLangFromJson(json, "scale"),
    content: multiLangFromJson(json, "content"),
    category: categoryFromJson(json.category),
    categoryId: json.category.id,
    imageId: json.image.id,
    image: generateImage(json.image),
    date: json.date,
    noContent: json.noContent,
  };

  return e;
};

export const projectToJson = (form: IProjectForm) => {
  return {
    ...multiLangToJson(form.title, "title"),
    ...multiLangToJson(form.client, "client"),
    ...multiLangToJson(form.location, "location"),
    ...multiLangToJson(form.scale, "scale"),
    ...multiLangToJson(form.content, "content"),
    category: {
      id: form.categoryId,
    },
    image: {
      id: form.imageId,
    },
    date: form.date ? form.date : null,
    noContent: form.noContent,
  };
};
