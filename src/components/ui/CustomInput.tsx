import React, { useState } from "react";
import {
  Input,
  FormLabel,
  Box,
  Flex,
  Text,
  InputProps,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { IoMdKey } from "react-icons/io";

const InputWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  background: white;
  border-radius: 10px;
  height: 50px;
  border: 1px solid #bac0ca;
  width: 100%;
  place-items: center;
  padding-left: 10px;
`;

const ChakraInput = styled(Input)`
  width: 100%;
  box-shadow: none !important;
  outline: none;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 10px;
  height: 100%;
  font-size: 10px;
  background: none;
  font-weight: 400;
`;

const IconWrapper = styled.div`
  padding-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const ErrorComponent = styled.span`
  font-size: 10px;
  font-weight: 500;
  color: red;
`;

interface LabelProps {
  text: string;
  labelIcon: boolean;
}

interface CustomInputProps extends InputProps {
  label?: string;
  textArea?: boolean;
  error?: string;
  labelProps?: any | undefined;
  children?: React.ReactElement;
  hasIcon?: boolean;
  icon?: any;
}

const Label = (props: LabelProps) => {
  const { text } = props;
  return (
    <FormLabel
      color={"#A3A3C2"}
      fontWeight={500}
      pt="15px"
      fontSize={12}
      {...props}
    >
      <Flex gap={"8px"} alignItems={"center"}>
        {!!text ? <Text>{text}</Text> : null}
      </Flex>
    </FormLabel>
  );
};

const CustomInput = (props: CustomInputProps) => {
  const { type, label, icon, textArea, error, labelProps } = props;
  const Icon = (props: any) => <Box {...props}>{icon}</Box>;
  return (
    <Box style={{ width: "100%" }}>
      <Label htmlFor={label} text={label} {...labelProps} />
      {type === "select" ? (
        <>{!!error && <ErrorComponent>{error}</ErrorComponent>}</>
      ) : type === "phone" ? (
        <></>
      ) : (
        // <>{!!error ? <ErrorComponent message={error} /> : null}</>
        <>
          {!!textArea ? (
            <></>
          ) : (
            <InputWrapper>
              {!!icon ? (
                <IconWrapper
                  style={{
                    borderRight: "1px solid #bac0ca",
                  }}
                >
                  <Icon style={{ fontSize: "14px", color: "#bac0ca" }} />
                </IconWrapper>
              ) : null}
              <ChakraInput
                id={label}
                fontSize={"13px"}
                fontWeight={500}
                type={type}
                backgroundColor={"white"}
                outline={"none"}
                {...props}
              />
            </InputWrapper>
          )}
          {!!error ? <ErrorComponent>{error}</ErrorComponent> : null}
        </>
      )}
    </Box>
  );
};

const PasswordInput = (props: CustomInputProps) => {
  const { hasIcon, placeholder, label, error, labelProps, height } = props;
  const [isVisible, setIsvisible] = useState(false);

  const toggleVisiblity = () => {
    setIsvisible(!isVisible);
  };
  return (
    <Box>
      <Label {...labelProps} htmlFor={label} text={label} />
      <InputWrapper {...props}>
        <IconWrapper
          style={{
            borderRight: "1px solid #bac0ca",
          }}
        >
          <IoMdKey style={{ fontSize: "14px", color: "#bac0ca" }} />
        </IconWrapper>
        <ChakraInput
          id={label}
          border="none"
          type={isVisible ? "text" : "password"}
          placeholder={placeholder}
          fontWeight={500}
          fontSize={"13px"}
          className="custom-input"
        />
        {hasIcon && (
          <IconWrapper>
            {isVisible ? (
              <MdVisibility
                style={{ fontSize: "15px", color: "#bac0ca" }}
                onClick={() => toggleVisiblity()}
              />
            ) : (
              <MdVisibilityOff
                style={{ fontSize: "15px", color: "#bac0ca" }}
                onClick={() => toggleVisiblity()}
              />
            )}
          </IconWrapper>
        )}
      </InputWrapper>
      {!!error && <ErrorComponent>{error}</ErrorComponent>}
    </Box>
  );
};

export { CustomInput, PasswordInput };
