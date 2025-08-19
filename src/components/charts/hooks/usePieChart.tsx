import { useMemo } from "react";

export const usePieChart = (props: any) => {
  const { data } = props;
  const { keys, values } = useMemo(
    () => ({
      keys: data.keys,
      values: data.values,
    }),
    [data.keys, data.values]
  );

  return useMemo(() => {
    const formattedData = keys.map((key, index) => ({
      name: key,
      value: values[index],
      itemStyle: {
        color:
          index === 0
            ? "red"
            : index === 1
              ? "rgba(1, 76, 187, 0.4)"
              : "rgba(0, 123, 255, 0.1)",
      },
    }));

    return {
      tooltip: {
        trigger: "item",
        formatter: (params: any) => {
          const { name, value } = params;
          return `<div style='background-color: #fff; box-shadow: 1px 1px 5px rgba(0,0,0,0.1); color: #333; border-radius: 4px; padding: 10px; text-align: center;'>
                       <div>${name}</div>
                       <div>${value}</div>
                     </div>`;
        },
        padding: 0,
        position: "top",
      },
      legend: {
        orient: "horizontal",
        bottom: 0,
        data: keys,
        icon: "circle",
        itemWidth: 8,
        itemHeight: 8,
        itemStyle: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        itemGap: 20,
        formatter: (name: string) => name,
        textStyle: {
          fontSize: 12,
          //   color: colors.eyeIconColor,
        },
      },
      series: [
        {
          name: "Expenses",
          type: "pie",
          radius: ["55%", "75%"],
          data: formattedData,
          itemStyle: {
            borderRadius: 0,
            borderColor: "none",
            borderWidth: 0,
          },
          emphasis: {
            scale: false,
            itemStyle: {
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0)",
            },
          },
          label: {
            show: false,
          },
        },
      ],
    };
  }, [keys]);
};
