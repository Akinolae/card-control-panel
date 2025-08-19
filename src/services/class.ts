/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiCallFunction } from "./apiFunctionCall";
import { CREATE_CLASS } from "./graphql/mutation";
import { fetchSchoolConfig } from "./auth";

const createClass = async (className: string) => {
  try {
    await apiCallFunction({
      hasAuth: true,
      data: {
        query: CREATE_CLASS,
        variables: { createClass: className },
      },
    });

    await fetchSchoolConfig();
  } catch (error: any) {
    throw error?.message;
  }
};

export { createClass };
