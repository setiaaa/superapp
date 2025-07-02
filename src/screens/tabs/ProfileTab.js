import React from 'react';  
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const ProfileTab = () => {
    const user = useSelector((state) => state.user);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profil</Text>
            <Text style={styles.description}>
                {/* Nama: Galang// {user.name} */}
                Nama: Galang
            </Text>
            <Text style={styles.description}>
                {/* NIP: {user.nip} */}
                NIP: 123456789
            </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: '#666',
    },
});

export default ProfileTab;