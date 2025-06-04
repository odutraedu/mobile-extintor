import { useCRUD } from "@/src/hooks/useCrud";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";

interface Extintor {
  id: number;
  nome: string;
  classe: string;
  preco: number;
  validade: Date;
  peso: number;
}

const Extintor = () => {
  const { create, loading } = useCRUD<Extintor>("extintor");

  const [nome, setNome] = useState("");
  const [classe, setclasse] = useState("");
  const [preco, setPreco] = useState<number>(0);
  const [validade, setValidade] = useState(() => {
    const hoje = new Date();
    return new Date(hoje.setFullYear(hoje.getFullYear() + 1));
  });
  const [peso, setPeso] = useState<number>(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    setSuccess(false);
    try {
      if (!nome.trim()) throw new Error("O nome é obrigatório.");
      if (!classe.trim()) throw new Error("A classe é obrigatória.");
      if (!preco || preco <= 0) throw new Error("Preço inválido.");
      if (!peso || peso <= 0) throw new Error("Peso inválido.");
      if (!(validade instanceof Date) || isNaN(validade.getTime())) throw new Error("Validade inválida.");

      await create({
        nome,
        classe,
        preco,
        peso,
        validade: validade.toISOString(),
      });
      setNome("");
      setclasse("");
      setPreco(0);
      const hoje = new Date();
      setValidade(new Date(hoje.setFullYear(hoje.getFullYear() + 1)));
      setPeso(0);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Erro ao cadastrar extintor.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F6FA", padding: 24 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Text style={styles.title}>Cadastro de Extintores</Text>
        <TextInput
          value={nome}
          onChangeText={setNome}
          placeholder="Nome"
          style={styles.input}
          placeholderTextColor="#888"
        />
        <TextInput
          value={classe}
          onChangeText={setclasse}
          placeholder="Classe"
          style={styles.input}
          placeholderTextColor="#888"
        />
        <TextInput
          value={preco ? preco.toString() : ""}
          onChangeText={(text) => setPreco(Number(text))}
          placeholder="Preço"
          keyboardType="numeric"
          style={styles.input}
          placeholderTextColor="#888"
        />
        <TextInput
          value={validade.toISOString().slice(0, 10)}
          onChangeText={(text) => setValidade(new Date(text))}
          placeholder="Validade (YYYY-MM-DD)"
          style={styles.input}
          placeholderTextColor="#888"
        />
        <TextInput
          value={peso ? peso.toString() : ""}
          onChangeText={(text) => setPeso(Number(text))}
          placeholder="Peso"
          keyboardType="numeric"
          style={styles.input}
          placeholderTextColor="#888"
        />
        <TouchableOpacity
          style={[styles.button, loading && { backgroundColor: "#ccc" }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Cadastrar</Text>
          )}
        </TouchableOpacity>
        {success && (
          <Text style={styles.successText}>Extintor cadastrado com sucesso!</Text>
        )}
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1976D2",
    marginBottom: 16,
    textAlign: "center",
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
    width: "100%",
  },
  button: {
    backgroundColor: "#1976D2",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  successText: {
    color: "#388e3c",
    marginTop: 12,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  errorText: {
    color: "#D32F2F",
    marginTop: 12,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Extintor;