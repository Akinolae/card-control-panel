import { Formik, Form } from "formik";
import { Box, Flex, Select } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { CustomInput } from "../components/ui/CustomInput";
import { CutomButton } from "../components/ui";
import * as yup from "yup";
import { errors } from "../utils/errorUtil";

interface Student {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  guardianEmail: string;
  guardianPhone: string;
  gender: string;
  studentImage: string;
}

interface InitialValues {
  class_id: string;
  student: Student;
}

const validationSchema = yup.object().shape({
  student: yup.object().shape({
    firstName: yup.string().required(errors.firstName),
    middleName: yup.string().required("Middle name is required"),
    lastName: yup.string().required("Last name is required"),
    dateOfBirth: yup.string().required("Date of birth is required"),
    guardianEmail: yup.string().required(errors.email),
    guardianPhone: yup.string().required(errors.phoneNumber),
    gender: yup.string().required("Gender is required"),
  }),
});

const AddStudent = ({ onSubmit }: any) => {
  const { classes } = useSelector((data: any) => data.user);
  const initialValues: InitialValues = {
    class_id: "",
    student: {
      firstName: "",
      dateOfBirth: "",
      gender: "",
      guardianEmail: "",
      guardianPhone: "",
      lastName: "",
      middleName: "",
      studentImage: "asdf;lkj",
    },
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnMount
    >
      {({ values, setFieldValue, isSubmitting, errors }) => {
        const studentErrors = errors.student || {};
        const hasErrors =
          !values.class_id || !!Object.values(studentErrors).length;

        return (
          <Form>
            <Select
              placeholder="Select class"
              onChange={(e) => setFieldValue("class_id", e.target.value)}
            >
              {classes.map((val: any, index: number) => {
                return (
                  <option key={index} value={val.class_id}>
                    {val.label}
                  </option>
                );
              })}
            </Select>
            <Box>
              <CustomInput
                label="First name"
                value={values.student.firstName}
                name={`student.firstName`}
                error={errors.student?.firstName}
                onChange={(e) =>
                  setFieldValue("student.firstName", e.target.value)
                }
              />
              <CustomInput
                label="Middle name"
                value={values.student.middleName}
                error={errors.student?.middleName}
                name={`student.middleName`}
                onChange={(e) =>
                  setFieldValue("student.middleName", e.target.value)
                }
              />
              <CustomInput
                label="Last name"
                value={values.student.lastName}
                name={`student.lastName`}
                error={errors.student?.lastName}
                onChange={(e) =>
                  setFieldValue("student.lastName", e.target.value)
                }
              />
              <CustomInput
                label="Email"
                type="email"
                value={values.student.guardianEmail}
                error={errors.student?.guardianEmail}
                name={`student.guardianEmail`}
                onChange={(e) =>
                  setFieldValue("student.guardianEmail", e.target.value)
                }
              />
              <CustomInput
                label="Date of birth"
                type="date"
                size="md"
                value={values.student.dateOfBirth}
                error={errors.student?.dateOfBirth}
                name={`student.dateOfBirth`}
                onChange={(e) =>
                  setFieldValue("student.dateOfBirth", e.target.value)
                }
              />
              <CustomInput
                label="Guardian phonenumber"
                value={values.student.guardianPhone}
                error={errors.student?.guardianPhone}
                name={`student.guardianPhone`}
                onChange={(e) =>
                  setFieldValue("student.guardianPhone", e.target.value)
                }
              />
              <CustomInput
                label="Gender"
                error={errors.student?.gender}
                value={values.student.gender}
                name={`student.gender`}
                onChange={(e) =>
                  setFieldValue("student.gender", e.target.value)
                }
              />
              <Flex width={"100%"} placeContent={"center"} pt={"2%"} pb={"2%"}>
                <CutomButton
                  text="Submit"
                  isLoading={isSubmitting}
                  btnProps={{
                    background: "red",
                    marginTop: "25px",
                    height: "45px",
                    width: "50%",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "16px",
                    type: "submit",
                    disabled: hasErrors || isSubmitting,
                  }}
                />
              </Flex>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddStudent;
