import React, { useEffect } from "react";
import { ScrollView, Text } from "react-native";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import { Search } from "../../../components/Search";
import { useSelector } from "react-redux";
import { useTheme } from "../../../theme/ThemeContext";

export const Dropdown = ({
    data,
    selected,
    setSelected,
    placeHolder,
    borderColor,
    borderWidth,
    borderwidthDrop,
    borderColorDrop,
    borderWidthValue,
    borderColorValue,
    heightValue,
    handleClick,
    backgroundColor,
    textColor,
    search,
    editable = true,
}) => {
    const { theme } = useTheme();
    const [press, setPress] = useState(0);
    const handlePress = () => {
        if (!editable) return;
        else if (press === 0 && editable) {
            setPress(1);
        } else if (press == 1 && editable) {
            setPress(0);
        }
    };
    const [pressData, setPressData] = useState("");
    const [displayData, setDisplayData] = useState("");
    const handlePressData = (item) => {
        setPressData(item.key);
        setPress(0);
        setSelected(item);
        setDisplayData(item.value);
        setCari("");
        if (handleClick) {
            handleClick(item);
            setFilterData(data);
        }
    };

    useEffect(() => {
        if (selected !== undefined) {
            setPressData(selected.key);
            setDisplayData(selected.value);
        }
    }, [selected]);

    const [cari, setCari] = useState("");
    const [filterData, setFilterData] = useState([]);

    const filter = (event) => {
        setCari(event);
    };

    useEffect(() => {
        setFilterData(data);
    }, [data]);

    useEffect(() => {
        if (cari !== "") {
            const value = data.filter((item) => {
                return item.value.toLowerCase().includes(cari.toLowerCase());
            });
            setFilterData(value);
        } else {
            setFilterData(data);
        }
    }, [cari]);

    const { device } = useSelector((state) => state.apps);

    return (
        <View>
            {press === 0 ? (
                <View
                    style={{
                        backgroundColor: backgroundColor,
                        width: "100%",
                        minHeight: 43,
                        paddingBottom: 12,
                        borderRadius: 8,
                        borderColor: borderColor,
                        borderWidth: borderWidth,
                    }}
                >
                    <TouchableOpacity onPress={handlePress}>
                        <Animated.View entering={FadeInUp} exiting={FadeOutUp}>
                            <View
                                style={{
                                    marginLeft: 20,
                                    flexDirection: "row",
                                    marginTop: 15,
                                }}
                            >
                                <Text
                                    style={{
                                        width: "70%",
                                        color: theme.text,
                                    }}
                                >
                                    {displayData !== ""
                                        ? displayData
                                        : placeHolder}
                                </Text>
                                <View
                                    style={{
                                        flex: 1,
                                        alignItems: "flex-end",
                                        marginRight: 20,
                                    }}
                                >
                                    <Ionicons
                                        name="chevron-down-outline"
                                        size={24}
                                        color={theme.icon}
                                    />
                                </View>
                            </View>
                        </Animated.View>
                    </TouchableOpacity>
                </View>
            ) : (
                <Animated.View entering={FadeInUp} exiting={FadeOutUp}>
                    <View>
                        {search !== true ? (
                            <View
                                style={{
                                    backgroundColor: backgroundColor,
                                    width: "100%",
                                    minHeight: 43,
                                    borderRadius: 8,
                                    borderWidth: borderwidthDrop,
                                    borderColor: borderColorDrop,
                                }}
                            >
                                <TouchableOpacity
                                    onPress={handlePress}
                                    style={{
                                        alignItems: "center",
                                        flex: 1,
                                        marginLeft: 20,
                                        flexDirection: "row",
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: theme.text,
                                        }}
                                    >
                                        {displayData !== ""
                                            ? displayData
                                            : placeHolder}
                                    </Text>
                                    <View
                                        style={{
                                            flex: 1,
                                            alignItems: "flex-end",
                                            marginRight: 20,
                                        }}
                                    >
                                        <Ionicons
                                            name="chevron-up-outline"
                                            size={24}
                                            color={textColor}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ) : null}

                        {search === true ? (
                            <View style={{ marginTop: 10 }}>
                                <Search
                                    placeholder={"Cari....."}
                                    onSearch={filter}
                                />
                            </View>
                        ) : null}
                        <ScrollView
                            style={{
                                backgroundColor: theme.surface,
                                width: "100%",
                                borderRadius: 8,
                                marginTop: 10,
                                borderWidth:
                                    data.length > 0 ? borderWidthValue : 0,
                                borderColor:
                                    data.length > 0 ? borderColorValue : null,
                                height: heightValue ? heightValue : "auto",
                            }}
                            scrollEnabled={true}
                            nestedScrollEnabled={true}
                        >
                            {filterData.length > 0 ? (
                                filterData.map((kategori, i) => {
                                    return (
                                        <TouchableOpacity
                                            key={i}
                                            onPress={() =>
                                                handlePressData(kategori)
                                            }
                                            style={{
                                                alignItems: "center",
                                                flex: 1,
                                                marginLeft: 20,
                                                flexDirection: "row",
                                                gap: 10,
                                                marginVertical: 5,
                                            }}
                                        >
                                            {pressData !== kategori.key ? (
                                                <Ionicons
                                                    name="radio-button-off"
                                                    color={theme.primary}
                                                    size={24}
                                                />
                                            ) : (
                                                <Ionicons
                                                    name="radio-button-on"
                                                    color={theme.primary}
                                                    size={24}
                                                />
                                            )}
                                            <Text
                                                style={{
                                                    color: theme.text,
                                                    width: "90%",
                                                }}
                                            >
                                                {kategori.value}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })
                            ) : (
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Text style={{}}>Tidak Ada Data</Text>
                                </View>
                            )}
                        </ScrollView>
                    </View>
                </Animated.View>
            )}
        </View>
    );
};
