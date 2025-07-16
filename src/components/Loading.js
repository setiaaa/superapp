import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

const Loading = ({ message = 'Memuat...' }) => {
    const { theme } = useTheme();

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={theme.primary} />
            <Text style={[styles.message, { color: theme.text }]}>
                {message}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
    message: {
        marginTop: 10,
        fontSize: 16,
    },
});

export default Loading;
