import { useCRUD } from "@/src/hooks/useCrud";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import TabBar from "../tabsBar";

interface Extintor {
  id: number;
  nome: string;
  classe: string;
  preco: number;
  validade: Date;
  peso: number;
}

const Extintor = () => {
  const { data, loading, error, create, getAll, remove } =
    useCRUD<Extintor>("extintor");

  const [nome, setNome] = useState("");
  const [classe, setclasse] = useState("");
  const [preco, setPreco] = useState<number>(0);
  const [validade, setValidade] = useState(new Date());
  const [peso, setPeso] = useState<number>(0);

  const router = useRouter();

  useEffect(() => {
    getAll();
  }, []);

  const handleSubmit = async () => {
    try {
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
      setValidade(new Date());
      setPeso(0);
    } catch (err) {
      console.error("Erro ao cadastrar extintor:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await remove(id);
    } catch (err) {
      console.error("Erro ao excluir Extintor:", err);
    }
  };

  const extintorData = Array.isArray(data) ? data : data ? [data] : [];

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F6FA" }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.card}>
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
            <Text style={styles.buttonText}>
              {loading ? "Cadastrando..." : "Cadastrar"}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.listTitle}>Lista de Extintores</Text>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#1976D2"
            style={{ marginTop: 20 }}
          />
        ) : error ? (
          <Text style={{ color: "red", marginTop: 20 }}>
            Erro ao carregar Extintor
          </Text>
        ) : (
          <FlatList
            data={extintorData}
            style={{ width: "100%" }}
            contentContainerStyle={{ paddingBottom: 80 }}
            renderItem={({ item }) => (
              <View style={styles.extintorCard}>
                <View>
                  <Text style={styles.extintorNome}>{item.nome}</Text>
                  <Text style={styles.extintorInfo}>
                    Classe:{" "}
                    <Text style={{ fontWeight: "bold" }}>{item.classe}</Text>
                  </Text>
                  <Text style={styles.extintorInfo}>
                    Preço: R$ {item.preco?.toFixed(2)}
                  </Text>
                  <Text style={styles.extintorInfo}>Peso: {item.peso} kg</Text>
                  <Text style={styles.extintorInfo}>
                    Validade:{" "}
                    {item.validade
                      ? new Date(item.validade).toLocaleDateString()
                      : ""}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.id!)}
                >
                  <Text style={styles.deleteButtonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) =>
              item.id?.toString() || Math.random().toString()
            }
          />
        )}
      </KeyboardAvoidingView>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F5F6FA",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
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
  },
  button: {
    backgroundColor: "#1976D2",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    alignSelf: "flex-start",
  },
  extintorCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  extintorNome: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1976D2",
    marginBottom: 2,
  },
  extintorInfo: {
    fontSize: 14,
    color: "#444",
    marginBottom: 1,
  },
  deleteButton: {
    backgroundColor: "#D32F2F",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default Extintor;