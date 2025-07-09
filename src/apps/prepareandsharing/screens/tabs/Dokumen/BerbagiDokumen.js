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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getTokenValue } from "../../../../../services/session";
import { useDispatch, useSelector } from "react-redux";
import { setAttachments } from "../../../store/prepareandsharing";
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

const BerbagiDokumen = ({ route }) => {
    const { addressbook } = useSelector((state) => state.addressBookKKP);
    const item = route.params || {};
    const navigation = useNavigation();
    const dispatch = useDispatch();
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

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});

        // const file = convertFileToObject(result)
        let tipe = result.assets[0].uri.split("/");
        tipe = tipe[tipe.length - 1];
        tipe = tipe.split(".");
        tipe = tipe[tipe.length - 1];

        const size = (result.assets[0].size / (1024 * 1024)).toFixed(3);

        if (size <= 100) {
            setDocument([...document, result.assets]);
            setType([...type, tipe]);
            const data = {
                token: token,
                result: result.assets[0],
            };
            dispatch(postAttachmentRepo(data));
        } else Alert.alert("Peringatan!", "File terlalu besar, maksimal 50MB");
    };

    return (
        
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ ...styles.container }}>
                    <View style={styles.wrapper}>
                        <View style={styles.input}>
                            <CustomTextInput
                                label="Judul Kegiatan"
                                mandatory={true}
                                placeholder="Masukkan judul kegiatan"
                                value={judulKegiatan}
                                onChangeText={setJudulKegiatan}
                            />
                        </View>
                        <View style={styles.input}>
                            <CustomTextInput
                                label="Bagikan Kepada"
                                placeholder=""
                                mandatory={true}
                                endIcon={"account"}
                                editable={false}
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
                            />
                        </View>
                        <View style={styles.input}>
                            <CustomTextInput
                                label="Peninjau"
                                placeholder=""
                                mandatory={true}
                                endIcon={"account"}
                                editable={false}
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
                            />
                        </View>
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
                                style={{
                                     fontSize: 14,
                                    fontWeight: "600",
                                    color: "#333",
                                }}
                            >
                                Lampiran
                                <Text style={{ color: "red" }}>*</Text>
                            </Text>
                            <Pressable onPress={pickDocument}>
                                {console.log('Diklik')}
                                <View
                                    style={{
                                        gap: 8,
                                        padding: 12,
                                        borderRadius: 8,
                                        alignItems: "center",
                                        height: 100,
                                        borderColor: "#ccc",
                                        borderWidth: 1,
                                        justifyContent: "center",
                                    }}
                                >
                                    <MaterialCommunityIcons
                                        name="cloud-outline"
                                        size={32}
                                        color="#33"
                                    />
                                    <Text style={{ color: "#555" }}>
                                        {document.length > 0
                                            ? "Lampiran telah ditambahkan"
                                            : "Tambahkan Lampiran"}
                                    </Text>
                                </View>
                            </Pressable>
                            <Text style={{ 
                                fontSize: 12,
                                color: "#888",
                             }}>
                                *) Hanya png, jpg, jpeg, pdf, doc, docx, ppt,
                                pptx, xls, xlsx yang akan diterima dan ukuran
                                file maks 100 MB
                            </Text>
                        </View>
                    </View>
                    <DatePickerModal
                        isVisible={visible}
                        onConfirm={handleConfirm}
                        onCancel={() => setVisible(false)}
                    />
                </View>
            </TouchableWithoutFeedback>
        // </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f0f0f0",
    },
    wrapper: {
        gap: 12,
        padding: 12,
        backgroundColor: "#fff",
        borderRadius: 12,
    },
    input: {
        gap: 8,
    },
});

export default BerbagiDokumen;
