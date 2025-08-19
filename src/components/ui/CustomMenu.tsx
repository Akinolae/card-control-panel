import { Flex, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { MdOutlineArrowDropDown } from "react-icons/md";

const CustomMenu = (props: any) => {
  const { menuList, btnText } = props;
  return (
    <Menu>
      <MenuButton as={"button"}>
        <Flex placeContent={"space-between"} placeItems={"center"}>
          {btnText}
          <MdOutlineArrowDropDown />
        </Flex>
      </MenuButton>
      {menuList.map((menu: any, i: number) => {
        return <MenuList key={i}>{menu.text}</MenuList>;
      })}
    </Menu>
  );
};

export default CustomMenu;
