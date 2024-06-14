import React from 'react';
import Papa from 'papaparse';

interface CsvResult {
  data: CsvUploadResult;
}

interface CsvUploaderProps {
  onUpload: (data: CsvUploadResult) => void;
}

export const CsvUploader = ({ onUpload }: CsvUploaderProps) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      Papa.parse(file, {
        complete: (result: CsvResult) => {
          onUpload(result.data);
        },
      });
    } else {
      alert('Please upload a valid CSV file.');
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
};
