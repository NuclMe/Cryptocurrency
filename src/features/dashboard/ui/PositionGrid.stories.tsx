import React from 'react';
import { Story, Meta } from '@storybook/react';

import { PositionGrid, PositionGridProps } from './PositionGrid';
import manyPositions from './PositionGrid.fixture';

export default {
  title: 'dashboard/PositionGrid',
  component: PositionGrid,
} as Meta;

const Template: Story<PositionGridProps> = (args) => <PositionGrid {...args} />;

export const LoadingData = Template.bind({});
LoadingData.args = {
  loading: true,
  positions: [],
};

export const EmptyData = Template.bind({});
EmptyData.args = {
  loading: false,
  positions: [],
};

export const ReceivedData = Template.bind({});
ReceivedData.args = {
  loading: false,
  positions: manyPositions,
};
