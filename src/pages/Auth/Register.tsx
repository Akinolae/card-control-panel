/* eslint-disable @typescript-eslint/no-explicit-any */
import { register } from "../../services/auth";
import RegisterForm from "../../Forms/Auth/RegisterForm";
import AuthWrapper from "./AuthWrapper";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Text, useToast, Box } from "@chakra-ui/react";
import { CustomStepper, CutomButton } from "../../components/ui";
import { useEffect, useState } from "react";
import PassCode from "./PassCode";

const Register = () => {
  const toast = useToast({
    duration: 2000,
    position: "top-right",
  });
  const [step, setStep] = useState<number>(0);
  const [password, setPassword] = useState<string>("");

  const history = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");

  const nextStep = () => {
    setStep(step + 1);
  };

  useEffect(() => {
    if (email) {
      setStep(1);
    }
  }, [email]);

  const submitUser = async (e: any) => {
    try {
      await register(e);
      history(`/?email=${e?.email}`);
      nextStep();
    } catch (error: any) {
      toast({
        description: error?.message,
        status: "error",
      });
    }
  };

  const steps = [
    {
      component: (
        <RegisterForm setPassword={setPassword} onSubmit={submitUser} />
      ),
      header: "Create account",
    },
    {
      component: (
        <PassCode email={email} password={password} isEmailVerify={true} />
      ),
      header: "Verify email address",
    },
  ];

  return (
    <AuthWrapper
      render={() => {
        return (
          <>
            <Text fontSize={"sm"} fontWeight={450}>
              Already have an account?
            </Text>
            <Link to={"/login"}>
              <CutomButton
                btnProps={{
                  background: "#b4646463",
                  borderRadius: "20px",
                  height: "35px",
                  color: "white",
                  fontWeight: 450,
                  fontSize: "14px",
                }}
                text="Login"
              />
            </Link>
          </>
        );
      }}
    >
      <CustomStepper step={step} steps={steps} />
      <Box display={"flex"} justifyContent={"center"} paddingTop={"1%"}>
        <Link
          to="/login"
          style={{ fontSize: "14px", fontWeight: 400, paddingTop: "15px" }}
        >
          Do you have an account? <span style={{ fontWeight: 600 }}>login</span>
        </Link>
      </Box>
    </AuthWrapper>
  );
};

export default Register;
