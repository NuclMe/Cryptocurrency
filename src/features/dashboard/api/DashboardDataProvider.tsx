import React, { ComponentType, createContext, useEffect } from 'react';
import Events from './orders.events.json';
import { useAppDispatch } from '../../../app/hooks';
import { updateOrder } from '../domain/ordersSlice';
import { updatePosition } from '../domain/positionSlice';
import { updateTick } from '../domain/tickSlice';
import { updateExtremum } from '../domain/extremumSlice';
import { Order as DomainOrder } from '../domain/domain.model';

interface DashboardDataProviderProps {
  children: JSX.Element;
}

const Context = createContext<null>(null);

interface ApiOrder {
  id: string;
  type: string;
  side: string;
  status: string;
  symbol: string;
  price: number;
  amount: number;
  createdAt: string;
}

interface ApiPosition {
  id: string;
  symbol: string;
  inOrders: string[];
  outOrders: string[];
  stoploss: number;
}

interface ApiTick {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface ApiExtremum {
  type: string;
  time: number;
  price: number;
}

function mapApiToDomainOrder(order: ApiOrder): DomainOrder {
  return {
    id: order.id,
    type: order.type,
    side: order.side,
    statusText: order.status,
    price: order.price,
    amount: order.amount,
    createdAt: order.createdAt,
    updatedAt: order.createdAt,
  };
}

export default function DashboardPageProvider({
  children,
}: DashboardDataProviderProps) {
  const dispatch = useAppDispatch();
  const eventReceivedInterval = 100;
  const timerId = setInterval(() => {
    const nextEvent = Events.shift();
    if (nextEvent) {
      if (nextEvent.type === 'order') {
        dispatch(
          updateOrder(mapApiToDomainOrder(nextEvent.payload as ApiOrder))
        );
      } else if (nextEvent.type === 'position') {
        dispatch(updatePosition(nextEvent.payload as ApiPosition));
      } else if (nextEvent.type === 'tick') {
        dispatch(updateTick(nextEvent.payload as ApiTick));
      } else if (nextEvent.type === 'extremum') {
        dispatch(updateExtremum(nextEvent.payload as ApiExtremum[]));
      } else {
        // todo: handle the exception
        // throw new Error(`useMockEvents: unknown type of the event: ${nextEvent.type}`);
      }
    } else {
      clearInterval(timerId);
    }
  }, eventReceivedInterval);

  return <Context.Provider value={null}>{children}</Context.Provider>;
}
