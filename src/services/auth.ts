/* eslint-disable @typescript-eslint/no-explicit-any */
import { storeCookie } from "../utils/cookieUtils";
import { signInWithGitHub, signInWithGoogle } from "./firebase";

const USER_STORAGE_KEY = "user";
export type AuthProvider = "google" | "github";
export interface AuthUser {
  name: string | null;
  email: string | null;
  emailVerified: boolean;
  photoURL: string | null;
  isSignedIn: boolean;
  provider: string | null;
}

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

const extractAuthUser = (rawUser: any): AuthUser => ({
  name: rawUser.displayName ?? null,
  email: rawUser.email ?? null,
  emailVerified: !!rawUser.emailVerified,
  photoURL: rawUser.photoURL ?? null,
  isSignedIn: true,
  provider: rawUser.provider ?? null,
});

const signIn = async (
  provider: AuthProvider,
  options?: { cookieRefreshInterval?: number }
): Promise<AuthUser | null> => {
  try {
    let firebaseUser: any;
    switch (provider) {
      case "github":
        firebaseUser = await signInWithGitHub();
        break;
      case "google":
      default:
        firebaseUser = await signInWithGoogle();
        break;
    }

    if (!firebaseUser?.stsTokenManager?.accessToken) {
      throw new Error(
        "Token manager/access token missing from sign-in response"
      );
    }

    const accessToken = firebaseUser.stsTokenManager.accessToken;
    const user = extractAuthUser({ ...firebaseUser, provider });

    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    storeCookie(
      accessToken,
      options?.cookieRefreshInterval
        ? { REFRESH_INTERVAL: options.cookieRefreshInterval }
        : undefined
    );

    return user;
  } catch (error) {
    console.error("Sign-in failed:", error);
    return null;
  }
};

export { getUser, logOut, signIn };
