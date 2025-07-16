import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Pressable,
    Alert,
    Image,
    ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getTokenValue } from "../../../../../services/session";
import { useDispatch, useSelector } from "react-redux";
import { setAttachments, setStatus } from "../../../store/prepareandsharing";
import moment from "moment";
import CustomTextInput from "../../../../../components/CustomTextInput";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import DatePickerModal from "../../../../../components/DatePickerModal";
import {
    postAttachmentRepo,
    postBerbagiDokumen,
    putBerbagiDokumen,
} from "../../../service/prepareandsharing";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as DocumentPicker from "expo-document-picker";
import CustomButton from "../../../../../components/CustomButton";
import { useTheme } from "../../../../../theme/ThemeContext";
import { FlatList } from "react-native-gesture-handler";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";
import { useTHeme } from "../../../../../theme/ThemeContext";
import { setAddressbookSelected } from "../../../../../store/AddressbookKKP";
import SubmitModal from "../../../../../components/SubmitModal";
import Loading from "../../../../../components/Loading";

const CardListPreshareAddressbook = ({
    item,
    addressbook,
    pilihanAnggotaGrup,
    setStateConfig,
    device,
}) => {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const deleteItem = (id, state) => {
        let data;
        if (state === "jabatan") {
            data = addressbook.selected.filter((data) => data.id !== id);
            setStateConfig({
                title: "Peserta Grup",
                tabs: {
                    jabatan: true,
                    pegawai: false,
                },
                multiselect: true,
                payload: pilihanAnggotaGrup,
                tipeAddress: "korespondensi",
            });
            dispatch(setAddressbookSelected(data));
        } else {
            data = addressbook.selected.filter((data) => data.nip !== id);
            dispatch(setAddressbookSelected(data));
        }
    };
    return (
        <View>
            {item.title === undefined ? null : (
                <View
                    style={{
                        flexDirection: "row",
                        display: "flex",
                        alignItems: "center",
                        marginTop: 10,
                        gap: 10,
                    }}
                >
                    <Text style={{ fontSize: 12, color: theme.text }}>-</Text>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                            flexShrink: 1,
                            fontSize: 12,
                            flex: 1,
                            color: theme.text,
                        }}
                    >
                        {item.title}
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            deleteItem(item.id, "jabatan");
                        }}
                    >
                        <Ionicons
                            name="trash-outline"
                            size={24}
                            color={theme.error}
                        />
                    </TouchableOpacity>
                </View>
            )}
            {item.fullname === undefined ? null : (
                <View
                    style={{
                        flexDirection: "row",
                        display: "flex",
                        alignItems: "center",
                        marginTop: 10,

                        gap: 10,
                    }}
                >
                    <Text style={{ fontSize: 12, color: theme.text }}>-</Text>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                            flexShrink: 1,
                            fontSize: 12,
                            flex: 1,
                            color: theme.text,
                        }}
                    >
                        {item.fullname}
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            deleteItem(item.nip, "pegawai");
                        }}
                    >
                        <Ionicons
                            name="trash-outline"
                            size={24}
                            color={theme.errors}
                        />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};
