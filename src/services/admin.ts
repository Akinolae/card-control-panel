/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiCallFunction } from "./apiFunctionCall";
import { ADD_ADMIN } from "./graphql/mutation";
import { appStore } from "./appstore";
import { fetchSchoolConfig } from "./auth";

const store = appStore;

const createAdmin = async (params: any) => {
  const { admins }: any = store.getState().user;
  const isUserAdmin = admins.some((admin: any) =>
    new RegExp(admin.user_id).test(params.user_id)
  );

  if (isUserAdmin) {
    return;
  } else {
    await apiCallFunction({
      hasAuth: true,
      data: {
        query: ADD_ADMIN,
        variables: {
          role: params.role,
          user_id: params.user_id,
        },
      },
    });

    await fetchSchoolConfig();
  }
};

export { createAdmin };
