import { createSlice } from "@reduxjs/toolkit";
import { getProfileMe } from "../services/api";
import * as Sentry from "@sentry/react-native";

const AccountSlice = createSlice({
    name: "Account",
    initialState: {
        profile: {},
        loading: false,
    },
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload;
        },
        // setLoading: (state, action) => {
        //     state.loading = action.payload;
        // },
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
                // state.loading = true;
            })
            .addCase(getProfileMe.fulfilled, (state, action) => {
                // state.loading = false;
                if (action.payload.roles_coofis) {
                    roles_access = action.payload.roles_coofis.map((item) => {
                        return item.state;
                    });
                }
                state.profile = {
                    ...action.payload,
                    roles_coofis,
                };
                state.isBypass = action.payload.is_bypass;
            })
            .addCase(getProfileMe.rejected, (state, action) => {
                // state.loading = false;
                state.handleError = true;
                Sentry.captureException(action.error);
            });
    },
});

export const { setProfile, setHandleError, setIsBypass } = AccountSlice.actions;

export default AccountSlice.reducer;
