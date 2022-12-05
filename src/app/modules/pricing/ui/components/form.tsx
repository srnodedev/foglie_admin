import { Grid } from "@material-ui/core";
import React from "react";

import { Form } from "../../../../components/form";
import { FormButton } from "../../../../components/form_button";
import { TextInput } from "../../../../components/text_input";
import { IFormProps } from "../../../../core/models";
import { isPending } from "../../../../core/redux";
import { IPricingForm, pricingFormValidation } from "../../data/entities";

interface IProps extends IFormProps<IPricingForm> {}

export const PricingForm: React.FC<IProps> = (props: IProps) => {
  const { branch, submitTitle } = props;
  const loading = isPending(branch);

  return (
    <Grid container justify="center">
      <Grid item xs={12} md={8} lg={6}>
        <Form<IPricingForm>
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
          }}
          validationSchema={pricingFormValidation}
          {...props}
        >
          {() => (
            <>
              <TextInput label="Title Az" name="title.az" />
              <TextInput label="Title En" name="title.en" />
              <TextInput label="Title Ru" name="title.ru" />

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
