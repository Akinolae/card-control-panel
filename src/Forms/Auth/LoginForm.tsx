/* eslint-disable @typescript-eslint/no-explicit-any */
import { CutomButton } from "../../components/ui";

interface LoginFormProps {
  onSubmit: (e: any) => void;
}

const LoginForm = (props: LoginFormProps) => {
  const { onSubmit } = props;
  return (
    <CutomButton
      btnProps={{
        background: "red",
        marginTop: "25px",
        height: "40px",
        color: "white",
        fontWeight: 450,
        fontSize: "16px",
        width: "100%",
        type: "submit",
        onClick: (e: any) => onSubmit(e),
      }}
      text={"Login"}
    />
  );
};

export default LoginForm;
