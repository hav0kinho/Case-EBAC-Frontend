import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import axios from "../api/axios";
import styled from "styled-components";

import { logout } from "../app/reducers/authSlice";
import { useNavigate } from "react-router-dom";
import { ActionButton } from "../components/ActionButton";

const Container = styled.div`
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  margin-top: 1rem;
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  padding: 1rem;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
`;

const Form = styled.form`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
`;

const Button = styled.button<{ color?: string; hoverColor?: string }>`
  background-color: ${(props) => props.color || "#5067ecff"};
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.hoverColor || "#3e50b6ff"};
  }
`;

const AdminCategoriesPage = () => {
  const dispatch = useAppDispatch(); // Daqui a pouco a gente vê isso
  const navigate = useNavigate();

  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchCategories = async () => {
    const res = await axios.get("/categories/");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/categories/${editingId}/`, { name });
      } else {
        await axios.post("/categories/", { name });
      }
      setName("");
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      console.error("Erro ao salvar categoria:", err);
    }
  };

  const handleEdit = (cat: any) => {
    setEditingId(cat.id);
    setName(cat.name);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Deseja realmente excluir esta categoria?")) return;
    try {
      await axios.delete(`/categories/${id}/`);
      fetchCategories();
    } catch (err) {
      console.error("Erro ao excluir categoria:", err);
    }
  };

  const handleReturnToProducts = () => {
    navigate("/admin");
  };

  return (
    <Container>
      <Title>Gerenciar Categorias</Title>

      <ActionButton onClick={handleReturnToProducts}>
        Voltar para Painel Administrativo
      </ActionButton>

      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Nome da categoria"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Button type="submit" color="#1f8016ff" hoverColor="#11470cff">{editingId ? "Salvar" : "Adicionar"}</Button>
        {editingId && (
          <Button
            type="button"
            color="#757575"
            onClick={() => {
              setEditingId(null);
              setName("");
            }}
          >
            Cancelar
          </Button>
        )}
      </Form>

      <List>
        {categories.map((cat) => (
          <ListItem key={cat.id}>
            <span>{cat.name}</span>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Button type="button" onClick={() => handleEdit(cat)}>
                Editar
              </Button>
              <Button
                onClick={() => handleDelete(cat.id)}
                color="#e62f2fff"
                hoverColor="#c42b2bff"
              >
                Excluir
              </Button>
            </div>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AdminCategoriesPage;
