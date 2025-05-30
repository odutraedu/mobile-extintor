import { useRouter, usePathname } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../hooks/useAuth";
import TabBar from "./tabsBar";


export default function ProfileScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{
            uri: "https://ui-avatars.com/api/?name=" + (user?.email || "U"),
          }}
          style={styles.avatar}
        />
        <Text style={styles.text}>Bem-vindo,</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F6FA",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    width: 320,
    marginBottom: 80,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
    backgroundColor: "#E3E3E3",
  },
  text: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
});