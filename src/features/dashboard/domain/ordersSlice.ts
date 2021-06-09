import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { Order } from './domain.model';

export interface OrdersState {
  orders: Order[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: OrdersState = {
  orders: [],
  status: 'idle',
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    updateOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
  },
});

export const selectOrders = (state : RootState): Order[] => state.orders.orders;
export const selectOrderById = (state: RootState, id: string): Order => {
  const order = state.orders.orders.find((o) => o.id === id);

  if (order) {
    return order;
  }

  throw new Error('selectOrderById: Unable to find order');
};

export const selectOrdersByIds = (state: RootState, ids: string[]): Order[] => (
  ids.map((id) => selectOrderById(state, id))
);
export const { updateOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
