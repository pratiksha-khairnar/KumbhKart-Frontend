import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Index() {
  const router = useRouter();

  const logoScale   = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textY       = useRef(new Animated.Value(30)).current;
  const tagOpacity  = useRef(new Animated.Value(0)).current;
  const tagY        = useRef(new Animated.Value(20)).current;
  const barWidth    = useRef(new Animated.Value(0)).current;
  const barOpacity  = useRef(new Animated.Value(0)).current;
  const pulseAnim   = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(logoScale, { toValue: 1, friction: 5, tension: 80, useNativeDriver: true }),
      Animated.timing(logoOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.08, duration: 900, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1,    duration: 900, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        ])
      ).start();

      Animated.stagger(150, [
        Animated.parallel([
          Animated.timing(textOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
          Animated.timing(textY,       { toValue: 0, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(tagOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
          Animated.timing(tagY,       { toValue: 0, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        ]),
      ]).start();

      Animated.timing(barOpacity, { toValue: 1, duration: 300, delay: 400, useNativeDriver: true }).start();
      Animated.timing(barWidth, {
        toValue: width * 0.5,
        duration: 2200,
        delay: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    });

    const timer = setTimeout(() => {
router.replace('/(tabs)');
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.bgCircle, { width: 360, height: 360, top: -100, left: -100 }]} />
      <View style={[styles.bgCircle, { width: 260, height: 260, bottom: -60, right: -60 }]} />
      <View style={[styles.bgDot, { width: 6,  height: 6,  top: height * 0.2,  left: 40 }]} />
      <View style={[styles.bgDot, { width: 4,  height: 4,  top: height * 0.35, right: 30 }]} />
      <View style={[styles.bgDot, { width: 8,  height: 8,  bottom: height * 0.25, left: 60 }]} />

      <Animated.View style={[styles.glowRing, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}>
        <View style={styles.glowRingInner} />
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <LinearGradient
            colors={['#ffb700', '#e65c00']}
            style={styles.logoCircle}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}>
            <Text style={styles.logoIcon}>🛒</Text>
          </LinearGradient>
        </Animated.View>
      </Animated.View>

      <Animated.View style={{ opacity: textOpacity, transform: [{ translateY: textY }] }}>
        <Text style={styles.logoText}>
          KUMBH<Text style={styles.logoAccent}>CART</Text>
        </Text>
      </Animated.View>

      <Animated.View style={{ opacity: tagOpacity, transform: [{ translateY: tagY }], alignItems: 'center' }}>
        <Text style={styles.tagline}>Puja Samagri  •  Ghar Pe</Text>
        <View style={styles.divider} />
      </Animated.View>

      <Animated.View style={[styles.barWrap, { opacity: barOpacity }]}>
        <Animated.View style={[styles.barFill, { width: barWidth }]} />
      </Animated.View>
      <Animated.Text style={[styles.loadingText, { opacity: barOpacity }]}>
        Loading...
      </Animated.Text>

      <View style={styles.bottomText}>
        <Text style={styles.bottomCredit}>
          Made with ❤️ for <Text style={styles.bottomAccent}>Kumbh Mela 2025</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a0a00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgCircle: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,153,0,0.07)',
  },
  bgDot: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(255,153,0,0.15)',
  },
  glowRing: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1.5,
    borderColor: 'rgba(255,153,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  glowRingInner: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: 'rgba(255,153,0,0.1)',
  },
  logoCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#ff9900',
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 20,
  },
  logoIcon:   { fontSize: 48 },
  logoText: {
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: 4,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  logoAccent: { color: '#ff9900' },
  tagline: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  divider: {
    width: 40,
    height: 2,
    backgroundColor: 'rgba(255,153,0,0.4)',
    borderRadius: 2,
    marginBottom: 36,
  },
  barWrap: {
    width: width * 0.5,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 12,
  },
  barFill: {
    height: '100%',
    backgroundColor: '#ff9900',
    borderRadius: 3,
  },
  loadingText: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  bottomText: {
    position: 'absolute',
    bottom: 44,
  },
  bottomCredit: {
    color: 'rgba(255,255,255,0.2)',
    fontSize: 11,
    textAlign: 'center',
  },
  bottomAccent: { color: 'rgba(255,153,0,0.5)' },
});