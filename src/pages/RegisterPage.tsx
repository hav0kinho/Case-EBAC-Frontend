import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "../api/axios";
import type { RegisterFormData, RegisterFormErrors } from "../models/Form";

const Container = styled.div`
  max-width: 400px;
  margin: 4rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 0.75rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
`;

const Button = styled.button`
  width: 100%;
  background-color: #2e7d32;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
`;

const Error = styled.p`
  color: red;
  text-align: center;
`;

const RegisterPage = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    password: "",
    password2: "",
  });

  const [formErrors, setFormErrors] = useState<RegisterFormErrors>({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = handleValidation(formData);
    setFormErrors(validationErrors);
    setError("");

    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.post("/register/", {
          username: formData.username,
          password: formData.password,
          password2: formData.password2,
        });
        navigate("/login");
      } catch (err: any) {
        setError("Erro ao registrar. Tente outro nome de usuário.");
        console.error(err);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleValidation = (form: RegisterFormData): RegisterFormErrors => {
    const errors: RegisterFormErrors = {};

    if (!form.username.trim()) {
      errors.username = "O nome de usuário é obrigatório.";
    } else if (form.username.trim().length < 3) {
      errors.username = "O nome de usuário deve ter pelo menos 3 caracteres.";
    }

    if (!form.password) {
      errors.password = "A senha é obrigatória.";
    } else if (form.password.length < 8) {
      errors.password = "A senha deve ter no mínimo 8 caracteres.";
    }

    if (!form.password2) {
      errors.password2 = "A confirmação de senha é obrigatória.";
    } else if (form.password !== form.password2) {
      errors.password2 = "As senhas não coincidem.";
    }

    return errors;
  };

  return (
    <Container>
      <Title>Registrar Conta</Title>
      <form onSubmit={handleRegister}>
        <Input
          type="text"
          name="username"
          placeholder="Usuário"
          value={formData.username}
          onChange={handleChange}
        />
        {formErrors.username && <Error>{formErrors.username}</Error>}

        <Input
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
        />
        {formErrors.password && <Error>{formErrors.password}</Error>}

        <Input
          type="password"
          name="password2"
          placeholder="Confirmação de Senha"
          value={formData.password2}
          onChange={handleChange}
        />
        {formErrors.password2 && <Error>{formErrors.password2}</Error>}

        <Button type="submit">Registrar</Button>
        {error && <Error>{error}</Error>}
      </form>
    </Container>
  );
};


export default RegisterPage;
