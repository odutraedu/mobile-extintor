import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useAuth } from "../hooks/useAuth";

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const { logout } = useAuth();

  const handleTab = (routeName: string, index: number) => {
    if (routeName === "logout") {
      logout();
      navigation.navigate("home"); // Redireciona para "home" após logout
    } else if (state.index !== index) {
      navigation.navigate(routeName);
    }
  };

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        let label = "Home";
        if (route.name === "components/extintor") label = "Extintor";
        else if (route.name === "profile") label = "Perfil";
        else if (route.name === "index") label = "Início";

        return (
          <TouchableOpacity
            key={route.key}
            style={[styles.tabButton, isFocused && styles.tabButtonActive]}
            onPress={() => handleTab(route.name, index)}
          >
            <Text style={[styles.tabButtonText, isFocused && styles.tabButtonTextActive]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity style={styles.tabButton} onPress={() => handleTab("logout", -1)}>
        <Text style={styles.tabButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    height: 64,
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 10,
    paddingTop: 6,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 12,
  },
  tabButtonActive: {
    backgroundColor: "#1976D2",
  },
  tabButtonText: {
    color: "#1976D2",
    fontWeight: "bold",
    fontSize: 16,
  },
  tabButtonTextActive: {
    color: "#fff",
  },
});