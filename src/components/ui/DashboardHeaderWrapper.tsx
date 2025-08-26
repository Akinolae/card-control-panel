/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Box } from "@chakra-ui/react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { getUser } from "../../services/auth";

const Wrapper = (props: any) => {
  return (
    <Flex
      height={"40px"}
      width={"40px"}
      borderRadius={"full"}
      justifyContent={"center"}
      alignItems={"center"}
      background={"#F7F7F7"}
    >
      {props?.children}
    </Flex>
  );
};

const DashBoardHeaderWrapper = () => {
  const user = getUser();

  const commonProps = {
    size: "20px",
    color: "#35293D",
  };

  return (
    <Flex width={"100%"} position={"relative"}>
      <Flex width={"100%"} placeItems={"center"} placeContent={"space-between"}>
        <Box></Box>
        <Flex gap={"10px"}>
          <Wrapper>
            <IoMdNotificationsOutline {...commonProps} />
          </Wrapper>
          <Wrapper>
            {user?.photoURL ? (
              <img
                src={user?.photoURL}
                style={{ borderRadius: "50px" }}
                height={"100%"}
                width={"100%"}
              />
            ) : (
              <CiUser {...commonProps} />
            )}
          </Wrapper>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashBoardHeaderWrapper;
