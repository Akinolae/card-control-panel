import {
  HStack,
  PinInput,
  PinInputField,
  PinInputProps,
} from "@chakra-ui/react";

interface PinProps extends PinInputProps {
  length: number;
}

const CustomPin = (props: PinProps) => {
  const { length, ...rest } = props;

  return (
    <HStack background={"red"} width={"50%"}>
      <PinInput autoFocus  {...rest}>
        {Array.from({ length }).map((_, idx) => {
          return <PinInputField key={idx} />;
        })}
      </PinInput>
    </HStack>
  );
};

export default CustomPin;
