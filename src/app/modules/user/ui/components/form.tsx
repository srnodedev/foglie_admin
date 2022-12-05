import { Grid } from "@material-ui/core";
import React from "react";

import { Form } from "../../../../components/form";
import { FormButton } from "../../../../components/form_button";
import { TextInput } from "../../../../components/text_input";
import { IFormProps } from "../../../../core/models";
import { isPending } from "../../../../core/redux";
import { IUserForm, userFormValidation } from "../../data/entities";

interface IProps extends IFormProps<IUserForm> {}

export const UserForm: React.FC<IProps> = (props: IProps) => {
  const { branch, submitTitle } = props;
  const loading = isPending(branch);

  return (
    <Grid container justify="center">
      <Grid item md={8} lg={6}>
        <Form<IUserForm>
          {...props}
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={userFormValidation}
        >
          {() => (
            <>
              <TextInput label="Name" name="name" />
              <TextInput label="Email" name="email" type="email" />
              <TextInput label="Password" name="password" type="password" />

              <FormButton label={submitTitle} loading={loading} />
            </>
          )}
        </Form>
      </Grid>
    </Grid>
  );
};
