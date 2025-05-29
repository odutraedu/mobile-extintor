import axios from "axios";

export const api = axios.create({
  baseURL: "http://10.120.6.81:3000", // ip dinamico
});

api.interceptors.request.use(
  (config) => {
    //let loggedUser = 91;

    //config.data.userId = loggedUser;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//O interceptador so pode ser usado com uma instancia do axios
//antes de ser enviado para o servidor - request
//ou a resposta - response
