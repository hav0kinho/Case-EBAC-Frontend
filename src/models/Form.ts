export interface RegisterFormData {
  username: string;
  password: string;
  password2: string;
}

export interface RegisterFormErrors {
  username?: string;
  password?: string;
  password2?: string;
}