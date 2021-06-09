import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { PositionRow } from './ui.model';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export interface PositionGridProps {
  loading: boolean;
  positions: PositionRow[];
}

export function PositionGrid({
  positions,
  loading,
}: PositionGridProps): React.ReactElement {
  const classes = useStyles();

  return (
    <>
      {loading && <h2>Data is loading. Please wait...</h2>}

      {!loading && !positions.length && <h3>No data</h3>}

      {!!positions.length && (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Open</TableCell>
                <TableCell align="right">Close</TableCell>
                <TableCell align="right">Balance delta</TableCell>
                <TableCell align="right">Balance delta percent</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {positions.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell align="right">{row.openTime}</TableCell>
                  <TableCell align="right">{row.closeTime}</TableCell>
                  <TableCell align="right">{row.balanceDelta}</TableCell>
                  <TableCell align="right">{row.balanceDeltaPercent}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
