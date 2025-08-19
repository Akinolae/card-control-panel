import { Box, Flex, Text } from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";
import { CutomButton, PinInputComponent } from "../../components/ui";

const TwoFactorAuth = () => {
  return (
    <Flex flexDir={"column"} justifyContent={"center"} alignItems={"center"}>
      <Box
        height={"60px"}
        width={"60px"}
        borderRadius={"50%"}
        bg={"#25BC87"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <FaLock size={"30px"} color="white" />
      </Box>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        flexDir={"column"}
        mt={"20px"}
      >
        <Text lineHeight={"25px"} fontWeight={550} fontSize={"18px"} textAlign={"center"}>
          Authorization is required to access your account <br />
          Enter the 6 digit code displayed on your authenticator app
        </Text>
        <Box mt={`20px`}>
          <PinInputComponent type="number" length={6} />
          <CutomButton
            btnProps={{
              width: "100%",
              background: "red",
              marginTop: "25px",
              height: "40px",
              color: "white",
              fontWeight: 450,
              fontSize: "14px",
              type: "submit",
            }}
            text={"next"}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default TwoFactorAuth;
