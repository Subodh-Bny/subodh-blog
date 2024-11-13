type IQueryResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
};

interface IApiResponse {
  success: boolean;
  message: string;
}

interface IUser {
  _id?: string;
  email?: string;
  name?: string;
  password?: string;
}
