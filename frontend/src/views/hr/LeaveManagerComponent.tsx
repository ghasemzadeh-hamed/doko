//
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@mui/material';
//
//
// interface LeaveData {
//   id: number;
//   staffName: string;
//   startDate: string;
//   endDate: string;
//   duration: number;
//   leaveType: string;
//
//
//   // سایر فیلدهای مورد نیاز
// }
//
// const LeaveManagerComponent: React.FC = () => {
//   const [leaves, setLeaves] = useState<LeaveData[]>([]);
//
//   useEffect(() => {
//     // فرض بر این است که API شما داده‌های مرخصی را برمی‌گرداند
//     axios.get('http://127.0.0.1:8000/LeaveManager/')
//       .then(response => {
//         setLeaves(response.data);
//       })
//       .catch(error => {
//         console.error('There was an error retrieving the leave data!', error);
//       });
//   }, []);
//
//   return (
//     <div>
//       <TableContainer component={Paper}>
//         <Table aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Staff Name</TableCell>
//               <TableCell align="right">Start Date</TableCell>
//               <TableCell align="right">End Date</TableCell>
//               <TableCell align="right">Duration</TableCell>
//               <TableCell align="right">Leave Type</TableCell>
//             {/* اضافه کردن ستون‌های دیگر در صورت نیاز */}            </TableRow>
//           </TableHead>
//           <TableBody>
//             {leaves.map((leave) => (
//               <TableRow key={leave.id}>
//                 <TableCell component="th" scope="row">
//                 {leave.staffName}
//                 </TableCell>
//                 <TableCell align="right">{leave.startDate}</TableCell>
//                 <TableCell align="right">{leave.endDate}</TableCell>
//                 <TableCell align="right">{leave.duration}</TableCell>
//                 <TableCell align="right">{leave.leaveType}</TableCell>
//                 {/* نمایش داده‌ها */}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };
//
// export default LeaveManagerComponent;
