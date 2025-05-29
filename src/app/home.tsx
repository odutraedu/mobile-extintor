import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../hooks/useAuth";
import TabBar from "./tabsBar";


export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          //source={require("../assets/fire-extinguisher.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Bem-vindo ao App de Extintores</Text>
        <Text style={styles.subtitle}>
          Gerencie seus extintores de forma fácil e rápida!
        </Text>
        {user && <Text style={styles.userEmail}>Usuário: {user.email}</Text>}
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
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1976D2",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 16,
    textAlign: "center",
  },
  userEmail: {
    fontSize: 14,
    color: "#888",
    marginTop: 8,
  },
});