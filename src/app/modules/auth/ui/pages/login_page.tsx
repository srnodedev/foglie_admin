import { Box, Container, Paper, Typography } from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Center } from "../../../../components/center";
import { ErrorPanel } from "../../../../components/error_panel";
import { FormButton } from "../../../../components/form_button";
import { TextInput } from "../../../../components/text_input";
import { IAsyncData } from "../../../../core/models";
import { isPending } from "../../../../core/redux";
import { IAppReduxState } from "../../../../redux/store";
import { ILoginForm, loginFormValidation } from "../../data/entites";
import { authRedux } from "../state/state";

export const LoginPage: React.FC = () => {
  const dispatch = useDispatch();

  const loginBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.auth.login);
  const loading = isPending(loginBranch);

  async function onLogin(form: ILoginForm) {
    await dispatch(authRedux.actions.login(form));
    dispatch(authRedux.actions.checkAuth());
  }

  return (
    <Container maxWidth="sm">
      <Box m={2}>
        <Center>
          <Typography variant="h4" gutterBottom>
            Foglie D’alloro
          </Typography>
        </Center>
      </Box>
      <Paper>
        <Box p={4}>
          <ErrorPanel branch={loginBranch} />
          <Formik<ILoginForm>
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginFormValidation}
            onSubmit={onLogin}
          >
            {() => (
              <Form>
                <TextInput label="Email" name="email" type="email" />

                <TextInput label="Password" name="password" type="password" />

                <FormButton label="Login" loading={loading} />
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>
    </Container>
  );
};
