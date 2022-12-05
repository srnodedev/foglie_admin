import { Grid } from "@material-ui/core";
import React from "react";

import { FileInput } from "../../../../components/file_input";
import { Form } from "../../../../components/form";
import { FormButton } from "../../../../components/form_button";
import { IFormProps } from "../../../../core/models";
import { isPending } from "../../../../core/redux";
import { fileFormValidation, IFileForm } from "../../data/entities";

interface IProps extends IFormProps<IFileForm> {}

export const FileForm: React.FC<IProps> = (props: IProps) => {
  const { branch, submitTitle } = props;
  const loading = isPending(branch);

  return (
    <Grid container justify="center">
      <Grid item xs={12} md={8} lg={6}>
        <Form<IFileForm>
          initialValues={{
            files: undefined,
          }}
          validationSchema={fileFormValidation}
          {...props}
        >
          {({ setFieldValue }) => (
            <>
              <FileInput label="Image" name="files" setFieldValue={setFieldValue} />

              <FormButton label={submitTitle} loading={loading} />
            </>
          )}
        </Form>
      </Grid>
    </Grid>
  );
};
