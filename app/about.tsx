import { Stack } from 'expo-router';
import AboutScreen from '../src/screens/AboutScreen';

export default function AboutPage() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <AboutScreen />
    </>
  );
}