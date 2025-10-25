import React from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react'; // Import an icon

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            {/* Option A: Use an icon */}
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            
            {/* Option B: Use text logo */}
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                ResumeGenius
              </span>
            </div>
          </Link>
          
          <nav className="flex space-x-8">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/analyze" 
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Analyze
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;