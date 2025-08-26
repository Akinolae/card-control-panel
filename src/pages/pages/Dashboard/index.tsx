import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";
import { Box, Flex } from "@chakra-ui/react";
import { DashBoardHeaderWrapper } from "../../../components/ui";

const Dashboard = () => {
  return (
    <Flex
      width={"100%"}
      height="100vh"
      justifyContent={"space-between"}
      position={"relative"}
      maxWidth={"1500px"}
      margin={"auto"}
    >
      <Box height={"100%"}>
        <Sidebar />
      </Box>
      <Box height={"100%"} width={"83%"} overflowY={"auto"}>
        <Box
          maxWidth={"1400px"}
          width={"100%"}
          margin={"auto"}
          pt={"2%"}
          pl={"5%"}
          pr={"5%"}
        >
          <DashBoardHeaderWrapper />

          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
};

export default Dashboard;
