import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';
import { orderBurgerApi, TNewOrderResponse } from '../../utils/burger-api';
import { RootState } from '../store';

export const orderBurger = createAsyncThunk<TNewOrderResponse, string[]>(
  'burger/orderBurger',
  async (items) => {
    const data = await orderBurgerApi(items);
    return data;
  }
);

interface BurgerConstructorState {
  ingredients: TConstructorIngredient[];
  loading: boolean;
  error: string | null;
}

export const initialState: BurgerConstructorState = {
  ingredients: [],
  loading: false,
  error: null
};

export const burgerConstructorSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      const ingredient = action.payload;
      if (ingredient.type === 'bun') {
        state.ingredients = state.ingredients.filter(
          (item) => item.type !== 'bun'
        );
        state.ingredients.push(ingredient);
        state.ingredients.push({ ...ingredient });
      } else {
        state.ingredients.push(action.payload);
      }
    },
    deleteIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ id: string; direction: 'up' | 'down' }>
    ) => {
      const { id, direction } = action.payload;
      const currentIndex = state.ingredients.findIndex(
        (item) => item.id === id
      );
      if (currentIndex === -1) return;

      const targetIndex =
        direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      if (targetIndex < 0 || targetIndex >= state.ingredients.length) return;

      const [removedIngredient] = state.ingredients.splice(currentIndex, 1);
      state.ingredients.splice(targetIndex, 0, removedIngredient);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderBurger.fulfilled, (state) => {
        state.loading = false;
        state.ingredients = [];
        state.error = null;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка создания заказа';
      });
  }
});

export const { addIngredient, deleteIngredient, moveIngredient } =
  burgerConstructorSlice.actions;

export const loadingSelector = (state: RootState) => state.burger.loading;
export const errorSelector = (state: RootState) => state.burger.error;
export const ingredientsSelector = (state: RootState) =>
  state.burger.ingredients;

export default burgerConstructorSlice.reducer;
