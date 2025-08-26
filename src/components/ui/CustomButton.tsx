import { Button } from "@chakra-ui/react";
import { ThreeDots } from "react-loader-spinner";

import { ButtonProps } from "@chakra-ui/react";

interface CustomButtonProps {
  text?: string;
  btnProps?: ButtonProps;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "before" | "after";
}

const CutomButton = (props: CustomButtonProps) => {
  const { text, btnProps, isLoading, iconPosition, icon } = props;
  const commonProps = {
    ...btnProps,
    fontWeight: 550,
    gap: "10px",
  };

  return (
    <Button
      flexDirection={iconPosition === "before" ? "row" : "row-reverse"}
      {...commonProps}
    >
      {isLoading ? (
        <>
          <ThreeDots height={"30"} width={"30"} color="white" />
        </>
      ) : (
        <>
          {icon ? icon : null}
          {text ? text : null}
        </>
      )}
    </Button>
  );
};

export default CutomButton;
