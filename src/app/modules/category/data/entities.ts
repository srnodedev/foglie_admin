import * as Yup from "yup";

import {
  basicEntityFromJson,
  IBasicEntity,
  IMultiLang,
  multiLangFromJson,
  multiLangToJson,
  multiLangValidation,
} from "../../../core/models";

interface ICategoryBase {
  name: IMultiLang;
  parentId: string;
}

export interface ICategoryForm extends ICategoryBase {}

export interface ICategory extends ICategoryBase, IBasicEntity {
  parent?: ICategory;
  children?: ICategory[];
}

const categoryCommonValidation = {
  name: multiLangValidation.required(),
  parentId: Yup.string(),
};

export const categoryFormValidation = Yup.object<ICategoryForm>({
  ...categoryCommonValidation,
});

export const categoryEditFormValidation = Yup.object<ICategoryForm>({
  ...categoryCommonValidation,
});

export const categoryFromJson = (json: any): ICategory => {
  const e: ICategory = {
    ...basicEntityFromJson(json),
    name: multiLangFromJson(json, "name"),
    parent: json.parent,
    parentId: json.parent?.id,
    children: json.children?.map(categoryFromJson),
  };

  return e;
};

export const categoryToJson = (form: ICategoryForm) => {
  return {
    ...multiLangToJson(form.name, "name"),
    parent: { id: form.parentId || null },
  };
};
