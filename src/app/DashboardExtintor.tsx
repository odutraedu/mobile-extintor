import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
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
}

export default function DashboardExtintor() {
  const { data, loading, error, getAll } = useCRUD<Extintor>("extintor");
  const [estoquePorClasse, setEstoquePorClasse] = useState<ClasseEstoque[]>([]);

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
    const agrupado: { [classe: string]: number } = {};
    extintores.forEach((ext) => {
      const classeUpper = ext.classe ? ext.classe.toUpperCase() : "";
      const qtd = typeof ext.quantidade === "number" ? ext.quantidade : 1;
      agrupado[classeUpper] = (agrupado[classeUpper] || 0) + qtd;
    });
    setEstoquePorClasse(
      Object.entries(agrupado).map(([classe, total]) => ({ classe, total }))
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard de Extintores por Classe</Text>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#1976D2"
          style={{ marginTop: 20 }}
        />
      ) : error ? (
        <Text style={styles.errorText}>Erro ao carregar dados</Text>
      ) : estoquePorClasse.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma classe encontrada.</Text>
      ) : (
        <>
          <BarChart
            data={{
              labels: estoquePorClasse.map((item) => item.classe),
              datasets: [
                {
                  data: estoquePorClasse.map((item) => item.total),
                },
              ],
            }}
            width={Dimensions.get("window").width - 40}
            height={220}
            yAxisLabel={""}
            yAxisSuffix={""}
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#F5F6FA",
              backgroundGradientTo: "#F5F6FA",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(25, 118, 210, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(68, 68, 68, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#1976D2",
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            fromZero
            showValuesOnTopOfBars
          />
          <FlatList
            data={estoquePorClasse}
            keyExtractor={(item) => item.classe}
            contentContainerStyle={{ paddingBottom: 40 }}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.classe}>Classe: {item.classe}</Text>
                <Text style={styles.total}>Quantidade: {item.total}</Text>
              </View>
            )}
          />
        </>
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
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1976D2",
    marginBottom: 28,
    marginTop: 32,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    width: 320,
    minHeight: 70,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
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
  },
  errorText: {
    color: "#D32F2F",
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  emptyText: {
    color: "#888",
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 40,
  },
});
