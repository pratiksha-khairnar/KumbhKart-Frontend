import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function Wishlist() {

  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // Future: products array
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const val = await AsyncStorage.getItem('isLoggedIn');
    setIsLoggedIn(val === 'true');
  };

  // ===== LOADING =====
  if (isLoggedIn === null) {
    return (
      <View style={styles.loadingBox}>
        <ActivityIndicator size="large" color="#F36D00" />
      </View>
    );
  }

  // ===== NOT LOGGED IN =====
  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notLoggedBox}>
          <Ionicons name="heart-dislike-outline" size={60} color="#F36D00" />
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
        <Text style={styles.headerTitle}>My Wishlist</Text>
      </View>

      {/* BODY */}
      <View style={styles.body}>

        {wishlistItems.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons name="heart-outline" size={70} color="#ddd" />
            <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
            <Text style={styles.emptySub}>
              Save items you like in your wishlist
            </Text>

            <TouchableOpacity
              style={styles.shopBtn}
onPress={() => router.push('/')}            >
              <Text style={styles.shopBtnText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text>Wishlist Items Here</Text>
        )}

      </View>

    </SafeAreaView>
  );
}

const ORANGE = '#F36D00';

const styles = StyleSheet.create({

  container: { flex: 1, backgroundColor: '#f5f5f5' },

  loadingBox: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  header: {
    backgroundColor: ORANGE,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },

  headerTitle: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold'
  },

  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  emptyBox: {
    alignItems: 'center',
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },

  emptySub: {
    fontSize: 13,
    color: '#888',
    marginTop: 6,
    textAlign: 'center'
  },

  shopBtn: {
    marginTop: 20,
    backgroundColor: ORANGE,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
  },

  shopBtnText: {
    color: 'white',
    fontWeight: 'bold'
  },

  notLoggedBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  notLoggedText: {
    marginTop: 10,
    fontSize: 16
  },

  signInBtn: {
    marginTop: 10,
    backgroundColor: ORANGE,
    padding: 10,
    borderRadius: 6,
  },

  signInBtnText: { color: 'white' },

});