import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@material-ui/core";
import { SelectProps } from "@material-ui/core/Select";
import { Field, FieldProps } from "formik";
import React from "react";

import { IAsyncData, isAsyncData } from "../core/models";
import { isPending } from "../core/redux";
import { Loading } from "./loading";

export interface ISelectInputProps<T> extends SelectProps {
  options: IAsyncData<T[]> | T[];
  label: string;
  name: string;
  renderLabel: (o: T) => React.ReactNode;
  renderOption?: (o: T) => React.ReactNode;
  notRequired?: boolean;
}

export function SelectInput<T extends { id: string }>({
  label,
  name,
  options,
  renderLabel,
  onChange,
  renderOption,
  variant = "filled",
  notRequired,
  ...rest
}: ISelectInputProps<T>) {
  const loading = isAsyncData(options) ? isPending(options) : false;
  const optionList = isAsyncData(options) ? options.data : options;

  return (
    <Loading loading={loading}>
      <Field name={name}>
        {({ field, meta }: FieldProps<T>) => {
          const hasError = Boolean(meta.touched && meta.error);

          const options = optionList?.map((o) =>
            renderOption ? (
              renderOption(o)
            ) : (
              <MenuItem key={o.id} value={o.id}>
                {renderLabel(o)}
              </MenuItem>
            ),
          );

          return (
            <Box mt={2} mb={1}>
              <FormControl variant={variant} fullWidth error={hasError}>
                <InputLabel>{label}</InputLabel>
                <Select
                  value={meta.value}
                  onChange={(e) => {
                    field.onChange(e);
                    onChange && onChange(e, options);
                  }}
                  onBlur={field.onBlur}
                  name={field.name}
                  variant={variant}
                  {...rest}
                >
                  {notRequired && <MenuItem value="">None</MenuItem>}
                  {options}
                </Select>
                {hasError && <FormHelperText>{meta.error?.toString()}</FormHelperText>}
              </FormControl>
            </Box>
          );
        }}
      </Field>
    </Loading>
  );
}
