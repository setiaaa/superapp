import { configureStore } from "@reduxjs/toolkit";
import LoginAuth from "../auth/store/store";
import Cuti from "../apps/cuti/store";
import Account from "./Account";


export const store = configureStore({
  reducer: {
    login: LoginAuth,
    cuti: Cuti,
    account: Account,
  },
});

