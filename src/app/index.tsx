import { useRouter } from "expo-router";
import { Button, StyleSheet, TextInput, View, Text } from "react-native";
import { z } from "zod";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
//import { useAuth } from '../app/contexts/authContext';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function LoginScreen() {
   const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('email@gmail.com');
  const [password, setPassword] = useState('123456');
  const [errorMsg, setErrorMsg] = useState('');

 function handleSubmit() {
    //O safeParse tenta validar os dados que você passa.
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      setErrorMsg('Email inválido ou senha muito curta.');
      return;
    }

    // Permite qualquer email e senha válidos
    login(email);
    router.push('/home');
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

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

      <Button title="Entrar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "center" },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 8 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  error: { color: "red", marginBottom: 10 },
});
