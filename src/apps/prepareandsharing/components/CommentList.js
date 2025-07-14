import React, { useState } from "react";
import { useTheme } from "../../../theme/ThemeContext";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

const DaftarKomentar = ({ items, setParentId, device }) => {
    const { theme } = useTheme();
    const [toggleComment, setToggleComment] = useState({
        toggle: false,
        id: items.id,
    });
    const handleClickBalas = () => {
        // if (inputRef.current) {
        //   inputRef.current.focus();
        setParentId({ id: items.id, creator: items.creator });
        // }
    };
    const clickBalas = (id, temp) => {
        setToggleComment({
            toggle: temp,
            id: id,
        });
    };
    return (
        <View
            key={items.id}
            style={{
                backgroundColor: theme.surface,
                flexDirection: "row",
                padding: 10,
                borderRadius: 12,
                gap: 8,
                flex: 1,
            }}
        >
            <Image
                style={{ width: 40, height: 40, borderRadius: 50 }}
                source={{ uri: items.creator_avatar }}
            />
            <View style={{ gap: 8, flex: 1 }}>
                <Text
                    style={{
                        color: theme.text,
                        fontWeight: "600",
                        fontSize: 14,
                    }}
                >
                    {items.creator}
                </Text>
                <View style={{ flex: 1 }}>
                    <Text
                        style={{
                            color: theme.textSecondary,
                            fontSize: 12,
                            fontWeight: "400",
                            flexShrink: 1,
                            flexWrap: "wrap",
                        }}
                    >
                        {items.message} wqn qwknjd efioneg oijefiew ionefioewf
                        ionwefio iowef iawb buibeuijnawdkjn wekjnwen
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                    }}
                >
                    <TouchableOpacity>
                        <Text
                            style={{
                                color: theme.primary,
                                fontSize: 12,
                                fontWeight: "600",
                            }}
                            onPress={() =>
                                clickBalas(items.id, !toggleComment.toggle)
                            }
                        >
                            Balas
                        </Text>
                    </TouchableOpacity>
                    <Text
                        style={{
                            color: theme.textSecondary,
                            fontSize: 10,
                        }}
                    >
                        {items.created_at}
                    </Text>
                </View>
            </View>
        </View>
    );
};
export default DaftarKomentar;
