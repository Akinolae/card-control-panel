import { Box, Flex } from "@chakra-ui/react";
import CustomModal from "./Modal";
import { CustomInput } from "../ui/CustomInput";
import { CutomButton } from "../ui";
import AddStudent from "../../Forms/AddStudentForm";
import CustomTabs from "../ui/CustumTab";
import AddStudentUpload from "./AddStudentUpload";
import { useState } from "react";
import { useDataExtractor } from "../../hooks/useDataExtractor";

const AddStudentModal = (props: any) => {
  const {
    classes,
    isOpen,
    onClose,
    className,
    handleSubmit,
    createClassFn,
    apiError,
    setClassName,
  } = props;

  const [file, setFile] = useState(null);

  const extractData = (e: any) => {
    console.log(!!e && e.target.files[0]);
  };
  const dt = !!file && extractData(file);

  return (
    <CustomModal
      modalHeaderText={!classes.length ? "Add class" : "Add Student"}
      modalContentProps={{
        padding: "20px",
      }}
      size={"2xl"}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <Box>
        <CustomTabs
          position="relative"
          variant="unstyled"
          isFitted
          children
          tabArray={[
            {
              header: "Red",
              child: !classes.length ? (
                <Box>
                  <CustomInput
                    label="Class name"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    error={apiError}
                    placeholder="Enter class name"
                  />
                  <Flex
                    width={"100%"}
                    placeContent={"center"}
                    pt={"2%"}
                    pb={"2%"}
                  >
                    <CutomButton
                      text="Submit"
                      btnProps={{
                        background: "red",
                        marginTop: "25px",
                        borderRadius: "10px",
                        height: "45px",
                        width: "30%",
                        color: "white",
                        fontWeight: 700,
                        fontSize: "16px",
                        type: "submit",
                        disabled: !className,
                        onClick: createClassFn,
                      }}
                    />
                  </Flex>
                </Box>
              ) : (
                <AddStudent onSubmit={handleSubmit} />
              ),
            },
            // {
            //   header: "yellow",
            //   child: <AddStudentUpload onChange={(e: any) => setFile(e)} />,
            // },
          ]}
        />
      </Box>
    </CustomModal>
  );
};

export default AddStudentModal;
