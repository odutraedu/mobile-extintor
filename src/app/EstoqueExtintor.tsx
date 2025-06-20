import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useCRUD } from "../hooks/useCrud";

interface Extintor {
  id: number;
  nome: string;
  classe: string;
  quantidade?: number;
}

interface ClasseEstoque {
  classe: string;
  total: number;
  ids: number[];
}

export default function EstoqueExtintor() {
  const { data, loading, error, getAll, update } =
    useCRUD<Extintor>("extintor");
  const [estoquePorClasse, setEstoquePorClasse] = useState<ClasseEstoque[]>([]);
  const [quantidades, setQuantidades] = useState<{ [classe: string]: string }>(
    {}
  );

  useFocusEffect(
    useCallback(() => {
      getAll();
    }, [])
  );

  useEffect(() => {
    agruparPorClasse();
  }, [data]);

  const agruparPorClasse = () => {
    const extintores = Array.isArray(data) ? data : data ? [data] : [];
    const agrupado: { [classe: string]: ClasseEstoque } = {};
    extintores.forEach((ext) => {
      const qtd = typeof ext.quantidade === "number" ? ext.quantidade : 1;
      if (!agrupado[ext.classe]) {
        agrupado[ext.classe] = { classe: ext.classe, total: 0, ids: [] };
      }
      agrupado[ext.classe].total += qtd;
      agrupado[ext.classe].ids.push(ext.id);
    });
    setEstoquePorClasse(Object.values(agrupado));
  };

  const handleChangeQuantidade = (classe: string, value: string) => {
    // Permite apenas números inteiros positivos
    if (/^\d*$/.test(value)) {
      setQuantidades((prev) => ({ ...prev, [classe]: value }));
    }
  };

  const registrarMovimentacao = async (
    classe: string,
    tipo: "entrada" | "saida"
  ) => {
    const extintores = Array.isArray(data) ? data : data ? [data] : [];
    const extintoresDaClasse = extintores.filter((e) => e.classe === classe);
    if (extintoresDaClasse.length === 0) return;
    const qtdStr = quantidades[classe] || "1";
    const qtd = Math.max(1, parseInt(qtdStr, 10) || 1);
    try {
      for (const ext of extintoresDaClasse) {
        let novaQuantidade =
          tipo === "entrada"
            ? (ext.quantidade || 1) + qtd
            : Math.max(0, (ext.quantidade || 1) - qtd);
        await update(ext.id, { ...ext, quantidade: novaQuantidade });
      }
      Alert.alert("Sucesso", `Movimentação registrada para classe ${classe}`);
      setQuantidades((prev) => ({ ...prev, [classe]: "" }));
      getAll();
    } catch (e) {
      Alert.alert("Erro", "Não foi possível registrar a movimentação.");
    }
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        Nenhuma classe de extintor encontrada.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Estoque de Extintores por Classe</Text>
      </View>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#1976D2"
          style={{ marginTop: 20 }}
        />
      ) : error ? (
        <Text style={styles.errorText}>Erro ao carregar estoque</Text>
      ) : (
        <FlatList
          data={estoquePorClasse}
          contentContainerStyle={
            estoquePorClasse.length === 0
              ? { flex: 1, justifyContent: "center" }
              : { paddingBottom: 40 }
          }
          ListEmptyComponent={renderEmptyList}
          keyExtractor={(item) => item.classe}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.classe}>Classe: {item.classe}</Text>
              <Text style={styles.total}>Total em estoque: {item.total}</Text>
              <View style={styles.actions}>
                <TextInput
                  style={styles.inputQtd}
                  keyboardType="numeric"
                  placeholder="Qtd"
                  value={quantidades[item.classe] || ""}
                  onChangeText={(v) => handleChangeQuantidade(item.classe, v)}
                  maxLength={4}
                />
                <TouchableOpacity
                  style={[styles.btn, { backgroundColor: "#388E3C" }]}
                  onPress={() => registrarMovimentacao(item.classe, "entrada")}
                >
                  <Text style={styles.btnText}>Entrada +</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.btn, { backgroundColor: "#D32F2F" }]}
                  onPress={() => registrarMovimentacao(item.classe, "saida")}
                >
                  <Text style={styles.btnText}>Saída -</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
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
    marginBottom: 12,
    marginTop: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1976D2",
    textAlign: "left",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
    width: 320,
    minHeight: 90,
  },
  classe: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1976D2",
    marginBottom: 4,
  },
  total: {
    fontSize: 16,
    color: "#444",
    marginBottom: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    marginTop: 8,
    alignItems: "center",
  },
  inputQtd: {
    width: 54,
    height: 38,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 8,
    backgroundColor: "#FAFAFA",
    fontSize: 16,
    color: "#222",
    textAlign: "center",
  },
  btn: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginHorizontal: 4,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
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
