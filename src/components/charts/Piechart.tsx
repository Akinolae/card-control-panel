import { Box } from "@chakra-ui/react";
import Chart from "./Chart";
import { usePieChart } from "./hooks/usePieChart";
const PieChart = (params: any) => {
  const { students } = params;

  const pieData = {
    keys: ["male", "female"],
    values: students.map((student: any) => ({
      ...student,
      gender: student.gender.toLowerCase(),
    })),
  };
  const pieConfig = usePieChart({ data: pieData });

  return (
    <Box>
      <Chart options={pieConfig} />
    </Box>
  );
};

export default PieChart;
