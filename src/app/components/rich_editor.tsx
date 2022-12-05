import { Box, FormHelperText, InputLabel } from "@material-ui/core";
import { Editor } from "@tinymce/tinymce-react";
import { Field, FieldProps } from "formik";
import React from "react";

interface IProps {
  label: string;
  name: string;
  setFieldValue: (fieldName: any, value: any) => void;
}

export const RichEditor: React.FC<IProps> = ({ label, name, setFieldValue }: IProps) => {
  return (
    <Field name={name}>
      {({ meta }: FieldProps): JSX.Element => {
        const hasError = Boolean(meta.touched && meta.error);

        return (
          <Box mb={2}>
            <Box mb={1}>
              <InputLabel>{label}</InputLabel>
            </Box>

            <Editor
              initialValue={meta.value}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount image",
                ],
                toolbar: `undo redo | formatselect | bold italic backcolor | \
                 alignleft aligncenter alignright alignjustify | \
                 media image | \
                 bullist numlist outdent indent | removeformat | help`,
              }}
              onEditorChange={(value) => setFieldValue(name, value)}
            />

            {hasError && <FormHelperText error>{meta.error?.toString()}</FormHelperText>}
          </Box>
        );
      }}
    </Field>
  );
};
