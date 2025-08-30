/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Flex, Text } from "@chakra-ui/react";
import { PiStudentBold } from "react-icons/pi";
import { ImUserTie } from "react-icons/im";
import { RiArtboardLine } from "react-icons/ri";
import ComponentWrapper from "../../../Layout";
import { useQuery } from "@tanstack/react-query";
import { getCards } from "../../../services/cards";

const Wrapper = (params: any | unknown) => {
  const { number, header, bg, icon } = params;

  const IconComponent = icon;
  return (
    <Flex
      borderRadius={"5px"}
      padding={"25px"}
      backgroundColor={bg}
      height={"100px"}
      width={"50%"}
      alignItems={"center"}
      boxShadow="sm"
    >
      <Flex
        justifyContent={"space-between"}
        width={"100%"}
        alignItems={"center"}
      >
        <Box>
          <Text color={"#BDC0C3"} fontWeight={"bold"}>
            {header}
          </Text>
          <Text color={"#4F4E4E"} fontSize={"24px"} fontWeight={"extrabold"}>
            {number}
          </Text>
        </Box>
        <Box>{<IconComponent style={{ color: bg }} />}</Box>
      </Flex>
    </Flex>
  );
};

const UserDashboard = () => {
  const classes = [];

  const totalStudents = [];

  const {
    data: dts,
    error,
    refetch,
  } = useQuery({
    queryKey: ["cards"],
    queryFn: getCards,
  });

  console.log({ dts, error });
  const commonProps = {
    size: "35px",
  };
  const data = [
    {
      header: "Students",
      number: totalStudents.length,
      bg: "#F8F6FF",
      icon: () => (
        <PiStudentBold {...commonProps} style={{ color: "#B17AF6" }} />
      ),
    },
    {
      header: "Teachers",
      number: 0,
      bg: "#EEF9FE",
      icon: () => <ImUserTie {...commonProps} style={{ color: "#72A8FC" }} />,
    },
    {
      header: "Classes",
      number: classes.length,
      bg: "#FFF7F3",
      icon: () => (
        <RiArtboardLine {...commonProps} style={{ color: "#FD9D52" }} />
      ),
    },
  ];
  return (
    <Box>
      <Box height={"100%"}>
        <Text color={"#11041A"} fontWeight={"bold"} fontSize={"18px"}>
          Welcome 👋{" "}
        </Text>
        <Text fontSize={"14px"} color={"#8D8693"}>
          {" "}
          Navigate the future of education with ...
        </Text>
        <ComponentWrapper>
          <Box>
            <Flex
              marginTop={"2%"}
              gap={"2.5%"}
              justifyContent={"space-between"}
            >
              {data.map((item, index) => (
                <Wrapper
                  key={index}
                  header={item.header}
                  number={item.number}
                  onClick={refetch}
                  bg={item.bg}
                  icon={item.icon}
                />
              ))}
            </Flex>
            <Box marginTop={"3%"}>
              <Box
                background={"#FBFBFE"}
                height={"350px"}
                width={"400px"}
                borderRadius={"5px"}
              >
                {/* <PieChart students={totalStudents} /> */}
              </Box>
            </Box>
          </Box>
        </ComponentWrapper>
      </Box>
    </Box>
  );
};

export default UserDashboard;
