/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form } from "formik";
import { CutomButton } from "../../components/ui";
import { CustomInput } from "../../components/ui/CustomInput";
import { IoMailSharp } from "react-icons/io5";

const ForgotPasswordForm = ({ onSubmit }: any) => {
  const initialValues = {
    email: "",
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ setFieldValue, values, isSubmitting }) => {
        return (
          <Form className="form">
            <CustomInput
              label="Enter email"
              value={values.email}
              icon={<IoMailSharp />}
              type="email"
              onChange={(e) => setFieldValue("email", e.target.value)}
              placeholder="School email"
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
                disabled: !values.email || isSubmitting,
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

export default ForgotPasswordForm;
