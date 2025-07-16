import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Modal,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const windowHeight = Dimensions.get("window").height;

const Dropdown = ({
  data = [],
  selected,
  setSelected,
  handleClick = () => {},
  borderWidth = 1,
  borderColor = "#ccc",
  borderwidthDrop = 1,
  borderColorDrop = "#ccc",
  borderWidthValue = 1,
  borderColorValue = "#ccc",
  placeHolder = "Pilih...",
  backgroundColor = "#fff",
  heightValue = "50%",
  search = false,
}) => {
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const getHeight = () => {
    if (typeof heightValue === "string" && heightValue.includes("%")) {
      const percent = parseInt(heightValue.replace("%", ""), 10);
      return (percent / 100) * windowHeight;
    }
    return Number(heightValue);
  };

  const filteredData = search
    ? data.filter((item) =>
        item.label?.toLowerCase().includes(searchText.toLowerCase())
      )
    : data;

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.selector,
          {
            borderWidth: borderWidthValue,
            borderColor: borderColorValue,
            backgroundColor,
          },
        ]}
        onPress={() => setVisible(true)}
      >
        <Text>{selected?.label || placeHolder}</Text>
        <Ionicons name="chevron-down" size={20} />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPressOut={() => setVisible(false)}
        >
          <View
            style={[
              styles.dropdown,
              {
                height: getHeight(),
                borderWidth: borderwidthDrop,
                borderColor: borderColorDrop,
                backgroundColor,
              },
            ]}
          >
            {search && (
              <TextInput
                style={styles.searchInput}
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Cari..."
              />
            )}

            <FlatList
              data={filteredData}
              keyExtractor={(item) => item.key?.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.item,
                    {
                      borderBottomWidth: borderWidth,
                      borderBottomColor: borderColor,
                    },
                  ]}
                  onPress={() => {
                    setSelected(item);
                    handleClick(item);
                    setVisible(false);
                    setSearchText("");
                  }}
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              )}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  selector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderRadius: 6,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 20,
  },
  dropdown: {
    maxHeight: 400,
    borderRadius: 8,
    padding: 8,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  searchInput: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    borderRadius: 6,
  },
});

export default Dropdown;
