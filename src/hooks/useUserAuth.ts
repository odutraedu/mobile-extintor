import { api } from "../app/libs/axios";

export async function criarUsuario(nome: string, email: string, senha: string) {
  const response = await api.post("/user", {
    nome,
    email,
    senha,
  });
  return response.data;
}

export async function autenticarUsuario(email: string, senha: string) {
  const response = await api.post("/user/auth", {
    email,
    senha,
  });
  return response.data;
}
