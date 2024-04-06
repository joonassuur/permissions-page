import {
  AnyAction,
  combineReducers,
  configureStore,
  Reducer,
} from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import dataReducer from './slices/dataSlice';
import uiReducer from './slices/uiSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['ui'],
};

const appReducer = combineReducers({
  data: dataReducer,
  ui: uiReducer,
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === '@clearReduxState') {
    // clear redux state upon logout
    state = {} as RootState;
  }
  return appReducer(state, action);
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
      thunk: true,
    });
  },
  devTools: true,
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
