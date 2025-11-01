// components/DocumentList.tsx
import apiClient from 'src/services/apiClient';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button } from '@mui/material';




interface AddDocumentProps {
  documentId: number;
  name: string;
  title: string;
  document_file: File;
  status: string;
  created_by: string;
  org: string;
  shared_to: string;

  // Add any props you might need
}

const AddDocument: React.FC<AddDocumentProps> = () => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    document_file: null as File | null,
    status: 'active',
    created_by: null as number | null,
    org: null as number | null,
    shared_to: [] as number[],
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        document_file: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await apiClient.post('/Document/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Document added successfully:', response.data);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };


  return (
    <div>
      <h1>افزودن سند جدید</h1>
      <form onSubmit={handleSubmit}>
        {/* Add form fields for each property in the formData state */}
        <label>نام:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />

        <label>عنوان:</label>
        <textarea name="title" value={formData.title} onChange={handleInputChange}></textarea>

        <label>فایل سند:</label>
        <input type="file" name="document_file" onChange={handleFileChange} />

        {/* Add other form fields as needed */}

        <Button variant="contained" color="primary" onClick={handleSubmit}> ثبت  </Button>
      </form>
    </div>
  );
};

export default AddDocument;
