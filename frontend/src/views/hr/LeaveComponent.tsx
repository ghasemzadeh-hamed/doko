import React, { useState, useEffect } from 'react';
import apiClient from 'src/services/apiClient';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface LeaveData {
  leaveType: string;
  startDate: string;
  endDate: string;
  duration: string;

  // اضافه کردن سایر فیلدهای مورد نیاز
}

const LeaveComponent: React.FC = () => {
  const [leaves, setLeaves] = useState<LeaveData[]>([]);

  useEffect(() => {
    apiClient.get('/Leave/') // تغییر URL بر اساس مسیر API شما
      .then(response => {
        setLeaves(response.data);
      })
      .catch(error => {
        console.error('There was an error retrieving the leave data!', error);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell align="right">Start Date</TableCell>
            <TableCell align="right">End Date</TableCell>
            <TableCell align="right">Duration</TableCell>
            {/* اضافه کردن ستون‌های دیگر در صورت نیاز */}
          </TableRow>
        </TableHead>
        <TableBody>
          {leaves.map((leave) => (
            <TableRow key={leave.startDate}>
              <TableCell component="th" scope="row">
                {leave.leaveType}
              </TableCell>
              <TableCell align="right">{leave.startDate}</TableCell>
              <TableCell align="right">{leave.endDate}</TableCell>
              <TableCell align="right">{leave.duration}</TableCell>
              {/* نمایش سایر فیلدهای مرتبط در صورت نیاز */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LeaveComponent;
