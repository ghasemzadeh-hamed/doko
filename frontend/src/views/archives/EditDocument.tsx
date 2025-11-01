// components/DocumentList.tsx
import axios from 'axios';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

// components/EditDocument.tsx
interface EditDocumentProps {
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

const EditDocument: React.FC<EditDocumentProps> = ({ documentId }) => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    document_file: null as File | null,
    status: 'active',
    created_by: null as number | null,
    org: null as number | null,
    shared_to: [] as number[],
  });

  useEffect(() => {
    // Fetch the document data by ID and populate the form
    axios.get(`http://localhost:8000/Document/${documentId}/`)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.error('Error fetching document for edit:', error);
      });
  }, [documentId]);

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
      const response = await axios.put(`http://localhost:8000/Document/${documentId}/`, formData);
      console.log('Document updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  return (
    <div>
      <h1>ویرایش سند</h1>
      <form onSubmit={handleSubmit}>
        {/* Add form fields for each property in the formData state */}
        <label>نام:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />

        <label>عنوان:</label>
        <textarea name="title" value={formData.title} onChange={handleInputChange}></textarea>

        <label>فایل سند:</label>
        <input type="file" name="document_file" onChange={handleFileChange} />

        {/* Add other form fields as needed */}

        <button type="submit">ثبت تغییرات</button>
      </form>
    </div>
  );
};

export default EditDocument;
