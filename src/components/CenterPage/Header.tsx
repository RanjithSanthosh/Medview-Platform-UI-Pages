import React from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="bg-white border-b border-medical-gray-200 px-4 lg:px-6 h-16 flex items-center justify-between">
      <div className="flex items-center">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden mr-4 text-medical-gray-600 hover:text-medical-gray-700"
        >
          {sidebarOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
        <h1 className="text-xl font-semibold text-medical-gray-700">CyberTeckNinja</h1>
      </div>
      <div className="text-sm text-medical-gray-500">
        Welcome <span className="text-medical-blue font-medium">CyberTeckNinja Center</span>
      </div>
    </header>
  );
};

export default Header;
