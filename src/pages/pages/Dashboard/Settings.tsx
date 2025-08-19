import { Box, Text } from "@chakra-ui/react";
import { DashBoardHeaderWrapper } from "../../../components/ui";
import ComponentWrapper from "../../../Layout";

const Settings = () => {
  return (
    <Box background="red">
      <DashBoardHeaderWrapper text={"settings"} />
    </Box>
  );
};

export default Settings;
