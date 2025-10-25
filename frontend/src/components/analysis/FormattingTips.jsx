import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const FormattingTips = ({ data }) => {
  if (!data) return null;

  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        📝 Formatting & Structure
      </h3>
      
      <div className="space-y-4">
        {/* Score */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="font-medium text-gray-700">Formatting Score</span>
          <span className={`font-bold ${
            data.score >= 80 ? 'text-green-600' :
            data.score >= 60 ? 'text-blue-600' :
            data.score >= 40 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {data.score}/100
          </span>
        </div>

        {/* Issues */}
        {data.issues && data.issues.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Areas for Improvement</h4>
            <div className="space-y-2">
              {data.issues.map((issue, index) => (
                <div key={index} className="flex items-start space-x-2 p-2 bg-red-50 rounded">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-red-700 text-sm">{issue}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Quick Formatting Tips</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Use consistent bullet points and spacing</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Include clear section headings</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Keep resume length under 2 pages</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Use action verbs to start bullet points</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FormattingTips;