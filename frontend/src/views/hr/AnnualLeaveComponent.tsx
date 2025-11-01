import React, { useState, useEffect } from 'react';
import apiClient from 'src/services/apiClient';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface AnnualLeaveData {
  year: number;
  staffName: string; // نام کارمند
  leaveType: string; // نوع مرخصی
  allowedDays: number; // تعداد روزهای مجاز
  carriedOverDays: number; // تعداد روزهای انتقالی
  // اضافه کردن سایر فیلدهای مورد نیاز
}

const AnnualLeaveComponent: React.FC = () => {
  const [annualLeaves, setAnnualLeaves] = useState<AnnualLeaveData[]>([]);

  useEffect(() => {
    apiClient.get('/AnnualLeave/') // تغییر URL بر اساس مسیر API شما
      .then(response => {
        setAnnualLeaves(response.data);
      })
      .catch(error => {
        console.error('There was an error retrieving the annual leave data!', error);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Year</TableCell>
            <TableCell align="right">Staff Name</TableCell>
            <TableCell align="right">Leave Type</TableCell>
            <TableCell align="right">Allowed Days</TableCell>
            <TableCell align="right">Carried Over Days</TableCell>
            {/* اضافه کردن ستون‌های دیگر در صورت نیاز */}
          </TableRow>
        </TableHead>
        <TableBody>
          {annualLeaves.map((annualLeave) => (
            <TableRow key={annualLeave.year}>
              <TableCell component="th" scope="row">
                {annualLeave.year}
              </TableCell>
              <TableCell align="right">{annualLeave.staffName}</TableCell>
              <TableCell align="right">{annualLeave.leaveType}</TableCell>
              <TableCell align="right">{annualLeave.allowedDays}</TableCell>
              <TableCell align="right">{annualLeave.carriedOverDays}</TableCell>
              {/* نمایش سایر فیلدهای مرتبط در صورت نیاز */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AnnualLeaveComponent;
