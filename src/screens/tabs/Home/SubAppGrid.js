import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
// import { KalenderApp } from '../../../apps/kalender/KalenderApp';

const subApps = [
  { key: 'SuratApp', label: 'Surat', icon: 'email' },
  { key: 'Calender', label: 'Kalender', icon: 'calendar' },
  { key: 'CutiApp', label: 'Cuti', icon: 'airplane' },
  { key: 'DigitalSignApp', label: 'Tanda Tangan', icon: 'pen' },
  { key: 'DriveApp', label: 'Drive', icon: 'cloud' },
  { key: 'KepegawaianApp', label: 'Kepegawaian', icon: 'account-group' },
];

const numColumns = 3;
const screenWidth = Dimensions.get('window').width-24;
const itemSpacing = 32;
const itemSize = (screenWidth - itemSpacing * (numColumns + 1)) / numColumns;
const SubAppGrid = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, { width: itemSize, height: itemSize }]}
      onPress={() => navigation.navigate(item.key)}
    >
      <MaterialCommunityIcons name={item.icon} size={24} color="#6200ee" />
      <Text style={styles.label}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    // <FlatList
    //   data={subApps}
    //   renderItem={renderItem}
    //   numColumns={numColumns}
    //   keyExtractor={(item) => item.key}
    //   contentContainerStyle={styles.container}
    //   columnWrapperStyle={styles.row}
    // />
    //  <ScrollView style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 40 }}>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 12 }}>Aplikasi</Text>

        <FlatList
          data={subApps}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 16, display: 'flex' }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ alignItems: 'center', paddingHorizontal: 12 }}>
              <MaterialCommunityIcons name={item.icon} size={24} color="#6200ee" />
              <Text style={{ marginTop: 4 }}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: itemSpacing, 
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: itemSpacing,
  },
  item: {
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    // backgroundColor: '',
    backgroundColor: '#000',
  },
  label: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
  },
});

export default SubAppGrid;
