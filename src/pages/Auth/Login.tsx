/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthWrapper from "./AuthWrapper";
import { Link } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
import LoginForm from "../../Forms/Auth/LoginForm";
import { useMutation } from "@tanstack/react-query";
import { signInWithGoogle } from "../../services/firebase";
import { CutomButton, CustomStepper } from "../../components/ui";
import { storeCookie } from "../../utils/cookieUtils";

const Login = () => {
  const { mutate } = useMutation({
    mutationFn: () => signInWithGoogle(),
    onSuccess: (data) => {
      const { stsTokenManager }: any = data;
      const { accessToken }: { accessToken: string; refreshToken: string } =
        stsTokenManager;

      storeCookie(accessToken);
    },
  });

  const steps = [
    {
      component: (
        <Box>
          <p
            className="form"
            style={{ textAlign: "start", fontWeight: 550, fontSize: "32px" }}
          >
            Hi 👋, welcome back!.
          </p>
          <LoginForm onSubmit={(e) => mutate(e)} />
        </Box>
      ),
    },
  ];

  return (
    <Box height={"100vh"}>
      <AuthWrapper
        render={() => {
          return (
            <>
              <Text fontSize={"sm"} fontWeight={450}>
                Don't have an account?
              </Text>
              <Link to={"/"}>
                <CutomButton
                  btnProps={{
                    background: "#b4646463",
                    borderRadius: "20px",
                    height: "35px",
                    color: "white",
                    fontWeight: 450,
                    fontSize: "14px",
                  }}
                  text="Create account"
                />
              </Link>
            </>
          );
        }}
      >
        <CustomStepper steps={steps} step={steps.length - 1} />
      </AuthWrapper>
    </Box>
  );
};

export default Login;
