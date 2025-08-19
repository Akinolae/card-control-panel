import { Box } from "@chakra-ui/react";
import ComponentWrapper from "../../Layout";
import { useStepper } from "../../hooks/useStepper";
import { Props } from "../../interface";

const CustomStepper = (props: Props) => {
  const { steps, step, stepperStyle, showStepper } = props;
  const { Indicator } = useStepper({
    step,
    steps,
    showStepper,
    stepperStyle,
  });

  return (
    <Box pt={"5%"}>
      <Indicator />
      {steps[step].header ? (
        <p style={{ textAlign: "start", fontWeight: 550, fontSize: "32px" }}>
          {steps[step].header}
        </p>
      ) : null}
      <ComponentWrapper>
        <Box>{steps[step].component}</Box>
      </ComponentWrapper>
    </Box>
  );
};

export default CustomStepper;
