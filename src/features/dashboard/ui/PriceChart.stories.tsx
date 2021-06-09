/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { Story, Meta } from '@storybook/react';

import PriceChart, { PriceChartProps } from './PriceChart';
import { Time } from 'lightweight-charts';

const initialState: PriceChartProps = {
  candles: [],
  extremums: [],
  positions: [],
};

export default {
  title: 'dashboard/PriceChart',
  component: PriceChart,
} as Meta;

const Template: Story<PriceChartProps> = (args) => <PriceChart {...args} />;

export const EmptyData = Template.bind({});
EmptyData.args = {
  candles: [],
  extremums: [],
  positions: [],
};

export const ReceivedData = Template.bind({});
ReceivedData.args = {
  candles: [
    {
      time: 1621127520 as Time,
      open: 47789.5,
      high: 47967.4,
      low: 47789.5,
      close: 47965.6,
    },
  ],
  extremums: [],
  positions: [],
};
