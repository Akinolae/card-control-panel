import Cookies from "js-cookie";

interface StoreCookieOptions {
  REFRESH_INTERVAL: number;
}

const storeCookie = (token: string, options?: StoreCookieOptions) =>
  Cookies.set("accessToken", token, {
    expires: options?.REFRESH_INTERVAL,
    secure: true,
  });

const getCookie = (token: string) => Cookies.get(token);

export { storeCookie, getCookie };
