// components/DatePickerModal.js

import React from "react";
import { Platform } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DatePickerModal = ({ isVisible, onConfirm, onCancel }) => {
    return (
        <DateTimePickerModal
        
            isVisible={isVisible}
            mode="date"
            onConfirm={onConfirm}
            onCancel={onCancel}
            locale="id-ID"
            confirmTextIOS="Pilih"
            cancelTextIOS="Batal"
             display={Platform.OS === "ios" ? "inline" : "default"} // ✅ fix tampilan iOS
            // themeVariant="light" // ✅ untuk iOS, gunakan tema terang
        />
    );
};

export default DatePickerModal;
