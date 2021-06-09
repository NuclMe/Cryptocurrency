import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { Extremum } from './domain.model';

export type ExtremumsState = Extremum[];
const initialState: ExtremumsState = [];

export const extremumsSlice = createSlice({
  name: 'extremums',
  initialState,
  reducers: {
    updateExtremum: (state, action) => action.payload,
  },
});

export const selectExtremums = (state : RootState): Extremum[] => state.extremums;

export const { updateExtremum } = extremumsSlice.actions;

export default extremumsSlice.reducer;
