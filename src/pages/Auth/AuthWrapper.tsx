import { Box, Flex } from "@chakra-ui/react";
import ComponentWrapper from "../../Layout";
import { ReactNode } from "react";

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper = (props: AuthWrapperProps) => {
  return (
    <Box height={"100vh"} width={"100%"}>
      <Flex h={"100%"}>
        <Box
          height={"100%"}
          padding={"2%"}
          display={"flex"}
          flexDir={"column"}
          placeContent={"center"}
          placeItems={"center"}
          width={"60%"}
          margin={"auto"}
        >
          <ComponentWrapper>{props.children}</ComponentWrapper>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthWrapper;
