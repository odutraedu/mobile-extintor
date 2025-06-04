import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Image } from "react-native";
import { z } from "zod";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

// Defina ou importe o tipo RootStackParamList conforme seu projeto
type RootStackParamList = {
  login: undefined;
  Tabs: undefined;
  extintorDetalhe: { extintor: any };
  EditarExtintor: { extintor: any };
  CadastroUsuario: undefined;
};

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function LoginScreen() {
  const { login } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('email@gmail.com');
  const [password, setPassword] = useState('123456');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      setErrorMsg('Email inválido ou senha muito curta.');
      return;
    }

    setLoading(true);
    login(email);

    setTimeout(() => {
      setLoading(false);
      navigation.navigate("Tabs");
    }, 3000);
  }

  function handleCadastroUsuario() {
    navigation.navigate("CadastroUsuario");
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: "https://lh5.googleusercontent.com/proxy/OUqG0HgVNVMNorlPCmI4VgJa-3h7uHLkkMy9vdJ0eRsQlvJBytFUS-HvuW-O9EJd-c9xB7KAqlwby4Fzp59g1705FzBuP-F8dC1ZaBQtmLeCu5i6FfSd6Mmzh8mjOwgrEYZwy5UStg" }}
          style={{ width: 200, height: 200, marginBottom: 20 }}
          resizeMode="contain"
        />
        <Text style={{ fontSize: 18, color: "#1976D2" }}>Entrando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.loginTitle}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errorMsg !== '' && <Text style={styles.error}>{errorMsg}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.cadastroButton]} onPress={handleCadastroUsuario}>
        <Text style={styles.buttonText}>Cadastrar Usuário</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "center", alignItems: "center" },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 8, width: 260 },
  loginTitle: { 
    fontSize: 24, 
    marginBottom: 20, 
    textAlign: "center", 
    color: "#1976D2", 
    fontWeight: "bold"
  },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  error: { color: "red", marginBottom: 10 },
  button: {
    marginTop: 16,
    alignItems: "center",
    padding: 12,
    backgroundColor: "#1976D2",
    borderRadius: 8,
    width: 260,
  },
  cadastroButton: {
    backgroundColor: "#73a599",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});