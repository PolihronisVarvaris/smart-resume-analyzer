import React, { useState } from 'react';
import ResumeUpload from '../components/upload/ResumeUpload';
import AnalysisResults from '../components/analysis/AnalysisResults';

const Analyze = () => {
  const [analysisData, setAnalysisData] = useState(null);
  // Remove unused loading state
  // const [loading, setLoading] = useState(false);

  const handleAnalysisComplete = (data) => {
    setAnalysisData(data);
  };

  const handleReset = () => {
    setAnalysisData(null);
  };

  // Mock data for testing (remove this when backend is ready)
  const mockData = {
    overall_score: 78,
    grammar_analysis: {
      score: 85,
      total_issues: 3,
      issues: [
        {
          type: 'grammar',
          message: 'Missing period',
          context: 'Managed a team of 5 developers',
          offset: 15,
          length: 5
        }
      ]
    },
    formatting_analysis: {
      score: 72,
      issues: [
        "Missing skills section",
        "Consider adding more quantifiable achievements"
      ]
    },
    keyword_analysis: {
      technical_skills: ['JavaScript', 'React', 'Node.js', 'Python', 'MongoDB'],
      soft_skills: ['Leadership', 'Communication'],
      missing_keywords: ['TypeScript', 'AWS', 'Docker']
    },
    content_analysis: {
      relevance_score: 75,
      strengths: ['Strong technical skills', 'Good project experience'],
      improvements: ['Add more quantifiable achievements', 'Include more action verbs'],
      ats_compatibility: true
    },
    suggestions: [
      'Add more quantifiable achievements with numbers',
      'Include a skills section with relevant technologies',
      'Consider adding a professional summary at the top'
    ]
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Analyze Your Resume
        </h1>
        <p className="text-lg text-gray-600">
          Upload your resume to get AI-powered feedback and improvement suggestions
        </p>
      </div>

      {!analysisData ? (
        <ResumeUpload onAnalysisComplete={handleAnalysisComplete} />
      ) : (
        <AnalysisResults data={analysisData} onReset={handleReset} />
      )}

      {/* For testing - remove this button when backend is ready */}
      {!analysisData && (
        <div className="mt-4 text-center">
          <button
            onClick={() => handleAnalysisComplete(mockData)}
            className="btn-secondary text-sm"
          >
            Test with Mock Data (Backend not ready)
          </button>
        </div>
      )}
    </div>
  );
};

export default Analyze;