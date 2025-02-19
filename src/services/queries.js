import { useQuery } from "@tanstack/react-query";

import api from "@/config/axios";

const useGetProfile = () => {
  const queryFn = () => api.get("/profile");
  const queryKey = ["profile"];

  return useQuery({ queryKey, queryFn });
};

const useGetUsers = () => {
  const queryFn = () => api.get("/users");
  const queryKey = ["users"];

  return useQuery({ queryKey, queryFn });
};

const useGetUserById = (userId) => {
  const queryFn = () => api.get(`/users/${userId}`);
  const queryKey = ["user", userId];

  return useQuery({ queryKey, queryFn });
};

const useGetCategories = () => {
  const queryFn = () => api.get("/categories");
  const queryKey = ["categories"];

  return useQuery({ queryKey, queryFn });
};

export { useGetProfile, useGetUsers, useGetUserById, useGetCategories };
