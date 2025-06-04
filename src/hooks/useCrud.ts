import { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { api } from "../app/libs/axios"; // ajuste o caminho se necessário

export function useCRUD<T>(baseUrl: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | T[] | null>(null);

  const handleRequest = async <D = any>(
    method: "get" | "post" | "put" | "patch" | "delete",
    endpoint: string = "",
    payload?: D,
    config?: AxiosRequestConfig
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api({
        method,
        url: `${baseUrl}${endpoint ? `/${endpoint}` : ""}`,
        data: payload,
        headers: {
          "x-api-token": "UNICORNIOcolorido123",
          "Content-Type": "application/json",
        },
        ...config,
      });

      if (method === "put" || method === "patch") {
        setData((prev) => {
          if (Array.isArray(prev)) {
            return prev.map((item: any) =>
              item.id === response.data.id ? response.data : item
            );
          }
          return response.data;
        });
      } else if (method === "delete") {
        setData((prev) => {
          if (Array.isArray(prev)) {
            // endpoint pode ser string, então convertemos para número para comparar com item.id
            return prev.filter((item: any) => item.id !== Number(endpoint));
          }
          return null;
        });
      } else if (method === "post") {
        setData((prev) => {
          if (Array.isArray(prev)) {
            return [...prev, response.data];
          }
          return [response.data];
        });
      } else {
        setData(response.data);
      }

      return response.data;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAll = () => handleRequest("get");
  const getById = (id: number | string) => handleRequest("get", String(id));
  const create = <D>(item: D) => handleRequest("post", "", item);
  const update = <D>(id: number | string, item: D) =>
    handleRequest("put", String(id), item);
  const remove = (id: number | string) => handleRequest("delete", String(id));

  return {
    data,
    loading,
    error,
    getAll,
    getById,
    create,
    update,
    remove,
  };
}