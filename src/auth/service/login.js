import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Config } from "../../services/config";

const axiosInstance = axios.create();
const BASE_URL = Config?.base_url;

// export const getProfileMe = createAsyncThunk(
//   "profile/getProfileMe",
//   async (token) => {
//     const respon = await axiosInstance.get(`${profile}me/`, {
//       headers: { Authorization: token },
//     });
//     return respon?.data.results;
//   }
// );

export const Login = createAsyncThunk(
  "auth/Login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const payload = {
        username: username,
        password: password,
      };
      const respon = await axiosInstance.post(
        Config?.base_url_auth, // auth masih kube, belum dirubah ke production
        payload
      );
      return respon?.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);