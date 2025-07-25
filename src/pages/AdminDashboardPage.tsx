import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import axios from "../api/axios";
import styled from "styled-components";
import { logout } from "../app/reducers/authSlice";
import { useNavigate } from "react-router-dom";

import ProductForm from "../components/ProductForm";

const Page = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  background-color: #3f51b5;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  background-color: #f0f0f0;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

const AdminDashboard = () => {
  const dispatch = useAppDispatch(); // Daqui a pouco a gente vê isso
  const navigate = useNavigate();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  useEffect(() => {
    const fetchAdminProducts = async () => {
      try {
        const response = await axios.get("/products/");
        setProducts(response.data);
        console.log(response);
      } catch (error) {
        console.error("Erro ao buscar produtos no admin:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProducts();
  }, []);

  const deleteProduct = async (productId: number) => {
    const confirm = window.confirm(
      "Tem certeza que deseja excluir este produto?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`/products/${productId}/`);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

    const handleReturn = () => {
    navigate("/");
  }

  return (
    <Page>
      <Header>
        <h1>Painel Administrativo - Em fase de testes XD</h1>


      <Button onClick={handleReturn} style={{ backgroundColor: "#257ed1ff" }}>
        Voltar para Catálogo
      </Button>

        <Button
          onClick={handleLogout}
          style={{ backgroundColor: "#f44336" }}
        >
          Logout
        </Button>
        <Button
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
        >
          + Novo Produto
        </Button>
      </Header>

      {showForm && (
        <ProductForm
          initialData={editingProduct}
          onSuccess={() => {
            setShowForm(false);
            window.location.reload(); // recarrega lista
          }}
        />
      )}

      {loading ? (
        <p>Carregando produtos...</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>Nome</Th>
              <Th>Preço</Th>
              <Th>Estoque</Th>
              <Th>Ativo</Th>
              <Th>Ações</Th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id}>
                <Td>{prod.name}</Td>
                <Td>R$ {prod.price}</Td>
                <Td>{prod.stock}</Td>
                <Td>{prod.active ? "Ativo" : "Inativo"}</Td>
                <Td>
                  <Button
                    onClick={() => {
                      setEditingProduct(prod);
                      setShowForm(true);
                    }}
                  >
                    Editar
                  </Button>{" "}
                  <Button
                    onClick={() => deleteProduct(prod.id)}
                    style={{ backgroundColor: "#c62828" }}
                  >
                    Excluir
                  </Button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Page>
  );
};

export default AdminDashboard;
