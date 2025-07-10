import React, { useContext, useState, useEffect, use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
// import { AuthContext } from "../../context/AuthContext";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import { Login } from "../service/login";
import { setLogout } from "../store/login";
import { useNavigation } from "@react-navigation/native";
import { getTokenValue } from "../../services/session";
import { getProfileMe } from "../../services/api";

const LoginScreen = () => {
  const [isSelected, setSelection] = useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loginAuth = useSelector((state) => state.login);

  const [token, setToken] = useState("");

  useEffect(() => {
    getTokenValue().then((val) => {
      setToken(val);
      console.log("Token value:", val);
    });
  }, []);
  useEffect(() => {
    // Check if the user is already logged in
    const checkLoginStatus = async () => {
      getTokenValue().then((val) => {
        if (val !== null) {
          navigation.replace("Main");
        } else {
          console.log("No token found, user not logged in.");
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
    // dispatch(setCheckProdukHukum(false));
    if (loginAuth.error !== null && loginAuth.error && isSelected == true) {
      Alert.alert("Terjadi kesalahan", "NIP/Email atau Kata Sandi salah!");
      dispatch(setLogout());
    } else if (
      loginAuth.error !== null &&
      !loginAuth.error
      //  &&
      // isSelected == true
    ) {
      navigation.replace("Main");
    } else {
      setUserName("");
      setPassword("");
    }
  }, [loginAuth.error]);

  const handleSubmit = () => {
    let usernameField = false;
    let passwordField = false;
    if (username === "") {
      usernameField = true;
    } else if (username === "") {
      usernameField = true;
    }
    if (password === "") {
      passwordField = true;
    } else if (password === "") {
      passwordField = true;
    }
    setValidasi({
      ...validasi,
      username: usernameField,
      password: passwordField,
    });
    if (username === "" || password === "" || isSelected === false) {
      Alert.alert("Perhatian", "NIP/Email dan Kata Sandi tidak boleh kosong");
    } else {
      dispatch(Login({ username, password }));
    }
  };

  return (
    <View style={{ ...style.container }}>
      <Text>Tesss</Text>
      <View style={{ ...style.logincontainer }}>
        <View style={style.inputfield}>
          <CustomTextInput
            label="NIP/Email"
            placeholder="Masukkan Nip"
            value={username}
            onChangeText={setUserName}
          />
        </View>
        <View>
          <CustomTextInput
            label="Kata Sandi"
            placeholder="••••••••"
            endIcon={"eye"}
            password={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View>
          {/* <CustomButton
                        title="Masuk"
                        // color="#007bff"
                        onPress={() => {
                            setTimeout(() => {
                                handleSubmit();
                            }, 1000); // Simulate network delay
                        }}
                    /> */}
          <CustomButton
            title="Masuk"
            color={"#ff0000"}
            onPress={() => {
              setTimeout(() => {
                handleSubmit();
              }, 1000); // Simulate network delay
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  logincontainer: {
    gap: 12,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
