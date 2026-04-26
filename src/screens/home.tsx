import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';

import {
  Dimensions,
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CartDrawer from './components/Add_to_Cart'; // 2. CartDrawer ka path (ensure karein file wahan ho)

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  // 3. State banayi cart dikhane ke liye
  const [isCartVisible, setIsCartVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#F36D00" />
      
      {/* 1. HEADER */}
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://www.chhayakart.com/cdn/shop/files/ck_logo_white_1.png' }} 
          style={styles.logo} 
        />

        <View style={styles.navLinksContainer}>
          <TouchableOpacity><Text style={styles.navLink}>Home</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.navLink}>Categories</Text></TouchableOpacity>
          
          {/* Cart Icon Button - Is par click karne se cart khulega */}
          <TouchableOpacity 
            style={{marginLeft: 20}} 
            onPress={() => setIsCartVisible(true)}
          >
            <Ionicons name="cart-outline" size={26} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.cartBtn}><Ionicons name="cart" size={26} color="#000" /></TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* 2. HERO SECTION */}
        <ImageBackground 
          source={{ uri: 'https://www.chhayakart.com/cdn/shop/files/banner_1_web.jpg' }} 
          style={styles.heroSection}
        >
          <View style={styles.heroOverlay}>
            <Text style={styles.heroText}>
              Self-Help Groups, Women Entrepreneurs & Rural Manufacturers Products
            </Text>

            <View style={styles.searchBarContainer}>
              <View style={styles.dropdownBox}>
                <Text style={styles.dropdownText}>All India</Text>
              </View>
              <TextInput 
                style={styles.searchInput}
                placeholder="Delivering 1000+ Products Across India"
                placeholderTextColor="#888"
              />
              <TouchableOpacity style={styles.searchButton}>
                <Text style={styles.searchButtonText}>Search</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        {/* 3. FREE DELIVERY BAR */}
        <View style={styles.deliveryBar}>
          <Text style={styles.deliveryText}>FREE DELIVERY FOR ALL PRODUCTS 🚚</Text>
        </View>

        {/* 4. SHOP BY CATEGORY SECTION */}
        <View style={styles.categorySection}>
          <Text style={styles.categoryHeading}>SHOP BY CATEGORY</Text>
          <View style={styles.headingUnderline} />

          <View style={styles.categoryGrid}>
            {[
              { id: 1, title: 'PAPAD', img: 'https://www.chhayakart.com/cdn/shop/files/papad.png' },
              { id: 2, title: 'SEASONAL', img: 'https://www.chhayakart.com/cdn/shop/files/seasonal.png' },
              { id: 3, title: 'INSTANT', img: 'https://www.chhayakart.com/cdn/shop/files/instant.png' },
              { id: 4, title: 'PUJA', img: 'https://www.chhayakart.com/cdn/shop/files/puja.png' },
              { id: 5, title: 'MILLET', img: 'https://www.chhayakart.com/cdn/shop/files/millet.png' },
              { id: 6, title: 'SNACKS', img: 'https://www.chhayakart.com/cdn/shop/files/snacks.png' },
            ].map((item) => (
              <View key={item.id} style={styles.categoryCard}>
                <View style={styles.imageBox}>
                   <Image source={{ uri: item.img }} style={styles.categoryImage} />
                </View>
                <Text style={styles.categoryTitle}>{item.title}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* 4. CART DRAWER COMPONENT - Screen ke end mein rakha gaya hai */}
      <CartDrawer 
        visible={isCartVisible} 
        onClose={() => setIsCartVisible(false)} 
      />

    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#F36D00',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 70, 
    paddingTop: 20, 
    justifyContent: 'space-between',
  },
  logo: { width: 45, height: 45, resizeMode: 'contain' },
  navLinksContainer: { flexDirection: 'row', alignItems: 'center' },
  navLink: { color: 'white', fontSize: 13, fontWeight: '500', marginLeft: 15 },
  heroSection: { width: '100%', height: 260 },
  heroOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 },
  heroText: { color: 'white', fontSize: 15, textAlign: 'center', marginBottom: 20 },
  searchBarContainer: { flexDirection: 'row', backgroundColor: 'white', width: '100%', height: 45, borderRadius: 4, overflow: 'hidden' },
  dropdownBox: { width: 80, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderRightColor: '#ddd' },
  dropdownText: { fontSize: 12, color: '#333' },
  searchInput: { flex: 1, paddingHorizontal: 15, fontSize: 13 },
  searchButton: { backgroundColor: '#F36D00', width: 80, justifyContent: 'center', alignItems: 'center' },
  searchButtonText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  deliveryBar: { backgroundColor: '#F36D00', paddingVertical: 12, alignItems: 'center' },
  deliveryText: { color: 'white', fontWeight: '700', fontSize: 14 },
  categorySection: { padding: 20 },
  categoryHeading: { fontSize: 18, fontWeight: '500', color: '#333' },
  headingUnderline: { height: 1, backgroundColor: '#ddd', marginTop: 8, marginBottom: 20 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  categoryCard: { width: '31%', alignItems: 'center', marginBottom: 20 },
  imageBox: { width: '100%', aspectRatio: 1, borderWidth: 1, borderColor: '#eee', justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 4 },
  categoryImage: { width: '100%', height: '100%', resizeMode: 'contain' },
  categoryTitle: { marginTop: 10, fontWeight: 'bold', fontSize: 12, color: '#000' },
});
