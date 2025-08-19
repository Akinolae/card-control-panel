import {
  PinInput,
  PinInputField,
  HStack,
  PinInputFieldProps,
} from "@chakra-ui/react";

const PinField = (props: PinInputFieldProps) => {
  return <PinInputField h={"60px"} w={"60px"} borderRadius={15} {...props} />;
};

const PinInputComponent = (props: any) => {
  const { length } = props;
  return (
    <HStack
      display={{
        md: "flex",
      }}
      gap={"10px"}
      pt={2}
      w={"100%"}
      m="auto"
    >
      <PinInput placeholder="" type="alphanumeric" {...props}>
        {Array.from({ length }).map((_: unknown, index: number) => {
          return <PinField key={index} />;
        })}
      </PinInput>
    </HStack>
  );
};

export default PinInputComponent;
