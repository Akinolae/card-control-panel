import {
  CognitoIdentityProviderClient,
  GetUserCommand,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const cognito = new CognitoIdentityProviderClient({
  apiVersion: "latest",
  region: import.meta.env.VITE_REGION,
  credentials: {
    accessKeyId: import.meta.env.ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.SECRETE_ACCESS_KEY,
  },
});

const getUserDetails = async (args: any) => {
  const { AccessToken } = args;
  const command = new GetUserCommand({ AccessToken });
  return await cognito.send(command);
};

const cognitoSignIn = async (args: any) => {
  const { email, password } = args;

  const command = new InitiateAuthCommand({
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: import.meta.env.VITE_clientId,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  });

  return await cognito.send(command);
};

const generateNewToken = async (args: any) => {
  const command = new InitiateAuthCommand({
    AuthFlow: "REFRESH_TOKEN_AUTH",
    ClientId: import.meta.env.VITE_clientId,
    AuthParameters: {
      REFRESH_TOKEN: args,
    },
  });

  return await cognito.send(command);
};

export { cognito, getUserDetails, cognitoSignIn, generateNewToken };
