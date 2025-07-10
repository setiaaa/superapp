import { createSlice } from "@reduxjs/toolkit";
import { getProfileMe } from "../services/api";
const AccountSlice = createSlice({
  name: "account",
  initialState: {
    profile: {},
    loading: false,
    responReset: {},
    isBypass: false,
    handleError: false,
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setHandleError: (state, action) => {
      state.handleError = action.payload;
    },
    setIsBypass: (state, action) => {
      state.isBypass = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileMe.pending, (state) => {
      })
      .addCase(getProfileMe.fulfilled, (state, action) => {
        let roles_access = [];
        if (action.payload.roles_coofis) {
          roles_access = action.payload.roles_coofis.map((item) => item.state);
        }

        state.profile = {
          ...action.payload,
          roles_coofis: roles_access,
        };
        state.isBypass = action.payload.is_bypass;
      })
      .addCase(getProfileMe.rejected, (state, action) => {
        state.handleError = true;
        Sentry.captureException(action.error);
      });
  },
});

export const { setProfile, setHandleError, setIsBypass } = AccountSlice.actions;
export default AccountSlice.reducer;