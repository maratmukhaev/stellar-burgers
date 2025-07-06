import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '../../utils/burger-api';
import { RootState } from '../store';

export const getIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/getIngredients',
  async () => {
    const data = await getIngredientsApi();
    return data;
  }
);

interface IngredientsState {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
}

export const initialState: IngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredients: (state, action) => {
      state.ingredients = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка загрузки ингредиентов';
        state.loading = false;
      });
  }
});

export const ingredientsSelector = (state: RootState) =>
  state.ingredients.ingredients;
export const loadingSelector = (state: RootState) => state.ingredients.loading;

export default ingredientsSlice.reducer;
