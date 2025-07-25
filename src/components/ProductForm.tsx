import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "../api/axios";

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
`;

const Button = styled.button`
  background-color: #2e7d32;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: bold;
`;

interface ProductFormProps {
  initialData?: any; // usado para edição
  onSuccess: () => void;
}

const ProductForm = ({ initialData, onSuccess }: ProductFormProps) => {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [price, setPrice] = useState(initialData?.price || "");
  const [stock, setStock] = useState(initialData?.stock || "");
  const [image_url, setImageURL] = useState(initialData?.image_url || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [categories, setCategories] = useState<any[]>([]);
  const [active, setActive] = useState(initialData?.active ?? true);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get("/categories/");
      setCategories(res.data);
    };
    fetchCategories();
    console.log(initialData);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name,
      description,
      price,
      stock,
      image_url,
      category_id: category,
      active,
    };

    try {
      if (initialData) {
        await axios.put(`/products/${initialData.id}/`, payload);
        console.log(payload);
      } else {
        console.log(payload);
        await axios.post("/products/", payload);
      }
      onSuccess();
    } catch (err) {
      console.error("Erro ao salvar produto:", err);
    }
    window.location.reload();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>Nome</Label>
      <Input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          console.log(e.target.value);
        }}
        required
      />

      <Label>Descrição</Label>
      <Input
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          console.log(e.target.value);
        }}
        required
      />

      <Label>Preço</Label>
      <Input
        type="number"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
          console.log(e.target.value);
        }}
        required
      />

      <Label>Estoque</Label>
      <Input
        type="number"
        value={stock}
        onChange={(e) => {
          setStock(e.target.value);
          console.log(e.target.value);
        }}
        required
      />

      <Label>Imagem (URL)</Label>
      <Input
        value={image_url}
        onChange={(e) => {
          setImageURL(e.target.value);
          console.log(e.target.value);
        }}
        required
      />

      <Label>Categoria</Label>
      <Select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          console.log(e.target.value);
        }}
        required
      >
        <option value="">Selecione</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </Select>

      <Label>
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
        />{" "}
        Ativo
      </Label>

      <Button type="submit">
        {initialData ? "Salvar Alterações" : "Criar Produto"}
      </Button>
    </Form>
  );
};

export default ProductForm;
