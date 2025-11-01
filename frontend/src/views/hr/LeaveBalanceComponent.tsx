import React, { useState, useEffect } from 'react';
import apiClient from 'src/services/apiClient';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';



interface LeaveBalanceData {
  user: string;
  annual_leave: number;
  sick_leave: number;
  other_leave: number;
}



const LeaveBalanceComponent: React.FC = () => {
  const [leaveBalances, setLeaveBalances] = useState<LeaveBalanceData[]>([]);

  useEffect(() => {
    apiClient.get('/LeaveBalance/')
      .then(response => {
        setLeaveBalances(response.data);
      })
      .catch(error => {
        console.error('There was an error retrieving the leave balances!', error);
      });
  }, []);


  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell align="right">Annual Leave</TableCell>
            <TableCell align="right">Sick Leave</TableCell>
            <TableCell align="right">Other Leave</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaveBalances.map((balance) => (
            <TableRow key={balance.user}>
              <TableCell component="th" scope="row">
                {balance.user}
              </TableCell>
              <TableCell align="right">{balance.annual_leave}</TableCell>
              <TableCell align="right">{balance.sick_leave}</TableCell>
              <TableCell align="right">{balance.other_leave}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LeaveBalanceComponent;

