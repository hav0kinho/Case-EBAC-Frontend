import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { login } from "../app/reducers/authSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
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
  padding: 0.75rem;
  background: #3f51b5;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useAppSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  // Impressionante quanto isso ficou simples xd
  useEffect(() => {
    if (token) {
      navigate("/admin");
    }
  }, [token, navigate]);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
