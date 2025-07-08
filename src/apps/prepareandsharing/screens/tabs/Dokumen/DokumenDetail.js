import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { getTokenValue } from "../../../../../services/session";
import {
    deleteBerbagiDokumen,
    postRating,
} from "../../../service/prepareandsharing";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment/min/moment-with-locales";
import { Divider } from "react-native-paper";
import { Rating } from "react-native-ratings";
import CustomButton from "../../../../../components/CustomButton";
import Header from "../../../../../components/Header";
import { useNavigation } from "@react-navigation/native";

const DokumenDetail = () => {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Detail Dokumen", // ✔️ judul tampil dari sini
            showBack: true, // opsional
        });
    }, [navigation]);

    const { dokumen, loading, rating, edit, status } = useSelector(
        (state) => state.prepareandsharing
    );
    const comment = dokumen.comments;
    const detail = dokumen.detail;
    const [token, setToken] = useState("");
    const [ratings, setRatings] = useState();
    const dispatch = useDispatch();
    useEffect(() => {
        getTokenValue().then((val) => {
            setToken(val);
        });
    }, []);

    useEffect(() => {
        const payload = {
            rating: ratings,
        };
        const data = {
            id: detail.id,
            token: token,
            payload: payload,
        };

        if (ratings !== undefined) {
            dispatch(postRating(data));
        }
    }, [dokumen, ratings]);

    const handelDelete = () => {
        const data = {
            token: token,
            id: detail.id,
        };
        dispatch(deleteBerbagiDokumen(data));
    };
    return (
        <View
            style={{
                ...styles.container,
            }}
        >
            <View style={{ flex: 1 }}>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>{detail?.title}</Text>
                    <View
                        style={{
                            ...styles.creator,
                        }}
                    >
                        <Image
                            style={{ ...styles.image }}
                            source={{ uri: detail.creator_avatar }}
                        />
                        <View>
                            <Text>{detail?.unit_kerja}</Text>
                            <Text>{detail?.creator}</Text>
                        </View>
                    </View>
                    <View style={styles.timelocation}>
                        <MaterialCommunityIcons name="google-maps" size="24" />
                        <Text>{detail?.attributes?.tempat} |</Text>
                        <Text>
                            {moment(detail?.attributes?.tanggal)
                                .locale("id")
                                .format("DD MMMM YYYY")}
                        </Text>
                    </View>
                    <View style={styles.note}>
                        <Text>Catatan:</Text>
                        <Text>{detail?.attributes?.catatan}</Text>
                    </View>
                    <Divider bold />
                    {rating === true ? (
                        <View>
                            {detail.logged_in_user_avatar ===
                            detail.creator_avatar ? (
                                <Rating
                                    key={token}
                                    onFinishRating={(value) =>
                                        setRatings(value)
                                    }
                                    fractions={2}
                                    startingValue={detail.my_rating}
                                    readonly
                                />
                            ) : (
                                <Rating
                                    key={token}
                                    onFinishRating={(value) =>
                                        setRatings(value)
                                    }
                                    fractions={2}
                                    startingValue={detail.my_rating}
                                />
                            )}
                        </View>
                    ) : null}
                    <View>
                        <View
                            style={{
                                display:
                                    detail?.objid_members?.length === 0
                                        ? "none"
                                        : "flex",
                                ...styles.shareWrapper,
                            }}
                        >
                            <Text>Dibagikan</Text>
                            {detail?.objid_members?.slice(0, 3).map((data) => (
                                <View key={data.id} style={styles.share}>
                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {data.title}
                                    </Text>
                                    <Text>{data.name}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <View style={styles.buttonWrapper}>
                        <CustomButton
                            title="Ubah"
                            startIcon={"pencil"}
                            color={"#FFB700"}
                            onPress={() => {
                                navigation.navigate("BerbagiDokumen", {
                                    data: detail,
                                    type: "edit",
                                });
                            }}
                        />
                        <CustomButton
                            title="Hapus"
                            startIcon={"trash-can"}
                            color={"#ff0000"}
                            onPress={() => {}}
                            
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default DokumenDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0",
        padding: 20,
    },
    wrapper: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 12,
        gap: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    creator: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
        padding: 8,
        backgroundColor: "#f9f9f9",
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 8,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    timelocation: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        padding: 8,
        backgroundColor: "#f9f9f9",
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 8,
    },
    note: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 8,
        maxHeight: 120,
        marginBottom: 8,
    },
    shareWrapper: {
        gap: 8,
    },
    share: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 8,
        gap: 4,
    },
    buttonWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",

        gap: 12,
    },
});
