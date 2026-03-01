import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HomeState {
  dataSource: Array<any>;
  homeBanner: Array<any>;
  curPage: number;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  hasMoreData: boolean;
}

const initialState: HomeState = {
  dataSource: [],
  homeBanner: [],
  curPage: 0,
  loading: false,
  loadingMore: false,
  error: null,
  hasMoreData: true,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setHomeList: (state, action: PayloadAction<{ data: Array<any>, curPage: number, hasMoreData: boolean }>) => {
      const { data, curPage, hasMoreData } = action.payload;
      if (curPage === 0) {
        state.dataSource = data;
      } else {
        state.dataSource = [...state.dataSource, ...data];
      }
      state.curPage = curPage;
      state.hasMoreData = hasMoreData;
      state.loading = false;
      state.loadingMore = false;
    },
    setHomeBanner: (state, action: PayloadAction<Array<any>>) => {
      state.homeBanner = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setLoadingMore: (state, action: PayloadAction<boolean>) => {
      state.loadingMore = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
      state.loadingMore = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateArticleCollectStatus: (state, action: PayloadAction<{ id: number, collected: boolean }>) => {
      const { id, collected } = action.payload;
      state.dataSource = state.dataSource.map(item => {
        if (item.id === id || item.originId === id) {
          return { ...item, collect: collected };
        }
        return item;
      });
    },
  },
});

export const { setHomeList, setHomeBanner, setLoading, setLoadingMore, setError, clearError, updateArticleCollectStatus } = homeSlice.actions;
export default homeSlice.reducer;