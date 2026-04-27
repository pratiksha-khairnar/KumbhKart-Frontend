// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import React, { useRef, useState } from 'react';
// import {
//   FlatList,
//   Image,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Modal,
//   Pressable,
// } from 'react-native';

// const TABS = ['PAPAD', 'KURDAI', 'SEVIYAN', 'UPWAS Papad'];

// // ✅ About Dropdown Items (Same as HomeScreen)
// const ABOUT_DROPDOWN = [
//   { label: 'About Us',           route: '/about' },
//   { label: 'Blog',               route: '/blog' },
//   { label: 'Contact Us',         route: '/contact' },
//   { label: 'Terms & Conditions', route: '/terms' },
//   { label: 'Privacy Policy',     route: '/privacy' },
//   { label: 'Return & Refund',    route: '/refund' },
// ];

// const PRODUCTS = [
//   {
//     id: '1',
//     name: 'Ragi / Nachni / Nagli Papad Online | Finger Millet Papad',
//     price: 199, mrp: 300, discount: 34, weight: '500gm',
//     img: 'https://www.chhayakart.com/cdn/shop/files/ragi-nachni-nagli-papad_1.jpg',
//   },
//   {
//     id: '2',
//     name: 'Batata Sabudana Chakali (Red Chilly Upwas Special CHAKRI)',
//     price: 175, mrp: 300, discount: 42, weight: '400gm',
//     img: 'https://www.chhayakart.com/cdn/shop/files/batata-sabudana-chakali_1.jpg',
//   },
//   {
//     id: '3',
//     name: 'Makai Masala Papad (Corn Papad)',
//     price: 220, mrp: 325, discount: 33, weight: '500gm',
//     img: 'https://www.chhayakart.com/cdn/shop/files/makai-masala-papad_1.jpg',
//   },
//   {
//     id: '4',
//     name: 'Gahu Tandul Papad (Homemade Wheat-Rice Papad)',
//     price: 225, mrp: 350, discount: 36, weight: '500gm',
//     img: 'https://www.chhayakart.com/cdn/shop/files/gahu-tandul-papad_1.jpg',
//   },
//   {
//     id: '5',
//     name: 'Rice/Tandul/Chawal Papad | Homemade Khichiya Papad',
//     price: 199, mrp: 300, discount: 34, weight: '500gm',
//     img: 'https://www.chhayakart.com/cdn/shop/files/rice-tandul-chawal-papad_1.jpg',
//   },
//   {
//     id: '6',
//     name: 'Aaloo (Batata SPRING) (Potato Spring - Ready To Fry)',
//     price: 199, mrp: 300, discount: 34, weight: '400gm',
//     img: 'https://www.chhayakart.com/cdn/shop/files/aaloo-batata-spring_1.jpg',
//   },
//   {
//     id: '7',
//     name: 'Batata Kis (Potato Slices) Ready To Fry',
//     price: 199, mrp: 250, discount: 21, weight: '400gm',
//     img: 'https://www.chhayakart.com/cdn/shop/files/batata-kis_1.jpg',
//   },
//   {
//     id: '8',
//     name: 'Upwas Popcorn (Sabudana Batata Popcorn)',
//     price: 199, mrp: 300, discount: 34, weight: '400gm',
//     img: 'https://www.chhayakart.com/cdn/shop/files/upwas-popcorn_1.jpg',
//   },
//   {
//     id: '9',
//     name: 'KURDAI / KURDAYA (Wheat-GAHU)',
//     price: 175, mrp: 300, discount: 42, weight: '400gm',
//     img: 'https://www.chhayakart.com/cdn/shop/files/kurdai_1.jpg',
//   },
// ];

// export default function SubCategoryScreen({ categoryId }: { categoryId: any }) {
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState('PAPAD');
//   const [wishlist, setWishlist] = useState<string[]>([]);
  
