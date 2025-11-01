import React from 'react'
import Grid from '@mui/material/Grid'
import { Button } from '@mui/material';

import AttachmentsComponent from 'src/views/archives/AttachmentsComponent'
import DocumentsComponent from 'src/views/archives/DocumentsComponent'






const Archives = () => {
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
      <Grid item xs={12}>DocumentList<DocumentsComponent /></Grid>
      <Grid item xs={12}>AttachmentList<AttachmentsComponent /></Grid>
    </Grid>
  )
}

export default Archives
