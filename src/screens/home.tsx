import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

const ITEMS_PER_ROW = 6;
const CONTAINER_PADDING = 15;
const ITEM_GAP = 8;
const CAT_W = Math.floor(
  (width - CONTAINER_PADDING * 2 - ITEM_GAP * (ITEMS_PER_ROW - 1)) / ITEMS_PER_ROW
);

const Home = () => {
  const router = useRouter();

  const categories = [
    { name: 'PAPAD',     img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200' },
    { name: 'SEASONAL',  img: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=200' },
    { name: 'INSTANT',   img: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=200' },
    { name: 'PUJA',      img: 'https://images.unsplash.com/photo-1621274220348-41229fac9529?w=200' },
    { name: 'MILLET',    img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200' },
    { name: 'SNACKS',    img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c17580?w=200' },
    { name: 'PICKLE',    img: 'https://images.unsplash.com/photo-1589113331515-998f26550f8c?w=200' },
    { name: 'MASALA',    img: 'https://images.unsplash.com/photo-1596797038530-2c39bb050b12?w=200' },
    { name: 'SWEET',     img: 'https://images.unsplash.com/photo-1589113331515-998f26550f8c?w=200' },
    { name: 'GROCERY',   img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200' },
    { name: 'JEWELLERY', img: 'https://images.unsplash.com/photo-1515562141207-7a18b5ce7142?w=200' },
    { name: 'HOUSEHOLD', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200' },
  ];

  const renderGrid = (data: any[]) => {
    return (
      <View style={styles.grid}>
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => router.push({ pathname: '/sub-category/[id]', params: { id: item.name } })}
          >
            <View style={[styles.catBox, { width: CAT_W, height: CAT_W }]}>
              <Image
                source={item.img}
                style={styles.catImage}
                contentFit="contain"
                transition={200}
              />
            </View>
            <Text style={styles.catLabel} numberOfLines={1}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source="https://www.chhayakart.com/cdn/shop/files/ck_logo_white_1.png"
          style={styles.logo}
          contentFit="contain"
        />
        <View style={styles.navLinks}>

          {/* ✅ Home button */}
          <TouchableOpacity onPress={() => router.push('/')}>
            <Text style={styles.navItem}>Home</Text>
          </TouchableOpacity>

          {/* ✅ Categories button — ab clickable hai */}
          <TouchableOpacity onPress={() => router.push({ pathname: '/sub-category/[id]', params: { id: 'PAPAD' } })}>
            <Text style={styles.navItem}>Categories</Text>
          </TouchableOpacity>

          {/* Sign In */}
          <Text style={styles.navItem}>Sign In</Text>

          <TouchableOpacity style={{ marginLeft: 12 }}>
            <Ionicons name="cart-outline" size={22} color="#fff" />
          </TouchableOpacity>

        </View>
      </View>

      {/* HERO */}
      <View style={styles.heroWrapper}>
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80' }}
          style={styles.heroBg}>
          <View style={styles.heroOverlay}>
            <Text style={styles.heroSubText}>
              Empowering Rural India Through Authentic Flavors
            </Text>
            <View style={styles.searchBar}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search Products..."
                placeholderTextColor="#999"
              />
              <TouchableOpacity style={styles.searchButton}>
                <Text style={styles.searchButtonText}>Search</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>

      {/* FREE DELIVERY */}
      <View style={styles.deliveryBar}>
        <Text style={styles.deliveryText}>FREE DELIVERY FOR ALL PRODUCTS 🚚</Text>
      </View>

      {/* SHOP BY CATEGORY */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SHOP BY CATEGORY</Text>
        <View style={styles.divider} />
        <View style={styles.centeredContainer}>
          {renderGrid(categories)}
        </View>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <View style={styles.footerTaglineBox}>
          <Text style={styles.footerTagline}>
            Chhayakart: Empowered Minds, Flourishing Enterprises: Cultivating Success, Growing Together
          </Text>
        </View>

        <View style={styles.footerMainRow}>
          <View style={styles.footerCol}>
            <Text style={styles.footerHead}>Get In Touch</Text>
            <Text style={styles.footerText}>Plot No. 21, ZP Colony,</Text>
            <Text style={styles.footerText}>Near Dutt Mandir Chowk,</Text>
            <Text style={styles.footerText}>Deopur, Dhule 424005</Text>
            <Text style={[styles.footerText, { marginTop: 10 }]}>
              Email: contact@chhayakart.com
            </Text>
            <View style={styles.socialRow}>
              <FontAwesome name="facebook-square" size={20} color="white" style={styles.socialIcon} />
              <FontAwesome name="instagram"       size={20} color="white" style={styles.socialIcon} />
              <FontAwesome name="linkedin-square" size={20} color="white" style={styles.socialIcon} />
              <FontAwesome name="youtube-play"    size={20} color="white" style={styles.socialIcon} />
              <FontAwesome name="twitter"         size={20} color="white" style={styles.socialIcon} />
            </View>
          </View>

          <View style={styles.footerCol}>
            <Text style={styles.footerHead}>Categories</Text>
            {['Season Special','Instant Food','Millet Superfood','Organic Foodgrain','Puja & Prasad'].map(t => (
              <Text key={t} style={styles.footerLink}>{t}</Text>
            ))}
          </View>

          <View style={styles.footerCol}>
            <Text style={styles.footerHead}>Essentials</Text>
            {['Cookies','Fitness Food',"Mom's Essential"].map(t => (
              <Text key={t} style={styles.footerLink}>{t}</Text>
            ))}
          </View>

          <View style={styles.footerCol}>
            <Text style={styles.footerHead}>Chatpata</Text>
            {['Snacks & Namkeen','Chutney & Masala','Pickels'].map(t => (
              <Text key={t} style={styles.footerLink}>{t}</Text>
            ))}
          </View>

          <View style={styles.footerCol}>
            <Text style={styles.footerHead}>Quick Links</Text>
            {['About Us','Blog','Chhayakart Terms','Chhayakart Policies','Return & Refund'].map(t => (
              <Text key={t} style={styles.footerLink}>{t}</Text>
            ))}
          </View>
        </View>
      </View>

    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: '#fff' },
  header:   { backgroundColor: '#f36d00', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingTop: 20, paddingBottom: 6, justifyContent: 'space-between' },
  logo:     { width: 40, height: 40 },
  navLinks: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  navItem:  { color: 'white', fontSize: 14, fontWeight: '500' },
  heroWrapper: { width: '100%', height: 180 },
  heroBg:      { width: '100%', height: '100%' },
  heroOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  heroSubText: { color: 'white', fontSize: 14, textAlign: 'center', marginBottom: 12, fontWeight: '700' },
  searchBar:        { flexDirection: 'row', backgroundColor: 'white', width: '95%', height: 40, borderRadius: 5, overflow: 'hidden' },
  searchInput:      { flex: 1, paddingHorizontal: 12, fontSize: 12 },
  searchButton:     { backgroundColor: '#f36d00', paddingHorizontal: 15, justifyContent: 'center' },
  searchButtonText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  deliveryBar:  { backgroundColor: '#f36d00', padding: 8, alignItems: 'center' },
  deliveryText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  section:           { marginTop: 15 },
  sectionTitle:      { fontSize: 18, color: '#333', fontWeight: '700', marginLeft: CONTAINER_PADDING, marginBottom: 5 },
  divider:           { height: 1, backgroundColor: '#eee', marginBottom: 10, marginHorizontal: 20 },
  centeredContainer: { paddingHorizontal: CONTAINER_PADDING, width: '100%' },
  grid:     { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', gap: ITEM_GAP },
  card:     { alignItems: 'center', marginBottom: 15 },
  catBox:   { borderWidth: 1, borderColor: '#e0e0e0', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', padding: 5 },
  catImage: { width: '90%', height: '90%' },
  catLabel: { fontSize: 14, fontWeight: 'bold', marginTop: 5, textAlign: 'center', color: '#000', width: CAT_W },
  footer:          { backgroundColor: '#666', marginTop: 30 },
  footerTaglineBox:{ padding: 15, borderBottomWidth: 0.5, borderBottomColor: '#888', alignItems: 'center' },
  footerTagline:   { color: 'white', fontSize: 12, textAlign: 'center' },
  footerMainRow:   { padding: 30, flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' },
  footerCol:       { minWidth: 150, marginBottom: 20 },
  footerHead:      { color: 'white', fontSize: 24, fontWeight: '400', marginBottom: 15, fontFamily: 'serif' },
  footerText:      { color: 'white', fontSize: 12, lineHeight: 18 },
  footerLink:      { color: 'white', fontSize: 12, marginBottom: 8 },
  socialRow:       { flexDirection: 'row', marginTop: 20 },
  socialIcon:      { marginRight: 15 },
});