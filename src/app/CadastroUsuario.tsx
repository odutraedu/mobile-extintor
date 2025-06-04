import { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { z } from "zod";
import { useNavigation } from "@react-navigation/native";

const cadastroSchema = z.object({
  nome: z.string().min(2, "Nome obrigatório"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export default function CadastroUsuario() {
  const navigation = useNavigation();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleCadastro() {
    const result = cadastroSchema.safeParse({ nome, email, senha });

    if (!result.success) {
      setErrorMsg(result.error.errors[0].message);
      return;
    }

    try {
      // Aqui você pode fazer uma requisição para sua API de cadastro, exemplo:
      // await api.post("/usuarios", { nome, email, senha });

      // Simulação de sucesso:
      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
      navigation.goBack();
    } catch (err) {
      setErrorMsg("Erro ao cadastrar usuário. Tente novamente.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      {errorMsg !== "" && <Text style={styles.error}>{errorMsg}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24, backgroundColor: "#F5F6FA" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 24, color: "#1976D2" },
  input: {
    width: 260,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: "#FAFAFA",
    fontSize: 16,
    color: "#222",
  },
  button: {
    backgroundColor: "#1976D2",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
    width: 260,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  cancelButton: {
    backgroundColor: "#888",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
    width: 260,
  },
  cancelButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  error: { color: "red", marginBottom: 10, textAlign: "center" },
});