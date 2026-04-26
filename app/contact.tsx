import { Stack } from 'expo-router';
import AboutScreen from '../src/screens/contactus';

export default function ContactPage() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <AboutScreen />
    </>
  );
}