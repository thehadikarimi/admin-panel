import { useQuery } from "@tanstack/react-query";

import api from "@/config/axios";

const useGetProfile = () => {
  const queryFn = () => api.get("/profile");
  const queryKey = ["profile"];

  return useQuery({ queryKey, queryFn });
};

export { useGetProfile };
