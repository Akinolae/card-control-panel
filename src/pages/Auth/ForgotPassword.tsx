/* eslint-disable @typescript-eslint/no-explicit-any */
import ForgotPasswordForm from "../../Forms/Auth/ForgotPasswordForm";
import AuthWrapper from "./AuthWrapper";
import { forgotPassword } from "../../services/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast, Text, Box, Flex } from "@chakra-ui/react";
import { IoCaretBackCircle } from "react-icons/io5";
import { CustomStepper } from "../../components/ui";
import PassCode from "./PassCode";

const ForgotPassword = () => {
  const toast = useToast();
  const [error, setError] = useState("");
  const [step, setStep] = useState<number>(0);

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

  const onSubmit = async (e: any) => {
    setError("");

    try {
      await forgotPassword(e.email);
      toast({
        description: `Code sent to ${e.email}`,
        status: "success",
        position: "top-right",
        duration: 2000,
        onCloseComplete: () => {
          history(`/forgotPassword/?email=${e?.email}`);
          nextStep();
        },
      });
    } catch (error: any) {
      toast({
        description: error?.message ?? error,
        status: "error",
        position: "top-right",
      });
    }
  };

  const steps = [
    {
      component: (
        <>
          <p style={{ textAlign: "start", fontWeight: 550, fontSize: "32px" }}>
            Forgot Password
          </p>
          <p
            style={{
              color: "red",
              fontSize: "12px",
              width: "100%",
              maxWidth: "400px",
              textAlign: "center",
            }}
          >
            {error}
          </p>
          <ForgotPasswordForm onSubmit={onSubmit} />
        </>
      ),
    },
    {
      component: (
        <PassCode email={email} isEmailVerify={false} isForgotPassword={true} />
      ),
    },
  ];

  return (
    <AuthWrapper>
      <Box mb={"10%"}>
        <Flex
          gap={"5px"}
          w={"70px"}
          alignItems={"center"}
          onClick={() => (step === 0 ? history("/login") : setStep(0))}
          cursor={"pointer"}
        >
          <IoCaretBackCircle />
          <Text fontWeight={600}>Back</Text>
        </Flex>
      </Box>

      <CustomStepper step={step} steps={steps} />
    </AuthWrapper>
  );
};

export default ForgotPassword;
