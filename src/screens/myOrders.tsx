import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator, Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function MyOrders() {

  const router = useRouter();

  // ===== STATE =====
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [activeMenu, setActiveMenu] = useState('All Orders');

  const [modalVisible, setModalVisible] = useState(false);

  // No default data
  const [addresses, setAddresses] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // ===== CHECK LOGIN =====
  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const val = await AsyncStorage.getItem('isLoggedIn');
    setIsLoggedIn(val === 'true');
  };

  // ===== MENU =====
  const menuItems = [
    { icon: 'list-outline', label: 'All Orders' },
    { icon: 'person-outline', label: 'My Profile' },
    { icon: 'home-outline', label: 'Manage Address' },
    { icon: 'receipt-outline', label: 'Transaction History' },
    { icon: 'log-out-outline', label: 'Logout' },
  ];

  // ===== LOADING =====
  if (isLoggedIn === null) {
    return (
      <View style={styles.loadingBox}>
        <ActivityIndicator size="large" color="#db1c07" />
      </View>
    );
  }

  // ===== NOT LOGGED IN =====
  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notLoggedBox}>
          <Ionicons name="lock-closed-outline" size={60} color="#db1c07" />
          <Text style={styles.notLoggedText}>Sign In Required</Text>

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

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        
        <Text style={styles.headerTitle}>My Account</Text>
      </View>

      {/* BODY */}
      <View style={styles.body}>

        {/* SIDEBAR */}
        <View style={styles.sidebar}>
          <Text style={styles.sidebarTitle}>My Account</Text>

          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuItem,
                activeMenu === item.label && styles.activeMenuItem
              ]}
              onPress={() => {
                setActiveMenu(item.label);

                if (item.label === 'Logout') {
                  setModalVisible(true);
                }
              }}
            >
              <Ionicons
                name={item.icon as any}
                size={18}
                color={activeMenu === item.label ? '#db1c07' : '#555'}
              />
              <Text
                style={[
                  styles.menuLabel,
                  activeMenu === item.label && styles.activeMenuLabel
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* MAIN CONTENT */}
        <View style={styles.mainContent}>
          <View style={styles.card}>

            {/* ===== ALL ORDERS ===== */}
            {activeMenu === 'All Orders' && (
              <>
                <Text style={styles.pageTitle}>My Orders</Text>
                <View style={styles.divider} />

                <View style={styles.emptyBox}>
                  <Ionicons name="bag-outline" size={60} color="#ddd" />
                  <Text style={styles.emptyTitle}>No Orders Yet</Text>
                  <Text style={styles.emptySub}>
                    Your orders will appear here
                  </Text>
                </View>
              </>
            )}

            {/* ===== MY PROFILE ===== */}
            {activeMenu === 'My Profile' && (
              <>
                <Text style={styles.pageTitle}>My Profile</Text>
                <View style={styles.divider} />

                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput style={styles.input} placeholder="Enter name" />

                <Text style={styles.inputLabel}>Phone</Text>
                <TextInput style={styles.input} placeholder="+91 XXXXXXXX" />

                <Text style={styles.inputLabel}>Email</Text>
                <TextInput style={styles.input} placeholder="Enter email" />

                <TouchableOpacity style={styles.saveBtn}>
                  <Text style={styles.saveBtnText}>Save</Text>
                </TouchableOpacity>
              </>
            )}

            {/* ===== MANAGE ADDRESS ===== */}
            {activeMenu === 'Manage Address' && (
              <>
                <Text style={styles.pageTitle}>Manage Address</Text>
                <View style={styles.divider} />

                <TouchableOpacity style={styles.addBtn}>
                  <Text style={styles.addBtnText}>+ Add New Address</Text>
                </TouchableOpacity>

                {addresses.length === 0 && (
                  <View style={styles.emptyBox}>
                    <Ionicons name="location-outline" size={60} color="#ddd" />
                    <Text style={styles.emptyTitle}>No Address Found</Text>
                  </View>
                )}
              </>
            )}

            {/* ===== TRANSACTION HISTORY ===== */}
            {activeMenu === 'Transaction History' && (
              <>
                <Text style={styles.pageTitle}>Transaction History</Text>
                <View style={styles.divider} />

                {/* HEADER */}
                <View style={styles.txnHeader}>
                  <Text style={styles.txnHeaderText}>Transaction ID</Text>
                  <Text style={styles.txnHeaderText}>Payment Method</Text>
                  <Text style={styles.txnHeaderText}>Transaction Date</Text>
                  <Text style={styles.txnHeaderText}>Amount</Text>
                  <Text style={styles.txnHeaderText}>Status</Text>
                </View>

                {/* EMPTY */}
                {transactions.length === 0 && (
                  <View style={styles.emptyBox}>
                    <Ionicons name="receipt-outline" size={60} color="#ddd" />
                    <Text style={styles.emptyTitle}>No Transactions Yet</Text>
                    <Text style={styles.emptySub}>
                      Your transaction details will appear here
                    </Text>
                  </View>
                )}
              </>
            )}

          </View>
        </View>

      </View>

      {/* LOGOUT MODAL */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>

            <Text style={styles.modalTitle}>Logout</Text>
            <Text>Are you sure you want to logout?</Text>

            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={async () => {
                await AsyncStorage.removeItem('isLoggedIn');
                router.replace('/');
              }}
            >
              <Text style={{ color: 'white' }}>Yes</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const ORANGE = '#db1c07';

const styles = StyleSheet.create({

  container: { flex: 1, backgroundColor: '#f5f5f5' },

  loadingBox: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  header: {
    backgroundColor: ORANGE,
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },

  headerTitle: { color: 'white', fontSize: 18, marginLeft: 10 },

  body: { flex: 1, flexDirection: 'row', padding: 12 },

  sidebar: {
    width: 200,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    marginRight: 10,
  },

  sidebarTitle: { fontWeight: 'bold', marginBottom: 10 },

  menuItem: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 6,
    marginBottom: 4,
  },

  activeMenuItem: { backgroundColor: '#fff3eb' },

  menuLabel: { marginLeft: 10 },

  activeMenuLabel: { color: ORANGE, fontWeight: '600' },

  mainContent: { flex: 1 },

  card: { backgroundColor: 'white', padding: 20, borderRadius: 10 },

  pageTitle: { fontSize: 18, fontWeight: 'bold' },

  divider: { height: 1, backgroundColor: '#eee', marginVertical: 10 },

  emptyBox: { alignItems: 'center', marginTop: 30 },

  emptyTitle: { marginTop: 10, fontWeight: '600' },

  emptySub: { fontSize: 13, color: '#888', marginTop: 5 },

  inputLabel: { marginTop: 10, fontSize: 13 },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    backgroundColor: '#fafafa',
  },

  saveBtn: {
    backgroundColor: ORANGE,
    padding: 12,
    alignItems: 'center',
    borderRadius: 6,
  },

  saveBtnText: { color: 'white', fontWeight: 'bold' },

  addBtn: {
    borderWidth: 1,
    borderColor: ORANGE,
    padding: 12,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 6,
  },

  addBtnText: { color: ORANGE, fontWeight: '600' },

  txnHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fafafa',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#eee',
  },

  txnHeaderText: {
    flex: 1,
    fontSize: 11,
    fontWeight: '600',
    color: '#555',
    textAlign: 'center',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000088',
  },

  modalBox: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },

  modalTitle: { fontWeight: 'bold', marginBottom: 10 },

  logoutBtn: {
    backgroundColor: ORANGE,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 6,
  },

  notLoggedBox: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  notLoggedText: { marginTop: 10 },

  signInBtn: {
    backgroundColor: ORANGE,
    padding: 10,
    marginTop: 10,
    borderRadius: 6,
  },

  signInBtnText: { color: 'white' },

});