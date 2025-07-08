import { configureStore } from "@reduxjs/toolkit";
import LoginAuth from "../auth/store/login";
import CutiReducer from "../apps/cuti/store/cuti";
import profileReducer from "./profile";
import AccountReducer from "./Account";
import PrepareAndSharing from "../apps/prepareandsharing/store/prepareandsharing";
import Apps from "./Apps";
import AddressbookKKP from "./AddressbookKKP";


export const store = configureStore({
  reducer: {
    apps: Apps,
    login: LoginAuth,
    cuti: CutiReducer,
    account: AccountReducer,
    profile: profileReducer,
    prepareandsharing: PrepareAndSharing,
    addressBookKKP: AddressbookKKP,
  },
});

