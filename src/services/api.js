// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { Config } from "../services/config";

// const BASE_URL = Config?.base_url;
// const profile = BASE_URL + "bridge/profile/";
// const axiosInstance = axios.create();


// export const getProfileMe = createAsyncThunk(
//   "account/getProfileMe",
//   async (token) => {
//     const respon = await axiosInstance.get(`${profile}me/`, {
//       headers: { Authorization: token },
//     });
//     return respon?.data.results;
//   }
// );

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as Sentry from "@sentry/react-native";
import { Config } from "../services/config";

const BASE_URL = Config?.base_url;
const profile = BASE_URL + "bridge/profile/";
const axiosInstance = axios.create();

export const getProfileMe = createAsyncThunk(
  "account/getProfileMe",
  async ({token}) => {
      const respon = await axiosInstance.get(`${profile}me/`, {
        headers: { Authorization: token },
      });
      return respon?.data?.results;
  }
);


