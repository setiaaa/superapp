import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Config } from "./config";

const BASE_URL = Config?.base_url;
const addressbook = BASE_URL + "bridge/";

const axiosInstance = axios.create();

export const getDivision = createAsyncThunk(
    "calendar/getDivision",
    async (token) => {
        const respon = await axiosInstance.get(
            `${addressbook}addressbook/division/`,
            {
                headers: { Authorization: token },
            }
        );
        return respon?.data.results;
    }
);
export const getEmployee = createAsyncThunk(
    "calendar/getEmployee",
    async ({ token, search }) => {
        if (search === "") {
            const respon = await axiosInstance.get(
                `${addressbook}addressbook/employee/`,
                {
                    headers: { Authorization: token },
                }
            );
            return respon?.data.results;
        } else {
            const respon = await axiosInstance.get(
                `${addressbook}addressbook/employee/?search=${search}`,
                {
                    headers: { Authorization: token },
                }
            );
            return respon?.data.results;
        }
    }
);

export const getDivisionTree = createAsyncThunk(
    "calendar/getDivisionTree",
    async ({ token, id }) => {
        const respon = await axiosInstance.get(
            `${addressbook}addressbook/tree/${id}/`,
            {
                headers: { Authorization: token },
            }
        );
        return respon?.data.results;
    }
);
