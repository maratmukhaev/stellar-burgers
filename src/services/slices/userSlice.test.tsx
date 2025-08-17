import userReducer, {
  getUser,
  registerUser,
  loginUser,
  updateUser,
  logoutUser,
  UserState
} from './userSlice';
import { TUser } from '@utils-types';
import { TAuthResponse, TRegisterData } from '@api';

const userTestData: TUser = {
  email: 'test@test.ru',
  name: 'Иван'
};
  
const userRegData: TRegisterData = { 
  email: 'new@test.ru',
  name: 'Новый Пользователь',
  password: '12345'
};

const loginUserData: TAuthResponse = {
  success: true,
  refreshToken: 'refreshToken',
  accessToken: 'accessToken',
  user: userTestData
};

const updatedUserData: TUser = {
  email: 'updated@test.ru',
  name: 'Обновленный Пользователь'
};

describe('Тестирование userSlice', () => {
  const initialState: UserState = {
    user: null,
    isAuthCheck: false,
    error: null
  };

  it('Обрабатывает начальное состояние при асинхронном запросе', () => {
    expect(initialState).toEqual({
      user: null,
      isAuthCheck: false,
      error: null
    });
  });

  describe('Тестирование registerUser', () => {
    it('Обработчик pending устанавливает корректное состояние', () => {
      const actualState = userReducer(initialState, { type: registerUser.pending.type });
      expect(actualState).toEqual(initialState);
    });

    it('Обработчик fulfilled устанавливает корректное состояние', () => {
      const actualState = userReducer(initialState, { 
        type: registerUser.fulfilled.type,
        payload: { user: userRegData }
      });
      expect(actualState).toEqual({
        ...initialState,
        user: userRegData,
        isAuthCheck: true
      });
    });

    it('Обработчик rejected устанавливает корректное состояние', () => {
      const errorMessage = 'Не удалось зарегистрировать пользователя';
      const actualState = userReducer(initialState, { 
        type: registerUser.rejected.type,
        error: errorMessage
      })
      expect(actualState).toEqual({
        ...initialState,
        isAuthCheck: true,
        error: errorMessage
      });
    });
  });

  describe('Тестирование getUser', () => {
    it('Обработчик pending устанавливает корректное состояние', () => {
      const actualState = userReducer(initialState, { type: getUser.pending.type });
      expect(actualState).toEqual(initialState);
    });

    it('Обработчик fulfilled устанавливает корректное состояние', () => {
      const actualState = userReducer(initialState, {
        type: getUser.fulfilled.type,
        payload: { user: userTestData }
      });
      expect(actualState).toEqual({
        ...initialState,
        user: userTestData,
        isAuthCheck: true
      });
    });

    it('Обработчик rejected устанавливает корректное состояние', () => {
      const errorMessage = 'Не удалось получить данные пользователя';
      const actualState = userReducer(initialState, {
        type: getUser.rejected.type,
        error: errorMessage
      });
      expect(actualState).toEqual({
        ...initialState,
        isAuthCheck: true,
        error: errorMessage
      });
    });
  });

  describe('Тестирование loginUser', () => {
    it('Обработчик pending устанавливает корректное состояние', () => {
      const actualState = userReducer(initialState, { type: loginUser.pending.type });
      expect(actualState).toEqual(initialState);
    });
    
    it('Обработчик fulfilled устанавливает корректное состояние', () => {
      const actualState = userReducer(initialState, {
        type: loginUser.fulfilled.type,
        payload: loginUserData
      });
      expect(actualState).toEqual({
        ...initialState,
        user: loginUserData.user,
        isAuthCheck: true,
      });
    });

    it('Обработчик rejected устанавливает корректное состояние', () => {
      const errorMessage = 'Не удалось авторизоваться';
      const actualState = userReducer(initialState, {
        type: loginUser.rejected.type,
        error: errorMessage
      });
      expect(actualState).toEqual({
        ...initialState,
        isAuthCheck: true,
        error: errorMessage
      });
    });
  });

  describe('Тестирование updateUser', () => {
    it('Обработчик pending устанавливает корректное состояние', () => {
      const actualState = userReducer(initialState, { type: updateUser.pending.type });
      expect(actualState).toEqual(initialState);
    });
    
    it('Обработчик fulfilled устанавливает корректное состояние', () => {
      const actualState = userReducer(initialState, {
        type: updateUser.fulfilled.type,
        payload: { user: updatedUserData }
      });
      expect(actualState).toEqual({
        ...initialState,
        user: updatedUserData,
        isAuthCheck: true
      });
    });
    
    it('Обработчик rejected устанавливает корректное состояние', () => {
      const errorMessage = 'Не удалось обновить данные пользователя';
      const actualState = userReducer(initialState, {
        type: updateUser.rejected.type,
        error: errorMessage
      });
      expect(actualState).toEqual({
        ...initialState,
        isAuthCheck: true,
        error: errorMessage
      });
    });
  });

  describe('Тестирование logoutUser', () => {
    it('Обработчик pending устанавливает корректное состояние', () => {
      const actualState = userReducer(initialState, { type: logoutUser.pending.type });
      expect(actualState).toEqual(initialState);
    });
    
    it('Обработчик fulfilled устанавливает корректное состояние', () => {
      const actualState = userReducer(initialState, {
        type: logoutUser.fulfilled.type
      });
      expect(actualState).toEqual({
        ...initialState,
        isAuthCheck: true
      });
    });
    
    it('Обработчик rejected устанавливает корректное состояние', () => {
      const errorMessage = 'Не удалось разлогиниться';
      const actualState = userReducer(initialState, {
        type: logoutUser.rejected.type,
        error: errorMessage
      });
      expect(actualState).toEqual({
        ...initialState,
        isAuthCheck: true,
        error: errorMessage
      });
    });
  });
});
