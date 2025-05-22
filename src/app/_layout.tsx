import { Stack } from 'expo-router';
import { AuthProvider } from './contexts/authContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack />
    </AuthProvider>
  );
}
