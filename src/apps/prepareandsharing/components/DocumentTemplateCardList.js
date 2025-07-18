import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { getDetailDocument } from "../service/prepareandsharing";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { useTheme } from "../../../theme/ThemeContext";

const DocumentTemplateCardList = ({ token, item, bottomSheetAttach }) => {
    const { theme } = useTheme();
    const dispatch = useDispatch();

    const getDetailRepo = (id) => {
        const params = { token, id };
        // const data = event.listsprogress.find(item => item.id === id)
        dispatch(getDetailDocument(params));
    };
    const navigation = useNavigation();
    return (
        <BottomSheetModalProvider>
            <View
                key={item.id}
                style={{
                    display: "flex",
                    flexDirection: "row",
                    marginVertical: 10,
                    marginHorizontal: "5%",
                    backgroundColor: theme.surface,
                    borderRadius: 8,
                    shadowColor: "black",
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    elevation: 3,
                }}
            >
                <View
                    style={{
                        paddingHorizontal: 20,
                        paddingVertical: 20,
                        flex: 1,
                        justifyContent: "center",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            display: "flex",
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("MainDetailRepo");
                                getDetailRepo(item.id);
                                // bottomSheetAttach(item);
                                // getDetailRepo(item.id);
                                dispatch(setRating(false));
                                dispatch(setEdit("EditTamplate"));
                            }}
                        >
                            <Text
                                style={{
                                    // fontSize: ,
                                    fontWeight: 'bold',
                                    marginBottom: 10,
                                }}
                            >
                                {item.title}
                            </Text>

                            <View
                                style={{
                                    // backgroundColor: "brown",
                                    display: "flex",
                                    flexDirection: "row",
                                    paddingRight: 10,
                                }}
                            >
                                <Text
                                    style={{
                                        // fontSize: 12,
                                        fontWeight: 'normal',
                                        color: theme.textSecondary,
                                        width: device === "tablet" ? 200 : 100,
                                    }}
                                >
                                    Pembuat
                                </Text>
                                <Text
                                    style={{
                                        fontSize: fontSizeResponsive(
                                            "H4",
                                            device
                                        ),
                                        fontWeight: FONTWEIGHT.normal,
                                        color: COLORS.lighter,
                                    }}
                                >
                                    {item.creator}
                                </Text>
                            </View>

                            <View
                                style={{
                                    // backgroundColor: "brown",
                                    display: "flex",
                                    flexDirection: "row",
                                    paddingRight: 10,
                                    marginVertical: 10,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: fontSizeResponsive(
                                            "H4",
                                            device
                                        ),
                                        fontWeight: FONTWEIGHT.normal,
                                        color: COLORS.lighter,
                                        width: device === "tablet" ? 200 : 100,
                                    }}
                                >
                                    Deskripsi
                                </Text>
                                <Text
                                    style={{
                                        fontSize: fontSizeResponsive(
                                            "H4",
                                            device
                                        ),
                                        fontWeight: FONTWEIGHT.normal,
                                        color: COLORS.lighter,
                                        width: device === "tablet" ? 200 : 100,
                                    }}
                                >
                                    {item.attributes.deskripsi}
                                </Text>
                            </View>

                            <View
                                style={{
                                    // backgroundColor: "brown",
                                    display: "flex",
                                    flexDirection: "row",
                                    paddingRight: 10,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: fontSizeResponsive(
                                            "H4",
                                            device
                                        ),
                                        fontWeight: FONTWEIGHT.normal,
                                        color: COLORS.lighter,
                                        width: device === "tablet" ? 200 : 100,
                                    }}
                                >
                                    Perubahan
                                </Text>
                                <Text
                                    style={{
                                        fontSize: fontSizeResponsive(
                                            "H4",
                                            device
                                        ),
                                        fontWeight: FONTWEIGHT.normal,
                                        color: COLORS.lighter,
                                    }}
                                >
                                    {moment(item.updated_at)
                                        .locale("id")
                                        .format("DD MMMM yyyy")}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </BottomSheetModalProvider>
    );
};
