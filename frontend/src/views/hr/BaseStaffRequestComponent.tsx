import React, { useState, useEffect } from 'react';
import apiClient from 'src/services/apiClient';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface BaseStaffRequestData {
  staff: string;
  start: string;
  end: string;
  review_reason: string;
  review_status: string;

  // اضافه کردن سایر فیلدهای مورد نیاز
}

const BaseStaffRequestComponent: React.FC = () => {
  const [requests, setRequests] = useState<BaseStaffRequestData[]>([]);

  useEffect(() => {
    apiClient
      .get('/BaseStaffRequest/') // تغییر URL بر اساس مسیر API شما
      .then(response => {
        setRequests(response.data);
      })
      .catch(error => {
        console.error('There was an error retrieving the staff requests!', error);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Staff ID</TableCell>
            <TableCell align="right">Start Time</TableCell>
            <TableCell align="right">End Time</TableCell>
            <TableCell align="right">Review Reason</TableCell>
            <TableCell align="right">Review Status</TableCell>
            {/* اضافه کردن ستون‌های دیگر در صورت نیاز */}
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.staff}>
              <TableCell component="th" scope="row">
                {request.staff}
              </TableCell>
              <TableCell align="right">{request.start}</TableCell>
              <TableCell align="right">{request.end}</TableCell>
              <TableCell align="right">{request.review_reason}</TableCell>
              <TableCell align="right">{request.review_status}</TableCell>
              {/* نمایش سایر فیلدهای مرتبط در صورت نیاز */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BaseStaffRequestComponent;
