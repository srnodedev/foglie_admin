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
import { categoryFormValidation, ICategory, ICategoryForm } from "../../data/entities";
import { categoryReduxActions } from "../state/state";

interface IProps extends IFormProps<ICategoryForm> {}

export const CategoryForm: React.FC<IProps> = (props: IProps) => {
  const { branch, submitTitle } = props;
  const loading = isPending(branch);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoryReduxActions.getList());
  }, [dispatch]);
  const categoryListBranch = useSelector<IAppReduxState, IAsyncData<ICategory[]>>((state) => state.category.list);

  return (
    <Grid container justify="center">
      <Grid item md={8} lg={6}>
        <Form<ICategoryForm>
          initialValues={{
            name: {
              az: "",
              en: "",
              ru: "",
            },
            parentId: "",
          }}
          validationSchema={categoryFormValidation}
          {...props}
        >
          {({ values }) => (
            <>
              <TextInput label="Name Az" name="name.az" />
              <TextInput label="Name En" name="name.en" />
              <TextInput label="Name Ru" name="name.ru" />

              <SelectInput<ICategory>
                options={categoryListBranch}
                label="Parent"
                name="parentId"
                value={values.parentId}
                renderLabel={(e) => e.name.az}
                notRequired
              />

              <FormButton label={submitTitle} loading={loading} />
            </>
          )}
        </Form>
      </Grid>
    </Grid>
  );
};
