import { useEffect, useMemo, useState } from "react";
import { fetchPublicProducts } from "../app/reducers/productSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "../app/store";
import styled from "styled-components";

import { ActionButton } from "../components/ActionButton";

import type Category from "../models/Category";
import type Product from "../models/Product";
import axios from "../api/axios"; // seu axios configurado
import { logout } from "../app/reducers/authSlice";

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 2rem;
  font-family: "Segoe UI", sans-serif;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2.5rem;
    color: #3f51b5;
    margin: 0;
  }

  p {
    color: #555;
    font-size: 1rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }
`;

const Img = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const Info = styled.div`
  padding: 1rem;
  flex-grow: 1;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 0.75rem;
`;

const Price = styled.div`
  font-size: 1.1rem;
  color: #2e7d32;
  font-weight: bold;
`;

const Select = styled.select`
  margin-bottom: 2rem;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
`;

const PublicCatalogPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useAppSelector((state) => state.product);
  const token = useSelector((state: RootState) => state.auth.token);

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchPublicProducts());
  }, [dispatch]);

  const filteredProducts = selectedCategoryId
    ? products.filter((p) => p.category?.id === selectedCategoryId)
    : products;

  const getUniqueCategories = () => {
    const seen = new Set<number>();
    const unique: { id: number; name: string }[] = [];

    for (const prod of products) {
      const cat = prod.category;
      if (cat && typeof cat.id === "number" && !seen.has(cat.id)) {
        seen.add(cat.id);
        unique.push(cat);
      }
    }

    return unique;
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const categories = getUniqueCategories();

  return (
    <Wrapper>
      <Header>
        <h1>Huellysin Store - Catálogo de Produtos</h1>
        <p>Confira os produtos disponíveis em nossa loja</p>

        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "center",
            padding: "1rem",
            borderBottom: "1px solid #ccc",
          }}
        >
          <div
            style={{
              width: "500px",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <div>
              {token ? (
                <ActionButton
                  onClick={() => navigate("/admin")}
                  style={{ padding: "1rem 2rem", width: "150px" }}
                >
                  Painel
                </ActionButton>
              ) : (
                <ActionButton
                  onClick={() => navigate("/login")}
                  style={{ padding: "1rem 2rem", width: "150px" }}
                >
                  Logar
                </ActionButton>
              )}
            </div>
            <div>
              {!token && (
                <ActionButton
                  onClick={() => navigate("/register")}
                  style={{
                    padding: "1rem 2rem",
                    backgroundColor: "#246418ff",
                    width: "150px",
                  }}
                >
                  Registrar
                </ActionButton>
              )}
            </div>
            {token && (
              <ActionButton
                onClick={handleLogout}
                style={{ padding: "1rem 2rem", backgroundColor: "#8b2a2aff", width: "150px" }}
              >
                Logout
              </ActionButton>
            )}
          </div>
        </div>
      </Header>

      {/* Dropdown de categorias */}
      <Select
        onChange={(e) => {
          const value = e.target.value;
          setSelectedCategoryId(value ? parseInt(value) : null);
        }}
        value={selectedCategoryId ?? ""}
      >
        <option value="">Todas as categorias</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </Select>

      {loading && <p>Carregando produtos...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Grid>
        {filteredProducts.map((product) => (
          <Card key={product.id}>
            <Img src={product.image_url} alt={product.name} />
            <Info>
              <Title>{product.name}</Title>
              <Description>{product.description}</Description>
              <Price>R$ {product.price}</Price>
            </Info>
          </Card>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default PublicCatalogPage;
