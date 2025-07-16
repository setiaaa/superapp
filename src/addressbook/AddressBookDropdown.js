import React from "react";
import { Host } from 'react-native-portalize';
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import  AddressBookJabatan from "./AddressBookJabatan";
import { AddressBookPegawai } from "./AddressBookPegawai";
import { AddressbookPara } from "./AddressbookPara";
import { AddressbookFavorit } from "./AddressbookFavorit";
import { useTheme } from "../theme/ThemeContext";

const Tab = createBottomTabNavigator();
const Top = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();
export const AddressBookDropdown = ({ config }) => {
    const { theme } = useTheme();
    return (
        <Host>
            <BottomSheetModalProvider>
                <Top.Navigator
                    initialRouteName={"AddressBookJabatan"}
                    screenOptions={{
                        tabBarIndicatorStyle: {
                            backgroundColor: theme.primary,
                        },
                        tabBarStyle: {
                            backgroundColor: theme.surface,
                        },
                        tabBarActiveTintColor: theme.primary,
                        tabBarInactiveTintColor: theme.text,
                        tabBarLabelStyle: {
                            textTransform: "none",
                        },
                    }}
                >
                    {config.tabs.jabatan &&
                    config.tabs.pegawai &&
                    config.tabs.para &&
                    config.tabs.favorit ? (
                        <>
                            <Top.Screen
                                name="AddressBookJabatan"
                                component={AddressBookJabatan}
                                options={{
                                    title: "Jabatan",
                                }}
                                initialParams={{ config: config }}
                            />
                            <Top.Screen
                                name="AddressBookPegawai"
                                component={AddressBookPegawai}
                                options={{
                                    title: "Pegawai",
                                }}
                                initialParams={{ config: config }}
                            />
                            <Top.Screen
                                name="AddressBookFavorit"
                                component={AddressbookFavorit}
                                options={{
                                    title: "Favorit",
                                }}
                                initialParams={{ config: config }}
                            />
                            <Top.Screen
                                name="AddressBookPara"
                                component={AddressbookPara}
                                options={{
                                    title: "Para",
                                }}
                                initialParams={{ config: config }}
                            />
                        </>
                    ) : config.tabs.jabatan &&
                      config.tabs.pegawai &&
                      config.tabs.para ? (
                        <>
                            <Top.Screen
                                name="AddressBookJabatan"
                                component={AddressBookJabatan}
                                options={{
                                    title: "Jabatan",
                                }}
                                initialParams={{ config: config }}
                            />
                            <Top.Screen
                                name="AddressBookPegawai"
                                component={AddressBookPegawai}
                                options={{
                                    title: "Pegawai",
                                }}
                                initialParams={{ config: config }}
                            />
                            <Top.Screen
                                name="AddressBookPara"
                                component={AddressbookPara}
                                options={{
                                    title: "Para",
                                }}
                                initialParams={{ config: config }}
                            />
                        </>
                    ) : config.tabs.jabatan && config.tabs.pegawai ? (
                        <>
                            <Top.Screen
                                name="AddressBookJabatan"
                                component={AddressBookJabatan}
                                options={{
                                    title: "Jabatan",
                                }}
                                initialParams={{ config: config }}
                            />
                            <Top.Screen
                                name="AddressBookPegawai"
                                component={AddressBookPegawai}
                                options={{
                                    title: "Pegawai",
                                }}
                                initialParams={{ config: config }}
                            />
                        </>
                    ) : config.tabs.jabatan ? (
                        <Top.Screen
                            name="AddressBookJabatan"
                            component={AddressBookJabatan}
                            options={{
                                title: "Jabatan",
                            }}
                            initialParams={{ config: config }}
                        />
                    ) : config.tabs.pegawai ? (
                        <Top.Screen
                            name="AddressBookPegawai"
                            component={AddressBookPegawai}
                            options={{
                                title: "Pegawai",
                            }}
                            initialParams={{ config: config }}
                        />
                    ) : null}
                </Top.Navigator>
            </BottomSheetModalProvider>
        </Host>
    );
};
