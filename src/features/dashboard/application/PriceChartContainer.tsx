import React from 'react';
import { Tick, PositionInfo } from '../domain/domain.model';
import PriceChart from '../ui/PriceChart';

import { useAppSelector } from '../../../app/hooks';
import { selectTicks } from '../domain/tickSlice';
import { selectExtremums } from '../domain/extremumSlice';
import { selectPositions } from '../domain/positionSlice';
import { ChartPosition } from '../ui/PriceChart';

import { BarData, Time } from 'lightweight-charts';

export const mapDomainPositionsToPresentationalPositions = (
  positions: PositionInfo[]
): ChartPosition[] =>
  positions.map((position) => ({
    in: position.inOrders,
    out: position.outOrders,
    stoploss: position.stoploss,
  }));

export default function PriceChartContainer(): React.ReactElement {
  const ticks: Tick[] = useAppSelector(selectTicks);
  const extremums = useAppSelector(selectExtremums);
  const positions = useAppSelector(selectPositions);
  const uiPositions: ChartPosition[] =
    mapDomainPositionsToPresentationalPositions(positions);

  const candles: BarData[] = ticks.map(({ open, close, high, low, time }) => ({
    time: (time / 1000) as Time,
    open,
    high,
    low,
    close,
  }));

  return (
    <PriceChart
      extremums={extremums}
      positions={uiPositions}
      candles={candles}
    />
  );
}
