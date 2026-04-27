import { Stack } from 'expo-router';
import SignInScreen from '../src/screens/signIn';

export default function SignInPage() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SignInScreen />
    </>
  );
}