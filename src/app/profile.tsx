import { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../hooks/useAuth";

export default function ProfileScreen() {
  const { user } = useAuth();
  const [nome, setNome] = useState(user?.nome || "");
  const [email, setEmail] = useState(user?.email || "");
  const [editMode, setEditMode] = useState(false);

  // Função fictícia para simular atualização local
  function handleSave() {
    // Validação simples de email
    if (!email.includes("@") || !email.includes(".com")) {
      Alert.alert("Erro", "Digite um email válido contendo '@' e '.com'.");
      return;
    }
    // Aqui você pode chamar uma função de update real se tiver backend
    Alert.alert("Sucesso", "Dados atualizados com sucesso!");
    setEditMode(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{
            uri: "https://ui-avatars.com/api/?name=" + (nome || email || "U"),
          }}
          style={styles.avatar}
        />
        <Text style={styles.text}>Bem-vindo,</Text>
        {editMode ? (
          <>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
              placeholder="Nome"
            />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setEditMode(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.nome}>{nome}</Text>
            <Text style={styles.email}>{email}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setEditMode(true)}
            >
              <Text style={styles.editButtonText}>Alterar Dados</Text>
            </TouchableOpacity>
          </>
        )}
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
  info: {
    fontSize: 16,
    color: "#666",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: "#FAFAFA",
    fontSize: 16,
    color: "#222",
    width: 220,
  },
  editButton: {
    backgroundColor: "#1976D2",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginTop: 16,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#388E3C",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginTop: 8,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#888",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginTop: 8,
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  nome: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 8,
    color: "#333",
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 12,
  },
});
