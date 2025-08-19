import { Button } from "@chakra-ui/react";
import { ThreeDots } from "react-loader-spinner";

const CutomButton = (props: any) => {
  const { text, btnProps, isLoading } = props;
  const commonProps = {
    ...btnProps,
    fontWeight: 550,
  };

  return (
    <Button {...commonProps}>
      {isLoading ? (
        <>
          <ThreeDots height={"30"} width={"30"} color="white" />
        </>
      ) : (
        text
      )}
    </Button>
  );
};

export default CutomButton;
