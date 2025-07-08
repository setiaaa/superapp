import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getTokenValue } from "../../../../services/session";

const TambahDokumen = ({ route }) => {
    const item = route.params || {};
    const navigation = useNavigation();
    useEffect(() => {
        getTokenValue().then((val) => {
            setToken(val);
        });
        dispatch(setAttachments([]));
    }, []);
    useEffect(() => {
        if (item?.type === "draft" || item?.type === "edit") {
            setJudulKegiatan(item?.data?.title);
            setTanggal(
                moment(item?.data?.attributes?.tanggal, "YYYY-MM-DD HH:mm:ss")
                    .locale("id")
                    .format("YYYY-MM-DD")
            );
            setTempatAcara(item?.data?.attributes?.tempat);
            setCatatan(item?.data?.attributes?.deskripsi);

            const pilihanAnggotaGrup = item?.data?.objid_members.map(
                (member, index) => ({
                    id: item?.data?.attributes?.id_addressbook?.[index],
                    code: member?.objidposisi,
                    title: member?.title,
                    name: member?.name,
                    objidposisi: member?.objidposisi,
                    officer: {
                        official: member?.name,
                    },
                })
            );
            setPilihanAnggotaGrup(pilihanAnggotaGrup);

            // const pilihanPeninjauGrup = item?.data?.reviewers.map(
            //   (member, index) => ({
            //     id: item?.data?.attributes?.id_addressbook?.[index],
            //     code: member?.objidposisi,
            //     title: member?.title,
            //     name: member?.name,
            //     objidposisi: member?.objidposisi,
            //     officer: {
            //       official: member?.name,
            //     },
            //   })
            // );

            setPilihanPeninjauGrup(
                item?.data?.reviewers === null ? [] : item?.data?.reviewers
            );
        }
        if (item?.type === "draft") {
            let typeDoc = [];
            item?.data?.attachments.map((item) => {
                let tipe = item?.files.split("/");
                tipe = tipe[tipe?.length - 1];
                tipe = tipe.split(".");
                tipe = tipe[tipe?.length - 1];
                typeDoc.push(tipe);
            });
            setType(typeDoc);
            setDocument(item?.data.attachments);
            setPayloadDocument(item?.data.attachments);
        }
    }, [item]);
};
