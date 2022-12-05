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
import { ISliderForm, sliderFormValidation } from "../../data/entities";

interface IProps extends IFormProps<ISliderForm> {}

export const SliderForm: React.FC<IProps> = (props: IProps) => {
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
        <Form<ISliderForm>
          initialValues={{
            title: {
              az: "",
              en: "",
              ru: "",
            },
            subtitle: {
              az: "",
              en: "",
              ru: "",
            },
            description: {
              az: "",
              en: "",
              ru: "",
            },
            imageId: "",
          }}
          validationSchema={sliderFormValidation}
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

              <TextInput label="Title Az" name="title.az" />
              <TextInput label="Title En" name="title.en" />
              <TextInput label="Title Ru" name="title.ru" />

              <TextInput label="Subtitle Az" name="subtitle.az" />
              <TextInput label="Subtitle En" name="subtitle.en" />
              <TextInput label="Subtitle Ru" name="subtitle.ru" />

              <TextInput label="Description Az" name="description.az" />
              <TextInput label="Description En" name="description.en" />
              <TextInput label="Description Ru" name="description.ru" />

              <FormButton label={submitTitle} loading={loading} />
            </>
          )}
        </Form>
      </Grid>
    </Grid>
  );
};
