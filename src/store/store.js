import { configureStore } from "@reduxjs/toolkit";
import LoginAuth from "../auth/store/store";
import Cuti from "../apps/cuti/store";
import profileReducer from "./profile";
import AccountReducer from "./Account";


export const store = configureStore({
  reducer: {
    login: LoginAuth,
    cuti: Cuti,
    account: AccountReducer,
    profile: profileReducer,
  },
});

