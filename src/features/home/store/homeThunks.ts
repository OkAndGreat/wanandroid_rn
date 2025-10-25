import { createAsyncThunk } from '@reduxjs/toolkit';
import { setHomeList, setHomeBanner, setLoading, setLoadingMore, setError } from './homeSlice';
import { fetchHomeData, fetchHomeBannerData } from '../services/homeService';

// 获取首页列表数据
export const fetchHomeList = createAsyncThunk(
  'home/fetchHomeList',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await fetchHomeData(0);
      dispatch(setHomeList({
        data: response.data.datas,
        curPage: response.data.curPage,
        hasMoreData: response.data.pageCount > response.data.curPage + 1
      }));
    } catch (error) {
      dispatch(setError(error.message || '获取首页数据失败'));
    }
  }
);

// 加载更多首页数据
export const loadMoreHomeList = createAsyncThunk(
  'home/loadMoreHomeList',
  async (page: number, { dispatch }) => {
    try {
      dispatch(setLoadingMore(true));
      const response = await fetchHomeData(page);
      dispatch(setHomeList({
        data: response.data.datas,
        curPage: response.data.curPage,
        hasMoreData: response.data.pageCount > response.data.curPage + 1
      }));
    } catch (error) {
      dispatch(setError(error.message || '加载更多数据失败'));
    }
  }
);

// 获取首页Banner数据
export const fetchHomeBanner = createAsyncThunk(
  'home/fetchHomeBanner',
  async (_, { dispatch }) => {
    try {
      const response = await fetchHomeBannerData();
      dispatch(setHomeBanner(response.data));
    } catch (error) {
      console.error('获取Banner数据失败:', error);
    }
  }
);