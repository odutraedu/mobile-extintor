// RootLayout.tsx
import { AuthProvider } from "./contexts/authContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "./profile";
import Extintor from "./components/extintor";
import HomeScreen from "./home";
import TabsBar from "./tabsBar";


export default function RootLayout() {
  const Tabs = createBottomTabNavigator();

  return (
    <AuthProvider>
      <Tabs.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <TabsBar {...props} />}
      >
          
        <Tabs.Screen name="home" component={HomeScreen} />

        <Tabs.Screen name="components/extintor" component={Extintor} />
        <Tabs.Screen name="profile" component={ProfileScreen} />

      </Tabs.Navigator>
    </AuthProvider>
  );
}
