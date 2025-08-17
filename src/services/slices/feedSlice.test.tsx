import { TFeedsResponse } from '@api';
import feedReducer, { FeedState, getFeed } from './feedSlice';
import { TOrder } from '@utils-types';

const initialState: FeedState = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
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

const testFeed: TFeedsResponse = {
  success: true,
  orders: [testOrder1, testOrder2],
  total: 2,
  totalToday: 4
};

describe('Тестирование feedSlice', () => {
  it('Обрабатывает начальное состояние', () => {
    expect(initialState).toEqual(initialState);
  });

  describe('Тестирование getFeed', () => {
    it('Обработчик pending устанавливает корректное состояние', () => {
      const actualState = feedReducer(initialState, { type: getFeed.pending.type });
      expect(actualState).toEqual({ 
        ...initialState,
        loading: true
      });
    });

    it('Обработчик fulfilled устанавливает корректное состояние', () => {
      const actualState = feedReducer(initialState, {
        type: getFeed.fulfilled.type,
        payload: testFeed
      });
      expect(actualState).toEqual({
        ...initialState,
        feed: testFeed
      });
    });

    it('Обработчик rejected устанавливает корректное состояние', () => {
      const errorMessage = 'Ошибка загрузки ленты заказов';
      const actualState = feedReducer(initialState, {
        type: getFeed.rejected.type,
        error: errorMessage
      });
      expect(actualState).toEqual({
        ...initialState,
        error: errorMessage});
    });
  });
});
