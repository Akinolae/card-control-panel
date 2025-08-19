import { Formik, Form } from "formik";
import { CutomButton } from "../../components/ui";
import {
  CustomInput,
  PasswordInput,
  ErrorComponent,
} from "../../components/ui/CustomInput";
import * as yup from "yup";
import { errors } from "../../utils/errorUtil";
import { FaAddressBook } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { IoMailSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Flex } from "@chakra-ui/react";
import { FaSchool } from "react-icons/fa";
const regSchema = yup.object().shape({
  email: yup.string().trim().email(errors.invalidEmail).required(errors.email),
  password: yup.string().trim().required(errors.password),
  address: yup.string().trim().required(),
  school_name: yup.string().trim().required("School name is required"),
  phone_number: yup.string().trim().required(),
  gender: yup.string(),
  role: yup.string().required(),
  name: yup.string().trim().required(),
  middleName: yup.string().trim().required("Middle name is required"),
});

interface RegisterFormProps {
  onSubmit: (e: unknown) => void;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  error?: string;
}

const RegsiterForm = ({ onSubmit, error, setPassword }: RegisterFormProps) => {
  const initialValues = {
    school_name: "",
    email: "",
    address: "",
    password: "",
    phone_number: "",
    school_size: 50,
    gender: "Male",
    role: "School_owner",
    name: "",
    middleName: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={regSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue, values, errors, isSubmitting }) => {
        return (
          <Form className="form">
            <ErrorComponent>{error}</ErrorComponent>
            <Flex gap={"15px"}>
              <CustomInput
                value={values.name}
                icon={<FaUser />}
                label="First name"
                onChange={(e) => setFieldValue("name", e.target.value)}
                placeholder="Enter name"
                error={errors.name}
              />
              <CustomInput
                value={values.middleName}
                icon={<FaUser />}
                label="Middle name"
                onChange={(e) => setFieldValue("middleName", e.target.value)}
                placeholder="Enter middle name"
                error={errors.middleName}
              />
            </Flex>
            <CustomInput
              value={values.school_name}
              icon={<FaSchool />}
              label="School name"
              onChange={(e) => setFieldValue("school_name", e.target.value)}
              placeholder="School name"
              error={errors.school_name}
            />
            <CustomInput
              value={values.address}
              label="School address"
              icon={<FaAddressBook />}
              onChange={(e) => setFieldValue("address", e.target.value)}
              placeholder="School address"
              error={errors.address}
            />
            <CustomInput
              value={values.email}
              label="School email"
              icon={<IoMailSharp />}
              error={errors.email}
              type="email"
              onChange={(e) => setFieldValue("email", e.target.value)}
              placeholder="School email"
            />
            <CustomInput
              label="Phone number"
              icon={<FaPhone />}
              error={errors.phone_number}
              value={values.phone_number}
              onChange={(e) => setFieldValue("phone_number", e.target.value)}
              placeholder="Enter phone number"
            />
            <PasswordInput
              value={values.password}
              error={errors.password}
              label="Password"
              hasIcon
              onChange={(e) => {
                setPassword(e.target.value);
                setFieldValue("password", e.target.value);
              }}
              placeholder="Enter password"
            />
            <CutomButton
              type="submit"
              btnProps={{
                background: "red",
                marginTop: "25px",
                height: "40px",
                color: "white",
                fontWeight: 450,
                fontSize: "14px",
                type: "submit",
              }}
              text="Create Account"
              isLoading={isSubmitting}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegsiterForm;
