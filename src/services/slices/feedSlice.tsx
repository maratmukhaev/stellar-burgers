import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, TFeedsResponse } from '../../utils/burger-api';
import { RootState } from '../store';
import { TOrder } from '@utils-types';

export const getFeed = createAsyncThunk<TFeedsResponse>(
  'feed/getFeeds',
  async () => {
    const data = await getFeedsApi();
    return data;
  }
);

export interface FeedState {
  feed: {
    orders: TOrder[];
    total: number | null;
    totalToday: number | null;
  };
  loading: boolean;
  error: string | null;
}

export const initialState: FeedState = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  loading: false,
  error: null
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.feed = action.payload;
        state.error = null;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки ленты заказов';
      });
  }
});

export const feedSelector = (state: RootState) => state.feed.feed;
export const loadingSelector = (state: RootState) => state.orders.loading;

export default feedSlice.reducer;
