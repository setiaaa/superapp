import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import AppHeader from "../../components/Header";

import BottomTabNavigator from "../../../../components/BottomTabNavigator";
import DibagikanTab from "./DokumenDetailTab/DibagikanTab";
import LampiranTab from "./DokumenDetailTab/LampiranTab";
import KomentarTab from "./DokumenDetailTab/KomentarTab";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const tabs = [
    { name: "Dibagikan", icon: "information-outline", component: DibagikanTab },
    { name: "Lampiran", icon: "attachment", component: LampiranTab },
    { name: "Komentar", icon: "comment-outline", component: KomentarTab },
];

const DokumenDetail = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { tipe, tab } = route.params || {};

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Detail Dokumen", // ✔️ judul tampil dari sini
            showBack: true, // opsional
        });
    }, [navigation]);

    // Jika published atau review → tampilkan Tab
    if (tipe === "Published" || tipe === "review") {
        if( tab === "TinjauanTab") {
            return <DibagikanTab />; // sudah include tombol ubah
        }
        return <BottomTabNavigator tabs={tabs} />;
    }

    // Jika revisi → tampilkan detail dengan tombol edit
    if (tipe === "revision") {
        return <DibagikanTab />; // sudah include tombol ubah
    }

    if (tipe === "done") {
        return <BottomTabNavigator tabs={tabs} />; // tampilkan tab untuk dokumen yang sudah selesai
    }

    // Jika draft, seharusnya tidak sampai sini karena diarahkan ke BerbagiDokumen
    return null;
};

export default DokumenDetail;
