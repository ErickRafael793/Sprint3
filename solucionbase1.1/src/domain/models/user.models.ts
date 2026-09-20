export interface UserName {
  firstname: string;
  lastname: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  phone?: string;
  name: UserName;
}
