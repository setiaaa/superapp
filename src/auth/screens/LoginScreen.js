import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    View,
    Text,
    StyleSheet,
    Alert,
    StatusBar,
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from "react-native";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import { Login } from "../service/login";
import { setLogout } from "../store/login";
import { useNavigation } from "@react-navigation/native";
import { getTokenValue } from "../../services/session";
import BackgroundLogin from "../../../assets/background_login1.svg";
import { useTheme } from "../../theme/ThemeContext";

const LoginScreen = () => {
    const { theme, isDark, toggleTheme, themeMode } = useTheme();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const loginAuth = useSelector((state) => state.login);

    const [token, setToken] = useState("");

    useEffect(() => {
        getTokenValue().then((val) => {
            setToken(val);
        });
    }, []);
    useEffect(() => {
        // Check if the user is already logged in
        const checkLoginStatus = async () => {
            getTokenValue().then((val) => {
                if (val !== null) {
                    navigation.replace("Main");
                }
            });
        };
        checkLoginStatus();
    }, []);
    // const { login } = useContext(AuthContext);
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");
    const [validasi, setValidasi] = useState({
        username: false,
        password: false,
    });

    // const loginAuth = useSelector((state) => state.login);

    useEffect(() => {
        if (loginAuth.error !== null && loginAuth.error) {
            Alert.alert(
                "Terjadi kesalahan",
                "NIP/Email atau Kata Sandi salah!"
            );
            dispatch(setLogout());
        } else if (loginAuth.error !== null && !loginAuth.error) {
            navigation.replace("Main");
        } else {
            setUserName("");
            setPassword("");
        }
    }, [loginAuth.error]);

    const handleSubmit = () => {
        let usernameField = username === "";
        let passwordField = password === "";
        setValidasi({ username: usernameField, password: passwordField });
        if (username === "" || password === "") {
            Alert.alert(
                "Perhatian",
                "NIP/Email dan Kata Sandi tidak boleh kosong"
            );
        } else {
            dispatch(Login({ username, password }));
        }
    };

    return (
        <SafeAreaView
            style={[style.container, { backgroundColor: theme.color }]}
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Header Section */}
                    <View style={style.headerContainer}>
                        <BackgroundLogin
                            width="100%"
                            height={450}
                            preserveAspectRatio="xMidYMid slice"
                        />
                    </View>

                    {/* Form Section */}
                    <View style={style.formContainer}>
                        <Text style={[style.title, { color: theme.text }]}>
                            Login
                        </Text>
                        <View
                            style={[
                                style.inputCard,
                                {
                                    backgroundColor: theme.surface,
                                    shadowColor: theme.shadow,
                                },
                            ]}
                        >
                            <CustomTextInput
                                label="NIP/Email"
                                placeholder="Masukkan Nip"
                                value={username}
                                onChangeText={setUserName}
                            />
                            <View style={{ height: 20 }} />
                            <CustomTextInput
                                label="Kata Sandi"
                                placeholder="••••••••"
                                endIcon={"eye"}
                                password={true}
                                value={password}
                                onChangeText={setPassword}
                            />
                            <View style={{ height: 30 }} />
                            <CustomButton
                                title="Masuk"
                                onPress={handleSubmit}
                                color={theme.primary}
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        height: 190,
        width: "100%",
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 24,
        borderStyle: "solid",
    },
    title: {
        fontSize: 50,
        fontWeight: "bold",
        marginBottom: 16,
        textTransform: "uppercase",
    },
    inputCard: {
        borderRadius: 20,
        padding: 24,
        elevation: 10,
        // shadowColor: "#5A6C80",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        // borderWidth: 1,
        borderStyle: "solid",
    },
});
