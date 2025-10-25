import React from 'react';

const ScoreCard = ({ score, title, description, size = 'md' }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-blue-600 bg-blue-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getRingColor = (score) => {
    if (score >= 80) return 'stroke-green-500';
    if (score >= 60) return 'stroke-blue-500';
    if (score >= 40) return 'stroke-yellow-500';
    return 'stroke-red-500';
  };

  const sizeConfig = {
    sm: {
      circle: 'w-16 h-16',
      text: 'text-xl',
      title: 'text-base',
      description: 'text-sm'
    },
    md: {
      circle: 'w-24 h-24',
      text: 'text-2xl',
      title: 'text-lg',
      description: 'text-base'
    }
  };

  const config = sizeConfig[size];

  return (
    <div className="card text-center">
      <div className="flex flex-col items-center">
        {/* Circular Score */}
        <div className="relative">
          <svg className={`${config.circle} transform -rotate-90`} viewBox="0 0 36 36">
            <path
              className="stroke-gray-200"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              strokeWidth="3"
              fill="none"
            />
            <path
              className={getRingColor(score)}
              strokeDasharray={`${score}, 100`}
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              strokeWidth="3"
              fill="none"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`font-bold ${config.text} ${getScoreColor(score)}`}>
              {score}
            </span>
          </div>
        </div>

        {/* Title and Description */}
        <h3 className={`font-semibold text-gray-900 mt-4 ${config.title}`}>
          {title}
        </h3>
        <p className={`text-gray-600 mt-1 ${config.description}`}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default ScoreCard;