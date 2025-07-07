import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Config } from "../../../services/config";

const axiosInstance = axios.create();
const BASE_URL = Config?.base_url;
const Cuti = BASE_URL + "cuti/";

export const getCutiPersonal = createAsyncThunk(
    "cuti/getCutiPersonal",
    async (token) => {
        const respon = await axiosInstance.get(`${Cuti}jenis-cuti`, {
            headers: { Authorization: token },
        });
        return respon?.data;
    }
);

export const getKuotaCuti = createAsyncThunk(
    "cuti/getKuotaCuti",
    async (token) => {
        const respon = await axiosInstance.get(`${Cuti}kuota-cuti`, {
            headers: { Authorization: token },
        });
        return respon?.data;
    }
);

export const getTanggalLibur = createAsyncThunk(
    "cuti/getTanggalLibur",
    async (token) => {
        const respon = await axiosInstance.get(
            `${Cuti}tanggal-libur?tanggal_mulai=2023-01-01&tanggal_akhir=&jenis_liburan=`,
            {
                headers: { Authorization: token },
            }
        );
        return respon?.data;
    }
);

export const getLiburKhusus = createAsyncThunk(
    "cuti/getLiburKhusus",
    async (token) => {
        const respon = await axiosInstance.get(
            `${Cuti}tanggal-libur?tanggal_mulai=2023-01-01&tanggal_akhir=&jenis_liburan=Private Holiday`,
            {
                headers: { Authorization: token },
            }
        );
        return respon?.data;
    }
);

export const getArsipCuti = createAsyncThunk(
    "cuti/getArsipCuti",
    async ({ token, variant, page }) => {
        const respon = await axiosInstance.get(
            `${Cuti}dokumen-cutiku/?status=${variant}&tanggal_pembuatan_dimulai=&tanggal_pembuatan_sampai=&page=&limit=${page}`,
            {
                headers: { Authorization: token },
            }
        );
        return respon?.data;
    }
);

export const getDetailArsipCuti = createAsyncThunk(
    "cuti/getDetailArsipCuti",
    async (data) => {
        try {
            console.log(data.id)
            const respon = await axiosInstance.get(
                `${Cuti}dokumen-detail/?id_dokumen=${data.id}`,
                {
                    headers: { Authorization: data.token },
                }
            );
            return respon?.data;
        } catch (error) {
            console.error("Error fetching detail arsip cuti:", error);
            throw error;
        }
    }
);

export const getFormCuti = createAsyncThunk(
    "cuti/getFormCuti",
    async (data) => {
        const respon = await axiosInstance.get(
            `${Cuti}form-cuti?id_jenis_cuti=${data.id}`,
            {
                headers: { Authorization: data.token },
            }
        );
        return respon?.data;
    }
);

export const getPilihApproval = createAsyncThunk(
    "cuti/getPilihApproval",
    async ({ token, type }) => {
        const respon = await axiosInstance.get(
            `${Cuti}pilih-approval?kata_kunci=&type=${type}`,
            {
                headers: { Authorization: token },
            }
        );
        return respon?.data;
    }
);

export const getPilihApprovalPejabat = createAsyncThunk(
    "cuti/getPilihApprovalPejabat",
    async ({ token, type }) => {
        const respon = await axiosInstance.get(
            `${Cuti}pilih-approval?kata_kunci=&type=${type}`,
            {
                headers: { Authorization: token },
            }
        );
        return respon?.data;
    }
);

export const getDokumenPersetujuan = createAsyncThunk(
    "cuti/getDokumenPersetujuan",
    async ({ token, status, page }) => {
        const respon = await axiosInstance.get(
            `${Cuti}dokumen-persetujuanku/?status=${status}&tanggal_pembuatan_dimulai=&tanggal_pembuatan_sampai=&page=&limit=${page}`,
            {
                headers: {
                    Authorization: token,
                },
            }
        );

        return respon?.data;
    }
);

export const postPengajuanCuti = createAsyncThunk(
    "cuti/postPengajuanCuti",
    async (data) => {
        const respon = await axiosInstance.post(
            `${Cuti}pengajuan-cuti/`,
            data.payload,
            {
                headers: { Authorization: data.token },
            }
        );
        return respon?.data;
    }
);

export const postPengajuanCutiDraft = createAsyncThunk(
    "cuti/postPengajuanCutiDraft",
    async (data) => {
        const respon = await axiosInstance.post(
            `${Cuti}simpan-draft/`,
            data.payload,
            {
                headers: { Authorization: data?.token },
            }
        );
        return respon?.data;
    }
);

export const postApproval = createAsyncThunk(
    "cuti/postApproval",
    async (data) => {
        const respon = await axiosInstance.post(
            `${Cuti}approval-cuti/`,
            data.payload,
            {
                headers: { Authorization: data.token },
            }
        );
        return respon?.data;
    }
);

export const postTanggalCuti = createAsyncThunk(
    "cuti/postTanggalCuti",
    async (data) => {
        const respon = await axiosInstance.post(
            `${Cuti}pilih-tanggal/`,
            data.payload,
            {
                headers: { Authorization: data.token },
            }
        );
        return respon?.data;
    }
);

export const postAttachmentCuti = createAsyncThunk(
    "cuti/postAttachmentCuti",
    async (data) => {
        let formData = new FormData();
        formData.append("file", {
            uri: data.result.uri,
            type: data.result.mimeType,
            name: data.result.name,
        });
        const respon = await axiosInstance.post(
            `${Cuti}unggah-berkas/`,
            formData,
            {
                headers: {
                    Authorization: data.token,
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return respon?.data;
    }
);

export const postPembatalanCuti = createAsyncThunk(
    "cuti/postPembatalanCuti",
    async (data) => {
        const respon = await axiosInstance.post(
            `${Cuti}pembatalan-cuti/`,
            data.payload,
            {
                headers: { Authorization: data.token },
            }
        );
        return respon?.data;
    }
);
