import React, { useState, useEffect } from "react";
import {
  View, Text, TouchableOpacity,
  StyleSheet, Modal, Pressable,
} from "react-native";
import { useRouter, usePathname } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Har baar screen pe aao — login check karo
  useEffect(() => {
    checkLogin();
  }, [pathname]);

  const checkLogin = async () => {
    const val = await AsyncStorage.getItem('isLoggedIn');
    setIsLoggedIn(val === 'true');
  };

  return (
    <View style={styles.wrapper}>

      {/* Navbar button */}
      <TouchableOpacity onPress={() => setOpen(true)}>
        <Text style={styles.signInText}>
          {isLoggedIn ? 'Hello 👋 ▾' : 'Sign In ▾'}
        </Text>
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal
        transparent visible={open}
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setOpen(false)} />

        <View style={styles.dropdown}>

          {/* agar logged in nahi hai toh Sign In button dikhe */}
          {/* agar logged in hai toh Hello dikhe */}
          {isLoggedIn ? (
            <View style={styles.helloBox}>
              <Text style={styles.helloText}>Hello 👋</Text>
              <Text style={styles.helloSubText}>Welcome back!</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.mainBtn}
              onPress={() => {
                setOpen(false);
                router.push('/signIn');
              }}
            >
              <Text style={styles.mainBtnText}>Sign In</Text>
            </TouchableOpacity>
          )}

          <View style={styles.dividerLine} />

          <Text style={styles.item}>Home</Text>
          <Text style={styles.item}>My Orders</Text>
          <Text style={styles.item}>My Wishlist</Text>
          <Text style={styles.item}>
            Chhaya Purse{' '}
            <Text style={styles.coming}>( Coming Soon )</Text>
          </Text>
          <Text style={styles.item}>CK Wholesale</Text>

          {/* Logout button — sirf logged in hone pe dikhe */}
          {isLoggedIn && (
            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={async () => {
                await AsyncStorage.removeItem('isLoggedIn');
                setIsLoggedIn(false);
                setOpen(false);
              }}
            >
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          )}

        </View>
      </Modal>

    </View>
  );
};

export default SignIn;

const ORANGE = '#F36D00';

const styles = StyleSheet.create({
  wrapper: { justifyContent: "center" },

  signInText: {
    color: "white",
    fontSize: 13,
    fontWeight: "500",
  },

  overlay: {
    flex: 1,
    backgroundColor: "transparent",
  },

  dropdown: {
    position: "absolute",
    top: 95,
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

  // Sign In Button
  mainBtn: {
    backgroundColor: ORANGE,
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

  // Hello Box — logged in hone pe
  helloBox: {
    backgroundColor: '#fff5ee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  helloText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ORANGE,
  },
  helloSubText: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },

  dividerLine: {
    height: 1,
    backgroundColor: '#eee',
    marginBottom: 6,
  },

  item: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontSize: 14,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  coming: {
    color: ORANGE,
    fontSize: 12,
  },

  // Logout Button
  logoutBtn: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffccaa',
    alignItems: 'center',
  },
  logoutText: {
    color: ORANGE,
    fontWeight: 'bold',
    fontSize: 14,
  },
});