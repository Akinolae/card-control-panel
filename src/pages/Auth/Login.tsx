/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthWrapper from "./AuthWrapper";
import { Box, Flex, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { CustomStepper, CutomButton } from "../../components/ui";
import { signIn } from "../../services/auth";
import { AiFillGoogleCircle } from "react-icons/ai";
import { BsGithub } from "react-icons/bs";

const Login = () => {
  const history = useNavigate();
  const toast = useToast({
    position: "top-right",
    duration: 3000,
  });

  const { mutate } = useMutation({
    mutationFn: (method: string) => signIn(method),

    onSuccess: async () => {
      toast({
        description: "You've logged in successfully",
        status: "success",
        position: "top-right",
        duration: 2000,
        onCloseComplete: () => {
          history("/dashboard");
        },
      });
    },
    onError: () => {
      toast({
        description: "Login failed. Please try again.",
        status: "error",
      });
    },
  });

  const handleLogin = (method: string) => {
    mutate(method);
  };

  const steps = [
    {
      component: (
        <Flex flexDirection={"column"} gap={5} width={"100%"}>
          <p
            className="form"
            style={{ textAlign: "center", fontWeight: 700, fontSize: "40px" }}
          >
            Get started with Afro-bank cards
          </p>
          <Flex gap={5} margin={"auto"}>
            <CutomButton
              btnProps={{
                background: "red",
                height: "50px",
                color: "white",
                fontWeight: 450,
                fontSize: "16px",
                type: "submit",
                borderRadius: "50px",
                onClick: () => handleLogin("google"),
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
                onClick: () => handleLogin("git"),
              }}
              text="Login with GitHub"
              iconPosition="before"
              icon={<BsGithub size={30} />}
            />
          </Flex>
          <p style={{ textAlign: "center", fontSize: "14px", fontWeight: 550 }}>
            By signing up you agree to the Afro-bank cards policy
          </p>
        </Flex>
      ),
    },
  ];

  return (
    <Box height={"100vh"}>
      <AuthWrapper>
        <CustomStepper steps={steps} step={steps.length - 1} />
      </AuthWrapper>
    </Box>
  );
};

export default Login;
