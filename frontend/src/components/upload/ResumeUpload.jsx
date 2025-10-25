import React, { useState } from 'react';
import FileDropzone from './FileDropzone';
import LoadingSpinner from '../common/LoadingSpinner';
import { analyzeResume } from '../../services/api';

const ResumeUpload = ({ onAnalysisComplete }) => {
  const [uploading, setUploading] = useState(false);
  // Remove unused selectedFile state since we're handling it in FileDropzone
  // const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = async (file) => {
    // Remove this: setSelectedFile(file);
    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const result = await analyzeResume(formData);
      onAnalysisComplete(result.data);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Analysis failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="card">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Upload Your Resume
        </h2>
        <p className="text-gray-600">
          Get AI-powered feedback on formatting, content, and keywords
        </p>
      </div>

      {!uploading ? (
        <FileDropzone onFileSelect={handleFileSelect} />
      ) : (
        <div className="text-center py-12">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Analyzing your resume...</p>
          <p className="text-sm text-gray-500 mt-2">
            This may take a few seconds
          </p>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Tips for best results:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use a clear, readable format</li>
          <li>• Include your most recent experience</li>
          <li>• Add relevant skills and technologies</li>
          <li>• Keep it under 2 pages for best analysis</li>
        </ul>
      </div>
    </div>
  );
};

export default ResumeUpload;