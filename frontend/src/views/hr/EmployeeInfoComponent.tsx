import React, { useState, useEffect } from 'react';
import apiClient from 'src/services/apiClient';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface EmployeeInfoData {
  user: string;
  image: string;
  sex: string;
  role: string;
  address: string;
  birthday: string;
  leave_days: number;
  sick_days: number;
  overtime_allowed: boolean;
  start_date: string;
  end_date: string;
  employment_contract: string;

  // اضافه کردن سایر فیلدهای مورد نیاز
}

const EmployeeInfoComponent: React.FC = () => {
  const [employeeInfos, setEmployeeInfos] = useState<EmployeeInfoData[]>([]);

  useEffect(() => {
    apiClient.get('/EmployeeInfo/') // تغییر URL بر اساس مسیر API شما
      .then(response => {
        setEmployeeInfos(response.data);
      })
      .catch(error => {
        console.error('There was an error retrieving the employee info!', error);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Birthday</TableCell>
            <TableCell align="right">Leave Days</TableCell>
            <TableCell align="right">Sick Days</TableCell>
            <TableCell align="right">Overtime Allowed</TableCell>
            <TableCell align="right">Start Date</TableCell>
            <TableCell align="right">End Date</TableCell>
            <TableCell align="right">Employment Contract</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeeInfos.map((info) => (
            <TableRow key={info.user}>
              <TableCell component="th" scope="row">
                {info.user}
              </TableCell>
              <TableCell align="right">{info.image}</TableCell>
              <TableCell align="right">{info.sex}</TableCell>
              <TableCell align="right">{info.role}</TableCell>
              <TableCell align="right">{info.address}</TableCell>
              <TableCell align="right">{info.birthday}</TableCell>
              <TableCell align="right">{info.leave_days}</TableCell>
              <TableCell align="right">{info.sick_days}</TableCell>
              <TableCell align="right">{info.overtime_allowed.toString()}</TableCell>
              <TableCell align="right">{info.start_date}</TableCell>
              <TableCell align="right">{info.end_date}</TableCell>
              <TableCell align="right">{info.employment_contract}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeInfoComponent;
