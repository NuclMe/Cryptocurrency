import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DashboardPage from './features/dashboard/application/DashboardPage';

const AppRouter = (): React.ReactElement => (
  <Router>
    <CssBaseline />
    <Route path="/" exact>
      <DashboardPage />
    </Route>
  </Router>
);

export default AppRouter;
