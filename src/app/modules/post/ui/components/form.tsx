import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Form } from "../../../../components/form";
import { FormButton } from "../../../../components/form_button";
import { RichEditor } from "../../../../components/rich_editor";
import { SelectInput } from "../../../../components/select_input";
import { TextInput } from "../../../../components/text_input";
import { IAsyncData, IFormProps } from "../../../../core/models";
import { isPending } from "../../../../core/redux";
import { IAppReduxState } from "../../../../redux/store";
import { IFile } from "../../../file/data/entities";
import { fileReduxActions } from "../../../file/ui/state/state";
import { IPostForm, postFormValidation } from "../../data/entities";

interface IProps extends IFormProps<IPostForm> {}

export const PostForm: React.FC<IProps> = (props: IProps) => {
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
        <Form<IPostForm>
          initialValues={{
            title: {
              az: "",
              en: "",
              ru: "",
            },
            description: {
              az: "",
              en: "",
              ru: "",
            },
            content: {
              az: "",
              en: "",
              ru: "",
            },
            imageId: "",
          }}
          validationSchema={postFormValidation}
          {...props}
        >
          {({ setFieldValue }) => (
            <>
              <SelectInput<IFile>
                options={fileListBranch}
                label="Image"
                name="imageId"
                renderLabel={(img) => <img src={img.image.url} width={50} height={50} alt="" />}
              />

              <TextInput label="Title az" name="title.az" />
              <TextInput label="Description az" name="description.az" />
              <RichEditor label="Content az" name="content.az" setFieldValue={setFieldValue} />

              <TextInput label="Title en" name="title.en" />
              <TextInput label="Description en" name="description.en" />
              <RichEditor label="Content en" name="content.en" setFieldValue={setFieldValue} />

              <TextInput label="Title ru" name="title.ru" />
              <TextInput label="Description ru" name="description.ru" />
              <RichEditor label="Content ru" name="content.ru" setFieldValue={setFieldValue} />

              <FormButton label={submitTitle} loading={loading} />
            </>
          )}
        </Form>
      </Grid>
    </Grid>
  );
};
