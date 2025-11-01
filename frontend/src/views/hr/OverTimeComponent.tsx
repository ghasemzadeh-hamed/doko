import React, { useState, useEffect } from 'react';
import apiClient from 'src/services/apiClient';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface OverTimeData {
  date: string;
  start_time: string;
  end_time: string;
  duration: string;

  // اضافه کردن سایر فیلدهای مورد نیاز
}

const OverTimeComponent: React.FC = () => {
  const [overtimes, setOvertimes] = useState<OverTimeData[]>([]);

  useEffect(() => {
    apiClient.get('/OverTime/') // تغییر URL بر اساس مسیر API شما
      .then(response => {
        setOvertimes(response.data);
      })
      .catch(error => {
        console.error('There was an error retrieving the overtime data!', error);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Start Time</TableCell>
            <TableCell align="right">End Time</TableCell>
            <TableCell align="right">Duration</TableCell>
            {/* اضافه کردن ستون‌های دیگر در صورت نیاز */}
          </TableRow>
        </TableHead>
        <TableBody>
          {overtimes.map((overtime) => (
            <TableRow key={overtime.date}>
              <TableCell component="th" scope="row">
                {overtime.date}
              </TableCell>
              <TableCell align="right">{overtime.start_time}</TableCell>
              <TableCell align="right">{overtime.end_time}</TableCell>
              <TableCell align="right">{overtime.duration}</TableCell>
              {/* نمایش سایر فیلدهای مرتبط در صورت نیاز */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OverTimeComponent;
