import React from 'react';
import ScoreCard from './ScoreCard';
import KeywordAnalysis from './KeywordAnalysis';
import FormattingTips from './FormattingTips';
import { Download, RotateCcw } from 'lucide-react';

const AnalysisResults = ({ data, onReset }) => {
  // Remove this unused function:
  // const getScoreColor = (score) => {
  //   if (score >= 80) return 'score-excellent';
  //   if (score >= 60) return 'score-good';
  //   if (score >= 40) return 'score-fair';
  //   return 'score-poor';
  // };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="card bg-gradient-to-r from-primary-50 to-blue-50">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Analysis Complete!
            </h2>
            <p className="text-gray-600">
              Here's your resume analysis and improvement suggestions
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="btn-secondary flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
            <button 
              onClick={onReset}
              className="btn-primary flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Analyze Another</span>
            </button>
          </div>
        </div>
      </div>

      {/* Rest of the component remains the same */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ScoreCard 
            score={data.overall_score} 
            title="Overall Score"
            description="Based on content, formatting, and grammar"
          />
        </div>
        
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ScoreCard 
              score={data.grammar_analysis?.score || 0} 
              title="Grammar & Spelling"
              description={`${data.grammar_analysis?.total_issues || 0} issues found`}
              size="sm"
            />
            <ScoreCard 
              score={data.formatting_analysis?.score || 0} 
              title="Formatting"
              description={`${data.formatting_analysis?.issues?.length || 0} suggestions`}
              size="sm"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <KeywordAnalysis data={data.keyword_analysis} />
        <FormattingTips data={data.formatting_analysis} />
      </div>

      {data.suggestions && data.suggestions.length > 0 && (
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            💡 Improvement Suggestions
          </h3>
          <div className="space-y-3">
            {data.suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                <span className="text-yellow-600 font-semibold mt-0.5">•</span>
                <p className="text-gray-700">{suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisResults;