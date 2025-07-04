import React, { useState, useEffect, use } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Search } from "../../../../../components/Search";
import CounterFilter from "../../../../../components/CounterFilter";
import { useDispatch, useSelector } from "react-redux";
import {
    getDetailArsipCuti,
    getDokumenPersetujuan,
    postApproval,
} from "../../../api";
import { getTokenValue } from "../../../../../services/session";
import { FlatList } from "react-native-gesture-handler";
import CardList from "../../../components/CardList";
// import { setStatus } from "../../store";

const DokumenPersetujuanTab = () => {
    const [token, setToken] = useState("");
    const [page, setPage] = useState(10);
    const dispatch = useDispatch();
    const [listData, setListData] = useState(null);
    const [search, setSearch] = useState("");
    

    useEffect(() => {
        getTokenValue().then((val) => {
            setToken(val);
        });
    }, []);

    const [selected, setSelected] = useState("On Progress");

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

    const { persetujuan, loading, status, message } = useSelector(
        (state) => state.cuti
    );

    const filter = (event) => {
        setSearch(event);
    };

    useEffect(() => {
        if (
            persetujuan?.lists?.data !== null &&
            persetujuan?.lists?.data?.length > 0
        ) {
            if (selected.key === "On Progress") {
                setListData(
                    persetujuan?.lists?.data.filter(
                        (item) => item.status === selected
                    )
                );
            } else if (selected.key === "Completed") {
                setListData(
                    persetujuan?.lists?.data.filter(
                        (item) => item.status === selected
                    )
                );
            } else if (selected.key === "Rejected") {
                setListData(
                    persetujuan?.lists?.data.filter(
                        (item) => item.status === selected
                    )
                );
            } else if (selected.key === "Returned") {
                setListData(
                    persetujuan?.lists?.data.filter(
                        (item) => item.status === selected
                    )
                );
            } else {
                setListData(persetujuan?.lists?.data);
            }
        }
    }, [selected, persetujuan]);

    useEffect(() => {
        if (search !== "") {
            const data = listData.filter((item) => {
                return item.jenis_cuti
                    .toLowerCase()
                    .includes(search.toLowerCase());
            });
            setListData(data);
        } else {
            setListData(persetujuan.lists?.data);
        }
    }, [search]);

    useEffect(() => {
        if (search !== "") {
            const searchData = listData.filter((item) => {
                return item.jenis_cuti
                    .toLowerCase()
                    .includes(search.toLowerCase());
            });
            setListData(searchData);
        } else {
            setListData(persetujuan?.lists?.data);
        }
    }, [persetujuan, search]);

    const renderItem = ({ item }) => <CardList item={item} token={token} />;
    
    const filters = [
        {
            key: "On Progress",
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

    return (
        <View style={styles.container}>
            <Search placeholder="Cari" iconColor="#ccc" onSearch={filter} />
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
                {console.log(token)}
            <View style={styles.list}>
                <FlatList
                    data={listData !== null ? listData : []}
                    renderItem={renderItem}
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
    list: {
        height: "57%",
        // paddingBottom: ,
        // height: "100%",
        // gap: 12,
        // flex: 1,
        // marginTop: 12,
        // paddingHorizontal: 8,
    },
});
export default DokumenPersetujuanTab;
