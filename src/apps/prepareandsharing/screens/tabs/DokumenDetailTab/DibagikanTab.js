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
    Pressable,
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
    enableDynamicSizing,
} from "@gorhom/bottom-sheet";
import BottomSheetPenerima from "../../../components/ReceiverBottomSheet";
import { FlatList } from "react-native-gesture-handler";

const DataList = ({ item }) => {
    const { theme, isDark, toggleTheme, themeMode } = useTheme();
    let tipe = item.name.split(".");

    const size = (item.file_size / (1024 * 1024)).toFixed(2);

    const navigation = useNavigation();

    if (item.name.toLowerCase().includes("copy")) {
        return (
            <TouchableOpacity
                style={{
                    shadowColor: theme.shadow,
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    elevation: 3,
                    padding: 8,
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                    borderWidth: 1,
                    borderRadius: 8,
                    marginTop: 10,
                    marginHorizontal: 3,
                }}
                onPress={() => {
                    // navigation.navigate("ViewerAnnotation", {
                    //     data: item.files,
                    //     type: "preshare",
                    //     id: item.id,
                    // });
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        gap: 5,
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 500,
                            color: theme.text,
                        }}
                    >
                        Nama File:
                    </Text>
                    <Text
                        style={{
                            color: theme.textSecondary,
                            fontWeight: 400,
                        }}
                    >
                        {tipe[0]}
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        gap: 5,
                        marginTop: 5,
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 500,
                            color: theme.text,
                        }}
                    >
                        Size:
                    </Text>
                    <Text
                        style={{
                            color: theme.textSecondary,
                            fontWeight: 400,
                        }}
                    >
                        {size} MB
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        gap: 5,
                        marginTop: 5,
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 500,
                            color: theme.text,
                        }}
                    >
                        Ekstensi:
                    </Text>
                    <Text
                        style={{
                            color: theme.textSecondary,
                            fontWeight: 400,
                        }}
                    >
                        {tipe[1]}
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        gap: 5,
                        marginTop: 5,
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 500,
                            color: theme.text,
                        }}
                    >
                        Dilihat:
                    </Text>
                    <Text
                        style={{
                            color: theme.textSecondary,
                            fontWeight: 400,
                        }}
                    >
                        {item.views_count}
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        gap: 5,
                        marginTop: 5,
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 500,
                            color: theme.text,
                        }}
                    >
                        Diunduh:
                    </Text>
                    <Text
                        style={{
                            color: theme.textSecondary,
                            fontWeight: 400,
                        }}
                    >
                        {item.download_count}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
    return null;
};

const DibagikanTab = () => {
    const { theme, isDark, toggleTheme, themeMode } = useTheme();
    const navigation = useNavigation();

    const route = useRoute();
    const { tipe, tab } = route.params || {};

    console.log("tipe", tipe, "tab", tab);

    const { dokumen, loading, rating, edit, status } = useSelector(
        (state) => state.prepareandsharing
    );
    const bottomSheetModalRef = useRef(null);
    const comment = dokumen.comments;
    const detail = dokumen.detail;
    const [token, setToken] = useState("");
    const [ratings, setRatings] = useState();
    const dispatch = useDispatch();
    const [expanded, setExpanded] = useState(false);
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

    const handelDelete = () => {
        const data = {
            token: token,
            id: detail.id,
        };
        dispatch(deleteBerbagiDokumen(data));
    };
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: theme.background }}>
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
                        {/* <View
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
                                {detail?.attributes?.deskripsi}
                            </Text>
                            {!expanded ? (
                                <TouchableOpacity
                                    onPress={() => setExpanded(true)}
                                >
                                    <Text
                                        style={[
                                            styles.text,
                                            { color: theme.text },
                                        ]}
                                        numberOfLines={3}
                                        ellipsizeMode="tail"
                                    >
                                        {detail?.attributes?.deskripsi}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.toggle,
                                            { color: theme.text },
                                        ]}
                                    >
                                        Lihat selengkapnya
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                <View
                                    style={{ maxHeight: 244}}
                                >
                                    <ScrollView>
                                        <Text
                                            style={[
                                                styles.text,
                                                { color: theme.text },
                                            ]}
                                        >
                                            {detail?.attributes?.deskripsi}
                                        </Text>
                                    </ScrollView>
                                    <TouchableOpacity
                                        onPress={() => setExpanded(false)}
                                    >
                                        <Text
                                            style={[
                                                styles.toggle,
                                                { color: theme.text },
                                            ]}
                                        >
                                            Tutup
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View> */}
                        <View
                            style={[
                                styles.note,
                                {
                                    borderColor: theme.border,
                                    backgroundColor: theme.card,
                                },
                            ]}
                        >
                            <Text
                                style={{
                                    color: theme.textSecondary,
                                    marginBottom: 4,
                                }}
                            >
                                Catatan:
                            </Text>

                            {!expanded ? (
                                <Pressable onPress={() => setExpanded(true)}>
                                    <Text
                                        style={{
                                            color: theme.text,
                                        }}
                                        numberOfLines={3}
                                        ellipsizeMode="tail"
                                    >
                                        {detail?.attributes?.deskripsi}
                                    </Text>
                                    <Text
                                        style={{
                                            color: theme.primary,
                                            marginTop: 6,
                                        }}
                                    >
                                        Lihat selengkapnya
                                    </Text>
                                </Pressable>
                            ) : (
                                <View style={{ maxHeight: 240 }}>
                                    <ScrollView>
                                        <Text
                                            style={{
                                                color: theme.text,
                                            }}
                                        >
                                            {detail?.attributes?.deskripsi}
                                        </Text>
                                    </ScrollView>
                                    <Pressable
                                        onPress={() => setExpanded(false)}
                                    >
                                        <Text
                                            style={{
                                                color: theme.primary,
                                                marginTop: 6,
                                            }}
                                        >
                                            Tampilkan lebih sedikit
                                        </Text>
                                    </Pressable>
                                </View>
                            )}
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
                        {tab === "TinjauanTab" && (
                            <View style={{ gap: 12 }}>
                                <Divider
                                    bold
                                    style={{ borderColor: theme.border }}
                                />
                                <FlatList
                                    data={detail.attachments}
                                    renderItem={({ item }) => (
                                        <>
                                            <DataList item={item} />
                                        </>
                                    )}
                                    style={{ height: 150 }}
                                    keyExtractor={(item) => item.id}
                                />
                            </View>
                        )}
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
        padding: 20,
    },
    wrapper: {
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
        borderWidth: 1,
        borderRadius: 8,
    },
    note: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 8,
    },
    shareWrapper: {
        gap: 8,
    },
    share: {
        paddingHorizontal: 12,
        paddingVertical: 8,
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
