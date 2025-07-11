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

const LoginScreen = () => {
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [validasi, setValidasi] = useState({
    username: false,
    password: false,
  });
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loginAuth = useSelector((state) => state.login);

  useEffect(() => {
    getTokenValue().then((val) => {
      if (val !== null) {
        navigation.replace("Main");
      } else {
        console.log("No token found, user not logged in.");
      }
    });
  }, []);

  useEffect(() => {
    if (loginAuth.error !== null && loginAuth.error) {
      Alert.alert("Terjadi kesalahan", "NIP/Email atau Kata Sandi salah!");
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
      Alert.alert("Perhatian", "NIP/Email dan Kata Sandi tidak boleh kosong");
    } else {
      dispatch(Login({ username, password }));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={style.container}
    >
      <SafeAreaView style={style.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F7F8FA" />

        <ScrollView
          contentContainerStyle={style.scrollContainer}
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
            <Text style={style.title}>Login</Text>
            <View style={style.inputCard}>
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
              <CustomButton title="Masuk" onPress={handleSubmit} color="#000" />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  headerContainer: {
    height: 190,
    width: "100%",
    borderWidth: 1,
    borderColor: "red",
    borderStyle: "solid",
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    // paddingTop: 20,
    borderWidth: 1,
    borderColor: "blue",
    borderStyle: "solid",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 16,
    // borderWidth: 1,
    // borderColor: "green",
    // borderStyle: "solid",
    textTransform: "uppercase",
  },
  inputCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    elevation: 10,
    shadowColor: "#5A6C80",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: "yellow",
    borderStyle: "solid",
  },
});
