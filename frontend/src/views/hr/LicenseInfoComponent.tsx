import React, { useState, useEffect } from 'react';
import apiClient from 'src/services/apiClient';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface LicenseInfoData {
  user: string;
  software_name: string;
  license_key: string;

  // اضافه کردن سایر فیلدهای لایسنس در صورت نیاز
}

const LicenseInfoComponent: React.FC = () => {
  const [licenses, setLicenses] = useState<LicenseInfoData[]>([]);

  useEffect(() => {
    apiClient.get('/LicenseInfo/') // تغییر URL بر اساس مسیر API شما
      .then(response => {
        setLicenses(response.data);
      })
      .catch(error => {
        console.error('There was an error retrieving the license info!', error);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell align="right">Software Name</TableCell>
            <TableCell align="right">License Key</TableCell>
            {/* اضافه کردن ستون‌های دیگر در صورت نیاز */}
          </TableRow>
        </TableHead>
        <TableBody>
          {licenses.map((license) => (
            <TableRow key={license.license_key}>
              <TableCell component="th" scope="row">
                {license.user}
              </TableCell>
              <TableCell align="right">{license.software_name}</TableCell>
              <TableCell align="right">{license.license_key}</TableCell>
              {/* نمایش سایر فیلدهای لایسنس در صورت نیاز */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LicenseInfoComponent;
