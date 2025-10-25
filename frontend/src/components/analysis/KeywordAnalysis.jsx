import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const KeywordAnalysis = ({ data }) => {
  if (!data) return null;

  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        🔑 Keyword Analysis
      </h3>
      
      <div className="space-y-4">
        {/* Technical Skills */}
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Technical Skills Found</h4>
          <div className="flex flex-wrap gap-2">
            {data.technical_skills?.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
              >
                <CheckCircle className="w-3 h-3 mr-1" />
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Missing Keywords */}
        {data.missing_keywords && data.missing_keywords.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Recommended Keywords</h4>
            <div className="flex flex-wrap gap-2">
              {data.missing_keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Soft Skills */}
        {data.soft_skills && data.soft_skills.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Soft Skills</h4>
            <div className="flex flex-wrap gap-2">
              {data.soft_skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800"
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KeywordAnalysis;