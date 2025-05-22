import { useCRUD } from "@/src/hooks/useCrud"; // Importa o hook customizado para operações CRUD
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Text,
  TextInput,
  View,
} from "react-native";

// Interface que define o formato do objeto extintor
interface Extintor {
  id: number;
  nome: string;
  classe: string;
  preco: number;
  validade: Date;
  peso: number;
}

const Extintor = () => {
  // Usa o hook useCRUD passando a entidade "users" e o tipo extintor.
  // A URL base do hook será algo como: https://suaapi.com/users
  const { data, loading, error, create, getAll, remove } =
    useCRUD<Extintor>("extintor");

  // Estados para armazenar os dados do formulário
  const [nome, setNome] = useState("");
  const [classe, setclasse] = useState("");
  const [preco, setPreco] = useState<number>(0);
  const [validade, setValidade] = useState(new Date());
  const [peso, setPeso] = useState<number>(0);

  // useEffect para buscar todos os extintors assim que o componente for montado
  useEffect(() => {
    getAll(); // Chama a função que faz uma requisição GET para a API
  }, []);

  // Função para cadastrar um novo extintor
  const handleSubmit = async () => {
    const novoExtintor = { nome, classe, preco, validade, peso };
    try {
      await create(novoExtintor); // Chama o método POST do hook
      setNome("");
      setclasse("");
      setPreco(0);
      setValidade(new Date());
      setPeso(0);
    } catch (err) {
      console.error("Erro ao cadastrar extintor:", err);
    }
  };

  const handleCreate = async () => {
    const novoExtintor = { nome };
    try {
      await create(novoExtintor); // Chama o método POST do hook
      setNome("");
      setclasse("");
      setPreco(0);
      setValidade(new Date());
      setPeso(0);
    } catch (err) {
      console.error("Erro ao cadastrar extintor:", err);
    }
  };

  // Função para excluir um extintor
  const handleDelete = async (id: number) => {
    try {
      await remove(id); // Chama o método DELETE do hook
    } catch (err) {
      console.error("Erro ao excluir Exintor:", err);
    }
  };

  // Garante que o valor de `data` seja sempre um array
  const extintorData = Array.isArray(data) ? data : data ? [data] : [];

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        Cadastro de Extintores
      </Text>

      {/* Campo de entrada para nome */}
      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Nome"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      {/* Campo de entrada para classe */}
      <TextInput
        value={classe}
        onChangeText={setclasse}
        placeholder="classe"
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      {/* Campo de entrada para preço */}
      <TextInput
        value={preco.toString()}
        onChangeText={(text) => setPreco(preco)} // Converte o texto para número
        placeholder="Preço"
        keyboardType="numeric"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      {/* Campo de entrada para validade */}
      <TextInput
        value={validade.toString()}
        onChangeText={(text) => setValidade(validade)} // Converte o texto para data
        placeholder="Validade"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      {/* Campo de entrada para peso */}
      <TextInput
        value={peso.toString()}
        onChangeText={(text) => setPeso(Number(text))} // Converte o texto para número
        placeholder="Peso"
        keyboardType="numeric"
        style={{ borderBottomWidth: 1, marginBottom: 50 }}
      />

      {/* Botão para cadastrar */}
      <Button
        title={loading ? "Cadastrando..." : "Cadastrar"}
        onPress={handleSubmit}
        disabled={loading}
      />

      <Text style={{ marginTop: 20, fontWeight: "bold" }}>
        Lista de Extintores:
      </Text>

      {/* Exibe um indicador de carregamento, mensagem de erro ou a lista */}
      {loading ? (
        <ActivityIndicator size="large" color="#196e52" />
      ) : error ? (
        <Text style={{ color: "red" }}>Erro ao carregar Extintor</Text>
      ) : (
        <FlatList
          data={extintorData} // Garante que seja um array
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <Text>
                {item.nome} - {item.classe}
              </Text>
              <Button title="Excluir" onPress={() => handleDelete(item.id!)} />
            </View>
          )}
          keyExtractor={(item) =>
            item.id?.toString() || Math.random().toString()
          }
        />
      )}
    </View>
  );
};

export default Extintor;
