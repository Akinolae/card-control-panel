/* eslint-disable @typescript-eslint/no-explicit-any */

import { storeCookie } from "../utils/cookieUtils";
import { signInWithGoogle } from "./firebase";

const getUser = () => JSON.parse(localStorage.getItem("user") ?? "");
const logOut = () => localStorage.clear();
const signIn = async () => {
  const res = await signInWithGoogle();
  const { stsTokenManager }: any = res;
  const { accessToken }: { accessToken: string; refreshToken: string } =
    stsTokenManager;
  const { displayName, email, emailVerified, photoURL } = res;

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
};

export { getUser, logOut, signIn };
