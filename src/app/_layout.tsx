import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Extintor from "./components/extintor";
import { AuthProvider } from "./contexts/authContext";
import EditarExtintor from "./EditarExtintor";
import ExtintorDetalhe from "./extintorDetalhe";
import ListaExtintor from "./ListaExtintor";
import ProfileScreen from "./profile";
import TabsBar from "./tabsBar";
import LoginScreen from "./index";
import CadastroUsuario from "./CadastroUsuario";

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
    </Tabs.Navigator>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
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