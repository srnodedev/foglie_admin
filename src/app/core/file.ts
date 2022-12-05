import * as Yup from "yup";

export const MAX_FILE_SIZE = 5 * 1024 * 1000; // TODO: 2MB, Lower this
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const fileValidation = Yup.mixed()
  .test("fileSize", "File too large, max size should be 500kb", (value) => {
    if (!value || !value.size) return true;
    return value && value.size <= MAX_FILE_SIZE;
  })
  .test("fileFormat", "Unsupported Format", (value) => {
    if (!value || !value.type) return true;
    return value && SUPPORTED_FORMATS.includes(value.type);
  });
