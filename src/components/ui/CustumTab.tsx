import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  TabsProps,
} from "@chakra-ui/react";

interface TabProps extends TabsProps {
  tabArray: any[];
}

const CustomTabs = (tabProps: TabProps) => {
  const { tabArray } = tabProps;
  return (
    <Box mb={"5%"}>
      <Tabs>
        <TabList>
          {tabArray.map((tab: any, i: number) => (
            <Tab key={i}>{tab?.header}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {tabArray.map((tab: any, i: number) => (
            <TabPanel key={i}>{tab.child}</TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default CustomTabs;
