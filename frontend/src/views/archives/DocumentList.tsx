// components/DocumentList.tsx
import axios from 'axios';
import Link from 'next/link';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface Document {
  id: number;
  name: string;
  title: string;
  document_file: File;
  status: string;
  created_by: string;
  org: string;
  shared_to: string;
}

const DocumentList: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    axios.get<Document[]>('http://localhost:8000/Document/')
      .then(response => {
        setDocuments(response.data);
      })
      .catch(error => {
        console.error('Error fetching documents:', error);
      });
  }, []);

  return (
    <div>
      <h1>لیست اسناد</h1>
      <ul>
        {documents.map(document => (
          <li key={document.id}>
            <Link href={`/documents/${document.id}`}>
              {document.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;

// components/AddDocument.tsx

