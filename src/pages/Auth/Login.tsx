/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthWrapper from "./AuthWrapper";
import { Box, Flex, useToast } from "@chakra-ui/react";
import LoginForm from "../../Forms/Auth/LoginForm";
import { useMutation } from "@tanstack/react-query";
import { storeCookie } from "../../utils/cookieUtils";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../services/firebase";
import { CustomStepper } from "../../components/ui";

const Login = () => {
  const history = useNavigate();
  const toast = useToast({
    position: "top-right",
    duration: 3000,
  });

  const { mutate } = useMutation({
    mutationFn: () => signInWithGoogle(),
    onSuccess: async (data) => {
      const { stsTokenManager }: any = data;
      const { accessToken }: { accessToken: string; refreshToken: string } =
        stsTokenManager;

      const { displayName, email, emailVerified, photoURL } = data;

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: displayName,
          email,
          emailVerified,
          photoURL,
          isSignedIn: true,
        })
      );
      storeCookie(accessToken);
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
  });

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
          <LoginForm onSubmit={(e) => mutate(e)} />
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
