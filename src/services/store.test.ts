import { rootReducer } from './store';
import { userSlice } from './slices/userSlice';
import { ingredientsSlice } from './slices/ingredientsSlice';
import { burgerConstructorSlice } from './slices/burgerConstructorSlice';
import { feedSlice } from './slices/feedSlice';
import { ordersSlice } from './slices/ordersSlice';

describe('Тестирование rootReducer', () => {
  it('Инициализирует состояние правильно', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual({
      user: userSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' }),
      ingredients: ingredientsSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' }),
      burger: burgerConstructorSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' }),
      feed: feedSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' }),
      orders: ordersSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' })
    });
  });
});
