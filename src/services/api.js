import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProfileMe = createAsyncThunk(
  "profile/getProfileMe",
  async (token) => {
    const respon = await axiosInstance.get(`${profile}me/`, {
      headers: { Authorization: token },
    });
    return respon?.data.results;
  }
);