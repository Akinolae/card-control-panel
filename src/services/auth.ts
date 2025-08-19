/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line no-useless-catch
import {
  REGISTER,
  CONFIRM_SIGNUP,
  CHANGE_PASSWORD,
  FORGOT_PASSWORD,
  LOGIN,
} from "./graphql/mutation";
import { appStore } from "./appstore";
import { apiCallFunction } from "./apiFunctionCall";
import { getSchoolConfig, getNewToken, fetchUserData } from "./graphql/query";
import {
  updateSignIn,
  updateUser,
  updateClasses,
  updateStudents,
  updateAdmins,
} from "./appstore/reducer/reducer";
import { createAdmin } from "./admin";
import { storeCookie } from "../utils/cookieUtils";

const store = appStore;

const isUserSignedIn = (): Boolean => {
  return store.getState().user.isSignedIn;
};

const intervals = {
  REFRESH_INTERVAL: 29 * 60 * 1000,
  FETCH_INTERVAL: 2 * 60 * 1000,
};

/*
  * fetches new token at intervals, tokens expire after 15 minutes.
  * users might still be logged in when token expires, this hinders them 
  * from performing key actions.
  * @params: {
    interval: number,
    intervals.REFRESH_INTERVAL
  }
*/

setInterval(async () => {
  isUserSignedIn() && (await fetchNewToken());
}, intervals.REFRESH_INTERVAL);

const storeAccessToken = (token: string) =>
  storeCookie(token, { REFRESH_INTERVAL: intervals.REFRESH_INTERVAL });

const fetchNewToken = async () => {
  const state: any = store.getState().user.payLoad;
  const { refreshToken } = state;

  try {
    const res = await apiCallFunction({
      data: {
        query: getNewToken,
        variables: {
          input: refreshToken,
        },
      },
    });

    storeAccessToken(res.data.getRefreshToken ?? "");
  } catch (error: any) {
    throw error?.message ?? error;
  }
};

/*
 * Prepares dashboard when a user successfully logs in.
 * Runs @function fetchClasses() and fetchStudents() onces
 * Only schoolOwners currently have the required permission to perform the above function
 * Cleans up data by appaending the logged in user role to existing user data
 * This function is meant to fetch data from the backend when the previously fetched data becomes obselete
 * Data expires at 2minutes
 */

const userSignin = async (args: any) => {
  try {
    const res = await apiCallFunction({
      data: {
        query: LOGIN,
        variables: {
          input: {
            ...args,
          },
        },
      },
    });

    const data = res.data.login;
    storeAccessToken(data?.token);

    delete data?.token;

    await Promise.allSettled([
      fetchUserDetails(),
      fetchSchoolConfig(),
      createAdmin({
        role: data?.role,
        user_id: data?.user_id,
      }),
    ]);

    store.dispatch(updateSignIn(true));
  } catch (error: any) {
    throw error?.message || error;
  }
};

const fetchUserDetails = async () => {
  const response = await apiCallFunction({
    hasAuth: true,
    data: {
      query: fetchUserData,
    },
  });

  const data = response.data.fetchUserDetails;

  store.dispatch(updateUser(data));
};

const register = async (payload: any) => {
  try {
    const res = await apiCallFunction({
      data: {
        query: REGISTER,
        variables: {
          createUserInput: {
            ...payload,
          },
        },
      },
    });

    return res;
  } catch (error: any) {
    throw error;
  }
};

const forgotPassword = async (email: string) => {
  await apiCallFunction({
    data: {
      query: FORGOT_PASSWORD,
      variables: {
        email,
      },
    },
  });
};

const confirmSignUp = async (params: any) => {
  const { code, email, password } = params;
  try {
    await apiCallFunction({
      data: {
        query: CONFIRM_SIGNUP,
        variables: {
          email,
          code,
        },
      },
    });
  } catch (error) {
    throw error;
  }
  await userSignin({ email, password });
};

const forgotPasswordChange = async (args: any) => {
  const { email, password, code } = args;
  await apiCallFunction({
    data: {
      query: CHANGE_PASSWORD,
      variables: {
        email,
        code,
        password,
      },
    },
  });

  await userSignin({ email, password });
};

const fetchSchoolConfig = async () => {
  const response = await apiCallFunction({
    hasAuth: true,
    data: {
      query: getSchoolConfig,
    },
  });

  const cleanedStudentData: any = {};

  const { students, classes, admins } = response.data.getSchoolConfig;

  if (Array.isArray(students)) {
    students.forEach((data: any) => {
      cleanedStudentData[data?.class_id] = students.filter(
        (studentData) => studentData.class_id === data.class_id
      );
    });
  }

  await Promise.allSettled([
    store.dispatch(updateStudents(cleanedStudentData)),
    store.dispatch(updateClasses(classes)),
    store.dispatch(updateAdmins(admins)),
  ]);

  return response.data.getSchoolConfig;
};

export {
  register,
  userSignin,
  isUserSignedIn,
  forgotPassword,
  confirmSignUp,
  forgotPasswordChange,
  fetchSchoolConfig,
};
