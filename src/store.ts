import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { githubApi } from './redux/api/githubApi';
import { githubSlice } from './redux/slices/github.slice';

export const store = configureStore({
	reducer: {
		[githubApi.reducerPath]: githubApi.reducer,
		github: githubSlice.reducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(githubApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>