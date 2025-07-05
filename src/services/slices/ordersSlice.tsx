import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getOrderByNumberApi,
  getOrdersApi,
  TOrderResponse
} from '../../utils/burger-api';
import { RootState } from '../store';
import { TOrder } from '@utils-types';

export const getOrders = createAsyncThunk<TOrder[]>(
  'orders/getOrders',
  async () => {
    const data = await getOrdersApi();
    return data;
  }
);

export const getOrderByNumber = createAsyncThunk<TOrderResponse, number>(
  'orders/getOrderByNumber',
  async (orderNumber) => {
    const data = await getOrderByNumberApi(orderNumber);
    return data;
  }
);

interface OrdersState {
  orders: TOrder[];
  orderInfo: TOrder | null;
  loading: boolean;
  error: string | null;
}

export const initialState: OrdersState = {
  orders: [],
  orderInfo: null,
  loading: false,
  error: null
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrderInfo: (state, action) => {
      state.orderInfo = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка загрузки заказов';
        state.loading = false;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.orderInfo = action.payload.orders[0];
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка загрузки заказа';
        state.loading = false;
      });
  }
});

export const ordersSelector = (state: RootState) => state.orders.orders;
export const orderInfoSelector = (state: RootState) => state.orders.orderInfo;
export const loadingSelector = (state: RootState) => state.orders.loading;

export const { setOrderInfo } = ordersSlice.actions;

export default ordersSlice.reducer;
