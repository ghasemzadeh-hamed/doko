import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface StaffDocumentData {
  staff: string;
  name: string;
  description: string;
  file: string;
  public: boolean;
  // اضافه کردن سایر فیلدهای مورد نیاز
}

const StaffDocumentComponent: React.FC = () => {
  const [documents, setDocuments] = useState<StaffDocumentData[]>([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/StaffDocument/') // تغییر URL بر اساس مسیر API شما
      .then(response => {
        setDocuments(response.data);
      })
      .catch(error => {
        console.error('There was an error retrieving the staff documents!', error);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Staff ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">File</TableCell>
            <TableCell align="right">Public</TableCell>
            {/* اضافه کردن ستون‌های دیگر در صورت نیاز */}
          </TableRow>
        </TableHead>
        <TableBody>
          {documents.map((document) => (
            <TableRow key={document.name}>
              <TableCell component="th" scope="row">
                {document.staff}
              </TableCell>
              <TableCell align="right">{document.name}</TableCell>
              <TableCell align="right">{document.description}</TableCell>
              <TableCell align="right">{document.file}</TableCell>
              <TableCell align="right">{document.public.toString()}</TableCell>
              {/* نمایش سایر فیلدهای مرتبط با سند در صورت نیاز */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StaffDocumentComponent;
