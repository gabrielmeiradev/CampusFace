export interface RegisterUser {
  username: string;
  email: string;
  password: string;
  birthDate: string;
  cpf: string;
  roles: string[];
  disabled: boolean;
  created_at: string;
  updated_at: string;
}
