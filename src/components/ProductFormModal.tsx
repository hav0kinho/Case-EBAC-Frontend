import { useState } from 'react';
import { Modal } from './Modal';
import ProductForm from './ProductForm';
import type Product from '../models/Product';

interface ProductFormModalProps {
  open: boolean;
  onClose: () => void;
  productToEdit?: Product | null; // Caso use para edição
}

export const ProductFormModal = ({
  open,
  onClose,
  productToEdit,
}: ProductFormModalProps) => {
  return (
    <Modal open={open} onOpenChange={onClose} title={productToEdit ? 'Editar Produto' : 'Novo Produto'}>
      <ProductForm onSuccess={onClose} initialData={productToEdit} />
    </Modal>
  );
};
