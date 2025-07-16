import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Config } from "../../../services/config";

const BASE_URL = Config?.base_url;
const repository = BASE_URL + "repository/";
const axiosInstance = axios.create();

export const getDocument = createAsyncThunk(
    "prepareandsharing/getDocument",
    async ({ token, page, type, tipe }) => {
        if (tipe === "revision" || tipe === "review") {
            const respon = await axiosInstance.get(
                `${repository}my-documents/?limit=${page}&published=${type}&public=false&tipe=${tipe}`,
                {
                    headers: { Authorization: token },
                }
            );
            return respon?.data.result;
        } else {
            const respon = await axiosInstance.get(
                `${repository}my-documents/?limit=${page}&published=${type}&public=false`,
                {
                    headers: { Authorization: token },
                }
            );
            return respon?.data.result;
        }
    }
);

export const getDivisionFilter = createAsyncThunk(
    "prepareandsharing/getDivisionFilter",
    async ({ token }) => {
        const respon = await axiosInstance.get(
            `${BASE_URL}bridge/master/division/`,
            {
                headers: { Authorization: token },
            }
        );
        return respon?.data.results;
    }
);

export const getSubDivisionFilter = createAsyncThunk(
    "prepareandsharing/getSubDivisionFilter",
    async ({ token, id }) => {
        const respon = await axiosInstance.get(
            `${BASE_URL}bridge/master/department-div/${id}/`,
            {
                headers: { Authorization: token },
            }
        );
        return respon?.data.results;
    }
);

export const getDocumentDibagikan = createAsyncThunk(
    "prepareandsharing/getDocumentDibagikan",
    async ({ token, page, tipe }) => {
        console.log("Fetching shared documents with type:", tipe);
        try {
            const respon = await axiosInstance.get(
                `${repository}shared-documents/?limit=${page}&tipe=${tipe}`,
                {
                    headers: { Authorization: token },
                }
            );
            return respon?.data.result;
        } catch (error) {
            console.error("Error fetching shared documents:", error);
            throw error;
        }
    }
);

export const getDocumentTamplate = createAsyncThunk(
    "prepareandsharing/getDocumentTamplate",
    async ({ token, page, general, by_title, unker, satker }) => {
        const respon = await axiosInstance.get(
            `${repository}my-documents/?limit=${page}&published=true&public=true&general=${general}&by_title=${by_title}&unker=${unker}&satker${satker}=`,
            {
                headers: { Authorization: token },
            }
        );
        return respon?.data.result;
    }
);

export const getDetailDocument = createAsyncThunk(
    "prepareandsharing/getDetailDocument",
    async ({ token, id }) => {
        const respon = await axiosInstance.get(
            `${repository}${id}/document-detail/`,
            {
                headers: { Authorization: token },
            }
        );
        return respon?.data.result;
    }
);

export const postCommentRepo = createAsyncThunk(
    "prepareandsharing/document-comment",
    async (data, setRefresh = undefined) => {
        const respon = await axiosInstance.post(
            `${repository}/document-comment/`,
            data.payload,
            { headers: { Authorization: data.token } }
        );
        return respon?.data;
    }
);

export const getDownloadLampiran = createAsyncThunk(
    "attachment/download",
    async ({ token, id }) => {
        const respon = await axiosInstance.get(
            `${attachmentExport}${id}/download`,
            {
                headers: { Authorization: token },
            }
        );
        return respon?.data;
    }
);

export const postRating = createAsyncThunk(
    "prepareandsharing/postRating",
    async (data) => {
        const respon = await axiosInstance.put(
            `${repository}${data.id}/rate/`,
            data.payload,
            { headers: { Authorization: data.token } }
        );
        return respon?.data;
    }
);

export const postAttachmentRepo = createAsyncThunk(
    "prepareandsharing/postAttachmentRepo",
    async (data) => {
        try {
            const formData = new FormData();
            formData.append("files", {
                uri: data.result.uri,
                type: data.result.mimeType,
                name: data.result.name,
            });

            const respon = await axiosInstance.post(
                `${repository}attachment/`,
                formData,
                {
                    headers: {
                        Authorization: data.token,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            return respon?.data.result;
        } catch (error) {
            console.error("Error uploading file:", error);
            throw new Error("Gagal mengunggah file. Silakan coba lagi.");
        }
    }
);

export const postBerbagiDokumen = createAsyncThunk(
    "prepareandsharing/postBerbagiDokumen",
    async (data) => {
        try {
            const respon = await axiosInstance.post(
                `${repository}document-share/`,
                data.result,
                {
                    headers: { Authorization: data.token },
                }
            );
            return respon?.data.result;
        } catch (error) {
            console.error("Error sharing document:", error);
            throw new Error("Gagal membagikan dokumen. Silakan coba lagi.");
        }
    }
);

export const putBerbagiDokumen = createAsyncThunk(
    "prepareandsharing/putBerbagiDokumen",
    async (data) => {
        const respon = await axiosInstance.put(
            `${repository}${data.id}/document-edit/`,
            data.result,
            {
                headers: { Authorization: data.token },
            }
        );
        return respon?.data.result;
    }
);

export const putUpdateState = createAsyncThunk(
    "prepareandsharing/putUpdateState",
    async (data) => {
        const respon = await axiosInstance.put(
            `${repository}${data.id}/update-state/`,
            data.payload,
            {
                headers: { Authorization: data.token },
            }
        );
        return respon?.data.result;
    }
);

export const deleteBerbagiDokumen = createAsyncThunk(
    "prepareandsharing/deleteBerbagiDokumen",
    async (data) => {
        const respon = await axiosInstance.delete(
            `${repository}${data.id}}/document-delete/`,
            {
                headers: { Authorization: data.token },
            }
        );
        return respon?.data.result;
    }
);

export const postDokumenTamplate = createAsyncThunk(
    "prepareandsharing/postDokumenTamplate",
    async (data) => {
        const respon = await axiosInstance.post(
            `${repository}document-share/`,
            data.result,
            {
                headers: { Authorization: data.token },
            }
        );
        return respon?.data.result;
    }
);

export const putDokumenTamplate = createAsyncThunk(
    "prepareandsharing/putDokumenTamplate",
    async (data) => {
        const respon = await axiosInstance.put(
            `${repository}${data.id}/document-edit/`,
            data.result,
            {
                headers: { Authorization: data.token },
            }
        );
        return respon?.data.result;
    }
);
