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
  updateUserApi
} from '../../utils/burger-api';
import { TUser, RequestStatus } from '@utils-types';
import { setCookie, deleteCookie } from 'src/utils/cookie';
import { RootState } from '../store';

export const registerUser = createAsyncThunk<TAuthResponse, TRegisterData>(
  'user/registerUser',
  async (userData) => {
    const data = await registerUserApi(userData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const loginUser = createAsyncThunk<TAuthResponse, TLoginData>(
  'user/loginUser',
  async (userData) => {
    const data = await loginUserApi(userData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const getUser = createAsyncThunk<{ user: TUser }>(
  `user/getUser`,
  async () => {
    const data = await getUserApi();
    return data;
  }
);

export const updateUser = createAsyncThunk<
  TUserResponse,
  Partial<TRegisterData>
>(`user/updateUser`, async (userData) => {
  const data = await updateUserApi(userData);
  return data;
});

export const logoutUser = createAsyncThunk<{ success: boolean }>(
  `user/logoutUser`,
  async () => {
    const data = await logoutApi();
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
    return data;
  }
);

export interface UserState {
  data: TUser | null;
  requestStatus: RequestStatus;
  isAuthCheck: boolean;
}

export const initialState: UserState = {
  data: null,
  requestStatus: RequestStatus.IDLE,
  isAuthCheck: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isAuthCheck = true;
        state.requestStatus = RequestStatus.LOADING;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isAuthCheck = false;
        state.requestStatus = RequestStatus.SUCCESS;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isAuthCheck = false;
        state.requestStatus = RequestStatus.FAILED;
      })
      .addCase(loginUser.pending, (state) => {
        state.isAuthCheck = true;
        state.requestStatus = RequestStatus.LOADING;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isAuthCheck = false;
        state.requestStatus = RequestStatus.SUCCESS;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isAuthCheck = false;
        state.requestStatus = RequestStatus.FAILED;
      })
      .addCase(getUser.pending, (state) => {
        state.isAuthCheck = true;
        state.requestStatus = RequestStatus.LOADING;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isAuthCheck = false;
        state.requestStatus = RequestStatus.SUCCESS;
      })
      .addCase(getUser.rejected, (state) => {
        state.isAuthCheck = false;
        state.requestStatus = RequestStatus.FAILED;
      })
      .addCase(updateUser.pending, (state) => {
        state.isAuthCheck = true;
        state.requestStatus = RequestStatus.LOADING;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isAuthCheck = false;
        state.requestStatus = RequestStatus.SUCCESS;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isAuthCheck = false;
        state.requestStatus = RequestStatus.FAILED;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isAuthCheck = true;
        state.requestStatus = RequestStatus.LOADING;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.data = null;
        state.isAuthCheck = false;
        state.requestStatus = RequestStatus.SUCCESS;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isAuthCheck = false;
        state.requestStatus = RequestStatus.FAILED;
      });
  }
});

export const dataUserSelector = (state: RootState) => state.user.data;
export const isAuthCheckSelector = (state: RootState) => state.user.isAuthCheck;
export const requestStatusSelector = (state: RootState) =>
  state.user.requestStatus;

export default userSlice.reducer;
