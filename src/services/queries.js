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

  return useQuery({ queryKey, queryFn, refetchOnMount: true });
};

const useGetCategories = () => {
  const queryFn = () => api.get("/categories");
  const queryKey = ["categories"];

  return useQuery({ queryKey, queryFn, refetchOnMount: true });
};

export { useGetProfile, useGetUsers, useGetCategories };
