import { Box, FormHelperText } from "@material-ui/core";
import { Field, FieldProps } from "formik";
import React from "react";
import ImageUploader from "react-images-upload";

import { MAX_FILE_SIZE } from "../core/file";

interface IProps {
  label?: string;
  name: string;
  defaultImage?: string;
  setFieldValue: (fieldName: any, value: any) => void;
}

export const FileInput: React.FC<IProps> = ({ name, setFieldValue }: IProps) => {
  return (
    <Field name={name}>
      {({ meta }: FieldProps) => {
        const hasError = Boolean(meta.touched && meta.error);

        return (
          <Box mt={2} mb={1}>
            {/* {label && <InputLabel>{label}</InputLabel>} */}

            <Box mt={1}>
              {/* <input
                accept="image/*"
                type="file"
                name={name}
                multiple
                onChange={(e) => {
                  setFieldValue(name, e.target.files);
                }}
              /> */}
              <ImageUploader
                withIcon={true}
                withPreview
                name={name}
                buttonText="Choose images"
                label="Max file size: 0.5mb. Accepted: '.jpg', '.png'"
                onChange={(files) => setFieldValue(name, files)}
                imgExtension={[".jpg", ".png", ".mp4"]}
                maxFileSize={MAX_FILE_SIZE}
              />
              {hasError && <FormHelperText error>{meta.error}</FormHelperText>}
            </Box>
          </Box>
        );
      }}
    </Field>
  );
};
