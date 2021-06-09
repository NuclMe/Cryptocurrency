import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import ordersReducer from '../features/dashboard/domain/ordersSlice';
import positionsReducer from '../features/dashboard/domain/positionSlice';
import extremumsReducer from '../features/dashboard/domain/extremumSlice';
import ticksReducer from '../features/dashboard/domain/tickSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    orders: ordersReducer,
    positions: positionsReducer,
    extremums: extremumsReducer,
    ticks: ticksReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
