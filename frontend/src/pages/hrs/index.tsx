import React from 'react'
import Grid from '@mui/material/Grid'
import UserLoginLogComponent from 'src/views/hr/UserLoginLogComponent'
import LeaveBalanceComponent from 'src/views/hr/LeaveBalanceComponent'
import WorkingHoursComponent from 'src/views/hr/WorkingHoursComponent'
import EmploymentContractComponent from 'src/views/hr/EmploymentContractComponent'
import LicenseInfoComponent from 'src/views/hr/LicenseInfoComponent'
import EmployeeInfoComponent from 'src/views/hr/EmployeeInfoComponent'
import StaffDocumentComponent from 'src/views/hr/StaffDocumentComponent'
import BaseStaffRequestComponent from 'src/views/hr/BaseStaffRequestComponent'
import OverTimeComponent from 'src/views/hr/OverTimeComponent'
import { Button } from '@mui/material';


import FreeDayComponent from 'src/views/hr/FreeDayComponent'
import LeaveComponent from 'src/views/hr/LeaveComponent'
import AnnualLeaveComponent from 'src/views/hr/AnnualLeaveComponent'


// import LeaveManagerComponent from 'src/views/hr/LeaveManagerComponent'
// import DistanceTraveledComponent from 'src/views/hr/DistanceTraveledComponent'



const HRPage = () => {
 const handleEdit = () => {
    // تابع برای ویرایش اطلاعات
  };

  const handleDelete = () => {
    // تابع برای حذف اطلاعات
  };

  const handleAdd = () => {
    // تابع برای افزودن اطلاعات جدید
  };


  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>ACTION
       <div style={{ marginBottom: '20px' }}>
          <Button variant="contained" color="primary" onClick={handleAdd}>
            Add New
          </Button>
        </div>
       <div style={{ marginBottom: '20px' }}>
          <Button variant="contained" color="error" onClick={handleEdit}>
            Edit
          </Button>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <Button variant="contained" color="warning" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Grid>
      <Grid item xs={12}>LeaveBalance<LeaveBalanceComponent /></Grid>
      <Grid item xs={12}>WorkingHours<WorkingHoursComponent /></Grid>
      {/*<Grid item xs={12}><DistanceTraveledComponent /></Grid>*/}
      <Grid item xs={12}>EmploymentContract<EmploymentContractComponent /></Grid>
      <Grid item xs={12}>LicenseInfo<LicenseInfoComponent /></Grid>
      <Grid item xs={12}>EmployeeInfo<EmployeeInfoComponent /></Grid>
      <Grid item xs={12}>StaffDocument<StaffDocumentComponent /></Grid>
      <Grid item xs={12}>BaseStaffRequest<BaseStaffRequestComponent /></Grid>
      <Grid item xs={12}>OverTime<OverTimeComponent /></Grid>
      <Grid item xs={12}>FreeDay<FreeDayComponent /></Grid>
      <Grid item xs={12}>Leave<LeaveComponent /></Grid>
      <Grid item xs={12}>AnnualLeave<AnnualLeaveComponent /></Grid>
      {/*LeaveManager <Grid item xs={12}><LeaveManagerComponent /></Grid>*/}
      <Grid item xs={12}>UserLoginLog<UserLoginLogComponent /></Grid>
    </Grid>
  )
}

export default HRPage
