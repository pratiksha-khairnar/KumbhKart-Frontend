import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";

const SignIn = () => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.wrapper}>

      {/* Navbar Sign In Button */}
      <TouchableOpacity onPress={() => setOpen(true)}>
        <Text style={styles.signInText}>Sign In ▾</Text>
      </TouchableOpacity>

      {/* Modal — bahar click karne pe band hogi */}
      <Modal
        transparent={true}
        visible={open}
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        {/* Background press to close */}
        <Pressable style={styles.overlay} onPress={() => setOpen(false)} />

        {/* Dropdown Box */}
        <View style={styles.dropdown}>

          {/* Orange Sign In Button */}
          <TouchableOpacity style={styles.mainBtn} onPress={() => setOpen(false)}>
            <Text style={styles.mainBtnText}>Sign In</Text>
          </TouchableOpacity>

          <Text style={styles.divider} />

          <TouchableOpacity onPress={() => setOpen(false)}>
            <Text style={styles.item}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setOpen(false)}>
            <Text style={styles.item}>My Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setOpen(false)}>
            <Text style={styles.item}>My Wishlist</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setOpen(false)}>
            <Text style={styles.item}>
              Chhaya Purse{" "}
              <Text style={styles.coming}>( Coming Soon )</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setOpen(false)}>
            <Text style={styles.item}>CK Wholesale</Text>
          </TouchableOpacity>

        </View>
      </Modal>

    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
  },
  signInText: {
    color: "white",
    fontSize: 13,
    fontWeight: "500",
  },

  // Full screen transparent background
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
  },

  // Dropdown box — top right position
  dropdown: {
    position: "absolute",
    top: 95,        // header height ke baad
    right: 10,
    width: 220,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },

  mainBtn: {
    backgroundColor: "#F36D00",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  mainBtnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 6,
  },

  item: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontSize: 14,
    color: "#333",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },

  coming: {
    color: "#F36D00",
    fontSize: 12,
  },
});