import * as Yup from "yup";

import {
  basicEntityFromJson,
  IBasicEntity,
  IMultiLang,
  multiLangFromJson,
  multiLangToJson,
  multiLangValidation,
} from "../../../core/models";

interface IPricingBase {
  title: IMultiLang;
  description: IMultiLang;
}

export interface IPricingForm extends IPricingBase {}

export interface IPricing extends IPricingBase, IBasicEntity {}

const pricingCommonValidation = {
  title: multiLangValidation.required(),
  description: multiLangValidation.required(),
};

export const pricingFormValidation = Yup.object<IPricingForm>({
  ...pricingCommonValidation,
});

export const pricingEditFormValidation = Yup.object<IPricingForm>({
  ...pricingCommonValidation,
});

export const pricingFromJson = (json: any): IPricing => {
  const e: IPricing = {
    ...basicEntityFromJson(json),
    title: multiLangFromJson(json, "title"),
    description: multiLangFromJson(json, "description"),
  };

  return e;
};

export const pricingToJson = (form: IPricingForm) => {
  return {
    ...multiLangToJson(form.title, "title"),
    ...multiLangToJson(form.description, "description"),
  };
};
