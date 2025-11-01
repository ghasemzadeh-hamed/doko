import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface FreeDayData {
  name: string;
  date: string;
  // اضافه کردن سایر فیلدهای مورد نیاز
}

const FreeDayComponent: React.FC = () => {
  const [freeDays, setFreeDays] = useState<FreeDayData[]>([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/FreeDay/') // تغییر URL بر اساس مسیر API شما
      .then(response => {
        setFreeDays(response.data);
      })
      .catch(error => {
        console.error('There was an error retrieving the free day data!', error);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Date</TableCell>
            {/* اضافه کردن ستون‌های دیگر در صورت نیاز */}
          </TableRow>
        </TableHead>
        <TableBody>
          {freeDays.map((freeDay) => (
            <TableRow key={freeDay.date}>
              <TableCell component="th" scope="row">
                {freeDay.name}
              </TableCell>
              <TableCell align="right">{freeDay.date}</TableCell>
              {/* نمایش سایر فیلدهای مرتبط در صورت نیاز */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FreeDayComponent;
