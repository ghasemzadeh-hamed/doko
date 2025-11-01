import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface EmploymentContractData {
  user: string;
  contract_name: string;
  contract_number: string;


  // اضافه کردن سایر فیلدهای قرارداد در صورت نیاز
}

const EmploymentContractComponent: React.FC = () => {
  const [contracts, setContracts] = useState<EmploymentContractData[]>([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/EmploymentContract/') // تغییر URL بر اساس مسیر API شما
      .then(response => {
        setContracts(response.data);
      })
      .catch(error => {
        console.error('There was an error retrieving the employment contracts!', error);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell align="right">Contract Name</TableCell>
            <TableCell align="right">Contract Number</TableCell>
            {/* اضافه کردن ستون‌های دیگر در صورت نیاز */}
          </TableRow>
        </TableHead>
        <TableBody>
          {contracts.map((contract) => (
            <TableRow key={contract.contract_number}>
              <TableCell component="th" scope="row">
                {contract.user}
              </TableCell>
              <TableCell align="right">{contract.contract_name}</TableCell>
              <TableCell align="right">{contract.contract_number}</TableCell>
              {/* نمایش سایر فیلدهای قرارداد در صورت نیاز */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmploymentContractComponent;
