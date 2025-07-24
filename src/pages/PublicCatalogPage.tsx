import { useEffect } from 'react';
import { fetchPublicProducts } from "../app/reducers/productSlice"
import { useAppDispatch, useAppSelector } from '../app/hooks';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;

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
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.12);
  }
`;

const Img = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
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

const PublicCatalogPage = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchPublicProducts());
  }, [dispatch]);

  return (
    <Wrapper>
      <Header>
        <h1>Huellysin Store - Catálogo de Produtos</h1>
        <p>Confira os produtos disponíveis em nossa loja</p>
      </Header>

      {loading && <p>Carregando produtos...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <Grid>
        {products.map((product) => (
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