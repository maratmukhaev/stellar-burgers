import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  TUserResponse,
  TLoginData,
  TAuthResponse,
  TRegisterData,
  registerUserApi,
  loginUserApi,
  logoutApi,
  getUserApi,
  updateUserApi,
  TServerResponse,
  forgotPasswordApi,
  resetPasswordApi
} from '../../utils/burger-api';
import { TUser, TUserReset } from '@utils-types';
import { setCookie, deleteCookie } from '../../utils/cookie';
import { RootState } from '../store';

export const registerUser = createAsyncThunk<TAuthResponse, TRegisterData>(
  'user/registerUser',
  async (data) => {
    const userData = await registerUserApi(data);
    localStorage.setItem('refreshToken', userData.refreshToken);
    return userData;
  }
);

export const loginUser = createAsyncThunk<TAuthResponse, TLoginData>(
  'user/loginUser',
  async (data) => {
    const userData = await loginUserApi(data);
    localStorage.setItem('refreshToken', userData.refreshToken);
    return userData;
  }
);

export const getUser = createAsyncThunk<TUserResponse>(
  `user/getUser`,
  async () => {
    const userData = await getUserApi();
    return userData;
  }
);

export const updateUser = createAsyncThunk<
  TUserResponse,
  Partial<TRegisterData>
>(`user/updateUser`, async (data) => {
  const userData = await updateUserApi(data);
  return userData;
});

export const logoutUser = createAsyncThunk<TServerResponse<{}>>(
  `user/logoutUser`,
  async () => {
    const userData = await logoutApi();
    return userData;
  }
);

export const forgotPassword = createAsyncThunk<
  TServerResponse<{}>,
  Pick<TLoginData, 'email'>
>(`user/forgotPassword`, async (data) => {
  const userData = await forgotPasswordApi(data);
  return userData;
});

export const resetPassword = createAsyncThunk<TServerResponse<{}>, TUserReset>(
  `user/resetPassword`,
  async (data) => {
    const userData = await resetPasswordApi(data);
    return userData;
  }
);

export interface UserState {
  user: TUser | null;
  isAuthCheck: boolean;
  error: string | null;
}

export const initialState: UserState = {
  user: null,
  isAuthCheck: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isAuthCheck = false;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthCheck = true;
        state.user = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthCheck = true;
        state.error =
          action.error.message || 'Не удалось зарегистрировать пользователя';
      })
      .addCase(loginUser.pending, (state) => {
        state.isAuthCheck = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthCheck = true;
        state.user = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthCheck = true;
        state.error = action.error.message || 'Не удалось авторизоваться';
      })
      .addCase(getUser.pending, (state) => {
        state.isAuthCheck = false;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthCheck = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthCheck = true;
        state.error = action.error.message || 'Не удалось найти пользователя';
      })
      .addCase(updateUser.pending, (state) => {
        state.isAuthCheck = false;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthCheck = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isAuthCheck = true;
        state.error =
          action.error.message || 'Не удалось обновить данные пользователя';
      })
      .addCase(logoutUser.pending, (state) => {
        state.isAuthCheck = false;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthCheck = true;
        state.user = null;
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isAuthCheck = true;
        state.error = action.error.message || 'Не удалось разлогиниться';
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isAuthCheck = false;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isAuthCheck = true;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isAuthCheck = true;
        state.error = action.error.message || 'Не удалось восстановить пароль';
      })
      .addCase(resetPassword.pending, (state) => {
        state.isAuthCheck = false;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isAuthCheck = true;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isAuthCheck = true;
        state.error = action.error.message || 'Не удалось сбросить пароль';
      });
  }
});

export const userSelector = (state: RootState) => state.user.user;
export const isAuthCheckSelector = (state: RootState) => state.user.isAuthCheck;
export const errorSelector = (state: RootState) => state.user.error;

export default userSlice.reducer;
