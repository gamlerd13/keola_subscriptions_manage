export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_Token: string;
  user: {
    id: string;
    name: string;
  };
}
