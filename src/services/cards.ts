/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiCallFunction } from "./apiFunctionCall";

const getCards = async () => {
  try {
    const res = await apiCallFunction({
      hasAuth: true,
      url: "/get-cards",
      requestType: "QUERY",
    });

    return res.message;
  } catch (error: any) {
    throw error?.message;
  }
};

export { getCards };
