// BottomSheetPenerima.js
import React, { forwardRef, useMemo } from "react";
import { View, Text, Image, Platform } from "react-native";
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    useBottomSheetDynamicSnapPoints,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useTheme } from "../../../theme/ThemeContext";
import { Portal } from "react-native-paper";

const BottomSheetPenerima = forwardRef(({ detail }, ref) => {
    const { theme } = useTheme();
    const snapPoints = useMemo(() => ["40%", "80%"], []);
    const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], []);
    const {
        animatedHandleHeight,
        animatedSnapPoints,
        animatedContentHeight,
        handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

    return (
        <Portal>
            <BottomSheetModalProvider>
                <BottomSheetModal
                    ref={ref}
                    snapPoints={snapPoints}
                    enablePanDownToClose={true}
                    handleHeight={animatedHandleHeight}
                    contentHeight={animatedContentHeight}
                    index={0}
                    keyboardBehavior={
                        Platform?.OS == "android" ? "fillParent" : "interactive"
                    }
                    backgroundStyle={{ backgroundColor: theme.card }}
                    backdropComponent={({ style }) => (
                        <View
                            style={[
                                style,
                                { backgroundColor: "rgba(0, 0, 0, 0.5)" },
                            ]}
                        />
                    )}
                >
                    <BottomSheetView
                        style={{ marginHorizontal: 20, marginBottom: 20 }}
                        onLayout={handleContentLayout}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                gap: 10,
                                alignItems: "center",
                                backgroundColor: theme.card,
                                padding: 10,
                                borderRadius: 8,
                            }}
                        >
                            <Image
                                style={{
                                    width: 26,
                                    height: 26,
                                    borderRadius: 30,
                                }}
                                source={{ uri: detail?.creator_avatar }}
                            />
                            <View>
                                <Text
                                    style={{
                                        fontWeight: "600",
                                        fontSize: 16,
                                        color: theme.text,
                                    }}
                                >
                                    Penulis
                                </Text>
                                <Text
                                    style={{
                                        color: theme.textSecondary,
                                        fontSize: 14,
                                    }}
                                >
                                    {detail?.creator}
                                </Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: theme.textSecondary }}>
                                Dibagikan Kepada
                            </Text>
                            <View
                                style={{
                                    flexDirection: "column",
                                    gap: 10,
                                    marginTop: 10,
                                }}
                            >
                                {detail?.objid_members?.map((data) => (
                                    <View
                                        key={data?.id}
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            gap: 10,
                                            backgroundColor: theme.card,
                                            borderRadius: 8,
                                            borderColor: theme.border,
                                            borderWidth: 1,
                                            padding: 10,
                                            shadowColor: theme.shadow,
                                            shadowOffset: {
                                                width: 0,
                                                height: 0,
                                            },
                                            shadowOpacity: 0.2,
                                            shadowRadius: 2,
                                            elevation: 5,
                                        }}
                                    >
                                        <View>
                                            <Text
                                                style={{
                                                    color: theme.text,
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {data?.title}
                                            </Text>
                                            <Text
                                                style={{
                                                    color: theme.textSecondary,
                                                }}
                                            >
                                                {data?.name}
                                            </Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </BottomSheetView>
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </Portal>
    );
});

export default BottomSheetPenerima;
