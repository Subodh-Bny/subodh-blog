import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";
import endpoints from "../endpoints";
import { requestError } from "./requestError";
import toast from "react-hot-toast";
import { IApiResponse, IBlog, IQueryResponse } from "@/types";

export const useCreateBlog = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["blog"],
    mutationFn: async (data: IBlog) => {
      const response: AxiosResponse<IQueryResponse<IBlog>> =
        await axiosInstance.post<IApiResponse>(endpoints.blog, data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["blog"] });

      onSuccess();
    },
    onError: (error) => {
      requestError(error as AxiosError<IApiResponse, unknown>);
    },
  });
};

export const useUpdateBlog = ({ onSuccess }: { onSuccess: () => void }) => {
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
      onSuccess();
    },
    onError: (error) => {
      requestError(error as AxiosError<IApiResponse, unknown>);
    },
  });
};

export const useDeleteBlog = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["blog"],
    mutationFn: async (id: string) => {
      const response: AxiosResponse<IQueryResponse<IBlog>> =
        await axiosInstance.delete<IApiResponse>(endpoints.blog + "/" + id);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["blog"] });
      onSuccess();
    },
    onError: (error) => {
      requestError(error as AxiosError<IApiResponse, unknown>);
    },
  });
};

export const useGetAllBlogs = () => {
  return useQuery<IBlog[], AxiosError>({
    queryKey: ["blog"],
    queryFn: async () => {
      const response: AxiosResponse<IQueryResponse<IBlog[]>> =
        await axiosInstance.get<IQueryResponse<IBlog[]>>(endpoints.blog);
      console.log(response.data.data);
      return response.data.data || [];
    },
    staleTime: 1000 * 60 * 5,
  });
};
