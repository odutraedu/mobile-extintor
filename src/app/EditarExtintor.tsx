import { useCRUD } from "@/src/hooks/useCrud";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EditarExtintor() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { extintor } = route.params;
  const { update } = useCRUD("extintor");

  const [nome, setNome] = useState(extintor.nome);
  const [classe, setClasse] = useState(extintor.classe);
  const [preco, setPreco] = useState(String(extintor.preco));
  const [peso, setPeso] = useState(String(extintor.peso));
  const [validade, setValidade] = useState(
    extintor.validade ? extintor.validade.slice(0, 10) : ""
  );

 const handleSave = async () => {
  if (!nome || !classe || !preco || !peso || !validade) {
    Alert.alert("Erro", "Preencha todos os campos corretamente.");
    return;
  }
  if (isNaN(Number(preco)) || isNaN(Number(peso))) {
    Alert.alert("Erro", "Preço e Peso devem ser números.");
    return;
  }
  try {
    console.log("Enviando update...");
    await update(extintor.id, {
      nome,
      classe,
      preco: Number(preco),
      peso: Number(peso),
      validade,
    });
    console.log("Alteração realizada com sucesso!");
    Alert.alert(
      "Alteração realizada",
      "Extintor alterado com sucesso!",
      [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]
    );
  } catch (err: any) {
    console.log("Erro ao alterar:", err);
    let msg = "Não foi possível alterar o extintor.";
    if (err?.response?.data?.message) {
      msg = err.response.data.message;
    }
    Alert.alert("Erro", msg);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Extintor</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome"
      />
      <TextInput
        style={styles.input}
        value={classe}
        onChangeText={setClasse}
        placeholder="Classe"
      />
      <TextInput
        style={styles.input}
        value={preco}
        onChangeText={setPreco}
        placeholder="Preço"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={peso}
        onChangeText={setPeso}
        placeholder="Peso"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={validade}
        onChangeText={setValidade}
        placeholder="Validade (YYYY-MM-DD)"
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1976D2",
    marginBottom: 24,
    alignSelf: "center",
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
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  cancelButton: {
    backgroundColor: "#888",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  cancelButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
