import { useApi } from "@/page/utils/fetcher";
import { useMutation, useQuery } from "@tanstack/react-query";

export const queryHelper = (link = "", key = [], options = {}) => {
  const ofetch = useApi();

  return useQuery({
    queryFn: () => ofetch(link),
    queryKey: key,
    ...options, // This allows passing additional options like onSuccess
  });
};
export const mutationHelper = (link = "", requestMethod = "PUT") => {
  const ofetch = useApi();

  return useMutation({
    mutationFn: (data) =>
      ofetch(link, {
        method: requestMethod,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }),
  });
};
