import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";
import endpoints from "../endpoints";
import { requestError } from "./requestError";
import toast from "react-hot-toast";

export const useCreateBlog = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    mutationKey: ["blog"],
    mutationFn: async (data: IBlog) => {
      const response: AxiosResponse<IQueryResponse<IBlog>> =
        await axiosInstance.post<IApiResponse>(endpoints.blog, data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      onSuccess();
    },
    onError: (error) => {
      requestError(error as AxiosError<IApiResponse, unknown>);
    },
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["blog"],
    mutationFn: async (data: IBlog) => {
      const response: AxiosResponse<IQueryResponse<IBlog>> =
        await axiosInstance.put<IApiResponse>(
          endpoints.blog + "/" + data._id,
          data
        );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
    onError: (error) => {
      requestError(error as AxiosError<IApiResponse, unknown>);
    },
  });
};

export const useGetAllBlogs = () => {
  return useQuery<IBlog[], AxiosError>({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response: AxiosResponse<IQueryResponse<IBlog[]>> =
        await axiosInstance.get<IQueryResponse<IBlog[]>>(endpoints.blog);

      return response.data.data || [];
    },
    staleTime: 1000 * 60 * 5,
  });
};
