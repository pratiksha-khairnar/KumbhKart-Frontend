import { Ionicons } from '@expo/vector-icons';

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const TABS = ['PAPAD', 'KURDAI', 'SEVIYAN', 'UPWAS Papad'];

const PRODUCTS = [
  {
    id: '1',
    name: 'Ragi / Nachni / Nagli Papad Online | Finger Millet Papad',
    price: 199, mrp: 300, discount: 34, weight: '500gm',
    img: 'https://www.chhayakart.com/cdn/shop/files/ragi-nachni-nagli-papad_1.jpg',
  },
  {
    id: '2',
    name: 'Batata Sabudana Chakali (Red Chilly Upwas Special CHAKRI)',
    price: 175, mrp: 300, discount: 42, weight: '400gm',
    img: 'https://www.chhayakart.com/cdn/shop/files/batata-sabudana-chakali_1.jpg',
  },
  {
    id: '3',
    name: 'Makai Masala Papad (Corn Papad)',
    price: 220, mrp: 325, discount: 33, weight: '500gm',
    img: 'https://www.chhayakart.com/cdn/shop/files/makai-masala-papad_1.jpg',
  },
  {
    id: '4',
    name: 'Gahu Tandul Papad (Homemade Wheat-Rice Papad)',
    price: 225, mrp: 350, discount: 36, weight: '500gm',
    img: 'https://www.chhayakart.com/cdn/shop/files/gahu-tandul-papad_1.jpg',
  },
  {
    id: '5',
    name: 'Rice/Tandul/Chawal Papad | Homemade Khichiya Papad',
    price: 199, mrp: 300, discount: 34, weight: '500gm',
    img: 'https://www.chhayakart.com/cdn/shop/files/rice-tandul-chawal-papad_1.jpg',
  },
  {
    id: '6',
    name: 'Aaloo (Batata SPRING) (Potato Spring - Ready To Fry)',
    price: 199, mrp: 300, discount: 34, weight: '400gm',
    img: 'https://www.chhayakart.com/cdn/shop/files/aaloo-batata-spring_1.jpg',
  },
  {
    id: '7',
    name: 'Batata Kis (Potato Slices) Ready To Fry',
    price: 199, mrp: 250, discount: 21, weight: '400gm',
    img: 'https://www.chhayakart.com/cdn/shop/files/batata-kis_1.jpg',
  },
  {
    id: '8',
    name: 'Upwas Popcorn (Sabudana Batata Popcorn)',
    price: 199, mrp: 300, discount: 34, weight: '400gm',
    img: 'https://www.chhayakart.com/cdn/shop/files/upwas-popcorn_1.jpg',
  },
  {
    id: '9',
    name: 'KURDAI / KURDAYA (Wheat-GAHU)',
    price: 175, mrp: 300, discount: 42, weight: '400gm',
    img: 'https://www.chhayakart.com/cdn/shop/files/kurdai_1.jpg',
  },
];

export default function SubCategoryScreen({ categoryId }: { categoryId: any }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('PAPAD');
  const [wishlist, setWishlist] = useState<string[]>([]);

  const toggleWish = (id: string) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]
    );
  };

  // ✅ Horizontal card — Image LEFT, Info RIGHT (like Image 1)
  const renderProduct = ({ item }: any) => (
    <View style={styles.card}>

      {/* LEFT — Food Image */}
      <Image
        source={{ uri: item.img }}
        style={styles.productImage}
        resizeMode="cover"
      />

      {/* RIGHT — Product Info */}
      <View style={styles.cardInfo}>
        <Text style={styles.productName} numberOfLines={3}>{item.name}</Text>

        {/* Price Row */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{item.price} </Text>
          <Text style={styles.mrp}>₹{item.mrp} </Text>
          <Text style={styles.discount}>({item.discount}% Off)</Text>
        </View>

        <Text style={styles.weight}>{item.weight}</Text>

        {/* Add + Heart */}
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.addBtn}>
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleWish(item.id)}>
            <Ionicons
              name={wishlist.includes(item.id) ? 'heart' : 'heart-outline'}
              size={22}
              color={wishlist.includes(item.id) ? 'red' : '#aaa'}
            />
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );

  return (
    <View style={styles.container}>

      {/* ============================== */}
      {/* SECTION 1 — NAVBAR            */}
      {/* ============================== */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://www.chhayakart.com/cdn/shop/files/ck_logo_white_1.png' }}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.navLinksContainer}>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/')}>
            <Text style={styles.navLink}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/sub-category/31-papad')}>
            <Text style={styles.navLink}>Categories</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navLink}>About Us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navLink}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartBtn}>
            <Ionicons name="cart" size={26} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sectionGap} />

      {/* ============================== */}
      {/* SECTION 2 — CATEGORY BUTTONS  */}
      {/* ============================== */}
      <View style={styles.tabsSection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContent}
        >
          {TABS.map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabBtnText, activeTab === tab && styles.tabBtnTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.sectionGap} />

      {/* ============================== */}
      {/* SECTION 3 — PRODUCT LIST      */}
      {/* Image LEFT + Info RIGHT        */}
      {/* ============================== */}
      <FlatList
        data={PRODUCTS}
        numColumns={3}
        keyExtractor={item => item.id}
        renderItem={renderProduct}
        contentContainerStyle={styles.grid}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EFEFEF' },

  sectionGap: {
    height: 10,
    backgroundColor: '#EFEFEF',
  },

  /* ---- NAVBAR ---- */
  header: {
    backgroundColor: '#F36D00',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: Platform.OS === 'web' ? 0 : 44,
    height: Platform.OS === 'web' ? 76 : 116,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  logo: { width: 56, height: 56 },
  navLinksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  navItem: { paddingHorizontal: 18, paddingVertical: 8 },
  navLink: { color: 'white', fontSize: 15, fontWeight: '600', letterSpacing: 0.4 },
  cartBtn: {
    marginLeft: 24,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 50,
    padding: 8,
  },

  /* ---- TABS ---- */
  tabsSection: {
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
  },
  tabsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 4,
  },
  tabBtn: {
    width: 140,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#F36D00',
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  tabBtnActive: {
    backgroundColor: '#F36D00',
    borderColor: '#F36D00',
  },
  tabBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F36D00',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  tabBtnTextActive: { color: '#ffffff' },

  /* ---- PRODUCT CARDS (Horizontal Layout) ---- */
  grid: { padding: 10 },

  card: {
    flex: 1,
    margin: 6,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',      // ✅ Image LEFT, Info RIGHT
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
    minHeight: 180,
  },

  // LEFT — Food Image (square)
  productImage: {
    width: 140,                // ✅ Fixed image width
    height: '100%',            // ✅ Full card height
    backgroundColor: '#f5f5f5',
  },

  // RIGHT — Info Section
  cardInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#222',
    lineHeight: 17,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 2,
  },
  price: { fontSize: 13, fontWeight: 'bold', color: '#111' },
  mrp: { fontSize: 11, color: '#999', textDecorationLine: 'line-through' },
  discount: { fontSize: 10, color: '#777' },
  weight: { fontSize: 11, color: '#888', marginBottom: 8 },

  btnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addBtn: {
    backgroundColor: '#F9C49E',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  addText: { color: '#333', fontWeight: '700', fontSize: 13 },
});