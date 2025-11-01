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
import LeaveManagerComponent from 'src/views/hr/LeaveManagerComponent'


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
      LeaveBalance<Grid item xs={12}>
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
        <LeaveBalanceComponent />
      </Grid>
      WorkingHours<Grid item xs={12}><WorkingHoursComponent /></Grid>
      {/*<Grid item xs={12}><DistanceTraveledComponent /></Grid>*/}
      EmploymentContract<Grid item xs={12}><EmploymentContractComponent /></Grid>
      LicenseInfo<Grid item xs={12}><LicenseInfoComponent /></Grid>
      EmployeeInfo<Grid item xs={12}><EmployeeInfoComponent /></Grid>
      StaffDocument<Grid item xs={12}><StaffDocumentComponent /></Grid>
      BaseStaffRequest<Grid item xs={12}><BaseStaffRequestComponent /></Grid>
      OverTime<Grid item xs={12}><OverTimeComponent /></Grid>
      FreeDay<Grid item xs={12}><FreeDayComponent /></Grid>
      Leave<Grid item xs={12}><LeaveComponent /></Grid>
      AnnualLeave<Grid item xs={12}><AnnualLeaveComponent /></Grid>
      LeaveManager <Grid item xs={12}><LeaveManagerComponent /></Grid>
      UserLoginLog<Grid item xs={12}><UserLoginLogComponent /></Grid>
    </Grid>
  )
}

export default HRPage
