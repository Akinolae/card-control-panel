import { Box } from "@chakra-ui/react";
import { Table, TableProps } from "antd";
import { CustomInput } from "./CustomInput";
import { useState } from "react";
import { useFilter } from "../../hooks/useFilter";

interface CustomTableProps extends TableProps {
  tableHead: any[];
}

const CustomTable = (props: CustomTableProps) => {
  const [search, setSearch] = useState<string>("");

  const { tableHead, dataSource } = props;

  const data = dataSource || [];
  const filteredData = useFilter({
    data,
    filterText: search,
  });

  return (
    <Box>
      <Box mb={"2%"}>
        <CustomInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
        />
      </Box>
      <Table {...props} columns={tableHead} dataSource={filteredData} />
    </Box>
  );
};

export default CustomTable;
