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
import { aboutFormValidation, IAboutForm } from "../../data/entities";

interface IProps extends IFormProps<IAboutForm> {}

export const AboutForm: React.FC<IProps> = (props: IProps) => {
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
        <Form<IAboutForm>
          initialValues={{
            title: {
              az: "",
              en: "",
              ru: "",
            },
            text: {
              az: "",
              en: "",
              ru: "",
            },
            imageId: "",
            image1Id: "",
            image2Id: "",
            image3Id: "",
            image4Id: "",
          }}
          validationSchema={aboutFormValidation}
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

              <SelectInput<IFile>
                options={fileListBranch}
                label="Home image 1"
                name="image1Id"
                renderLabel={(img) => <img src={img.image.url} width={50} height={50} alt="" />}
              />

              <SelectInput<IFile>
                options={fileListBranch}
                label="Home image 2"
                name="image2Id"
                renderLabel={(img) => <img src={img.image.url} width={50} height={50} alt="" />}
              />

              <SelectInput<IFile>
                options={fileListBranch}
                label="Home image 3"
                name="image3Id"
                renderLabel={(img) => <img src={img.image.url} width={50} height={50} alt="" />}
              />

              <SelectInput<IFile>
                options={fileListBranch}
                label="Home image 4"
                name="image4Id"
                renderLabel={(img) => <img src={img.image.url} width={50} height={50} alt="" />}
              />

              <TextInput label="Title Az" name="title.az" />
              <RichEditor label="Text az" name="text.az" setFieldValue={setFieldValue} />

              <TextInput label="Title en" name="title.en" />
              <RichEditor label="Text en" name="text.en" setFieldValue={setFieldValue} />

              <TextInput label="Title ru" name="title.ru" />
              <RichEditor label="Text ru" name="text.ru" setFieldValue={setFieldValue} />

              <FormButton label={submitTitle} loading={loading} />
            </>
          )}
        </Form>
      </Grid>
    </Grid>
  );
};
