import { Box, Flex, Text } from "@chakra-ui/react";
import FileInputButton from "../ui/FileUploadButton";

const AddStudentUpload = (props: any) => {
  const { onChange } = props;
  return (
    <Flex
      width={"100%"}
      mt={"5%"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box width={"90%"}>
        <Text fontSize={"30px"} fontWeight={700} textAlign={"center"}>
          Upload students data
        </Text>
        <Text textAlign={"center"} color={"#666669b7"}>
          File should be .csv xls
        </Text>
        <Box
          mt={"5%"}
          mb={"5%"}
          p={"15%"}
          width={"100%"}
          borderRadius={"20px"}
          border={"2px dashed #A3A3C2"}
        >
          <Flex
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <FileInputButton onChange={onChange} />
            <Box mt={5}>
              <Text fontSize={"14px"} color={"#666669b7"}>
                Drag & Drop your files here
              </Text>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default AddStudentUpload;
