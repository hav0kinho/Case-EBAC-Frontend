import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from '../api/axios';

const Container = styled.div`
  max-width: 400px;
  margin: 4rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 0.75rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
        const novoUsuario = { username, password, password2: passwordConfirm };
        console.log(novoUsuario)
      await axios.post('/register/', novoUsuario);
      navigate('/login');
    } catch (err: any) {
      setError('Erro ao registrar. Tente outro nome de usuário.');
      console.error(err);
    }
  };

  return (
    <Container>
      <Title>Registrar Conta</Title>
      <form onSubmit={handleRegister}>
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
        <Input
          type="password"
          placeholder="Confirmação de Senha"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
        />
        <Button type="submit">Registrar</Button>
        {error && <Error>{error}</Error>}
      </form>
    </Container>
  );
};

export default RegisterPage;