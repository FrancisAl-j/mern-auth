import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null, // Changed from false to null for better error handling
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    // Reducer for sign in
    signInStart: (state) => {
      state.loading = true;
      state.error = null; // Reset error on new sign-in attempt
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = {
        message: action.payload.message,
        code: action.payload.code,
        status: action.payload.response ? action.payload.response.status : null,
      };
    },
    // Reducer for updating profile
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = {
        message: action.payload.message,
        code: action.payload.code,
        status: action.payload.response ? action.payload.response.status : null,
      };
    },
    // Reducer for deleting an user/account
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = {
        message: action.payload.message,
        code: action.payload.code,
        status: action.payload.response ? action.payload.response.status : null,
      };
    },

    // For signing out
    signout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signout,
} = userSlice.actions;
export default userSlice.reducer;
