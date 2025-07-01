import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BottomTabBar = ({ tabs = [], activeTab, onTabPress }) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => onTabPress(tab.key)}
            style={{ 
              ...styles.tabItem, 
              borderBottomColor: isActive ? '#6200ee' : 'transparent',
            }}
          >
            <MaterialCommunityIcons
              name={tab.icon}
              size={24}
              // color={isActive ? '#6200ee' : '#888'}
              color={'#888'}
            />
            {/* <Text style={[styles.label, isActive && styles.activeLabel]}> */}
            <Text style={[styles.label]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    backgroundColor: '#fff',
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
    paddingBottom: 8,
    borderBottomWidth: 2,
  },
  label: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  activeLabel: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
});

export default BottomTabBar;
