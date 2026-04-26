import { Stack, useLocalSearchParams } from 'expo-router';
import SubCategoryScreen from '../../src/screens/SubCategoryScreen';

export default function SubCategoryPage() {
  const { id } = useLocalSearchParams();

  return (
    <>
      {/* ✅ Expo Router ka default white header band karo */}
      <Stack.Screen options={{ headerShown: false }} />

      <SubCategoryScreen categoryId={id} />
    </>
  );
}