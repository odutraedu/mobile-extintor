import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import type { StackNavigationProp } from '@react-navigation/stack';
import { useCRUD } from "../hooks/useCrud";
import { useCallback, useState } from "react";

type RootStackParamList = {
  Tabs: { screen: string } | undefined;
  ListaExtintor: undefined;
  extintorDetalhe: { extintor: any };
  EditarExtintor: { extintor: any };
  home: undefined;
};

export default function ExtintorDetalhe() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<any>();
  const { remove, getById } = useCRUD<any>("extintor");

  const [extintor, setExtintor] = useState(route.params.extintor);

  useFocusEffect(
    useCallback(() => {
      const fetchExtintor = async () => {
        try {
          const atualizado = await getById(extintor.id);
          if (atualizado) setExtintor(atualizado);
        } catch (e) {
          // Se der erro, mantém o antigo
        }
      };
      fetchExtintor();
    }, [extintor.id])
  );

  const handleDelete = () => {
    const excluir = async () => {
      try {
        await remove(extintor.id);
        navigation.navigate("Tabs", { screen: "ListaExtintor" }); // ✅ Mantém as tabs
      } catch (e) {
        Alert.alert("Erro", "Não foi possível excluir o extintor.");
      }
    };

    Alert.alert("Excluir", "Tem certeza que deseja excluir este extintor?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: excluir,
      },
    ]);
  };

  const handleEdit = () => {
    navigation.navigate("EditarExtintor", { extintor });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Detalhe do Extintor</Text>
      </View>
      <Text style={styles.title}>{extintor.nome}</Text>
      <Text style={styles.info}>
        <Text style={styles.label}>Classe:</Text> {extintor.classe}
      </Text>
      <Text style={styles.info}>
        <Text style={styles.label}>Preço:</Text> R$ {extintor.preco?.toFixed(2)}
      </Text>
      <Text style={styles.info}>
        <Text style={styles.label}>Peso:</Text> {extintor.peso} kg
      </Text>
      <Text style={styles.info}>
        <Text style={styles.label}>Validade:</Text>{" "}
        {extintor.validade ? new Date(extintor.validade).toLocaleDateString() : ""}
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Excluir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.editButtonText}>Alterar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    padding: 24,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  header: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 8,
    marginTop: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1976D2",
    textAlign: "left",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 40,
    gap: 16,
  },
  backButton: {
    backgroundColor: "#1976D2",
    borderRadius: 28,
    width: 110,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  backButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#D32F2F",
    borderRadius: 28,
    width: 110,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  deleteButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "#FFA000",
    borderRadius: 28,
    width: 110,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  editButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1976D2",
    marginBottom: 18,
    marginTop: 24,
    alignSelf: "flex-start",
  },
  info: {
    fontSize: 18,
    color: "#444",
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
    color: "#222",
  },
});
