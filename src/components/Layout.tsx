
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Cloud, Calculator } from 'lucide-react';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-primary text-primary-foreground shadow-md">
        <nav className="container mx-auto px-4 sm:px-6 py-3 flex flex-wrap justify-between items-center">
          <Link to="/" className="text-xl sm:text-2xl font-bold hover:text-gray-200 transition-colors mb-2 sm:mb-0">
            Delhi NCR AQI Watch
          </Link>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link
              to="/"
              className="flex items-center px-2 py-1 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-primary-foreground hover:text-primary transition-colors"
            >
              <Cloud className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Home
            </Link>
            <Link
              to="/calculator"
              className="flex items-center px-2 py-1 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-primary-foreground hover:text-primary transition-colors"
            >
              <Calculator className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              AQI Calculator
            </Link>
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-gray-300 text-center p-4">
        <p>&copy; {new Date().getFullYear()} AQI Prediction Delhi NCR. Stay Safe!</p>
        <p className="text-xs mt-1">AQI data and predictions are for informational purposes only.</p>
      </footer>
    </div>
  );
};

export default Layout;