//   // ✅ Dropdown State
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const [btnLayout, setBtnLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
//   const aboutBtnRef = useRef<View>(null);

//   const filteredProducts = ALL_PRODUCTS.filter(p => p.tab === activeTab);

//   const toggleWish = (id: string) => {
//     setWishlist(prev =>
//       prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]
//     );
//   };

//   const renderProduct = ({ item }: any) => (
//     <View style={styles.card}>
//       <Image source={{ uri: item.img }} style={styles.productImage} resizeMode="cover" />
//       <View style={styles.cardInfo}>
//         <Text style={styles.productName} numberOfLines={3}>{item.name}</Text>
//         <View style={styles.priceRow}>
//           <Text style={styles.price}>₹{item.price} </Text>
//           <Text style={styles.mrp}>₹{item.mrp} </Text>
//           <Text style={styles.discount}>({item.discount}% Off)</Text>
//         </View>
//         <Text style={styles.weight}>{item.weight}</Text>
//         <View style={styles.btnRow}>
//           <TouchableOpacity style={styles.addBtn}>
//             <Text style={styles.addText}>Add</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => toggleWish(item.id)}>
//             <Ionicons
//               name={wishlist.includes(item.id) ? 'heart' : 'heart-outline'}
//               size={22}
//               color={wishlist.includes(item.id) ? 'red' : '#aaa'}
//             />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>

//       {/* ============================== */}
//       {/* SECTION 1 — NAVBAR with DROPDOWN */}
//       {/* ============================== */}
//       <View style={styles.header}>
//         <Image
//           source={{ uri: 'https://www.chhayakart.com/cdn/shop/files/ck_logo_white_1.png' }}
//           style={styles.logo}
//           resizeMode="contain"
//         />
//         <View style={styles.navLinksContainer}>
//           <TouchableOpacity style={styles.navItem} onPress={() => router.push('/')}>
//             <Text style={styles.navLink}>Home</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity style={styles.navItem} onPress={() => router.push('/sub-category/31-papad')}>
//             <Text style={styles.navLink}>Categories</Text>
//           </TouchableOpacity>
          
//           {/* ✅ About Us — Dropdown trigger */}
//           <View ref={aboutBtnRef} collapsable={false}>
//             <TouchableOpacity style={styles.aboutBtn} onPress={openDropdown}>
//               <Text style={styles.navLink}>About Us</Text>
//               <Ionicons
//                 name={dropdownVisible ? 'chevron-up' : 'chevron-down'}
//                 size={13}
//                 color="white"
//                 style={{ marginLeft: 4 }}
//               />
//             </TouchableOpacity>
//           </View>
          
//           <TouchableOpacity style={styles.navItem} onPress={() => router.push('/signin')}>
//             <Text style={styles.navLink}>Sign In</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity style={styles.cartBtn}>
//             <Ionicons name="cart" size={26} color="#000" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* ✅ DROPDOWN MODAL */}
//       <Modal
//         visible={dropdownVisible}
//         transparent
//         animationType="fade"
//         onRequestClose={() => setDropdownVisible(false)}
//       >
//         <Pressable style={styles.backdrop} onPress={() => setDropdownVisible(false)}>
//           <View
//             style={[
//               styles.dropdownMenu,
//               { top: btnLayout.y + btnLayout.height + 4, left: btnLayout.x },
//             ]}
//           >
//             {ABOUT_DROPDOWN.map((item, index) => (
//               <TouchableOpacity
//                 key={item.label}
//                 style={[
//                   styles.dropdownItem,
//                   index < ABOUT_DROPDOWN.length - 1 && styles.dropdownBorder,
//                 ]}
//                 onPress={() => {
//                   setDropdownVisible(false);
//                   router.push(item.route as any);
//                 }}
//               >
//                 <Text style={styles.dropdownText}>{item.label}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </Pressable>
//       </Modal>

//       <View style={styles.sectionGap} />

//       {/* TABS */}
//       <View style={styles.tabsSection}>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContent}>
//           {TABS.map(tab => (
//             <TouchableOpacity
//               key={tab}
//               style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
//               onPress={() => setActiveTab(tab)}
//             >
//               <Text style={[styles.tabBtnText, activeTab === tab && styles.tabBtnTextActive]}>
//                 {tab}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </View>

//       <View style={styles.sectionGap} />

//       {/* ============================== */}
//       {/* SECTION 3 — PRODUCT LIST      */}
//       {/* ============================== */}
//       <FlatList
//         data={filteredProducts}
//         numColumns={3}
//         keyExtractor={item => item.id}
//         renderItem={renderProduct}
//         contentContainerStyle={styles.grid}
//         columnWrapperStyle={{ justifyContent: 'flex-start' }}
//         key={activeTab}
//       />

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#EFEFEF' },
//   sectionGap: { height: 10, backgroundColor: '#EFEFEF' },
//   header: {
//     backgroundColor: '#db1c07', // ✅ Deep Red (was #F36D00 Orange)
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 32,
//     paddingTop: Platform.OS === 'web' ? 0 : 44,
//     height: Platform.OS === 'web' ? 76 : 116,
//     justifyContent: 'space-between',
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//     elevation: 8,
//   },
//   logo: { width: 56, height: 56 },
//   navLinksContainer: { flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'flex-end' },
//   navItem: { paddingHorizontal: 18, paddingVertical: 8 },
//   navLink: { color: 'white', fontSize: 15, fontWeight: '600', letterSpacing: 0.4 },
//   cartBtn: { marginLeft: 24, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 50, padding: 8 },
//   tabsSection: { backgroundColor: '#ffffff', paddingVertical: 14, paddingHorizontal: 15, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, elevation: 3 },
//   tabsContent: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 4 },
//   tabBtn: { width: 180, height: 44, justifyContent: 'center', alignItems: 'center', borderWidth: 1.5, borderColor: '#db1c07', borderRadius: 6, backgroundColor: '#fff' },
//   tabBtnActive: { backgroundColor: '#db1c07', borderColor: '#db1c07' },
//   tabBtnText: { fontSize: 13, fontWeight: '700', color: '#db1c07', letterSpacing: 0.8, textTransform: 'uppercase' },
//   tabBtnTextActive: { color: '#ffffff' },
//   grid: { padding: 10 },

//   // ✅ flex:1 hataya, fixed width '31%' diya
//   card: { width: '31%', margin: 6, backgroundColor: '#fff', borderRadius: 10, overflow: 'hidden', flexDirection: 'row', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 5, elevation: 3, minHeight: 180 },

//   productImage: { width: 140, height: '100%', backgroundColor: '#f5f5f5' },
//   cardInfo: { flex: 1, padding: 10, justifyContent: 'space-between' },
//   productName: { fontSize: 12, fontWeight: '600', color: '#222', lineHeight: 17, marginBottom: 4 },
//   priceRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginBottom: 2 },
//   price: { fontSize: 13, fontWeight: 'bold', color: '#111' },
//   mrp: { fontSize: 11, color: '#999', textDecorationLine: 'line-through' },
//   discount: { fontSize: 10, color: '#777' },
//   weight: { fontSize: 11, color: '#888', marginBottom: 8 },

//   btnRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   addBtn: {
//     backgroundColor: '#db1c07', // ✅ Deep Red (was #F9C49E)
//     paddingVertical: 6,
//     paddingHorizontal: 20,
//     borderRadius: 4,
//   },
//   addText: { color: '#fff', fontWeight: '700', fontSize: 13 }, // ✅ Changed to white
// });
















import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const TABS = ['PAPAD', 'KURDAI', 'SEVIYAN', 'UPWAS Papad', 'CHIPS', 'KHAKHRA', 'VADE', 'FRYUM'];

// ✅ About Dropdown Items
const ABOUT_DROPDOWN = [
  { label: 'About Us',           route: '/about' },
  { label: 'Blog',               route: '/blog' },
  { label: 'Contact Us',         route: '/contact' },
  { label: 'Terms & Conditions', route: '/terms' },
  { label: 'Privacy Policy',     route: '/privacy' },
  { label: 'Return & Refund',    route: '/refund' },
];

// ✅ ALL_PRODUCTS with all 8 tabs
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

  // ✅ About Dropdown State
  const [aboutDropdownVisible, setAboutDropdownVisible] = useState(false);
  const [aboutBtnLayout, setAboutBtnLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const aboutBtnRef = useRef<View>(null);

  // ✅ Sign In Dropdown State
  const [signInDropdown, setSignInDropdown] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 });
  const signInBtnRef = useRef<TouchableOpacity>(null);

  // ✅ Login Modal State
  const [loginModal, setLoginModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  // ✅ About Dropdown Open
  const openAboutDropdown = () => {
    if (aboutBtnRef.current) {
      aboutBtnRef.current.measureInWindow((x, y, width, height) => {
        setAboutBtnLayout({ x, y, width, height });
        setAboutDropdownVisible(true);
      });
    } else {
      setAboutDropdownVisible(true);
    }
  };

  // ✅ Sign In Dropdown Open
  const handleSignInPress = () => {
    if (signInBtnRef.current) {
      signInBtnRef.current.measure((_fx, _fy, _w, h, px, py) => {
        setDropdownPos({ top: py + h, right: (typeof window !== 'undefined' ? window.innerWidth : 400) - px - _w });
        setSignInDropdown(true);
      });
    }
  };

  // ✅ Sign In Dropdown Navigation
  const handleDropdownNavigate = async (path: string) => {
    setSignInDropdown(false);
    if (path === '/signIn') {
      setLoginModal(true);
    } else if (path === '/myOrders') {
      const val = await AsyncStorage.getItem('isLoggedIn');
      if (val === 'true') {
        router.push('/myOrders' as any);
      } else {
        setLoginModal(true);
      }
    } else {
      router.push(path as any);
    }
  };

  // ✅ Login Continue
  const handleLoginContinue = async () => {
    if (!termsAccepted || phoneNumber.length < 10) return;
    await AsyncStorage.setItem('isLoggedIn', 'true');
    setLoginModal(false);
    router.push('/myOrders' as any);
  };

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

      {/* ============================== */}
      {/* SECTION 1 — NAVBAR with BOTH DROPDOWNS */}
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

          {/* ✅ About Us Dropdown */}
          <View ref={aboutBtnRef} collapsable={false}>
            <TouchableOpacity style={styles.aboutBtn} onPress={openAboutDropdown}>
              <Text style={styles.navLink}>About Us</Text>
              <Ionicons
                name={aboutDropdownVisible ? 'chevron-up' : 'chevron-down'}
                size={13}
                color="white"
                style={{ marginLeft: 4 }}
              />
            </TouchableOpacity>
          </View>

          {/* ✅ Sign In Dropdown */}
          <TouchableOpacity ref={signInBtnRef} style={styles.navItem} onPress={handleSignInPress}>
            <Text style={styles.navLink}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cartBtn} onPress={() => router.push('/cart')}>
            <Ionicons name="cart" size={26} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ✅ ABOUT DROPDOWN MODAL */}
      <Modal
        visible={aboutDropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setAboutDropdownVisible(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setAboutDropdownVisible(false)}>
          <View
            style={[
              styles.aboutDropdownMenu,
              { top: aboutBtnLayout.y + aboutBtnLayout.height + 4, left: aboutBtnLayout.x },
            ]}
          >
            {ABOUT_DROPDOWN.map((item, index) => (
              <TouchableOpacity
                key={item.label}
                style={[
                  styles.aboutDropdownItem,
                  index < ABOUT_DROPDOWN.length - 1 && styles.aboutDropdownBorder,
                ]}
                onPress={() => {
                  setAboutDropdownVisible(false);
                  router.push(item.route as any);
                }}
              >
                <Text style={styles.aboutDropdownText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>

      {/* ✅ SIGN IN DROPDOWN MODAL */}
      <Modal visible={signInDropdown} transparent animationType="fade" onRequestClose={() => setSignInDropdown(false)}>
        <TouchableWithoutFeedback onPress={() => setSignInDropdown(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={[styles.signInDropdown, { top: dropdownPos.top, right: dropdownPos.right }]}>
                <TouchableOpacity style={styles.dropdownSignInBtn} onPress={() => handleDropdownNavigate('/signIn')}>
                  <Text style={styles.dropdownSignInText}>Sign In</Text>
                </TouchableOpacity>
                <View style={styles.dropdownDivider} />
                {[
                  { label: 'Home', path: '/' },
                  { label: 'My Orders', path: '/myOrders' },
                  { label: 'My Wishlist', path: '/myWishlist' },
                  { label: 'CK Wholesale', path: '/kkWholesale' },
                ].map((item) => (
                  <TouchableOpacity key={item.label} style={styles.dropdownItem} onPress={() => handleDropdownNavigate(item.path)}>
                    <Text style={styles.dropdownItemText}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
                <View style={styles.dropdownItem}>
                  <Text style={styles.dropdownItemText}>
                    Chhaya Purse{'  '}
                    <Text style={styles.comingSoonText}>(Coming Soon)</Text>
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* ✅ LOGIN MODAL */}
      <Modal visible={loginModal} transparent animationType="fade" onRequestClose={() => setLoginModal(false)}>
        <TouchableWithoutFeedback onPress={() => setLoginModal(false)}>
          <View style={styles.loginOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.loginBox}>
                <Text style={styles.loginTitle}>Login</Text>
                <TouchableOpacity style={styles.loginCloseBtn} onPress={() => setLoginModal(false)}>
                  <Ionicons name="close" size={20} color="#333" />
                </TouchableOpacity>
                <Image source={{ uri: 'https://www.chhayakart.com/cdn/shop/files/ck_logo_white_1.png' }} style={styles.loginLogo} resizeMode="contain" />
                <Text style={styles.loginWelcome}>Welcome!</Text>
                <Text style={styles.loginSubText}>Enter phone number to continue and we will send a verification code to this number.</Text>
                <View style={styles.loginInputWrapper}>
                  <View style={styles.loginPhoneRow}>
                    <Text style={styles.loginCountryCode}>+91</Text>
                    <TextInput style={styles.loginPhoneInput} keyboardType="phone-pad" maxLength={10} value={phoneNumber} onChangeText={setPhoneNumber} />
                  </View>
                </View>
                <View style={styles.loginTermsRow}>
                  <TouchableOpacity style={styles.loginCheckboxTouch} onPress={() => setTermsAccepted(!termsAccepted)}>
                    <View style={[styles.checkboxBox, termsAccepted && styles.checkboxChecked]}>
                      {termsAccepted && <Ionicons name="checkmark" size={12} color="#fff" />}
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.loginTermsText}>
                    I Agree to the <Text style={styles.loginLink}>Terms & Condition</Text> and <Text style={styles.loginLink}>Privacy & Policy</Text>
                  </Text>
                </View>
                <TouchableOpacity style={[styles.loginBtn, (!termsAccepted || phoneNumber.length < 10) && styles.loginBtnDisabled]} onPress={handleLoginContinue}>
                  <Text style={styles.loginBtnText}>Login To Continue</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View style={styles.sectionGap} />

      {/* TABS SECTION */}
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

      {/* PRODUCT GRID */}
      <FlatList
        data={filteredProducts}
        numColumns={3}
        keyExtractor={item => item.id}
        renderItem={renderProduct}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={{ justifyContent: 'flex-start' }}
        key={activeTab}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 40 }}>No products in this category</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EFEFEF' },
  sectionGap: { height: 10, backgroundColor: '#EFEFEF' },
  header: {
    backgroundColor: '#db1c07',
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
  aboutBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingVertical: 8 },
  cartBtn: { marginLeft: 24, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 50, padding: 8 },
  
  // About Dropdown Styles
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' },
  aboutDropdownMenu: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 8,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  aboutDropdownItem: { paddingVertical: 12, paddingHorizontal: 16 },
  aboutDropdownBorder: { borderBottomWidth: 1, borderBottomColor: '#eee' },
  aboutDropdownText: { fontSize: 14, color: '#222' },
  
  // Sign In Dropdown Styles
  modalOverlay: { flex: 1, backgroundColor: 'transparent' },
  signInDropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    minWidth: 230,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  dropdownSignInBtn: {
    backgroundColor: '#db1c07',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
  },
  dropdownSignInText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  dropdownDivider: { height: 1, backgroundColor: '#f0f0f0', marginBottom: 8 },
  dropdownItem: { paddingVertical: 12, paddingHorizontal: 20 },
  dropdownItemText: { fontSize: 14, color: '#333', fontWeight: '500' },
  comingSoonText: { color: '#db1c07', fontSize: 12, fontWeight: '400' },
  
  // Login Modal Styles
  loginOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.55)', justifyContent: 'center', alignItems: 'center' },
  loginBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 32,
    width: Platform.OS === 'web' ? 450 : '90%',
    maxWidth: 580,
    alignItems: 'center',
    position: 'relative',
  },
  loginTitle: { alignSelf: 'flex-start', fontSize: 18, fontWeight: '700', color: '#222', marginBottom: 24 },
  loginCloseBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginLogo: { width: 80, height: 80, marginBottom: 18 },
  loginWelcome: { fontSize: 22, fontWeight: '700', color: '#222', marginBottom: 8 },
  loginSubText: { fontSize: 13, color: '#777', textAlign: 'center', marginBottom: 28, lineHeight: 20, paddingHorizontal: 10 },
  loginInputWrapper: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 18,
    overflow: 'hidden',
    backgroundColor: '#f7f7f7',
  },
  loginPhoneRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, height: 54 },
  loginCountryCode: { fontSize: 16, color: '#333', marginRight: 10, fontWeight: '500' },
  loginPhoneInput: { flex: 1, fontSize: 16, color: '#333', height: '100%' },
  loginTermsRow: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginBottom: 28, gap: 10 },
  loginCheckboxTouch: { padding: 2 },
  checkboxBox: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: '#aaa',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: { backgroundColor: '#4CAF86', borderColor: '#4CAF86' },
  loginTermsText: { fontSize: 13, color: '#444', flexShrink: 1 },
  loginLink: { color: '#2E8B57', fontWeight: '600' },
  loginBtn: { backgroundColor: '#4CAF86', width: '100%', height: 54, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  loginBtnDisabled: { backgroundColor: '#92D4B5' },
  loginBtnText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
  
  tabsSection: { backgroundColor: '#ffffff', paddingVertical: 14, paddingHorizontal: 15, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, elevation: 3 },
  tabsContent: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 4 },
  tabBtn: { width: 180, height: 44, justifyContent: 'center', alignItems: 'center', borderWidth: 1.5, borderColor: '#db1c07', borderRadius: 6, backgroundColor: '#fff' },
  tabBtnActive: { backgroundColor: '#db1c07', borderColor: '#db1c07' },
  tabBtnText: { fontSize: 13, fontWeight: '700', color: '#db1c07', letterSpacing: 0.8, textTransform: 'uppercase' },
  tabBtnTextActive: { color: '#ffffff' },
  grid: { padding: 10 },
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
  addBtn: { backgroundColor: '#db1c07', paddingVertical: 6, paddingHorizontal: 20, borderRadius: 4 },
  addText: { color: '#fff', fontWeight: '700', fontSize: 13 },
});