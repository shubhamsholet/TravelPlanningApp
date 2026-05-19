export interface User {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role: 'user' | 'admin';
  createdAt?: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}