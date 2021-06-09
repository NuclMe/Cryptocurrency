import React from 'react';
import { Grid } from '@material-ui/core';

import OrderGridContainer from './OrderGridContainer';
import PositionGridContainer from './PositionGridContainer';
import DashboardDataProvider from '../api/DashboardDataProvider';
import PriceChartContainer from './PriceChartContainer';

export default function DashboardPage(): React.ReactElement {
  return (
    <DashboardDataProvider>
      <Grid container spacing={1}>
        <Grid container item xs={12}>
          <PriceChartContainer />
        </Grid>
        <Grid container item xs={6}>
          <OrderGridContainer />
        </Grid>
        <Grid container item xs={6}>
          <PositionGridContainer />
        </Grid>
      </Grid>
    </DashboardDataProvider>
  );
}
