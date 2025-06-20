import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CadastroUsuario from "./CadastroUsuario";
import Extintor from "./components/extintor";
import { AuthProvider } from "./contexts/authContext";
import EditarExtintor from "./EditarExtintor";
import ExtintorDetalhe from "./extintorDetalhe";
import LoginScreen from "./index";
import ListaExtintor from "./ListaExtintor";
import ProfileScreen from "./profile";
import SplashScreen from "./SplashScreen";
import TabsBar from "./tabsBar";

const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabsNavigator() {
  return (
    <Tabs.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabsBar {...props} />}
    >
      <Tabs.Screen name="ListaExtintor" component={ListaExtintor} />
      <Tabs.Screen name="components/extintor" component={Extintor} />
      <Tabs.Screen name="profile" component={ProfileScreen} />
      <Tabs.Screen
        name="DashboardExtintor"
        component={require("./DashboardExtintor").default}
      />
    </Tabs.Navigator>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="Tabs" component={TabsNavigator} />
        <Stack.Screen name="ListaExtintor" component={ListaExtintor} />
        <Stack.Screen name="extintorDetalhe" component={ExtintorDetalhe} />
        <Stack.Screen name="EditarExtintor" component={EditarExtintor} />
        <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} />
      </Stack.Navigator>
    </AuthProvider>
  );
}
