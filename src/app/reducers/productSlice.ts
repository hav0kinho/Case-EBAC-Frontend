import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import type Product from '../../models/Product';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// Buscar produtos lá na rota pública do Django
export const fetchPublicProducts = createAsyncThunk(
  'products/fetchPublic',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/catalog/');
      return response.data;
    } catch (err: any) {
      return rejectWithValue('Erro ao carregar produtos');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPublicProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchPublicProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;