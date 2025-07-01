import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Search } from "../../../../components/Search";
import CounterFilter from "../../../../components/CounterFilter";
import { useDispatch, useSelector } from "react-redux";
import {
    getDetailArsipCuti,
    getDokumenPersetujuan,
    postApproval,
} from "../../api";
import { getTokenValue } from "../../../../services/session";
// import { setStatus } from "../../store";

const DokumenPersetujuanTab = () => {
    const [token, setToken] = useState("");
    const [page, setPage] = useState(10);
    const dispatch = useDispatch();

    useEffect(() => {
        getTokenValue().then((val) => {
            setToken(val);
        });
    }, []);

    const [selected, setSelected] = useState("On Progress");
    // console.log(selected);

    useEffect(() => {
        if (token !== "") {
            dispatch(
                getDokumenPersetujuan({
                    token: token,
                    status: selected,
                    page: page,
                })
            );
        }
    }, [token, selected, page]);

    const filters = [
        {
            key: "on_progress",
            label: "Butuh Persetujuan",
            value: persetujuan?.lists?.badge?.on_progress,
            color: "#1868AB",
        },
        {
            key: "Completed",
            label: "Disetujui Anda",
            value: persetujuan?.lists?.badge?.completed,
            color: "#11C15B",
        },
        {
            key: "Rejected",
            label: "Tidak Disetujui Anda",
            value: persetujuan?.lists?.badge?.rejected,
            color: "#C34647",
        },
        {
            key: "Returned",
            label: "Dikembalikan Anda",
            value: persetujuan?.lists?.badge?.returned,
            color: "#F6AD1D",
        },
    ];

    const { persetujuan, loading, status, message } = useSelector(
        (state) => state.cuti
    );
    console.log(persetujuan?.lists);
    return (
        <View style={styles.container}>
            <Search
                placeholder="Cari"
                iconColor="#ccc"
                onSearch={(text) => console.log("Searching:", text)}
            />
            <View
                style={{
                    ...styles.filterContainer,
                }}
            >
                <CounterFilter
                    filters={filters}
                    selected={selected}
                    onSelect={setSelected}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
        padding: 20,
        gap: 12,
    },
    filterContainer: {
        backgroundColor: "white",
        padding: 2,
        borderRadius: 12,
    },
});
export default DokumenPersetujuanTab;
