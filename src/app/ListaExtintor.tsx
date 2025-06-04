import React, { useEffect, useState } from "react";
import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { useCRUD } from "@/src/hooks/useCrud";
import { useAuth } from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

interface Extintor {
  id: number;
  nome: string;
  classe: string;
  preco: number;
  validade: Date;
  peso: number;
}

type RootStackParamList = {
  ListaExtintor: undefined;
  extintorDetalhe: { extintor: Extintor };
  // add other routes if needed
};

export default function ListaExtintor() {
  useFocusEffect(
    useCallback(() => {
      getAll();
    }, [])
  );
  const { user } = useAuth();
  const { data, loading, error, getAll } = useCRUD<Extintor>("extintor");
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [filtro, setFiltro] = useState("");
  const [extintoresFiltrados, setExtintoresFiltrados] = useState<Extintor[]>([]);

  useEffect(() => {
    getAll();
  }, []);

  // Alerta para extintores vencidos
  useEffect(() => {
    if (data) {
      const extintores = Array.isArray(data) ? data : [data];
      const hoje = new Date();
      const vencidos = extintores.filter((item) => {
        const validade = new Date(item.validade);
        return validade < hoje;
      });
      if (vencidos.length > 0) {
        Alert.alert(
          "Atenção!",
          `Existem ${vencidos.length} extintor(es) vencido(s)!`,
          [{ text: "OK" }]
        );
      }
    }
  }, [data]);

  // Filtro de extintores
  useEffect(() => {
    const extintorData = Array.isArray(data) ? data : data ? [data] : [];
    if (filtro.trim() === "") {
      setExtintoresFiltrados(extintorData);
    } else {
      setExtintoresFiltrados(
        extintorData.filter((item) =>
          item.nome.toLowerCase().includes(filtro.toLowerCase()) ||
          item.classe.toLowerCase().includes(filtro.toLowerCase())
        )
      );
    }
  }, [data, filtro]);

  const handleDetail = (item: Extintor) => {
    navigation.navigate("extintorDetalhe", { extintor: item });
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Nenhum extintor cadastrado.</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lista de Extintores</Text>
      </View>
      <TextInput
        style={styles.filtroInput}
        placeholder="Buscar por nome ou classe..."
        value={filtro}
        onChangeText={setFiltro}
        placeholderTextColor="#888"
      />
      {loading ? (
        <ActivityIndicator size="large" color="#1976D2" style={{ marginTop: 20 }} />
      ) : error ? (
        <Text style={styles.errorText}>Erro ao carregar Extintores</Text>
      ) : (
        <FlatList
          data={extintoresFiltrados}
          style={{ width: "100%" }}
          contentContainerStyle={
            extintoresFiltrados.length === 0 ? { flex: 1, justifyContent: "center" } : { paddingBottom: 40 }
          }
          ListEmptyComponent={renderEmptyList}
          renderItem={({ item }) => {
            const validade = new Date(item.validade);
            const hoje = new Date();
            const isVencido = validade < hoje;
            return (
              <TouchableOpacity onPress={() => handleDetail(item)} activeOpacity={0.7}>
                <View style={[styles.extintorCard, isVencido && styles.extintorCardVencido]}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.extintorNome}>{item.nome}</Text>
                    <Text style={styles.extintorInfo}>
                      <Text style={styles.label}>Classe:</Text> {item.classe}
                    </Text>
                    <Text style={styles.extintorInfo}>
                      <Text style={styles.label}>Preço:</Text> R$ {item.preco?.toFixed(2)}
                    </Text>
                    <Text style={styles.extintorInfo}>
                      <Text style={styles.label}>Peso:</Text> {item.peso} kg
                    </Text>
                    <Text style={styles.extintorInfo}>
                      <Text style={styles.label}>Validade:</Text>{" "}
                      {item.validade ? validade.toLocaleDateString() : ""}
                    </Text>
                    {isVencido && (
                      <Text style={styles.vencidoText}>VENCIDO</Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        />
      )}
      {user && <Text style={styles.userEmail}>Usuário: {user.email}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F5F6FA",
  },
  header: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 18,
    marginTop: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1976D2",
    textAlign: "left",
  },
  filtroInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    backgroundColor: "#FAFAFA",
    fontSize: 16,
    color: "#222",
  },
  extintorCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
    width: "100%",
    minHeight: 110,
  },
  extintorCardVencido: {
    borderColor: "#D32F2F",
    borderWidth: 2,
    backgroundColor: "#FFF0F0",
  },
  extintorNome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1976D2",
    marginBottom: 4,
  },
  extintorInfo: {
    fontSize: 15,
    color: "#444",
    marginBottom: 2,
  },
  label: {
    fontWeight: "bold",
    color: "#222",
  },
  vencidoText: {
    color: "#D32F2F",
    fontWeight: "bold",
    marginTop: 6,
    fontSize: 15,
  },
  userEmail: {
    fontSize: 14,
    color: "#888",
    marginTop: 8,
  },
  errorText: {
    color: "#D32F2F",
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  emptyText: {
    color: "#888",
    fontSize: 16,
    fontStyle: "italic",
  },
});