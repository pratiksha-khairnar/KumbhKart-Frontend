import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Dimensions,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

const CartDrawer = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.outside} activeOpacity={1} onPress={onClose} />
        
        <View style={styles.drawerContainer}>
          {/* 1. PROMO BAR */}
          <View style={styles.promoBar}>
            <Text style={styles.promoText}>Additional 12% Cash discount on order above ₹ 9,999</Text>
            <Text style={styles.promoText}>Additional 8% Cash discount on order above ₹ 4,999</Text>
          </View>

          {/* 2. HEADER */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Your Cart</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-circle-outline" size={30} color="#333" />
            </TouchableOpacity>
          </View>

          {/* 3. EMPTY BODY */}
          <View style={styles.emptyBody}>
            
            {/* IMAGE AREA: Yahan humne size ko manually set kiya hai */}
            <View style={styles.illustrationWrapper}>
                <Image 
                  source={require('../../../assets/images/cart_image.jpg')} 
                  // SIZE SET KARNE KE LIYE YE DO LINES BADLEIN:
                  style={{ width: 400, height: 400 }} // <--- Manual Width & Height
                  resizeMode="contain"
                />
            </View>
            
            <Text style={styles.emptyTitle}>Your Cart is empty</Text>
            <Text style={styles.emptySubtitle}>
              You have no items in your shopping cart.{"\n"}Let's go buy something!
            </Text>

            <TouchableOpacity style={styles.startBtn} onPress={onClose}>
              <Text style={styles.startBtnText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)', 
    flexDirection: 'row', 
    justifyContent: 'flex-end',
  },
  outside: { flex: 1 },
  drawerContainer: {
    backgroundColor: 'white',
    // Laptop screen par drawer ki width (35%)
    width: width > 800 ? width * 0.35 : width * 0.85, 
    height: '100%',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.2,
  },
  promoBar: {
    backgroundColor: '#E6F4EA',
    paddingVertical: 12,
    alignItems: 'center',
  },
  promoText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1E7E34',
    textAlign: 'center',
    marginBottom: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  emptyBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  illustrationWrapper: {
    // Is container ko bhi image ke size ke barabar rakhein
    width: 400, 
    height: 400, 
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    marginBottom: 30,
  },
  startBtn: {
    backgroundColor: '#43C68B',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 6,
  },
  startBtnText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default CartDrawer;
