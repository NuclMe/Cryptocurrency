/* eslint-disable react/react-in-jsx-scope */
import { ComponentType, MutableRefObject, useEffect, useRef } from 'react';
import {
  BarData,
  ChartOptions,
  createChart,
  DeepPartial,
  IChartApi,
  LineSeriesPartialOptions,
  LineStyle,
  SeriesMarker,
  Time,
} from 'lightweight-charts';

import { Extremum } from './ui.model';

export interface ChartOrder {
  time: number;
  price: number;
  side: string;
}

export interface ChartPosition {
  in: ChartOrder[];
  out: ChartOrder[];
  stoploss: number;
}

export interface PriceChartProps {
  candles: BarData[];
  extremums: Extremum[];
  positions: ChartPosition[];
}

const chartOptions: DeepPartial<ChartOptions> = {
  width: 1795,
  height: 600,
  timeScale: { timeVisible: true },
};

const supportExtremumOptions: LineSeriesPartialOptions = {
  color: 'rgb(38,119,218)',
  lineWidth: 1,
  lastValueVisible: false,
  priceLineVisible: false,
};

const resistenceExtremumOptions: LineSeriesPartialOptions = {
  color: 'rgb(218,38,65)',
  lineWidth: 1,
  lastValueVisible: false,
  priceLineVisible: false,
};

const createBuyMarker = (time: number): SeriesMarker<Time> => ({
  time: (time / 1000) as Time,
  position: 'belowBar',
  color: '#73C10B',
  shape: 'arrowUp',
  text: 'Buy',
});

const createSellMarker = (time: number): SeriesMarker<Time> => ({
  time: (time / 1000) as Time,
  position: 'aboveBar',
  color: '#be0041',
  shape: 'arrowDown',
  text: 'Sell',
});

const drawMarker = (chart: IChartApi) => (order: ChartOrder) => {
  const series = chart.addLineSeries({
    color: 'rgba(38, 198, 218, 0)',
    lastValueVisible: false,
  });
  series.setData([
    {
      time: (order.time / 1000) as Time,
      value: order.price,
    },
  ]);

  const markers: SeriesMarker<Time>[] = [];
  const marker =
    order.side === 'buy'
      ? createBuyMarker(order.time)
      : createSellMarker(order.time);

  markers.push(marker);

  series.setMarkers(markers);
};

const drawStopLoss = (chart: IChartApi, position: ChartPosition): void => {
  const stoplossSeries = chart.addLineSeries({
    color: 'rgb(218,122,38)',
    lineWidth: 2,
    lastValueVisible: false,
    priceLineVisible: false,
  });

  stoplossSeries.setData([
    {
      time: (position.in[0].time / 1000) as Time,
      value: position.stoploss,
    },
    {
      time: (position.in[0].time / 1000 + 100000000) as Time,
      value: position.stoploss,
    },
  ]);
};

const drawPositionLinkLine = (
  chart: IChartApi,
  position: ChartPosition
): void => {
  if (position.out.length > 0) {
    const linkSeries = chart.addLineSeries({
      color: 'rgb(38,218,41)',
      lineWidth: 2,
      lineStyle: LineStyle.Dashed,
      priceLineVisible: false,
      lastValueVisible: false,
    });
    linkSeries.setData([
      {
        time: (position.in[0].time / 1000) as Time,
        value: position.in[0].price,
      },
      {
        time: (position.out[0].time / 1000) as Time,
        value: position.out[0].price,
      },
    ]);
  }
};

const drawPosition = (chart: IChartApi, position: ChartPosition): void => {
  position.in.forEach(drawMarker(chart));
  position.out.forEach(drawMarker(chart));

  drawStopLoss(chart, position);
  drawPositionLinkLine(chart, position);
};

const initChart = (ref: MutableRefObject<HTMLDivElement>): IChartApi => {
  const domId = ref.current;

  return createChart(domId, chartOptions);
};

const drawCandles = (chart: IChartApi, candles: BarData[]): void => {
  chart.addCandlestickSeries().setData(candles);
};

const drawExtremum = (chart: IChartApi, extremum: Extremum): void => {
  const options =
    extremum.type === 'support'
      ? supportExtremumOptions
      : resistenceExtremumOptions;

  const point1 = {
    time: (extremum.time / 1000) as Time,
    value: extremum.price,
  };

  const point2 = {
    time: (extremum.time / 1000 + 100000000) as Time,
    value: extremum.price,
  };

  chart.addLineSeries(options).setData([point1, point2]);
};

const drawExtremums = (chart: IChartApi, extremums: Extremum[]): void => {
  extremums.forEach((extremum) => drawExtremum(chart, extremum));
};

const drawPositions = (chart: IChartApi, positions: ChartPosition[]): void => {
  positions.forEach((position) => drawPosition(chart, position));
};

function PriceChart({
  candles,
  extremums,
  positions,
}: PriceChartProps): JSX.Element {
  // force type casting is required because of type inconsistencies between @types/react and 'lightweight-charts'
  const myRef = useRef() as MutableRefObject<HTMLDivElement>;
  useEffect(() => {
    const chart = initChart(myRef);

    drawCandles(chart, candles);
    drawExtremums(chart, extremums);
    drawPositions(chart, positions);

    return () => chart.remove();
  });

  return <div ref={myRef} />;
}

export default PriceChart;
