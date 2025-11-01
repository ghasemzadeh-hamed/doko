import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import moment from 'moment';

interface WorkingHoursData {
  user: string;
  login_time: string;
  logout_time: string;
}

const WorkingHoursComponent: React.FC = () => {
  const [workingHours, setWorkingHours] = useState<WorkingHoursData[]>([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/WorkingHours/')
      .then(response => {
        setWorkingHours(response.data);
      })
      .catch(error => {
        console.error('There was an error retrieving the working hours!', error);
      });
  }, []);

  const calculateDuration = (loginTime: string, logoutTime: string) => {
    const loginMoment = moment(loginTime);
    const logoutMoment = moment(logoutTime);

    return logoutMoment.diff(loginMoment, 'hours', true); // Returns the duration in hours
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell align="right">Login Time</TableCell>
            <TableCell align="right">Logout Time</TableCell>
            <TableCell align="right">Duration (Hours)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workingHours.map((hours) => (
            <TableRow key={hours.user}>
              <TableCell component="th" scope="row">
                {hours.user}
              </TableCell>
              <TableCell align="right">{hours.login_time}</TableCell>
              <TableCell align="right">{hours.logout_time}</TableCell>
              <TableCell align="right">{calculateDuration(hours.login_time, hours.logout_time)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WorkingHoursComponent;
