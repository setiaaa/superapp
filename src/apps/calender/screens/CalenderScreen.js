import React, { use, useEffect, useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Calendar, modeToNum } from "react-native-big-calendar";
import dayjs from "dayjs";
import "dayjs/locale/id";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../../theme/ThemeContext"; // pastikan path sesuai


const events = [
    {
        title: "Meeting",
        start: new Date(2025, 6 - 1, 30, 10, 0),
        end: new Date(2025, 7 - 1, 2, 10, 30),
    },
    {
        title: "Coffee break",
        start: new Date(2025, 1, 11, 15, 45),
        end: new Date(2025, 1, 11, 16, 30),
    },
];

const CalenderScreen = () => {
    const { theme } = useTheme();

    // useEffect
    dayjs.locale("id");
    const today = new Date();
    const [date, setDate] = useState(today);

    useEffect(() => {
        setDate(today);
    }, []);

    const _onPrevDate = () => {
        setDate(
            dayjs(date)
                .add(dayjs(date).date() * -1, "day")
                .toDate()
        );
    };

    const _onNextDate = () => {
        setDate(dayjs(date).add(modeToNum("month", date), "day").toDate());
    };

    const _onToday = () => {
        setDate(today);
    };
    return (
        <ScrollView
            style={{
                gap: 2,
                backgroundColor: theme.background,
            }}
        >
            <View
                style={{
                    backgroundColor: theme.card,
                    margin: 16,
                    borderRadius: 16,
                }}
            >
                <View>
                    <View
                        style={{
                            padding: 16,
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            gap: 12,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                gap: 8,
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    color: theme.text,
                                }}
                            >
                                {dayjs(date).format("MMMM")}
                            </Text>
                            {/* <TouchableOpacity
                            onPress={() => {
                                _onToday();
                            }}
                            style={{
                                backgroundColor: "black",
                                paddingHorizontal: 12,
                                paddingVertical: 8,
                                borderRadius: 8,
                            }}
                        >
                            <Text
                                style={{
                                    color: "#fff",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                }}
                            >
                                Hari Ini
                            </Text>
                        </TouchableOpacity>{" "} */}
                            {/* Today */}
                        </View>
                        <View
                            style={{
                                padding: 16,
                                alignItems: "center",
                                flexDirection: "row",
                                justifyContent: "flex-end",
                            }}
                        >
                            <TouchableOpacity onPress={() => _onPrevDate()}>
                                <Ionicons
                                    name="chevron-back-outline"
                                    size={24}
                                    color={theme.icon}
                                />
                            </TouchableOpacity>
                            {/* Prev */}
                            <TouchableOpacity onPress={() => _onNextDate()}>
                                <Ionicons
                                    name="chevron-forward-outline"
                                    size={24}
                                    color={theme.icon}
                                ></Ionicons>
                            </TouchableOpacity>
                            {/* Next */}
                        </View>
                    </View>
                    <View
                        style={{
                            padding: 8,
                            paddingVertical: 8,
                            paddingBottom: 16,
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Calendar
                            style={{
                                flex: 1,
                                borderRadius: 12,
                                overflow: "hidden",
                                borderColor: "white",
                                borderWidth: 1,
                            }}
                            onSwipeEnd={(date) => {
                                setDate(date);
                            }}
                            events={events}
                            height={480}
                            mode="month"
                            date={date}
                        />
                    </View>
                </View>
            </View>
            <View>
                <View
                    style={{
                        padding: 16,
                        backgroundColor: theme.card,
                        borderRadius: 16,
                        margin: 16,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color: theme.text,
                            marginBottom: 8,
                        }}
                    >
                        Catatan
                    </Text>
                    {events && events.length > 0 ? (
                        events.map((event, index) => (
                            <View
                                key={index}
                                style={{
                                    padding: 12,
                                    borderBottomWidth: 1,
                                    borderBottomColor: theme.border
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: "bold",
                                        color: theme.text,
                                    }}
                                >
                                    {event.title}
                                </Text>
                                <Text style={{ color: theme.textSecondary }}>
                                    {dayjs(event.start).format("DD MMMM YYYY")}{" "}
                                    - {dayjs(event.end).format("DD MMMM YYYY")}
                                </Text>
                            </View>
                        ))
                    ) : (
                        <Text style={{ color: theme.textSecondary }}>
                            Tidak ada catatan untuk hari ini.
                        </Text>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

export default CalenderScreen;
