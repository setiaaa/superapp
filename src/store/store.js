import { configureStore } from "@reduxjs/toolkit";
import LoginAuth from "../auth/store/login";
import CutiReducer from "../apps/cuti/store/cuti";
import profileReducer from "./profile";
import AccountReducer from "./Account";
import PrepareAndSharing from "../apps/prepareandsharing/store/prepareandsharing";


export const store = configureStore({
  reducer: {
    login: LoginAuth,
    cuti: CutiReducer,
    account: AccountReducer,
    profile: profileReducer,
    prepareandsharing: PrepareAndSharing,
  },
});

