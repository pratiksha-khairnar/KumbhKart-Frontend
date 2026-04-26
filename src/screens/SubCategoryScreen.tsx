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

const TABS = ['PAPAD', 'KURDAI', 'SEVIYAN', 'UPWAS Papad', 'CHIPS', 'KHAKHRA', 'VADE', 'FRYUM'];

const ALL_PRODUCTS = [
  // ---- PAPAD ----
  { id: 'p1', tab: 'PAPAD', name: 'Ragi / Nachni / Nagli Papad Online | Finger Millet Papad', price: 199, mrp: 300, discount: 34, weight: '500gm', img: 'https://www.chhayakart.com/cdn/shop/files/ragi-nachni-nagli-papad_1.jpg' },
  { id: 'p2', tab: 'PAPAD', name: 'Makai Masala Papad (Corn Papad)', price: 220, mrp: 325, discount: 33, weight: '500gm', img: 'https://www.chhayakart.com/cdn/shop/files/makai-masala-papad_1.jpg' },
  { id: 'p3', tab: 'PAPAD', name: 'Gahu Tandul Papad (Homemade Wheat-Rice Papad)', price: 225, mrp: 350, discount: 36, weight: '500gm', img: 'https://www.chhayakart.com/cdn/shop/files/gahu-tandul-papad_1.jpg' },
  { id: 'p4', tab: 'PAPAD', name: 'Rice/Tandul/Chawal Papad | Homemade Khichiya Papad', price: 199, mrp: 300, discount: 34, weight: '500gm', img: 'https://www.chhayakart.com/cdn/shop/files/rice-tandul-chawal-papad_1.jpg' },
  { id: 'p5', tab: 'PAPAD', name: 'Ragi / Nachni / Nagli Papad Online | Finger Millet Papad', price: 199, mrp: 300, discount: 34, weight: '500gm', img: 'https://www.chhayakart.com/cdn/shop/files/ragi-nachni-nagli-papad_1.jpg' },
  { id: 'p6', tab: 'PAPAD', name: 'Makai Masala Papad (Corn Papad)', price: 220, mrp: 325, discount: 33, weight: '500gm', img: 'https://www.chhayakart.com/cdn/shop/files/makai-masala-papad_1.jpg' },
  { id: 'p7', tab: 'PAPAD', name: 'Gahu Tandul Papad (Homemade Wheat-Rice Papad)', price: 225, mrp: 350, discount: 36, weight: '500gm', img: 'https://www.chhayakart.com/cdn/shop/files/gahu-tandul-papad_1.jpg' },
  { id: 'p8', tab: 'PAPAD', name: 'Rice/Tandul/Chawal Papad | Homemade Khichiya Papad', price: 199, mrp: 300, discount: 34, weight: '500gm', img: 'https://www.chhayakart.com/cdn/shop/files/rice-tandul-chawal-papad_1.jpg' },
  { id: 'p9', tab: 'PAPAD', name: 'Rice/Tandul/Chawal Papad | Homemade Khichiya Papad', price: 199, mrp: 300, discount: 34, weight: '500gm', img: 'https://www.chhayakart.com/cdn/shop/files/rice-tandul-chawal-papad_1.jpg' },

  // ---- KURDAI ----
  { id: 'k1', tab: 'KURDAI', name: 'KURDAI / KURDAYA (Wheat-GAHU)', price: 175, mrp: 300, discount: 42, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/kurdai_1.jpg' },
  { id: 'k2', tab: 'KURDAI', name: 'Kurdai / Kurdaya (RICE-CHAWAL)', price: 199, mrp: 275, discount: 28, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/kurdai_1.jpg' },
  { id: 'k3', tab: 'KURDAI', name: 'Color Kurdai / Kurdaya (Wheat) Ready To Fry', price: 199, mrp: 350, discount: 44, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/kurdai_1.jpg' },
  { id: 'k4', tab: 'KURDAI', name: 'Bajra Kurdai', price: 199, mrp: 300, discount: 34, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/kurdai_1.jpg' },
  { id: 'k5', tab: 'KURDAI', name: 'Ragi / Nachani KURDAI (Ready To Fry Millet Snack)', price: 199, mrp: 300, discount: 34, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/kurdai_1.jpg' },
  { id: 'k6', tab: 'KURDAI', name: 'Ratale Kurdai (Sweet Potato Kurdai)', price: 225, mrp: 300, discount: 25, weight: '500gm', img: 'https://www.chhayakart.com/cdn/shop/files/kurdai_1.jpg' },
  { id: 'k7', tab: 'KURDAI', name: 'Sabudana Kurdai 500gm (Upwas Special) Ready To Fry', price: 249, mrp: 300, discount: 17, weight: '500gm', img: 'https://www.chhayakart.com/cdn/shop/files/kurdai_1.jpg' },
  { id: 'k8', tab: 'KURDAI', name: 'Kurdai And Kharudi (Bhusawadi) COMBO', price: 349, mrp: 600, discount: 42, weight: '800gm', img: 'https://www.chhayakart.com/cdn/shop/files/kurdai_1.jpg' },
  { id: 'k9', tab: 'KURDAI', name: 'Kurdai And Color Kurdai COMBO (Ready To Fry)', price: 399, mrp: 600, discount: 34, weight: '800gm', img: 'https://www.chhayakart.com/cdn/shop/files/kurdai_1.jpg' },

  // ---- SEVIYAN ----
  { id: 's1', tab: 'SEVIYAN', name: 'Homemade Wheat Seviyan (Shevaya)', price: 149, mrp: 250, discount: 40, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/kurdai_1.jpg' },
  { id: 's2', tab: 'SEVIYAN', name: 'Rice Seviyan (Chawal Shevaya)', price: 160, mrp: 275, discount: 42, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/kurdai_1.jpg' },
  { id: 's3', tab: 'SEVIYAN', name: 'Ragi Seviyan (Nachni Shevaya)', price: 175, mrp: 300, discount: 42, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/kurdai_1.jpg' },
  { id: 's4', tab: 'SEVIYAN', name: 'Homemade Wheat Seviyan (Shevaya)', price: 149, mrp: 250, discount: 40, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/kurdai_1.jpg' },
  { id: 's5', tab: 'SEVIYAN', name: 'Rice Seviyan (Chawal Shevaya)', price: 160, mrp: 275, discount: 42, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/kurdai_1.jpg' },
  { id: 's6', tab: 'SEVIYAN', name: 'Homemade Wheat Seviyan (Shevaya)', price: 149, mrp: 250, discount: 40, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/kurdai_1.jpg' },
  { id: 's7', tab: 'SEVIYAN', name: 'Ragi Seviyan (Nachni Shevaya)', price: 175, mrp: 300, discount: 42, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/kurdai_1.jpg' },
  { id: 's8', tab: 'SEVIYAN', name: 'Rice Seviyan (Chawal Shevaya)', price: 160, mrp: 275, discount: 42, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/kurdai_1.jpg' },

  // ---- UPWAS Papad ----
  { id: 'u1', tab: 'UPWAS Papad', name: 'Batata Sabudana Chakali (Red Chilly Upwas Special CHAKRI)', price: 175, mrp: 300, discount: 42, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/batata-sabudana-chakali_1.jpg' },
  { id: 'u2', tab: 'UPWAS Papad', name: 'Aaloo (Batata SPRING) (Potato Spring - Ready To Fry)', price: 199, mrp: 300, discount: 34, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/aaloo-batata-spring_1.jpg' },
  { id: 'u3', tab: 'UPWAS Papad', name: 'Batata Kis (Potato Slices) Ready To Fry', price: 199, mrp: 250, discount: 21, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/batata-kis_1.jpg' },
  { id: 'u4', tab: 'UPWAS Papad', name: 'Upwas Popcorn (Sabudana Batata Popcorn)', price: 199, mrp: 300, discount: 34, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/upwas-popcorn_1.jpg' },
  { id: 'u5', tab: 'UPWAS Papad', name: 'Batata Sabudana Chakali (Red Chilly Upwas Special CHAKRI)', price: 175, mrp: 300, discount: 42, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/batata-sabudana-chakali_1.jpg' },
  { id: 'u6', tab: 'UPWAS Papad', name: 'Aaloo (Batata SPRING) (Potato Spring - Ready To Fry)', price: 199, mrp: 300, discount: 34, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/aaloo-batata-spring_1.jpg' },
  { id: 'u7', tab: 'UPWAS Papad', name: 'Batata Kis (Potato Slices) Ready To Fry', price: 199, mrp: 250, discount: 21, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/batata-kis_1.jpg' },
  { id: 'u8', tab: 'UPWAS Papad', name: 'Upwas Popcorn (Sabudana Batata Popcorn)', price: 199, mrp: 300, discount: 34, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/upwas-popcorn_1.jpg' },

  // ---- CHIPS ----
  { id: 'c1', tab: 'CHIPS', name: 'Homemade Potato Chips (Batata Wafer)', price: 149, mrp: 250, discount: 40, weight: '300gm', img: 'https://www.chhayakart.com/cdn/shop/files/batata-kis_1.jpg' },
  { id: 'c2', tab: 'CHIPS', name: 'Banana Chips (Kele Chips)', price: 175, mrp: 300, discount: 42, weight: '300gm', img: 'https://www.chhayakart.com/cdn/shop/files/batata-kis_1.jpg' },
  { id: 'c3', tab: 'CHIPS', name: 'Tapioca / Sabudana Chips', price: 160, mrp: 275, discount: 42, weight: '300gm', img: 'https://www.chhayakart.com/cdn/shop/files/batata-kis_1.jpg' },
  { id: 'c4', tab: 'CHIPS', name: 'Homemade Potato Chips (Batata Wafer)', price: 149, mrp: 250, discount: 40, weight: '300gm', img: 'https://www.chhayakart.com/cdn/shop/files/batata-kis_1.jpg' },
  { id: 'c5', tab: 'CHIPS', name: 'Banana Chips (Kele Chips)', price: 175, mrp: 300, discount: 42, weight: '300gm', img: 'https://www.chhayakart.com/cdn/shop/files/batata-kis_1.jpg' },
  { id: 'c6', tab: 'CHIPS', name: 'Tapioca / Sabudana Chips', price: 160, mrp: 275, discount: 42, weight: '300gm', img: 'https://www.chhayakart.com/cdn/shop/files/batata-kis_1.jpg' },
  { id: 'c7', tab: 'CHIPS', name: 'Homemade Potato Chips (Batata Wafer)', price: 149, mrp: 250, discount: 40, weight: '300gm', img: 'https://www.chhayakart.com/cdn/shop/files/batata-kis_1.jpg' },
  { id: 'c8', tab: 'CHIPS', name: 'Banana Chips (Kele Chips)', price: 175, mrp: 300, discount: 42, weight: '300gm', img: 'https://www.chhayakart.com/cdn/shop/files/batata-kis_1.jpg' },

  // ---- KHAKHRA ----
  { id: 'kh1', tab: 'KHAKHRA', name: 'Plain Wheat Khakhra', price: 149, mrp: 250, discount: 40, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/makai-masala-papad_1.jpg' },
  { id: 'kh2', tab: 'KHAKHRA', name: 'Methi Khakhra', price: 160, mrp: 275, discount: 42, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/makai-masala-papad_1.jpg' },
  { id: 'kh3', tab: 'KHAKHRA', name: 'Masala Khakhra', price: 175, mrp: 300, discount: 42, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/makai-masala-papad_1.jpg' },
  { id: 'kh4', tab: 'KHAKHRA', name: 'Plain Wheat Khakhra', price: 149, mrp: 250, discount: 40, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/makai-masala-papad_1.jpg' },
  { id: 'kh5', tab: 'KHAKHRA', name: 'Methi Khakhra', price: 160, mrp: 275, discount: 42, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/makai-masala-papad_1.jpg' },
  { id: 'kh6', tab: 'KHAKHRA', name: 'Masala Khakhra', price: 175, mrp: 300, discount: 42, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/makai-masala-papad_1.jpg' },
  { id: 'kh7', tab: 'KHAKHRA', name: 'Plain Wheat Khakhra', price: 149, mrp: 250, discount: 40, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/makai-masala-papad_1.jpg' },
  { id: 'kh8', tab: 'KHAKHRA', name: 'Methi Khakhra', price: 160, mrp: 275, discount: 42, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/makai-masala-papad_1.jpg' },

  // ---- VADE ----
  { id: 'v1', tab: 'VADE', name: 'Homemade Urad Dal Vade (Ready To Fry)', price: 199, mrp: 300, discount: 34, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/batata-sabudana-chakali_1.jpg' },
  { id: 'v2', tab: 'VADE', name: 'Sabudana Vade (Upwas Special)', price: 199, mrp: 300, discount: 34, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/batata-sabudana-chakali_1.jpg' },
  { id: 'v3', tab: 'VADE', name: 'Mixed Dal Vade', price: 210, mrp: 325, discount: 35, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/batata-sabudana-chakali_1.jpg' },
  { id: 'v4', tab: 'VADE', name: 'Homemade Urad Dal Vade (Ready To Fry)', price: 199, mrp: 300, discount: 34, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/batata-sabudana-chakali_1.jpg' },
  { id: 'v5', tab: 'VADE', name: 'Sabudana Vade (Upwas Special)', price: 199, mrp: 300, discount: 34, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/batata-sabudana-chakali_1.jpg' },
  { id: 'v6', tab: 'VADE', name: 'Mixed Dal Vade', price: 210, mrp: 325, discount: 35, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/batata-sabudana-chakali_1.jpg' },
  { id: 'v7', tab: 'VADE', name: 'Homemade Urad Dal Vade (Ready To Fry)', price: 199, mrp: 300, discount: 34, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/batata-sabudana-chakali_1.jpg' },
  { id: 'v8', tab: 'VADE', name: 'Sabudana Vade (Upwas Special)', price: 199, mrp: 300, discount: 34, weight: '400gm', img: 'https://www.chhayakart.com/cdn/shop/files/batata-sabudana-chakali_1.jpg' },

  // ---- FRYUM ----
  { id: 'f1', tab: 'FRYUM', name: 'Star Fryum (Ready To Fry)', price: 149, mrp: 250, discount: 40, weight: '300gm', img: 'https://www.chhayakart.com/cdn/shop/files/upwas-popcorn_1.jpg' },
  { id: 'f2', tab: 'FRYUM', name: 'Wheel Fryum (Ready To Fry)', price: 149, mrp: 250, discount: 40, weight: '300gm', img: 'https://www.chhayakart.com/cdn/shop/files/upwas-popcorn_1.jpg' },
  { id: 'f3', tab: 'FRYUM', name: 'Ring Fryum (Ready To Fry)', price: 160, mrp: 275, discount: 42, weight: '300gm', img: 'https://www.chhayakart.com/cdn/shop/files/upwas-popcorn_1.jpg' },
  { id: 'f4', tab: 'FRYUM', name: 'Star Fryum (Ready To Fry)', price: 149, mrp: 250, discount: 40, weight: '300gm', img: 'https://www.chhayakart.com/cdn/shop/files/upwas-popcorn_1.jpg' },
  { id: 'f5', tab: 'FRYUM', name: 'Wheel Fryum (Ready To Fry)', price: 149, mrp: 250, discount: 40, weight: '300gm', img: 'https://www.chhayakart.com/cdn/shop/files/upwas-popcorn_1.jpg' },
  { id: 'f6', tab: 'FRYUM', name: 'Ring Fryum (Ready To Fry)', price: 160, mrp: 275, discount: 42, weight: '300gm', img: 'https://www.chhayakart.com/cdn/shop/files/upwas-popcorn_1.jpg' },
  { id: 'f7', tab: 'FRYUM', name: 'Star Fryum (Ready To Fry)', price: 149, mrp: 250, discount: 40, weight: '300gm', img: 'https://www.chhayakart.com/cdn/shop/files/upwas-popcorn_1.jpg' },
];

export default function SubCategoryScreen({ categoryId }: { categoryId: any }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('PAPAD');
  const [wishlist, setWishlist] = useState<string[]>([]);

  const filteredProducts = ALL_PRODUCTS.filter(p => p.tab === activeTab);

  const toggleWish = (id: string) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]
    );
  };

  const renderProduct = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={{ uri: item.img }} style={styles.productImage} resizeMode="cover" />
      <View style={styles.cardInfo}>
        <Text style={styles.productName} numberOfLines={3}>{item.name}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{item.price} </Text>
          <Text style={styles.mrp}>₹{item.mrp} </Text>
          <Text style={styles.discount}>({item.discount}% Off)</Text>
        </View>
        <Text style={styles.weight}>{item.weight}</Text>
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

      {/* NAVBAR */}
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

      {/* TABS */}
      <View style={styles.tabsSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContent}>
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

      {/* ✅ Filtered Products — columnWrapperStyle fix */}
      <FlatList
        data={filteredProducts}
        numColumns={3}
        keyExtractor={item => item.id}
        renderItem={renderProduct}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={{ justifyContent: 'flex-start' }}
        key={activeTab}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EFEFEF' },
  sectionGap: { height: 10, backgroundColor: '#EFEFEF' },
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
  navLinksContainer: { flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'flex-end' },
  navItem: { paddingHorizontal: 18, paddingVertical: 8 },
  navLink: { color: 'white', fontSize: 15, fontWeight: '600', letterSpacing: 0.4 },
  cartBtn: { marginLeft: 24, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 50, padding: 8 },
  tabsSection: { backgroundColor: '#ffffff', paddingVertical: 14, paddingHorizontal: 15, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, elevation: 3 },
  tabsContent: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 4 },
  tabBtn: { width: 180, height: 44, justifyContent: 'center', alignItems: 'center', borderWidth: 1.5, borderColor: '#F36D00', borderRadius: 6, backgroundColor: '#fff' },
  tabBtnActive: { backgroundColor: '#F36D00', borderColor: '#F36D00' },
  tabBtnText: { fontSize: 13, fontWeight: '700', color: '#F36D00', letterSpacing: 0.8, textTransform: 'uppercase' },
  tabBtnTextActive: { color: '#ffffff' },
  grid: { padding: 10 },

  // ✅ flex:1 hataya, fixed width '31%' diya
  card: { width: '31%', margin: 6, backgroundColor: '#fff', borderRadius: 10, overflow: 'hidden', flexDirection: 'row', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 5, elevation: 3, minHeight: 180 },

  productImage: { width: 140, height: '100%', backgroundColor: '#f5f5f5' },
  cardInfo: { flex: 1, padding: 10, justifyContent: 'space-between' },
  productName: { fontSize: 12, fontWeight: '600', color: '#222', lineHeight: 17, marginBottom: 4 },
  priceRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginBottom: 2 },
  price: { fontSize: 13, fontWeight: 'bold', color: '#111' },
  mrp: { fontSize: 11, color: '#999', textDecorationLine: 'line-through' },
  discount: { fontSize: 10, color: '#777' },
  weight: { fontSize: 11, color: '#888', marginBottom: 8 },
  btnRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  addBtn: { backgroundColor: '#F9C49E', paddingVertical: 6, paddingHorizontal: 20, borderRadius: 4 },
  addText: { color: '#333', fontWeight: '700', fontSize: 13 },
});