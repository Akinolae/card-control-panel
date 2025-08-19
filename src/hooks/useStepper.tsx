import StepIndicator from "../components/ui/StepIndicator";
import { Props } from "../interface";

export const useStepper = (props: Props) => {
  const { step, steps, showStepper, stepperStyle } = props;

  return {
    step,
    steps,
    Indicator: () => (
      <StepIndicator
        step={step}
        steps={steps}
        showStepper={showStepper}
        stepperStyle={stepperStyle}
      />
    ),
  };
};
