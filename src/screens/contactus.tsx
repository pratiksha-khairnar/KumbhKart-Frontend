import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  TextInput,
  Alert,
  SafeAreaView,
  StatusBar,
  Image,
  Platform,
  Modal,
  Pressable,
} from 'react-native';

// ✅ About Dropdown Items (Same as HomeScreen)
const ABOUT_DROPDOWN = [
  { label: 'About Us',           route: '/about' },
  { label: 'Blog',               route: '/blog' },
  { label: 'Contact Us',         route: '/contact' },
  { label: 'Terms & Conditions', route: '/terms' },
  { label: 'Privacy Policy',     route: '/privacy' },
  { label: 'Return & Refund',    route: '/refund' },
];

const ContactUs = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  // ✅ Dropdown State
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [btnLayout, setBtnLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const aboutBtnRef = useRef<View>(null);

  // ✅ Open Dropdown Function
  const openDropdown = () => {
    if (aboutBtnRef.current) {
      aboutBtnRef.current.measure((_fx, _fy, width, height, px, py) => {
        setBtnLayout({ x: px, y: py, width, height });
        setDropdownVisible(true);
      });
    }
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:contact@chhayakart.com');
  };

  const handleInstagramPress = () => {
    Linking.openURL('https://www.instagram.com/chhayakart');
  };

  const handleSubmit = () => {
    if (!name || !email || !message) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    Alert.alert('Success', 'Your message has been sent! We will contact you soon.');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#F36D00" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ============================== */}
        {/* SECTION 1 — NAVBAR WITH DROPDOWN */}
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
            
            {/* ✅ About Us — Dropdown trigger */}
            <View ref={aboutBtnRef} collapsable={false}>
              <TouchableOpacity style={styles.aboutBtn} onPress={openDropdown}>
                <Text style={styles.navLink}>About Us</Text>
                <Ionicons
                  name={dropdownVisible ? 'chevron-up' : 'chevron-down'}
                  size={13}
                  color="white"
                  style={{ marginLeft: 4 }}
                />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity style={styles.navItem}>
              <Text style={styles.navLink}>Sign In</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.cartBtn}>
              <Ionicons name="cart" size={26} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ✅ DROPDOWN MODAL */}
        <Modal
          visible={dropdownVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setDropdownVisible(false)}
        >
          <Pressable style={styles.backdrop} onPress={() => setDropdownVisible(false)}>
            <View
              style={[
                styles.dropdownMenu,
                { top: btnLayout.y + btnLayout.height + 4, left: btnLayout.x },
              ]}
            >
              {ABOUT_DROPDOWN.map((item, index) => (
                <TouchableOpacity
                  key={item.label}
                  style={[
                    styles.dropdownItem,
                    index < ABOUT_DROPDOWN.length - 1 && styles.dropdownBorder,
                  ]}
                  onPress={() => {
                    setDropdownVisible(false);
                    router.push(item.route as any);
                  }}
                >
                  <Text style={styles.dropdownText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Pressable>
        </Modal>

        <View style={styles.sectionGap} />

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>We'd Love to Hear From You! 💬</Text>
          <Text style={styles.heroSubtitle}>
            We would be happy to assist you with any information you may need
          </Text>
        </View>

        {/* Contact Options */}
        <View style={styles.contactOptions}>
          <TouchableOpacity style={styles.contactCard} onPress={handleEmailPress}>
            <Text style={styles.contactIcon}>📧</Text>
            <Text style={styles.contactTitle}>Email Us</Text>
            <Text style={styles.contactDetail}>contact@chhayakart.com</Text>
            <Text style={styles.contactAction}>Send Email →</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard} onPress={handleInstagramPress}>
            <Text style={styles.contactIcon}>📷</Text>
            <Text style={styles.contactTitle}>Instagram</Text>
            <Text style={styles.contactDetail}>@chhayakart</Text>
            <Text style={styles.contactAction}>Follow us →</Text>
          </TouchableOpacity>
        </View>

        {/* Contact Form */}
        <View style={styles.formSection}>
          <Text style={styles.formTitle}>Send us a Message</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#999"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Your Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="#999"
          />
          
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Your Message"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
            placeholderTextColor="#999"
          />
          
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Send Message</Text>
          </TouchableOpacity>
        </View>

        {/* Gallery Section */}
        <View style={styles.gallerySection}>
          <Text style={styles.galleryTitle}>Our Gallery 📸</Text>
          <View style={styles.galleryGrid}>
            <View style={styles.galleryItem}>
              <Text style={styles.galleryEmoji}>🛒</Text>
              <Text style={styles.galleryLabel}>Fresh Groceries</Text>
            </View>
            <View style={styles.galleryItem}>
              <Text style={styles.galleryEmoji}>🌾</Text>
              <Text style={styles.galleryLabel}>Farm Fresh</Text>
            </View>
            <View style={styles.galleryItem}>
              <Text style={styles.galleryEmoji}>🥬</Text>
              <Text style={styles.galleryLabel}>Organic</Text>
            </View>
            <View style={styles.galleryItem}>
              <Text style={styles.galleryEmoji}>🚚</Text>
              <Text style={styles.galleryLabel}>Fast Delivery</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
  },

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
  logo: { 
    width: 56, 
    height: 56 
  },
  navLinksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  navItem: { 
    paddingHorizontal: 18, 
    paddingVertical: 8 
  },
  navLink: { 
    color: 'white', 
    fontSize: 15, 
    fontWeight: '600', 
    letterSpacing: 0.4 
  },
  
  // ✅ About Us Button with Dropdown
  aboutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  
  cartBtn: {
    marginLeft: 24,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 50,
    padding: 8,
  },

  /* ✅ DROPDOWN STYLES */
  backdrop: { flex: 1, backgroundColor: 'transparent' },
  dropdownMenu: {
    position: 'absolute',
    width: 210,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    zIndex: 1000,
  },
  dropdownItem: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  dropdownBorder: { borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  dropdownText: { fontSize: 14, color: '#333', fontWeight: '500' },

  /* ---- Hero Section ---- */
  heroSection: {
    backgroundColor: '#F36D00',
    padding: 24,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },

  /* ---- Contact Options ---- */
  contactOptions: {
    padding: 16,
    gap: 16,
  },
  contactCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  contactIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  contactDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  contactAction: {
    fontSize: 14,
    color: '#F36D00',
    fontWeight: '600',
  },

  /* ---- Form Section ---- */
  formSection: {
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 8,
    marginHorizontal: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#F36D00',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  /* ---- Gallery Section ---- */
  gallerySection: {
    padding: 16,
    marginTop: 8,
    marginBottom: 20,
  },
  galleryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  galleryItem: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },
  galleryEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  galleryLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default ContactUs;