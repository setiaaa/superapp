import React, { useEffect, useState } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import LottieView from "lottie-react-native";
import PropTypes from "prop-types";

// komponen SplashScreen
const SplashScreen = ({ onFinish }) => {
  // const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      // setIsSplashVisible(false);
      onFinish();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  // if (!isSplashVisible) return null;

  return (
    <View style={style.container}>
      <StatusBar hidden />
      <LottieView
        // path gambar
        source={require("../../assets/RWiLc6V4k8.json")}
        autoPlay
        loop={false}
        style={style.animation}
        // onAnimationFinish={() => {
        //   setIsSplashVisible(false);
        //   if (onFinish) onFinish();
        // }}
        onAnimationFinish={onFinish}
      />
    </View>
  );
};

SplashScreen.propTypes = {
  onFinish: PropTypes.func.isRequired,
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: "80%",
    height: "80%",
  },
});

export default SplashScreen;
