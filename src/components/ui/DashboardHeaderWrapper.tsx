/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Box } from "@chakra-ui/react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
interface Props {
  text: string;
}

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

const DashBoardHeaderWrapper = (props: Props) => {
  // const { text } = props;

  const commonProps = {
    size: "20px",
    color: "#35293D",
  };

  // const { payLoad }: any = useSelector((data: any) => data?.user);

  return (
    <Flex width={"100%"} position={"relative"}>
      <Flex width={"100%"} placeItems={"center"} placeContent={"space-between"}>
        <Box></Box>
        <Flex gap={"10px"}>
          <Wrapper>
            <IoMdNotificationsOutline {...commonProps} />
          </Wrapper>
          <Wrapper>
            <CiUser {...commonProps} />
          </Wrapper>
        </Flex>
        {/* <Box>
          <Text fontSize={"28px"} textTransform={"capitalize"} fontWeight={450}>
            {text}
          </Text>
        </Box> */}
        {/* <Box>
          <CustomMenu
            btnText={"user details"}
            menuList={[{ text: "Settin" }]}
          /> */}
        {/* <Text>user details</Text> */}
        {/* </Box> */}
      </Flex>
    </Flex>
  );
};

export default DashBoardHeaderWrapper;
