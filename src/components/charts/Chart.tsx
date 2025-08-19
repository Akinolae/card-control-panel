import ReactEcharts from "echarts-for-react";

const Chart = ({ options, style = {} }: any) => {
  return <ReactEcharts style={style} option={options} />;
};

export default Chart;
