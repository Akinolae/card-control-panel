import { getUserDetails } from "../lib/cognito";
import { storeCookie } from "../utils/cookieUtils";

const getValueFromAttributes = (attributes: any, params: string) => {
  return attributes.find((user: any) => user.Name === params).Value;
};

const prepareSignedInData = async (params: any) => {
  let user;

  if (params?.AuthenticationResult.AccessToken) {
    user = (
      await getUserDetails({
        AccessToken: params?.AuthenticationResult.AccessToken,
      })
    ).UserAttributes;
  } else {
    user = JSON.parse(params?.ChallengeParameters.userAttributes);
  }

  if (Array.isArray(user)) {
    user = {
      name: getValueFromAttributes(user, "name"),
      user_id: getValueFromAttributes(user, "sub"),
      email: getValueFromAttributes(user, "email"),
      gender: getValueFromAttributes(user, "gender"),
      address: getValueFromAttributes(user, "address"),
      role: getValueFromAttributes(user, "custom:role"),
      createdAt: getValueFromAttributes(user, "updated_at"),
      middleName: getValueFromAttributes(user, "middle_name"),
      refreshToken: params?.AuthenticationResult.RefreshToken,
      phone_number: getValueFromAttributes(user, "phone_number"),
      school_id: getValueFromAttributes(user, "custom:school_id"),
      school_name: getValueFromAttributes(user, "custom:school_name"),
      school_size: +getValueFromAttributes(user, "custom:school_size"),
      verified: Boolean(getValueFromAttributes(user, "email_verified")),
    };
    storeCookie(params?.AuthenticationResult.AccessToken, {
      REFRESH_INTERVAL: 5 * 60 * 1000,
    });
  } else {
    user = {
      school_id: user["custom:school_id"],
      verified: Boolean(user.email_verified),
      phone_number: user.phone_number,
      createdAt: user.updated_at,
      school_name: user["custom:school_name"],
      address: user.address,
      school_size: user["custom:school_size"],
    };
  }

  return user;
};

const geUserData = (data: any) => {
  return {
    email: data.email,
    school_id: data.school_id,
    school_name: data.school_name,
    user_id: data.user_id,
    school_size: data.school_size,
    role: data.role,
  };
};

export { prepareSignedInData, geUserData };
