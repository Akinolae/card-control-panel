import { NavLink } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/react";
import { RiHome5Line } from "react-icons/ri";
import { FaCreditCard } from "react-icons/fa6";
import { FaMoneyBills } from "react-icons/fa6";
const Sidebar = () => {
  const routes = [
    {
      name: "Dashboard",
      path: "/dashboard/",
      icon: <RiHome5Line />,
    },
    {
      name: "Cards",
      path: "cards",
      icon: <FaCreditCard />,
    },
    {
      name: "Transactions",
      path: "transactions",
      icon: <FaMoneyBills />,
    },
  ];

  return (
    <Flex pt={"10%"}>
      <Flex
        gap={"1%"}
        padding={"20px"}
        pt={"2%"}
        height={"100%"}
        width={"100%"}
        maxWidth={"250px"}
        position={"fixed"}
        flexDirection={"column"}
        background={"#FAF9FE"}
      >
        {routes.map((data, i) => {
          return (
            <>
              {/* {isLogOut ? (
                <Flex
                  position={"absolute"}
                  bottom={0}
                  transform={"translateY(-100%)"}
                >
                  <NavLink
                    className={({ isActive }) =>
                      `navlink ${isActive ? "active-class" : "inactive"}`
                    }
                    to={data.path}
                    key={i}
                  >
                    <Flex
                      marginLeft={"5px"}
                      alignItems={"center"}
                      marginRight={"5px"}
                      gap={"10px"}
                    >
                      <Flex className="icon">{data.icon}</Flex>
                      <Text fontWeight={700}>{data.name}</Text>
                    </Flex>
                  </NavLink>
                </Flex>
              ) : ( */}
              <NavLink
                className={({ isActive }) =>
                  `navlink ${isActive ? "active-class" : "inactive"}`
                }
                to={data.path}
                key={i}
              >
                <Flex
                  marginLeft={"5px"}
                  alignItems={"center"}
                  marginRight={"5px"}
                  gap={"10px"}
                >
                  <Flex className="icon">{data.icon}</Flex>
                  <Text fontWeight={700}>{data.name}</Text>
                </Flex>
              </NavLink>
              {/* )} */}
            </>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default Sidebar;
