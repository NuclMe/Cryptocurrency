import { PositionRow } from './ui.model';

const manyPositions: PositionRow[] = [
  {
    id: '1',
    status: 'closed',
    openTime: '2021-04-13T15:13:13.754Z',
    closeTime: '2021-04-13T15:13:13.754Z',
    balanceDelta: 123,
    balanceDeltaPercent: 2,
  },
  {
    id: '2',
    status: 'open',
    openTime: '2021-04-13T15:13:13.754Z',
    closeTime: '2021-04-13T15:13:13.754Z',
    balanceDelta: 0,
    balanceDeltaPercent: 0,
  },
  {
    id: '3',
    status: 'partiallyFilled',
    openTime: '2021-04-13T15:13:13.754Z',
    closeTime: '2021-04-13T15:13:13.754Z',
    balanceDelta: 0,
    balanceDeltaPercent: 0,
  },
];

export default manyPositions;
