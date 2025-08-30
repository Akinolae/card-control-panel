/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex } from "@chakra-ui/react";
import { CutomButton } from "../../components/ui";
import { AiFillGoogleCircle } from "react-icons/ai";
import { BsGithub } from "react-icons/bs";
// import { BsGithub } from "react-icons/bs";

interface LoginFormProps {
  onSubmit: (e: any) => void;
}

const LoginForm = (props: LoginFormProps) => {
  const { onSubmit } = props;
  return (
    <Flex gap={5} margin={'auto'}>
      <CutomButton
        btnProps={{
          background: "red",
          height: "50px",
          color: "white",
          fontWeight: 450,
          fontSize: "16px",
          type: "submit",
          borderRadius: "50px",
          onClick: (e: any) => onSubmit(e),
        }}
        text="Login with Google"
        iconPosition="before"
        icon={<AiFillGoogleCircle size={30} />}
      />
      <CutomButton
        btnProps={{
          background: "red",
          height: "50px",
          color: "white",
          fontWeight: 450,
          fontSize: "16px",
          type: "submit",
          borderRadius: "50px",
          onClick: (e: any) => onSubmit(e),
        }}
        text="Login with GitHub"
        iconPosition="before"
        icon={<BsGithub size={30} />}
      />
    </Flex>
  );
};

export default LoginForm;
