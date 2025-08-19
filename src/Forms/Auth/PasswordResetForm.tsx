/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form } from "formik";
import { PasswordInput } from "../../components/ui/CustomInput";
import { CutomButton } from "../../components/ui";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  password: yup.string().required(),
  password2: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords don't match")
    .required("Confirm password is required"),
});

const PasswordResetForm = ({ onSubmit }: any) => {
  const initialValues = {
    password: "",
    password2: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue, values, isSubmitting, errors }) => {
        return (
          <Form className="form">
            <PasswordInput
              label="Enter password"
              value={values.password}
              hasIcon={true}
              onChange={(e) => setFieldValue("password", e.target.value)}
              placeholder="Enter password"
              error={errors.password}
            />
            <PasswordInput
              label="Confirm password"
              value={values.password2}
              hasIcon={true}
              onChange={(e) => setFieldValue("password2", e.target.value)}
              placeholder="Confirm password"
              error={errors.password2}
            />

            <CutomButton
              btnProps={{
                background: "red",
                marginTop: "25px",
                height: "40px",
                color: "white",
                fontWeight: 450,
                fontSize: "14px",
                type: "submit",
                disabled: !values.password || !values.password2 || isSubmitting,
              }}
              disabled
              isLoading={isSubmitting}
              text={"Submit"}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default PasswordResetForm;
