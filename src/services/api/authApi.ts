import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";
import endpoints from "../endpoints";
import { requestError } from "./requestError";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IApiResponse, IQueryResponse, IUser } from "@/types";

interface ILoginResponse<T = unknown> extends IQueryResponse {
  token?: string;
  data?: T;
}
export const useLogin = ({ onSuccess }: { onSuccess: () => void }) => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["user"],
    mutationFn: async (data: IUser) => {
      const response: AxiosResponse<ILoginResponse<IUser>> =
        await axiosInstance.post<IApiResponse>(endpoints.login, data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      router.push("/");
      onSuccess();
    },
    onError: (error) => {
      requestError(error as AxiosError<IApiResponse, unknown>);
    },
  });
};
