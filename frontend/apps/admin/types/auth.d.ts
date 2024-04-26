declare namespace Auth {
  export type User = {
    id: string;
    role: string;
    email: string;
    fullname: string;
    is_block: boolean;
    avatar: string;
    createdAt: string;
    updatedAt: string;
    [key: string]: any;
  };

  export type AuthState = { user: User };

  export type LoginResp = Api.Response<User>;
}
