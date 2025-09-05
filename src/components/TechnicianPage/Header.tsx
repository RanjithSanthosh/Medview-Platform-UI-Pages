import React from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
interface HeaderProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <header className="bg-white border-b border-medical-gray-200 px-4 lg:px-6 h-16 flex items-center justify-between">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="lg:hidden mr-4 text-medical-gray-600 hover:text-medical-gray-700"
        >
          {sidebarOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
        <h1 className="text-xl font-semibold text-medical-gray-700">CyberTeckNinja</h1>
      </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-medical-gray-500">
                Welcome <span className="text-medical-blue font-medium">CyberTeckNinja Technician Page</span>
              </span>
              <Button
                variant="outline"
                size="sm"
                className="px-3 bg-red-500 text-white border-medical-gray-300  hover:bg-medical-gray-50"
                onClick={() => {
                  // Add your logout logic here
                  window.location.href = '/';
                }}
              >
                Logout
              </Button>
            </div>
    </header>
  );
};

export default Header;
