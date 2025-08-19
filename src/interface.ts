import { StyleProps } from "@chakra-ui/react";

export interface Props {
  steps: { component: JSX.Element; icon?: JSX.Element; header?: string }[];
  step: number;
  stepperStyle?: StyleProps;
  showStepper?: boolean;
  icon?: JSX.Element;
}
