export interface Order {
  id: string;
  type: string;
  side: string;
  status: string;
  price: number;
  amount: number;
  createdAt: string;
}

export interface PositionRow {
  id: string;
  status: string;
  openTime: string;
  closeTime: string;
  balanceDelta: number;
  balanceDeltaPercent: number;
}

export enum ExtremumType {
  support = 'support',
  resistance = 'resistance',
}
export interface Extremum {
  type: string;
  time: number;
  price: number;
}
