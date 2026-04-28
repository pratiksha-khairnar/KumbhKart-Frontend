import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import app from "../../firebase/config/firebaseConfig";

console.log("Firebase app:", app);

const { width } = Dimensions.get('window');

const ITEMS_PER_ROW = 6;
const CONTAINER_PADDING = 200; 
const ITEM_GAP = 15;

const CAT_W = Math.floor(
  (width - CONTAINER_PADDING * 2 - ITEM_GAP * (ITEMS_PER_ROW - 1)) / ITEMS_PER_ROW
);

const Home = () => {
  const router = useRouter();

  const categories = [
    { name: 'PAPAD', img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200' },
    { name: 'SEASONAL', img: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=200' },
    { name: 'INSTANT', img: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=200' },
    { name: 'PUJA', img: 'https://images.unsplash.com/photo-1621274220348-41229fac9529?w=200' },
    { name: 'MILLET', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200' },
    { name: 'SNACKS', img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c17580?w=200' },
    { name: 'PICKLE', img: 'https://images.unsplash.com/photo-1589113331515-998f26550f8c?w=200' },
    { name: 'MASALA', img: 'https://images.unsplash.com/photo-1596797038530-2c39bb050b12?w=200' },
    { name: 'SWEET', img: 'https://images.unsplash.com/photo-1589113331515-998f26550f8c?w=200' },
    { name: 'GROCERY', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200' },
    { name: 'JEWELLERY', img: 'https://images.unsplash.com/photo-1515562141207-7a18b5ce7142?w=200' },
    { name: 'HOUSEHOLD', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200' },
  ];

  const seasonalTrend = [
    { name: 'HOMEMADE', img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200' },
    { name: 'SPECIAL PAPAD', img: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=200' },
    { name: 'SPECIAL SNACK', img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c17580?w=200' },
    { name: 'AYURVEDIC', img: 'https://images.unsplash.com/photo-1611073244287-73118018197c?w=200' },
  ];

  const renderGrid = (data: any[]) => {
    return (
      <View style={styles.grid}>
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { width: CAT_W }]}
            activeOpacity={0.8}
            onPress={() => router.push({ pathname: '/sub-category/[id]', params: { id: item.name } })}
          >
            <View style={[styles.catBox, { width: CAT_W, height: CAT_W }]}>
              <Image source={item.img} style={styles.catImage} contentFit="contain" transition={200} />
            </View>
            <Text style={styles.catLabel} numberOfLines={1}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER SECTION - NO CHANGES */}
      <View style={styles.header}>
        <Image source={{ uri: 'https://www.chhayakart.com/cdn/shop/files/ck_logo_white_1.png' }} style={styles.logo} contentFit="contain" />
        <View style={styles.navLinksContainer}>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/')}><Text style={styles.navLink}>Home</Text></TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push({ pathname: '/sub-category/[id]', params: { id: 'PAPAD' } })}><Text style={styles.navLink}>Categories</Text></TouchableOpacity>
          <TouchableOpacity style={styles.navItem}><Text style={styles.navLink}>About Us</Text></TouchableOpacity>
          <TouchableOpacity style={styles.navItem}><Text style={styles.navLink}>Sign In</Text></TouchableOpacity>
          <TouchableOpacity style={styles.cartBtn}><Ionicons name="cart" size={26} color="#000" /></TouchableOpacity>
        </View>
      </View>

      {/* HERO SECTION - SEARCH BAR UPDATED */}
      <View style={styles.heroWrapper}>
        <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80' }} style={styles.heroBg}>
          <View style={styles.heroOverlay}>
            <Text style={styles.heroSubText}>Empowering Rural India Through Authentic Flavors</Text>
            
            {/* Updated Search Bar Layout */}
            <View style={styles.searchBar}>
              <View style={styles.allIndiaBox}>
                <Text style={styles.allIndiaText}>All India</Text>
              </View>
              <TextInput 
                style={styles.searchInput} 
                placeholder="Search 1000+ Traditional Products" 
                placeholderTextColor="#999" 
              />
              <TouchableOpacity style={styles.searchButton}>
                <Text style={styles.searchButtonText}>Search</Text>
              </TouchableOpacity>
            </View>
            
          </View>
        </ImageBackground>
      </View>

      <View style={styles.deliveryBar}>
        <Text style={styles.deliveryText}>FREE DELIVERY FOR ALL PRODUCTS 🚚</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SHOP BY CATEGORY</Text>
        <View style={styles.divider} />
        <View style={styles.centeredContainer}>
          {renderGrid(categories)}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SEASONAL TREND</Text>
        <View style={styles.divider} />
        <View style={styles.centeredContainer}>
          {renderGrid(seasonalTrend)}
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerTaglineBox}>
          <Text style={styles.footerTagline}>Chhayakart: Empowered Minds, Flourishing Enterprises</Text>
        </View>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '30px', flexWrap: 'wrap' }}>
            <View style={styles.footerCol}>
              <Text style={styles.footerHead}>Get In Touch</Text>
              <Text style={styles.footerText}>Plot No. 21, ZP Colony, Deopur, Dhule 424005</Text>
              <View style={styles.socialRow}>
                <FontAwesome name="facebook-square" size={20} color="white" style={styles.socialIcon} />
                <FontAwesome name="instagram" size={20} color="white" style={styles.socialIcon} />
                <FontAwesome name="linkedin-square" size={20} color="white" style={styles.socialIcon} />
              </View>
            </View>
            {/* ... other columns stay the same ... */}
            <View style={styles.footerCol}>
                <Text style={styles.footerHead}>Categories</Text>
                <Text style={styles.footerLink}>Season Special</Text>
                <Text style={styles.footerLink}>Instant Food</Text>
                <Text style={styles.footerLink}>Millet Superfood</Text>
            </View>
            <View style={styles.footerCol}>
                <Text style={styles.footerHead}>Essentials</Text>
                <Text style={styles.footerLink}>Cookies</Text>
                <Text style={styles.footerLink}>Fitness Food</Text>
                <Text style={styles.footerLink}>Mom's Essential</Text>
            </View>
            <View style={styles.footerCol}>
                <Text style={styles.footerHead}>Chatpata</Text>
                <Text style={styles.footerLink}>Snacks & Namkeen</Text>
                <Text style={styles.footerLink}>Chutney & Masala</Text>
                <Text style={styles.footerLink}>Pickles</Text>
            </View>
            <View style={styles.footerCol}>
                <Text style={styles.footerHead}>Quick Links</Text>
                <Text style={styles.footerLink}>About Us</Text>
                <Text style={styles.footerLink}>Blog</Text>
                <Text style={styles.footerLink}>Return & Refund</Text>
            </View>
        </div>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { backgroundColor: '#db1c07', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 32, paddingTop: Platform.OS === 'web' ? 0 : 44, height: Platform.OS === 'web' ? 76 : 116, justifyContent: 'space-between' },
  logo: { width: 56, height: 56 },
  navLinksContainer: { flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'flex-end' },
  navItem: { paddingHorizontal: 18, paddingVertical: 8 },
  navLink: { color: 'white', fontSize: 15, fontWeight: '600' },
  cartBtn: { marginLeft: 24, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 50, padding: 8 },
  heroWrapper: { width: '100%', height: 180 },
  heroBg: { width: '100%', height: '100%' },
  heroOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  heroSubText: { color: 'white', fontSize: 14, textAlign: 'center', marginBottom: 12, fontWeight: '700' },
  
  // UPDATED SEARCH BAR STYLES
  searchBar: { 
    flexDirection: 'row', 
    backgroundColor: 'white', 
    width: '76%', 
    height: 45, 
    borderRadius: 7, 
    overflow: 'hidden',
    alignItems: 'center'
  },
  allIndiaBox: {
    backgroundColor: '#eee',
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderRightWidth: 1,
    borderRightColor: '#ddd'
  },
  allIndiaText: {
    color: '#333',
    fontSize: 13,
    fontWeight: '500'
  },
  searchInput: { 
    flex: 1, 
    paddingHorizontal: 12, 
    fontSize: 13,
    height: '100%',
    color: '#333'
  },
  searchButton: { 
    backgroundColor: '#db1c07', 
    paddingHorizontal: 20, 
    justifyContent: 'center',
    height: '100%'
  },
  searchButtonText: { color: 'white', fontWeight: 'bold', fontSize: 13 },

  deliveryBar: { backgroundColor: '#db1c07', padding: 8, alignItems: 'center' },
  deliveryText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  section: { marginTop: 30 },
  sectionTitle: { fontSize: 18, color: '#333', fontWeight: '700', marginLeft: CONTAINER_PADDING, marginBottom: 8 },
  divider: { height: 1.5, backgroundColor: '#f0f0f0', marginBottom: 20, marginHorizontal: CONTAINER_PADDING },
  centeredContainer: { paddingHorizontal: CONTAINER_PADDING, width: '100%' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', gap: ITEM_GAP },
  card: { alignItems: 'center', marginBottom: 25 },
  catBox: { borderWidth: 1, borderColor: '#eee', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', padding: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
  catImage: { width: '85%', height: '85%' },
  catLabel: { fontSize: 14, fontWeight: 'bold', marginTop: 10, textAlign: 'center', color: '#000', textTransform: 'uppercase' },

  footer: { backgroundColor: '#666', marginTop: 30 },
  footerTaglineBox: { padding: 15, borderBottomWidth: 0.5, borderBottomColor: '#888', alignItems: 'center' },
  footerTagline: { color: 'white', fontSize: 12, textAlign: 'center' },
  footerCol: { minWidth: 150, marginBottom: 20 },
  footerHead: { color: 'white', fontSize: 24, fontWeight: '400', marginBottom: 15, fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif' },
  footerText: { color: 'white', fontSize: 12, lineHeight: 18 },
  footerLink: { color: 'white', fontSize: 12, marginBottom: 8 },
  socialRow: { flexDirection: 'row', marginTop: 20 },
  socialIcon: { marginRight: 15 },
});