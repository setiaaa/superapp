import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

const LoginScreen = () => {
  const { login } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Simulasi Login</Text>
      <Button title="Masuk" onPress={login} />
    </View>
  );
};

export default LoginScreen;