import { TOrderResponse } from '@api';
import ordersReducer, { 
  getOrders,
  getOrderByNumber, 
  OrdersState
} from './ordersSlice';
import { TOrder } from '@utils-types';

const initialState: OrdersState = {
  orders: [],
  orderInfo: null,
  loading: false,
  error: null
};

const testOrder1: TOrder = {
  _id: '1',
  ingredients: [
    '643d69a5c3f7b9001cfa093d',
    '643d69a5c3f7b9001cfa093e',
    '643d69a5c3f7b9001cfa093d'
  ],
  status: 'done',
  name: 'Флюоресцентный люминесцентный бургер',
  createdAt: '2025-08-15T20:27:28.193Z',
  updatedAt: '2025-08-15T20:27:29.054Z',
  number: 1
};

const testOrder2: TOrder = {
  _id: '2',
  ingredients: [
    '643d69a5c3f7b9001cfa093d',
    '643d69a5c3f7b9001cfa093e',
    '643d69a5c3f7b9001cfa093d'
  ],
  status: 'done',
  name: 'Флюоресцентный люминесцентный бургер',
  createdAt: '2025-08-15T20:27:28.193Z',
  updatedAt: '2025-08-15T20:27:29.054Z',
  number: 2
};

const testOrders: TOrder[] = [
  testOrder1,
  testOrder2
];

const testOrderInfo: TOrderResponse = {
  success: true,
  orders: [testOrder1, testOrder2]
}

describe('Тестирование ordersSlice', () => {
  it('Обрабатывает начальное состояние', () => {
    expect(initialState).toEqual({
      orders: [],
      orderInfo: null,
      loading: false,
      error: null
    });
  });

  describe('Тестирование getOrders', () => {
    it('Обработчик pending устанавливает корректное состояние', () => {
      const actualState = ordersReducer(initialState, { type: getOrders.pending.type });
      expect(actualState).toEqual({
        ...initialState,
        loading: true
      });
    });

    it('Обработчик fulfilled устанавливает корректное состояние', () => {
      const actualState = ordersReducer(initialState, {
        type: getOrders.fulfilled.type,
        payload: testOrders
      });
      expect(actualState).toEqual({
        ...initialState,
        orders: testOrders
      });
    });

    it('Обработчик rejected устанавливает корректное состояние', () => {
      const errorMessage = 'Ошибка загрузки заказов';
      const actualState = ordersReducer(initialState, {
        type: getOrders.rejected.type,
        error: errorMessage
      });
      expect(actualState).toEqual({
        ...initialState,
        error: errorMessage
      });
    });
  });

  describe('Тестирование getOrderByNumber', () => {
    it('Обработчик pending устанавливает корректное состояние', () => {
      const actualState = ordersReducer(initialState, { type: getOrderByNumber.pending.type });
      expect(actualState).toEqual({
        ...initialState,
        loading: true
      });
    });

    it('Обработчик fulfilled устанавливает корректное состояние', () => {
      const actualState = ordersReducer(initialState, {
        type: getOrderByNumber.fulfilled.type,
        payload: testOrderInfo
      });
      expect(actualState).toEqual({
        ...initialState,
        orderInfo: testOrderInfo.orders[0]
      });
    });

    it('Обработчик rejected устанавливает корректное состояние', () => {
      const errorMessage = 'Ошибка загрузки заказа';
      const actualState = ordersReducer(initialState, {
        type: getOrderByNumber.rejected.type,
        error: errorMessage
      });
      expect(actualState).toEqual({
        ...initialState,
        error: errorMessage
      });
    });
  });
});
