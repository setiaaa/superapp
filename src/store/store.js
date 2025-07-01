import { configureStore } from "@reduxjs/toolkit";
import LoginAuth from "./LoginAuth";
import Cuti from "../apps/cuti/store";

export const store = configureStore({
  reducer: {
    login: LoginAuth,
    cuti: Cuti
  },
});
