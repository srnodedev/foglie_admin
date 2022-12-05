/* eslint-disable @typescript-eslint/no-empty-function */
import { FormikHelpers } from "formik";
import * as Yup from "yup";

export type Maybe<T> = T | undefined | null;

export function isNullish<T>(data: Maybe<T>): data is null | undefined {
  return data === null || data === undefined;
}

export enum EProcessStatus {
  CANCELED = "CANCELED",
  ERROR = "ERROR",
  IDLE = "IDLE",
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
}

export interface IError {
  message: string;
}

export interface IAsyncData<T> {
  data: Maybe<T>;
  error: Maybe<IError>;
  status: EProcessStatus;
  timestamp?: number;
}

export function isAsyncData(d: any): d is IAsyncData<any> {
  return d?.status;
}

export interface IFormProps<T> {
  initialData: Maybe<IAsyncData<T> | T>;
  validationSchema?: Yup.Schema<T>;
  onSubmit: (values: T, form: FormikHelpers<T>) => void;
  branch: IAsyncData<any>;
  submitTitle: string;
}

export interface ICRUDRepo<T, TForm, TDetailParams = {}> {
  getList: (searchQuery?: string) => Promise<T[]>;
  getDetails: (id: string) => Promise<T>;
  create: (form: TForm) => Promise<IId>;
  // createBulk: (form: TForm) => Promise<void>;
  delete: (id: string) => Promise<void>;
  edit: (id: string, form: TForm) => Promise<void>;
}

export interface IDateRage {
  fromDate: Date;
  toDate: Date;
}

export interface IMultiLang {
  az: string;
  en: string;
  ru: string;
}

export const multiLangValidation = Yup.object<IMultiLang>({
  az: Yup.string().required(),
  en: Yup.string().required(),
  ru: Yup.string().required(),
});

export function multiLangToJson(data: IMultiLang, key: string): { [x: string]: string } {
  return {
    [`${key}Az`]: data.az,
    [`${key}En`]: data.en,
    [`${key}Ru`]: data.ru,
  };
}

export function multiLangFromJson(data: any, key: string): IMultiLang {
  return {
    az: data[`${key}Az`],
    en: data[`${key}En`],
    ru: data[`${key}Ru`],
  };
}

export interface IId {
  id: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function exhaustiveCheck(param: never): void {}

export interface IBasicEntity {
  id: string;
  createdDate: Date;
  updatedDate: Date;
  version: number;
}

export const basicEntityFromJson = (json: any): IBasicEntity => {
  const e: IBasicEntity = {
    id: json.id.toString(),
    createdDate: new Date(json.createdDate.toString()),
    updatedDate: new Date(json.updatedDate.toString()),
    version: parseInt(json.version, 10),
  };

  return e;
};

export interface IRange<T> {
  from: Maybe<T>;
  to: Maybe<T>;
}

export interface IImage {
  url: string;
  width: number;
  height: number;
}

export function generateImage(json: any): IImage {
  return {
    url: json?.url,
    width: json?.width,
    height: json?.height,
  };
}
