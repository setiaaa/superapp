import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    Touchable,
    TouchableOpacity,
    Platform,
    ScrollView,
    KeyboardAvoidingView,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { getTokenValue } from "../../../../../services/session";
import {
    deleteBerbagiDokumen,
    postRating,
} from "../../../service/prepareandsharing";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment/min/moment-with-locales";
import { Divider, Portal } from "react-native-paper";
import { Rating } from "react-native-ratings";
import CustomButton from "../../../../../components/CustomButton";
import Header from "../../../../../components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "../../../../../theme/ThemeContext"; // Adjust the import path as necessary
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetView,
    useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import BottomSheetPenerima from "../../../components/ReceiverBottomSheet";

const DibagikanTab = () => {
    const { theme, isDark, toggleTheme, themeMode } = useTheme();
    const navigation = useNavigation();
    const route = useRoute();
    const { tipe } = route.params || {};

    const { dokumen, loading, rating, edit, status } = useSelector(
        (state) => state.prepareandsharing
    );
    const bottomSheetModalRef = useRef(null);
    const comment = dokumen.comments;
    const detail = dokumen.detail;
    const [token, setToken] = useState("");
    const [ratings, setRatings] = useState();
    const dispatch = useDispatch();
    const bottomSheetAttach = () => {
        bottomSheetModalRef.current?.present();
    };
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

    console.log(detail?.objid_members);

    const handelDelete = () => {
        const data = {
            token: token,
            id: detail.id,
        };
        dispatch(deleteBerbagiDokumen(data));
    };
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <ScrollView style={{backgroundColor: theme.background}}>
                <View
                    style={{
                        flex: 1,
                        ...styles.container,
                        backgroundColor: theme.background,
                        flex: 1,
                        paddingBottom: 20,
                    }}
                >
                    <View
                        style={{
                            ...styles.wrapper,
                            backgroundColor: theme.card,
                        }}
                    >
                        <Text
                            style={{
                                ...styles.title,
                                color: theme.text,
                            }}
                        >
                            {detail?.title}
                        </Text>
                        <View
                            style={{
                                ...styles.creator,
                                backgroundColor: theme.surface,
                                borderColor: theme.border,
                            }}
                        >
                            <Image
                                style={{ ...styles.image }}
                                source={{ uri: detail.creator_avatar }}
                            />
                            <View>
                                <Text style={{ color: theme.textSecondary }}>
                                    {detail?.unit_kerja}
                                </Text>
                                <Text style={{ color: theme.text }}>
                                    {detail?.creator}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                ...styles.timelocation,
                                backgroundColor: theme.surface,
                                borderColor: theme.border,
                            }}
                        >
                            <MaterialCommunityIcons
                                name="google-maps"
                                size={24}
                                color={theme.icon}
                            />
                            <Text style={{ color: theme.textSecondary }}>
                                {detail?.attributes?.tempat} |
                            </Text>
                            <Text style={{ color: theme.textSecondary }}>
                                {moment(detail?.attributes?.tanggal)
                                    .locale("id")
                                    .format("DD MMMM YYYY")}
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.note,
                                {
                                    borderColor: theme.border,
                                    backgroundColor: theme.card,
                                },
                            ]}
                        >
                            <Text style={{ color: theme.textSecondary }}>
                                Catatan:
                            </Text>
                            <Text style={{ color: theme.text }}>
                                {detail?.attributes?.catatan}
                            </Text>
                        </View>
                        <Divider bold style={{ borderColor: theme.border }} />
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
                                        tintColor={theme.card}
                                    />
                                ) : (
                                    <Rating
                                        key={token}
                                        onFinishRating={(value) =>
                                            setRatings(value)
                                        }
                                        fractions={2}
                                        startingValue={detail.my_rating}
                                        tintColor={theme.card}
                                    />
                                )}
                            </View>
                        ) : null}
                        <View
                            style={{
                                gap: 12,
                            }}
                        >
                            <Text style={{ color: theme.text }}>Dibagikan</Text>
                            {detail?.objid_members?.slice(0, 3).map((data) => (
                                <View
                                    key={data.id}
                                    style={[
                                        styles.share,
                                        {
                                            backgroundColor: theme.surface,
                                            borderColor: theme.border,
                                        },
                                    ]}
                                >
                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            color: theme.text,
                                        }}
                                    >
                                        {data.title}
                                    </Text>
                                    <Text
                                        style={{ color: theme.textSecondary }}
                                    >
                                        {data.name}
                                    </Text>
                                </View>
                            ))}
                            {detail?.objid_members?.length <= 3 ? null : (
                                <TouchableOpacity
                                    style={{
                                        paddingHorizontal: 12,
                                        paddingVertical: 8,
                                        borderColor: theme.border,
                                        borderWidth: 1,
                                        borderRadius: 8,
                                    }}
                                    onPress={bottomSheetAttach}
                                >
                                    <Text
                                        style={{
                                            color: theme.primary,
                                        }}
                                    >
                                        Lihat selengkapnya
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                        {tipe === "revision" && (
                            <View style={styles.buttonWrapper}>
                                <CustomButton
                                    title="Ubah"
                                    startIcon={"pencil"}
                                    color={theme.warning}
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
                                    color={theme.error}
                                    onPress={handelDelete}
                                />
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
            <BottomSheetPenerima ref={bottomSheetModalRef} detail={detail} />
        </KeyboardAvoidingView>
    );
};

export default DibagikanTab;

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
