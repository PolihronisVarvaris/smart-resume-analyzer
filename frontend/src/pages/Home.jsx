import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Star, Zap, CheckCircle } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'PDF & DOCX Support',
      description: 'Upload resumes in multiple formats for comprehensive analysis'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'AI-Powered Analysis',
      description: 'Get intelligent feedback using advanced NLP and machine learning'
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Actionable Insights',
      description: 'Receive specific recommendations to improve your resume'
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'ATS Optimization',
      description: 'Ensure your resume passes through applicant tracking systems'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Smart Resume
              <span className="text-primary-600"> Analyzer</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Get AI-powered feedback on your resume. Improve formatting, content, 
              and increase your chances of landing interviews.
            </p>
            <Link
              to="/analyze"
              className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2"
            >
              <FileText className="w-5 h-5" />
              <span>Analyze Your Resume</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Use Our Resume Analyzer?
            </h2>
            <p className="text-lg text-gray-600">
              Get comprehensive feedback to make your resume stand out
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center">
                <div className="text-primary-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Improve Your Resume?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Upload your resume now and get instant AI-powered feedback
          </p>
          <Link
            to="/analyze"
            className="btn-primary text-lg px-8 py-4"
          >
            Start Analysis
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;