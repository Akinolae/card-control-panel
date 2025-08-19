/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorComponent } from "../../components/ui/CustomInput";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  confirmSignUp,
  forgotPassword,
  forgotPasswordChange,
} from "../../services/auth";
import { CutomButton, PinInputComponent } from "../../components/ui";
import { Box, Text, useToast } from "@chakra-ui/react";
import { useCountDown } from "../../hooks/useCountDown";
import PasswordResetForm from "../../Forms/Auth/PasswordResetForm";

interface passCodeProps {
  isEmailVerify: boolean;
  email: string | null;
  isForgotPassword?: boolean;
  password?: string;
}

const PassCode = (props: passCodeProps) => {
  const { isEmailVerify, email, isForgotPassword, password } = props;
  const toast = useToast({
    position: "top-right",
    duration: 3000,
  });

  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setLoading] = useState<boolean>(false);

  const [duration, setDuration] = useCountDown({ duration: 60 });
  const navigate = useNavigate();

  const onSubmit = async (e: any) => {
    setLoading(true);
    setError("");
    try {
      if (!isEmailVerify) {
        await forgotPasswordChange({
          code,
          email,
          password: e?.password,
        });
      } else {
        await confirmSignUp({ code, email, password });
      }

      toast({
        description: `Account verified successfully`,
        status: "success",
        position: "top-right",
        duration: 2000,
        onCloseComplete: () => {
          !isEmailVerify ? navigate("/login") : navigate("/dashboard/");
        },
      });

      !isEmailVerify ? navigate("/login") : navigate("/dashboard/");
    } catch (error: any) {
      toast({
        description: error.message,
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    try {
      if (email) {
        await forgotPassword(email);
      } else {
        throw new Error("Email is required");
      }
      setDuration(60);
      toast({
        description: `Code sent to ${email}`,
        status: "success",
        position: "top-right",
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const passwordResetMode = isForgotPassword && code.length === 6;
  const messageBody = isForgotPassword
    ? {
        title: "Enter verification code",
        message: "Enter the code sent to your email to reset your password",
      }
    : {
        title: "Verify email address",
        message: "Enter the code sent to your email to verify your account",
      };
  return (
    <Box className="form">
      {!isEmailVerify ? (
        <Box>
          <Text
            style={{
              textAlign: "start",
              fontWeight: 550,
              fontSize: "32px",
              color: "#4F4E4E",
            }}
          >
            {messageBody.title}
          </Text>
          <Text fontSize={"14px"} color={"#BDC0C3"} mb={"10%"}>
            {messageBody.message}
          </Text>
        </Box>
      ) : null}
      <ErrorComponent>{error}</ErrorComponent>
      {passwordResetMode ? (
        <PasswordResetForm onSubmit={onSubmit} />
      ) : (
        <>
          <PinInputComponent
            onChange={(e: string) => setCode(e)}
            type="number"
            length={6}
          />
          <CutomButton
            btnProps={{
              background: "red",
              marginTop: "25px",
              height: "40px",
              color: "white",
              fontWeight: 450,
              fontSize: "14px",
              type: "submit",
              onClick: onSubmit,
            }}
            text={"submit"}
            isLoading={isSubmitting}
          />
        </>
      )}

      {passwordResetMode ? null : (
        <Box
          mt={"2%"}
          display={"flex"}
          placeContent={"center"}
          placeItems={"center"}
        >
          {duration <= 0 ? (
            <CutomButton
              text=" Resend code"
              btnProps={{
                onClick: resend,
              }}
            />
          ) : (
            <p
              style={{ fontWeight: 500, fontSize: "12px", color: "#4F4E4E" }}
            >{`retry in ${duration} seconds`}</p>
          )}
        </Box>
      )}
    </Box>
  );
};

export default PassCode;
