'use client';

// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import '@uploadthing/react/styles.css';
import { useState } from 'react';

import { UploadDropzone } from 'utils/uploadthing';
function getClassNames(status) {
  switch (status) {
    case 'Complete':
      return 'bg-green-100 ut-label:text-lg cursor-pointer ut-allowed-content:ut-uploading:text-red-300';
    case 'Error':
      return 'bg-red-500 ut-label:text-lg cursor-pointer ut-allowed-content:ut-uploading:text-red-300';
    default:
      return 'bg-slate-200 ut-label:text-lg cursor-pointer ut-allowed-content:ut-uploading:text-red-300';
  }
}

export default function UploadPDF({ setFile, setFileUpdated }) {
  const [status, setStatus] = useState('');
  return (
    <main className=" mt-0">
      <UploadDropzone
        endpoint="pdf"
        className={getClassNames(status)}
        onClientUploadComplete={(res) => {
          console.log('Files: ', res);
          setFile(res);
          setFileUpdated(false);
          setStatus('Complete');
        }}
        onUploadBegin={() => {
          setFileUpdated(true);
          setStatus('Uploading');
        }}
        onUploadError={(error: Error) => {
          console.error(error);
          setStatus('Error');
        }}
      />
    </main>
  );
}
