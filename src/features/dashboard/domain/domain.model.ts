export interface Order {
  id: string;
  type: string;
  side: string;
  statusText: string;
  price: number;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Position {
  id: string;
  symbol: string;
  inOrders: string[];
  outOrders: string[];
  stoploss: number;
}

export interface PositionOrder {
  time: number;
  price: number;
  side: string;
}

export interface PositionInfo {
  id: string;
  status: string;
  openTime: string;
  closeTime: string;
  balanceDelta: number;
  balanceDeltaPercent: number;
  inOrders: PositionOrder[];
  outOrders: PositionOrder[];
  stoploss: number;
}

export interface Extremum {
  type: string;
  time: number;
  price: number;
}

export interface Tick {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}