const CardListPeserta = ({
    item,
    addressbook,
    persetaSubAgenda = false,
    setPilihanPeserta,
}) => {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const deleteItem = (id, state) => {
        let data;
        let datas = persetaSubAgenda ? addressbook : addressbook.selected;
        if (state === "jabatan") {
            data = datas.filter((data) => {
                let nip = data.nip || data.officer.official?.split("/")[1];
                return nip !== id;
            });
            if (persetaSubAgenda) {
                setPilihanPeserta(data);
            } else {
                dispatch(setAddressbookSelected(data));
            }
        } else {
            data = datas.filter((data) => data.nip !== id);
            if (persetaSubAgenda) {
                setPilihanPeserta(data);
            } else {
                dispatch(setAddressbookSelected(data));
            }
        }
    };
    return (
        <View key={item.nip || item.id}>
            {item.code !== undefined ||
            (item.title !== undefined && item.title.name !== "") ? (
                <View
                    style={{
                        flexDirection: "row",
                        display: "flex",
                        alignItems: "center",
                        marginTop: 10,
                        gap: 4,
                    }}
                >
                    <Text style={{ fontSize: 12, color: theme.text }}>-</Text>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                            flexShrink: 1,
                            fontSize: 12,
                            flex: 1,
                            color: theme.text,
                        }}
                    >
                        {item.title.name !== undefined
                            ? item.title.name
                            : item.title}
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            deleteItem(
                                item.nip ||
                                    item.officer.official?.split("/")[1],
                                "jabatan"
                            );
                        }}
                    >
                        <Ionicons
                            name="trash-outline"
                            size={24}
                            color={theme.error}
                        />
                    </TouchableOpacity>
                </View>
            ) : (
                <View
                    style={{
                        flexDirection: "row",
                        display: "flex",
                        alignItems: "center",
                        marginTop: 10,
                        gap: 10,
                    }}
                >
                    <Text style={{ fontSize: 12, color: theme.text }}>-</Text>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                            flexShrink: 1,
                            fontSize: 12,
                            flex: 1,
                            color: theme.text,
                        }}
                    >
                        {item.nama || item.fullname}
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            deleteItem(item.nip, "pegawai");
                        }}
                    >
                        <Ionicons
                            name="trash-outline"
                            size={24}
                            color={theme.error}
                        />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const BerbagiDokumen = ({ route }) => {
    const { theme, isDark, toggleTheme, themeMode } = useTheme();
    const { addressbook } = useSelector((state) => state.addressBookKKP);
    const item = route.params || {};
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [stateConfig, setStateConfig] = useState({});
    const [token, setToken] = useState("");
    const [judulKegiatan, setJudulKegiatan] = useState("");
    const [pilihanAnggotaGrup, setPilihanAnggotaGrup] = useState([]);
    const [pilihanPeninjauGrup, setPilihanPeninjauGrup] = useState([]);
    const [tempatAcara, setTempatAcara] = useState("");
    const [catatan, setCatatan] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [document, setDocument] = useState([]);
    const [payloaDocument, setPayloadDocument] = useState([]);
    const [type, setType] = useState([]);
    const [isSelected, setSelection] = useState(false);
    const [visible, setVisible] = useState(false);

    const handleConfirm = (date) => {
        setVisible(false);
        const formatted = moment(date).format("YYYY-MM-DD");
        setTanggal(formatted);
    };

    useEffect(() => {
        navigation.setOptions({
            headerTitle:
                item.type === "edit" ? "Edit Dokumen" : "Tambah Dokumen",
            showBack: true, // opsional
        });
    }, [navigation]);
    useEffect(() => {
        getTokenValue().then((val) => {
            setToken(val);
        });
        dispatch(setAttachments([]));
    }, []);
    const iconMap = {
        pdf: require("../../../../../../assets/attachments/pdf.png"),
        doc: require("../../../../../../assets/attachments/doc.png"),
        docx: require("../../../../../../assets/attachments/doc.png"),
        xls: require("../../../../../../assets/attachments/sheet.png"),
        xlsx: require("../../../../../../assets/attachments/sheet.png"),
        ppt: require("../../../../../../assets/attachments/slide.png"),
        pptx: require("../../../../../../assets/attachments/slide.png"),
        jpg: null,
        jpeg: null,
        png: null,
        // default: require("../../../../../../assets/attachments/default.png"),
    };
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

    useEffect(() => {
        if (stateConfig.title === "Peserta Grup") {
            setPilihanAnggotaGrup(addressbook.selected);
        } else if (stateConfig.title === "Peninjau") {
            setPilihanPeninjauGrup(addressbook.selected);
        }
    }, [addressbook]);

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});

        if (result.canceled) return;

        const file = result.assets[0];
        const fileName = file.name;
        const fileUri = file.uri;

        // Cek duplikat berdasarkan nama
        const isDuplicate = document.some((doc) => {
            const existingFile = doc[0] || doc;
            return existingFile?.name === fileName;
        });

        if (isDuplicate) {
            Alert.alert(
                "Peringatan!",
                "Dokumen dengan nama yang sama sudah ditambahkan."
            );
            return;
        }

        let tipe = fileUri.split("/");
        tipe = tipe[tipe.length - 1];
        tipe = tipe.split(".");
        tipe = tipe[tipe.length - 1];

        const size = (file.size / (1024 * 1024)).toFixed(3);

        if (size <= 100) {
            setDocument([...document, result.assets]);
            setType([...type, tipe]);

            const data = {
                token: token,
                result: file,
            };
            dispatch(postAttachmentRepo(data))
        } else {
            Alert.alert("Peringatan!", "File terlalu besar, maksimal 100MB.");
        }
    };

    const { attachment, loading, status } = useSelector(
        (state) => state.prepareandsharing
    );

    const handleSubmit = (action) => {
        let attachments = [];
        attachment.map((item) => {
            attachments?.push(item.id);
        });

        let document = [];
        payloaDocument.map((item) => {
            document?.push(item.id);
        });

        const combinedIds = [...new Set([...attachments, ...document])];

        let objid_member = [];
        pilihanAnggotaGrup.map((item) => {
            objid_member.push(item.code);
        });

        let id_addressbook = [];
        pilihanAnggotaGrup.map((item) => {
            id_addressbook.push(item.id);
        });

        let nipReviewer = [];
        pilihanPeninjauGrup.map((item) => {
            nipReviewer.push(item?.officer?.official.split("/")[1]);
        });

        let nipReviewerEdit = [];
        pilihanPeninjauGrup.map((item) => {
            nipReviewerEdit.push(item.nip);
        });

        const result = {
            title: judulKegiatan,
            objid_members: objid_member,
            attachments:
                item?.type === "edit" || item?.type === "draft"
                    ? combinedIds
                    : attachments,
            attributes: {
                tanggal: moment(tanggal),
                tempat: tempatAcara,
                deskripsi: catatan,
                send_notification: isSelected,
                id_addressbook: id_addressbook,
            },
            reviewers_ids:
                item.type === "edit" || item.type === "draft"
                    ? nipReviewerEdit
                    : nipReviewer,
            action: action === "publish" ? "submit" : "draft",
            published: action === "publish" ? true : false,
            public: false,
            base_url: "-",
            tipe: "dokumen",
        };

        const data = {
            token: token,
            result: result,
            id: item?.data?.id,
        };

        const datas = {
            token: token,
            result: result,
        };

        if (item?.type === "edit" || item?.type === "draft") {
            dispatch(putBerbagiDokumen(data));
        } else {
            dispatch(postBerbagiDokumen(datas));
        }
        Alert.alert("Berhasil!", `Dokumen berhasil Disimpan`);
        // navigation.goBack();
    };

    useEffect(() => {}, [pilihanAnggotaGrup]);

    const transformedData = {
        employee: [],
        id: 11,
        listsDivision: [
            { key: 1, value: "KEMENTERIAN KELAUTAN DAN PERIKANAN" },
            { key: 2, value: "SEKRETARIAT JENDERAL" },
            {
                key: 3,
                value: "DIREKTORAT JENDERAL PENGELOLAAN KELAUTAN DAN RUANG LAUT",
            },
            { key: 4, value: "DIREKTORAT JENDERAL PERIKANAN TANGKAP" },
            { key: 5, value: "DIREKTORAT JENDERAL PERIKANAN BUDI DAYA" },
            {
                key: 6,
                value: "DIREKTORAT JENDERAL PENGUATAN DAYA SAING PRODUK KELAUTAN DAN PERIKANAN",
            },
            {
                key: 7,
                value: "DIREKTORAT JENDERAL PENGAWASAN SUMBER DAYA KELAUTAN DAN PERIKANAN",
            },
            { key: 8, value: "INSPEKTORAT JENDERAL" },
            {
                key: 9,
                value: "BADAN PENYULUHAN DAN PENGEMBANGAN SUMBER DAYA MANUSIA KELAUTAN DAN PERIKANAN",
            },
            {
                key: 10,
                value: "BADAN PENGENDALIAN DAN PENGAWASAN MUTU HASIL KELAUTAN DAN PERIKANAN",
            },
        ],
        listsDivisionPara: [],
        listsDivisiontree: [
            {
                code: "",
                header: true,
                id: 4,
                node: 1,
                nodes: [],
                officer: {},
                title: "KEMENTERIAN KELAUTAN DAN PERIKANAN",
            },
        ],
        listsFavorit: [],
        selected: pilihanAnggotaGrup,
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            {loading ? <Loading /> : null}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    style={{
                        backgroundColor: theme.background,
                        flex: 1,
                    }}
                >
                    <View
                        style={[
                            styles.container,
                            { backgroundColor: theme.background },
                        ]}
                    >
                        <View
                            style={[
                                styles.wrapper,
                                { backgroundColor: theme.card },
                            ]}
                        >
                            <View style={styles.input}>
                                <CustomTextInput
                                    label="Judul Kegiatan"
                                    mandatory={true}
                                    placeholder="Masukkan judul kegiatan"
                                    value={judulKegiatan}
                                    onChangeText={setJudulKegiatan}
                                />
                            </View>
                            <TouchableOpacity
                                style={styles.input}
                                onPress={() => {
                                    const config = {
                                        title: "Peserta Grup",
                                        tabs: {
                                            jabatan: true,
                                            pegawai: false,
                                        },
                                        multiselect: true,
                                        payload: pilihanAnggotaGrup,
                                        // tipeAddress: "korespondensi",
                                    };
                                    setStateConfig(config);
                                    navigation.navigate("AddressBook", {
                                        config: config,
                                    });
                                }}
                            >
                                <CustomTextInput
                                    label="Bagikan Kepada"
                                    placeholder=""
                                    mandatory={true}
                                    endIcon={"account"}
                                    editable={false}
                                />
                            </TouchableOpacity>
                            {item.type === "edit" ? (
                                <FlatList
                                    data={pilihanAnggotaGrup}
                                    renderItem={({ item }) => (
                                        <CardListPreshareAddressbook
                                            item={item}
                                            addressbook={transformedData}
                                            pilihanAnggotaGrup={
                                                pilihanAnggotaGrup
                                            }
                                            setStateConfig={setStateConfig}
                                        />
                                    )}
                                    scrollEnabled={false}
                                    keyExtractor={({ index }) => index}
                                />
                            ) : (
                                <FlatList
                                    data={pilihanAnggotaGrup}
                                    renderItem={({ item }) => (
                                        <CardListPeserta
                                            item={item}
                                            addressbook={pilihanAnggotaGrup}
                                            persetaSubAgenda={true}
                                            setPilihanPeserta={
                                                setPilihanAnggotaGrup
                                            }
                                        />
                                    )}
                                    scrollEnabled={false}
                                    keyExtractor={({ index }) => index}
                                />
                            )}
                            {pilihanAnggotaGrup.length !== 0 ? (
                                <View
                                    style={{
                                        flexDirection: "row",
                                        gap: 12,
                                        alignItems: "center",
                                    }}
                                >
                                    <Checkbox
                                        value={isSelected}
                                        onValueChange={setSelection}
                                        color={
                                            isSelected === true
                                                ? theme.primary
                                                : null
                                        }
                                    />
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            color: theme.text,
                                        }}
                                    >
                                        Kirim Notifikasi
                                    </Text>
                                </View>
                            ) : null}
                            <TouchableOpacity
                                style={styles.input}
                                onPress={() => {
                                    const config = {
                                        title: "Peninjau",
                                        tabs: {
                                            jabatan: true,
                                            pegawai: false,
                                        },
                                        multiselect: true,
                                        payload: pilihanPeninjauGrup,
                                        // tipeAddress: "korespondensi",
                                    };
                                    setStateConfig(config);
                                    navigation.navigate("AddressBook", {
                                        config: config,
                                    });
                                }}
                            >
                                <CustomTextInput
                                    label="Peninjau"
                                    placeholder=""
                                    mandatory={true}
                                    endIcon={"account"}
                                    editable={false}
                                />
                            </TouchableOpacity>
                            <FlatList
                                data={pilihanPeninjauGrup}
                                renderItem={({ item }) => (
                                    <CardListPeserta
                                        item={item}
                                        addressbook={pilihanPeninjauGrup}
                                        persetaSubAgenda={true}
                                        setPilihanPeserta={
                                            setPilihanPeninjauGrup
                                        }
                                    />
                                )}
                                scrollEnabled={false}
                                keyExtractor={({ index }) => index}
                            />
                            <TouchableOpacity
                                style={styles.input}
                                onPress={() => setVisible(true)}
                            >
                                <CustomTextInput
                                    label="Tanggal"
                                    mandatory={true}
                                    endIcon={"calendar"}
                                    value={tanggal}
                                    editable={false}
                                />
                            </TouchableOpacity>
                            <View style={styles.input}>
                                <CustomTextInput
                                    label="Tempat Acara"
                                    mandatory={true}
                                    placeholder=""
                                    value={tempatAcara}
                                    onChangeText={setTempatAcara}
                                />
                            </View>
                            <View style={styles.input}>
                                <CustomTextInput
                                    label="Catatan"
                                    mandatory={true}
                                    placeholder=""
                                    value={catatan}
                                    onChangeText={setCatatan}
                                />
                            </View>
                            <View style={styles.input}>
                                <Text
                                    style={[
                                        styles.label,
                                        { color: theme.text },
                                    ]}
                                >
                                    Lampiran
                                    <Text style={{ color: theme.error }}>
                                        *
                                    </Text>
                                </Text>

                                {/* Box luar dengan fixed height */}
                                <View
                                    style={{
                                        borderWidth: 1,
                                        borderColor: theme.border,
                                        borderRadius: 8,
                                        padding: 12,
                                        backgroundColor: theme.card,
                                        height: 180, // beri height tetap
                                    }}
                                >
                                    {document.length < 1 ? (
                                        // Jika tidak ada dokumen, tampilkan tombol tengah
                                        <TouchableOpacity
                                            onPress={pickDocument}
                                            style={{
                                                flex: 1,
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <MaterialCommunityIcons
                                                name="cloud-outline"
                                                size={32}
                                                color={theme.icon}
                                            />
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    color: theme.textSecondary,
                                                }}
                                            >
                                                Tambahkan Lampiran
                                            </Text>
                                        </TouchableOpacity>
                                    ) : (
                                        // Jika ada dokumen, tampilkan scroll + tombol tambah di luar
                                        <>
                                            <ScrollView
                                                style={{ flex: 1 }}
                                                contentContainerStyle={{
                                                    paddingBottom: 8,
                                                }}
                                                showsVerticalScrollIndicator
                                            >
                                                {document.map((doc, i) => {
                                                    const ext =
                                                        type[i]?.toLowerCase();
                                                    const file = doc[0] || doc;
                                                    const uri =
                                                        file?.uri ||
                                                        file?.files;
                                                    const isImage = [
                                                        "jpg",
                                                        "jpeg",
                                                        "png",
                                                    ].includes(ext);

                                                    return (
                                                        <View
                                                            key={i}
                                                            style={{
                                                                flexDirection:
                                                                    "row",
                                                                alignItems:
                                                                    "center",
                                                                padding: 8,
                                                                gap: 12,
                                                                borderWidth: 1,
                                                                borderColor:
                                                                    theme.border,
                                                                borderRadius: 8,
                                                                marginBottom: 8,
                                                                backgroundColor:
                                                                    theme.card,
                                                            }}
                                                        >
                                                            <Image
                                                                source={
                                                                    isImage &&
                                                                    uri
                                                                        ? {
                                                                              uri,
                                                                          }
                                                                        : iconMap[
                                                                              ext
                                                                          ] ||
                                                                          iconMap[
                                                                              "default"
                                                                          ]
                                                                }
                                                                style={{
                                                                    width: 40,
                                                                    height: 40,
                                                                    borderRadius: 4,
                                                                    resizeMode:
                                                                        isImage
                                                                            ? "cover"
                                                                            : "contain",
                                                                }}
                                                            />
                                                            <View
                                                                style={{
                                                                    flex: 1,
                                                                }}
                                                            >
                                                                <Text
                                                                    style={{
                                                                        fontSize: 14,
                                                                        color: theme.text,
                                                                    }}
                                                                    numberOfLines={
                                                                        1
                                                                    }
                                                                >
                                                                    {file?.name ||
                                                                        uri
                                                                            ?.split(
                                                                                "/"
                                                                            )
                                                                            .pop()}
                                                                </Text>
                                                                <Text
                                                                    style={{
                                                                        fontSize: 12,
                                                                        color: theme.textSecondary,
                                                                    }}
                                                                >
                                                                    Format:{" "}
                                                                    {ext?.toUpperCase()}
                                                                </Text>
                                                            </View>
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    const newDocs =
                                                                        [
                                                                            ...document,
                                                                        ];
                                                                    const newTypes =
                                                                        [
                                                                            ...type,
                                                                        ];
                                                                    newDocs.splice(
                                                                        i,
                                                                        1
                                                                    );
                                                                    newTypes.splice(
                                                                        i,
                                                                        1
                                                                    );
                                                                    setDocument(
                                                                        newDocs
                                                                    );
                                                                    setType(
                                                                        newTypes
                                                                    );
                                                                }}
                                                                style={{
                                                                    padding: 4,
                                                                }}
                                                            >
                                                                <MaterialCommunityIcons
                                                                    name="trash-can-outline"
                                                                    size={20}
                                                                    color={
                                                                        theme.error
                                                                    }
                                                                />
                                                            </TouchableOpacity>
                                                        </View>
                                                    );
                                                })}
                                            </ScrollView>

                                            {/* Tombol tambah dokumen dipisah, bukan di dalam scroll */}
                                            <TouchableOpacity
                                                onPress={pickDocument}
                                                style={{
                                                    marginTop: 8,
                                                    padding: 8,
                                                    borderWidth: 1,
                                                    borderColor: theme.border,
                                                    borderRadius: 6,
                                                    alignSelf: "center",
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color: theme.text,
                                                    }}
                                                >
                                                    + Tambah Lampiran
                                                </Text>
                                            </TouchableOpacity>
                                        </>
                                    )}
                                </View>

                                <Text style={{ color: theme.textSecondary }}>
                                    *) Hanya png, jpg, jpeg, pdf, doc, docx,
                                    ppt, pptx, xls, xlsx yang akan diterima dan
                                    ukuran file maks 100 MB
                                </Text>
                            </View>
                            <CustomButton
                                title="Draft"
                                color={theme.warning}
                                onPress={() => {
                                    handleSubmit("Draft");
                                }}
                            />
                            <CustomButton
                                title="Kirim"
                                color={theme.error}
                                onPress={() => {
                                    handleSubmit("publish");
                                }}
                            />
                        </View>
                        <DatePickerModal
                            isVisible={visible}
                            onConfirm={handleConfirm}
                            onCancel={() => setVisible(false)}
                        />
                    </View>
                    <SubmitModal
                        status={status}
                        setStatus={setStatus}
                        messageSuccess={"Data Ditambahkan"}
                        navigate={"MainRepo"}
                    />
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    wrapper: {
        gap: 12,
        padding: 12,
        borderRadius: 12,
    },
    input: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 6,
    },
});

export default BerbagiDokumen;
