/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import AuthWrapper from "./AuthWrapper";
import { AppContext } from "../../Context";
import { Box, Text } from "@chakra-ui/react";
import LoginForm from "../../Forms/Auth/LoginForm";
import { useMutation } from "@tanstack/react-query";
import { storeCookie } from "../../utils/cookieUtils";
import { Link, useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../services/firebase";
import { CutomButton, CustomStepper } from "../../components/ui";

const Login = () => {
  const history = useNavigate();
  const context = useContext(AppContext);
  const setValue: React.Dispatch<React.SetStateAction<any>> = context
    ? context[1]
    : () => {};

  const { mutate } = useMutation({
    mutationFn: () => signInWithGoogle(),
    onSuccess: async (data) => {
      const { stsTokenManager }: any = data;
      const { accessToken }: { accessToken: string; refreshToken: string } =
        stsTokenManager;

      const { displayName, email, emailVerified, photoURL } = data;

      await Promise.all([
        setValue({
          key: "user",
          value: { name: displayName, email, emailVerified, photoURL },
        }),
        setValue({ key: "isSignedIn", value: true }),
        storeCookie(accessToken),
      ]).then(() => history("/dashboard"));
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
