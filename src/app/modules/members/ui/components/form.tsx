import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Form } from "../../../../components/form";
import { FormButton } from "../../../../components/form_button";
import { SelectInput } from "../../../../components/select_input";
import { TextInput } from "../../../../components/text_input";
import { IAsyncData, IFormProps } from "../../../../core/models";
import { isPending } from "../../../../core/redux";
import { IAppReduxState } from "../../../../redux/store";
import { IFile } from "../../../file/data/entities";
import { fileReduxActions } from "../../../file/ui/state/state";
import { IMemberForm, memberFormValidation } from "../../data/entities";

interface IProps extends IFormProps<IMemberForm> {}

export const MemberForm: React.FC<IProps> = (props: IProps) => {
  const { branch, submitTitle } = props;
  const loading = isPending(branch);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fileReduxActions.getList());
  }, [dispatch]);
  const fileListBranch = useSelector<IAppReduxState, IAsyncData<IFile[]>>((state) => state.file.list);

  return (
    <Grid container justify="center">
      <Grid item xs={12} md={8} lg={6}>
        <Form<IMemberForm>
          initialValues={{
            firstName: {
              az: "",
              en: "",
              ru: "",
            },
            lastName: {
              az: "",
              en: "",
              ru: "",
            },
            position: {
              az: "",
              en: "",
              ru: "",
            },
            imageId: "",
          }}
          validationSchema={memberFormValidation}
          {...props}
        >
          {() => (
            <>
              <SelectInput<IFile>
                options={fileListBranch}
                label="Image"
                name="imageId"
                renderLabel={(img) => <img src={img.image.url} width={50} height={50} alt="" />}
              />

              <TextInput label="First name Az" name="firstName.az" />
              <TextInput label="First name En" name="firstName.en" />
              <TextInput label="First name Ru" name="firstName.ru" />
              <TextInput label="Last name Az" name="lastName.az" />
              <TextInput label="Last name En" name="lastName.en" />
              <TextInput label="Last name Ru" name="lastName.ru" />
              <TextInput label="Position Az" name="position.az" />
              <TextInput label="Position En" name="position.en" />
              <TextInput label="Position Ru" name="position.ru" />

              <FormButton label={submitTitle} loading={loading} />
            </>
          )}
        </Form>
      </Grid>
    </Grid>
  );
};
