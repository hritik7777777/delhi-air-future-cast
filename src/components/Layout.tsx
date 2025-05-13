
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Cloud, Calculator } from 'lucide-react';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-primary text-primary-foreground shadow-md">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold hover:text-gray-200 transition-colors">
            Delhi NCR AQI Watch
          </Link>
          <div className="space-x-4">
            <Link
              to="/"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-foreground hover:text-primary transition-colors"
            >
              <Cloud className="mr-2 h-5 w-5" />
              Home
            </Link>
            <Link
              to="/calculator"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-foreground hover:text-primary transition-colors"
            >
              <Calculator className="mr-2 h-5 w-5" />
              AQI Calculator
            </Link>
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-6 py-8">
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
