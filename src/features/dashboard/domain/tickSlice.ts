import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { Tick } from './domain.model';

export interface TicksState {
  ticks: Tick[];
}

const initialState: TicksState = {
  ticks: [],
};

export const ticksSlice = createSlice({
  name: 'ticks',
  initialState,
  reducers: {
    updateTick: (state, action: PayloadAction<Tick>) => {
      state.ticks.push(action.payload);
    },
  },
});

export const selectTicks = (state : RootState): Tick[] => state.ticks.ticks;

export const { updateTick } = ticksSlice.actions;

export default ticksSlice.reducer;
