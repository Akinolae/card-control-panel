/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from "axios";
import { getCookie } from "../utils/cookieUtils";

const client = axios.create({
  baseURL: "http://localhost:3001/",
  headers: {
    "content-type": "application/json",
  },
});

interface AxiosRequestParams extends AxiosRequestConfig {
  requestType?: "QUERY" | "MUTATION";
  hasAuth?: boolean;
}
/**
  A centralized api call function that serves as a boilerplate for all api calls regardless
  of the request method.
  It eases the need to add auth tokens everytime there is an authenticated request
  it basically serves as the entry point for api calls
  It mains a single source of truth
  
 * @params {
    ** hasAuth: Boolean { basically infers that the request is an authenticated request or not } **
    ** type: GET | POST {defaults to get when none is provided} **
    ** url: string {api endpoint} Endpoint to call **
    ** payload: JSON.stringify(Object) payload on request**
  }
*/

export const apiCallFunction = async (params: AxiosRequestParams) => {
  const { requestType, hasAuth } = params;
  let fn: any;

  if (!params || typeof params === "undefined")
    throw new Error("param is required for API calls");

  const authorization = hasAuth
    ? {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      }
    : {};

  const type = requestType ?? "MUTATION";

  switch (type) {
    case "MUTATION":
      fn = client.post;
      break;
    case "QUERY":
      fn = client.get;
      break;
    default:
      break;
  }

  /* 
      endpoint call doesn't accept a nullible | undefined value.
    */
  const res = await fn(
    ...["graphql", params?.data, authorization].filter(
      (value) => value !== undefined
    )
  );

  if (!!res.data.errors && !!res.data.errors.length) {
    throw new Error(res.data.errors[0].message);
  } else {
    return res.data;
  }
};
