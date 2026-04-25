import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, Alert, ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function MyOrders() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const val = await AsyncStorage.getItem('isLoggedIn');
    if (val !== 'true') {
      // Login nahi hai — alert dikho
      Alert.alert(
        'Sign In Required',
        'My Orders dekhne ke liye pehle Sign In karo!',
        [
          {
            text: 'Sign In',
            onPress: () => router.replace('/'),
          },
          {
            text: 'Cancel',
            onPress: () => router.back(),
            style: 'cancel',
          },
        ]
      );
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  };

  // Loading state
  if (isLoggedIn === null) {
    return (
      <View style={styles.loadingBox}>
        <ActivityIndicator size="large" color="#F36D00" />
      </View>
    );
  }

  // Not logged in
  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notLoggedBox}>
          <Ionicons name="lock-closed-outline" size={60} color="#F36D00" />
          <Text style={styles.notLoggedText}>Sign In Required!</Text>
          <Text style={styles.notLoggedSub}>
            My Orders dekhne ke liye pehle Sign In karo
          </Text>
          <TouchableOpacity
            style={styles.signInBtn}
            onPress={() => router.replace('/')}
          >
            <Text style={styles.signInBtnText}>Go to Sign In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Logged in — Orders page
  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      {/* Body */}
      <View style={styles.body}>

        {/* Sidebar */}
        <View style={styles.sidebar}>

          {/* Profile Icon */}
          <View style={styles.profileIcon}>
            <Ionicons name="person-circle" size={60} color="#aaa" />
            <TouchableOpacity style={styles.editIcon}>
              <Ionicons name="pencil" size={12} color="white" />
            </TouchableOpacity>
          </View>

          {/* Menu Items */}
          {[
            { icon: 'list-outline', label: 'All Orders', active: true },
            { icon: 'person-outline', label: 'My Profile', active: false },
            { icon: 'home-outline', label: 'Manage Address', active: false },
            { icon: 'receipt-outline', label: 'Transaction History', active: false },
            { icon: 'log-out-outline', label: 'Logout', active: false },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={async () => {
                if (item.label === 'Logout') {
                  await AsyncStorage.removeItem('isLoggedIn');
                  router.replace('/');
                }
              }}
            >
              <Ionicons
                name={item.icon as any}
                size={18}
                color={item.active ? '#2ecc71' : '#555'}
              />
              <Text style={[styles.menuLabel, item.active && styles.menuLabelActive]}>
                {item.label}
              </Text>
              <Ionicons name="chevron-forward" size={16} color="#aaa" style={styles.menuArrow} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          <Text style={styles.contentTitle}>ALL ORDERS</Text>
          <View style={styles.divider} />

          {/* Empty State */}
          <View style={styles.emptyBox}>
            <Ionicons name="bag-outline" size={50} color="#ddd" />
            <Text style={styles.emptyText}>Koi orders nahi hain abhi</Text>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}

const ORANGE = '#F36D00';
const GREEN = '#2ecc71';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },

  loadingBox: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  // Not logged in
  notLoggedBox: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30,
  },
  notLoggedText: { fontSize: 20, fontWeight: 'bold', color: '#222', marginTop: 16 },
  notLoggedSub: { fontSize: 14, color: '#888', textAlign: 'center', marginTop: 8, marginBottom: 24 },
  signInBtn: {
    backgroundColor: ORANGE, borderRadius: 8,
    paddingVertical: 14, paddingHorizontal: 40,
  },
  signInBtnText: { color: 'white', fontSize: 15, fontWeight: 'bold' },

  // Header
  header: {
    backgroundColor: ORANGE, flexDirection: 'row',
    alignItems: 'center', padding: 16, paddingTop: 20,
  },
  backBtn: { marginRight: 12 },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },

  // Body layout
  body: { flex: 1, flexDirection: 'row' },

  // Sidebar
  sidebar: {
    width: 180, backgroundColor: 'white',
    padding: 16, borderRightWidth: 1, borderRightColor: '#eee',
  },
  profileIcon: { alignItems: 'center', marginBottom: 20, position: 'relative' },
  editIcon: {
    position: 'absolute', bottom: 2, right: 50,
    backgroundColor: '#555', borderRadius: 10,
    width: 20, height: 20, alignItems: 'center', justifyContent: 'center',
  },
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
  },
  menuLabel: { flex: 1, fontSize: 13, color: '#555', marginLeft: 8 },
  menuLabelActive: { color: GREEN, fontWeight: '600' },
  menuArrow: { marginLeft: 4 },

  // Main content
  mainContent: { flex: 1, padding: 16 },
  contentTitle: { fontSize: 15, fontWeight: 'bold', color: '#333', letterSpacing: 1 },
  divider: { height: 1, backgroundColor: '#eee', marginTop: 8, marginBottom: 20 },

  emptyBox: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#bbb', fontSize: 14, marginTop: 12 },
});