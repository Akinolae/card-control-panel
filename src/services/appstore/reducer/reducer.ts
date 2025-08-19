import intState from "../initialState";
import { createSlice } from "@reduxjs/toolkit";

const reducers = createSlice({
  name: "user",
  initialState: intState,
  reducers: {
    updateUser: (state, data) => {
      state.payLoad = data.payload;
    },
    updateSignIn: (state, data) => {
      state.isSignedIn = data.payload;
    },
    updateClasses: (state, data) => {
      state.classes = data.payload;
    },
    updateStudents: (state, data) => {
      state.students = data.payload;
    },
    updateAdmins: (state, data) => {
      state.admins = data.payload;
    },
    resetState: () => {
      return intState;
    },
  },
});

export const {
  updateUser,
  resetState,
  updateSignIn,
  updateClasses,
  updateStudents,
  updateAdmins,
} = reducers.actions;
export default reducers.reducer;
