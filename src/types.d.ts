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

interface IBlog {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  createdAt?: string;
  author: string;
  image: string;
  content: unknown;
}
