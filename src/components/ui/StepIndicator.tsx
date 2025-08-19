import { StyleProps } from "@chakra-ui/react";
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

export interface Props {
  steps: { component: JSX.Element; icon?: JSX.Element; header?: string }[];
  step: number;
  stepperStyle?: StyleProps;
  showStepper?: boolean;
  icon?: JSX.Element;
}

const StepIndicator = (prop: Props) => {
  const { step, showStepper, steps, stepperStyle } = prop;
  const stepperWidth = 50 / steps.length;

  return (
    <React.Fragment>
      {showStepper ? (
        <Flex
          display={"flex"}
          gap={"5px"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {Array.from({ length: steps.length }).map((_, idx) => {
            const lastIndex = idx === steps.length - 1;
            const currentStep = step >= idx;

            return (
              <React.Fragment key={idx}>
                <Box
                  height={`40px`}
                  borderRadius={"full"}
                  width={`40px`}
                  background={currentStep ? "green" : "#0367C7"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  color={"white"}
                  fontWeight={600}
                  transition={"all ease"}
                  {...stepperStyle}
                >
                  {steps[idx].icon ? steps[idx].icon : <Text>{idx + 1}</Text>}
                </Box>

                {lastIndex ? null : (
                  <Box
                    width={`${stepperWidth}%`}
                    height={"2px"}
                    transition={"width ease"}
                    background={step > idx ? "#90C4B9" : "#8AB1E3"}
                  ></Box>
                )}
              </React.Fragment>
            );
          })}
        </Flex>
      ) : null}
    </React.Fragment>
  );
};

export default StepIndicator;
