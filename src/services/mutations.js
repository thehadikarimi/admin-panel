import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

import api from "@/config/axios";

const useSignup = () => {
  const mutationFn = (data) => api.post("/auth/signup", data);

  return useMutation({ mutationFn });
};

const useLogin = () => {
  const mutationFn = (data) =>
    signIn("credentials", { ...data, redirect: false });

  return useMutation({ mutationFn });
};

const useDeleteUser = () => {
  const mutationFn = (id) => api.delete("/users", { data: { _id: id } });

  return useMutation({ mutationFn });
};

const useAddUser = () => {
  const mutationFn = (data) => api.post("/users", data);

  return useMutation({ mutationFn });
};

const useAddCategory = () => {
  const mutationFn = (data) => api.post("/categories", data);

  return useMutation({ mutationFn });
};

const useDeleteCategory = () => {
  const mutationFn = (id) => api.delete("/categories", { data: { _id: id } });

  return useMutation({ mutationFn });
};

const useUpdateCategory = () => {
  const mutationFn = (data) => api.patch("/categories", data);

  return useMutation({ mutationFn });
};

export {
  useSignup,
  useLogin,
  useDeleteUser,
  useAddUser,
  useAddCategory,
  useDeleteCategory,
  useUpdateCategory,
};
