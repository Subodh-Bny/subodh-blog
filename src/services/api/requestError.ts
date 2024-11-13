import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export const requestError = (error: AxiosError<IApiResponse, unknown>) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<IApiResponse>;
    if (axiosError.response && axiosError.response.data) {
      const errorMessage = axiosError.response.data.message;
      toast.error(errorMessage);
    } else {
      toast.error("An unknown error occurred. Please try again.");
    }
  } else {
    toast.error("An error occurred. Please try again.");
  }
};
