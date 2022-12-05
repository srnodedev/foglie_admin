import Grid from "@material-ui/core/Grid";
import React from "react";

import { Form } from "../../../../components/form";
import { FormButton } from "../../../../components/form_button";
import { TextInput } from "../../../../components/text_input";
import { IFormProps } from "../../../../core/models";
import { isPending } from "../../../../core/redux";
import { IPasswordForm, passwordFormValidation } from "../../data/entities";

interface IProps extends IFormProps<IPasswordForm> {}

export const PasswordForm: React.FC<IProps> = (props: IProps) => {
  const { branch, submitTitle } = props;
  const loading = isPending(branch);

  return (
    <Grid container justify="center">
      <Grid item md={8} lg={6}>
        <Form<IPasswordForm>
          {...props}
          initialValues={{
            currentPassword: "",
            password: "",
            passwordConfirmation: "",
          }}
          validationSchema={passwordFormValidation}
        >
          {() => (
            <>
              <TextInput label="Current password" name="currentPassword" type="password" />
              <TextInput label="New password" name="password" type="password" />
              <TextInput label="New password confirmation" name="passwordConfirmation" type="password" />

              <FormButton label={submitTitle} loading={loading} />
            </>
          )}
        </Form>
      </Grid>
    </Grid>
  );
};
