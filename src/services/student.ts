/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiCallFunction } from "./apiFunctionCall";
import { createStudents } from "./graphql/mutation";
import { fetchSchoolConfig } from "./auth";

const addStudent = async (params: any) => {
  const { class_id, student } = params;
  try {
    await apiCallFunction({
      hasAuth: true,
      data: {
        query: createStudents,
        variables: {
          studentInput: { class_id, students: [student] },
        },
      },
    });

    await fetchSchoolConfig();
  } catch (error: any) {
    throw error.message;
  }
};

export { addStudent };
