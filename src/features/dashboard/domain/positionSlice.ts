import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { Position, PositionInfo, Order, PositionOrder } from './domain.model';
import { selectOrderById, selectOrdersByIds } from './ordersSlice';

export interface PositionState {
  positions: Position[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PositionState = {
  positions: [],
  status: 'idle',
};

export const positionsSlice = createSlice({
  name: 'positions',
  initialState,
  reducers: {
    updatePosition: (state, action: PayloadAction<Position>) => {
      const { positions } = state;
      const newPosition = action.payload;

      const oldPosition = positions.find(
        (position) => position.id === newPosition.id
      );

      if (oldPosition) {
        oldPosition.inOrders = newPosition.inOrders;
        oldPosition.outOrders = newPosition.outOrders;
        oldPosition.stoploss = newPosition.stoploss;
      } else {
        state.positions.push(newPosition);
      }
    },
  },
});

function calcPositionOpenTime(state: RootState, position: Position) {
  const firstInOrderId = position.inOrders[0];

  return firstInOrderId
    ? selectOrderById(state, firstInOrderId).createdAt
    : '-';
}

function calcPositionCloseTime(state: RootState, position: Position) {
  const firstOutOrderId = position.outOrders[0];

  return firstOutOrderId
    ? selectOrderById(state, firstOutOrderId).createdAt
    : '-';
}

function calcPositionStatus(inOrders: Order[], outOrders: Order[]): string {
  const allInOrdersOpen = inOrders.every(
    (order) => order.statusText === 'open'
  );
  const anyInOrderInvested = inOrders.some(
    (order) =>
      order.statusText === 'partiallyFilled' || order.statusText === 'closed'
  );
  const anyOutOrderPartiallyFilled = outOrders.some(
    (order) => order.statusText === 'partiallyFilled'
  );
  const allInOrdersClosed = inOrders.every(
    (order) => order.statusText === 'closed'
  );
  const allOutOrdersClosed = outOrders.every(
    (order) => order.statusText === 'closed'
  );
  const sumInOrders = inOrders.reduce((sum, order) => sum + order.amount, 0);
  const sumOutOrders = outOrders.reduce((sum, order) => sum + order.amount, 0);
  if (allInOrdersClosed && allOutOrdersClosed && sumInOrders === sumOutOrders) {
    return 'closed';
  }
  if (allInOrdersOpen) {
    return 'open';
  }
  if (anyOutOrderPartiallyFilled) {
    return 'partiallyFilled';
  }
  if (anyInOrderInvested) {
    return 'invested';
  }

  throw new Error('Unable to calculate PositionStatus');
}

function calcBalanceDelta(inOrders: Order[], outOrders: Order[]): number {
  const sumInOrders = inOrders.reduce(
    (sum, order) => sum + order.amount * order.price,
    0
  );
  const sumOutOrders = outOrders.reduce(
    (sum, order) => sum + order.amount * order.price,
    0
  );

  return sumOutOrders
    ? Number.parseFloat((sumOutOrders - sumInOrders).toFixed(2))
    : 0;
}

function calcBalanceDeltaPercent() {
  return 34;
}

export const mapIdsToPositionOrders = (
  state: RootState,
  orderIds: string[]
): PositionOrder[] =>
  selectOrdersByIds(state, orderIds).map(({ createdAt, price, side }) => ({
    time: new Date(createdAt).getTime(),
    price,
    side,
  }));

export const selectPositions = (state: RootState): PositionInfo[] => {
  return state.positions.positions.map((position: Position) => {
    const status = calcPositionStatus(
      position.inOrders.map((order) => selectOrderById(state, order)),
      position.outOrders.map((order) => selectOrderById(state, order))
    );
    const balanceDelta = calcBalanceDelta(
      position.inOrders.map((order) => selectOrderById(state, order)),
      position.outOrders.map((order) => selectOrderById(state, order))
    );
    const balanceDeltaPercent = calcBalanceDeltaPercent();

    return {
      id: position.id,
      status: status,
      openTime: calcPositionOpenTime(state, position),
      closeTime: calcPositionCloseTime(state, position),
      balanceDelta: balanceDelta,
      balanceDeltaPercent: balanceDeltaPercent,
      inOrders: mapIdsToPositionOrders(state, position.inOrders),
      outOrders: mapIdsToPositionOrders(state, position.outOrders),
      stoploss: position.stoploss,
    };
  });
};

export const { updatePosition } = positionsSlice.actions;

export default positionsSlice.reducer;
