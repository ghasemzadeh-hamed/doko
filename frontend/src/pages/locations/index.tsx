import React from 'react'
import Grid from '@mui/material/Grid'
import { Button } from '@mui/material';

import AddAddress from 'src/views/Location/AddAddress'
import AddressList from 'src/views/Location/AddressList'
import DeleteAddress from 'src/views/Location/DeleteAddress'
import EditAddress from 'src/views/Location/EditAddress'
import AddLocation from 'src/views/Location/AddLocation'
import LocationList from 'src/views/Location/LocationList'
import DeleteLocation from 'src/views/Location/DeleteLocation'
import EditLocation from 'src/views/Location/EditLocation'








const Locations = () => {
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

      <Grid item xs={12}>AddAddress<AddAddress /></Grid>
      <Grid item xs={12}>AddressList<AddressList /></Grid>
      <Grid item xs={12}>DeleteAddress<DeleteAddress /></Grid>
      <Grid item xs={12}>EditAddress<EditAddress /></Grid>
      <Grid item xs={12}>AddLocation<AddLocation /></Grid>
      <Grid item xs={12}>LocationList<LocationList /></Grid>
      <Grid item xs={12}>DeleteLocation<DeleteLocation /></Grid>
      <Grid item xs={12}>EditLocation<EditLocation /></Grid>
    </Grid>
  )
}

export default Locations
