/* eslint-disable @typescript-eslint/no-explicit-any */
import { storeCookie } from "../utils/cookieUtils";
import { signInWithGitHub, signInWithGoogle } from "./firebase";

export interface AuthUser {
  name: string | null;
  email: string | null;
  emailVerified: boolean;
  photoURL: string | null;
  isSignedIn: boolean;
}

const USER_STORAGE_KEY = "user";

const getUser = (): AuthUser | null => {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
};

const logOut = () => {
  localStorage.removeItem(USER_STORAGE_KEY);
};

const signIn = async (method: string): Promise<void> => {
  try {
    const res =
      method === "git" ? await signInWithGitHub() : await signInWithGoogle();
    const { stsTokenManager }: any = res;
    if (!res || !stsTokenManager)
      throw new Error("No token manager in response");

    const accessToken: string = stsTokenManager.accessToken;
    const { displayName, email, emailVerified, photoURL } = res;

    const user: AuthUser = {
      name: displayName ?? null,
      email: email ?? null,
      emailVerified: !!emailVerified,
      photoURL: photoURL ?? null,
      isSignedIn: true,
    };

    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    storeCookie(accessToken);
  } catch (error) {
    console.error("Sign-in failed:", error);
  }
};

export { getUser, logOut, signIn };
