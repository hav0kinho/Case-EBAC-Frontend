import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import styled from 'styled-components';

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

const Button = styled.button`
  background-color: ${(props) => props.color || '#2e7d32'};
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
`;

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchCategories = async () => {
    const res = await axios.get('/categories/');
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
        await axios.post('/categories/', { name });
      }
      setName('');
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      console.error('Erro ao salvar categoria:', err);
    }
  };

  const handleEdit = (cat: any) => {
    setEditingId(cat.id);
    setName(cat.name);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Deseja realmente excluir esta categoria?')) return;
    try {
      await axios.delete(`/categories/${id}/`);
      fetchCategories();
    } catch (err) {
      console.error('Erro ao excluir categoria:', err);
    }
  };

  return (
    <Container>
      <Title>Gerenciar Categorias</Title>

      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Nome da categoria"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Button type="submit">{editingId ? 'Salvar' : 'Adicionar'}</Button>
        {editingId && (
          <Button type="button" color="#757575" onClick={() => {
            setEditingId(null);
            setName('');
          }}>
            Cancelar
          </Button>
        )}
      </Form>

      <List>
        {categories.map((cat) => (
          <ListItem key={cat.id}>
            <span>{cat.name}</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button type="button" onClick={() => handleEdit(cat)}>Editar</Button>
              <Button type="button" color="#c62828" onClick={() => handleDelete(cat.id)}>Excluir</Button>
            </div>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AdminCategoriesPage;