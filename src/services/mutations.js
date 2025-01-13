import { useMutation } from "@tanstack/react-query";

import api from "@/config/axios";

const useSignup = () => {
  const mutationFn = (data) => api.post("/api/auth/signup", data);

  return useMutation({ mutationFn });
};

export { useSignup };
