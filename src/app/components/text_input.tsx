import TextField, { FilledTextFieldProps } from "@material-ui/core/TextField";
import { Field, FieldProps } from "formik";
import React from "react";

interface IProps extends Partial<FilledTextFieldProps> {
  label: string;
  name: string;
  type?: string;
  validate?: (value: string) => any;
}

export const TextInput: React.FC<IProps> = ({ label, name, type, onChange, onBlur, validate, ...rest }: IProps) => {
  return (
    <Field name={name} validate={validate}>
      {({ field, meta }: FieldProps): JSX.Element => {
        return (
          <TextField
            // size="small"
            name={name}
            type={type}
            label={label}
            fullWidth
            variant="filled"
            margin="normal"
            error={Boolean(meta.touched && meta.error)}
            helperText={meta.touched && meta.error}
            value={meta.value}
            onFocus={() => {
              if (!meta.touched) {
                console.log("remove zero?");
              }
            }}
            onChange={(e) => {
              field.onChange(e);
              onChange && onChange(e);
            }}
            onBlur={(e) => {
              field.onBlur(e);

              onBlur && onBlur(e);
            }}
            {...rest}
          />
        );
      }}
    </Field>
  );
};
