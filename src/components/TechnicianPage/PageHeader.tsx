import React from "react";
import { FiSearch, FiRefreshCw } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PageHeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  handleSearch: () => void;
  handleRefresh: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  searchTerm,
  setSearchTerm,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleSearch,
  handleRefresh,
}) => {
  return (
    <div className="px-4 py-2 border-b border-medical-gray-200 flex-shrink-0">
      <div className="flex items-center mb-2">
        <div className="w-4 h-4 bg-medical-gray-200 rounded mr-2"></div>
        <h2 className="text-base font-medium text-medical-gray-700">
          Active Studies
        </h2>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
        <div className="flex-1 max-w-sm">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by Order Id, Patient Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-3 pr-10 h-8 text-sm border-medical-gray-300"
            />
            <Button
              variant="default"
              size="sm"
              onClick={handleSearch}
              className="absolute right-1 top-0.5 h-7 px-2 bg-medical-blue hover:bg-medical-blue-dark"
            >
              <FiSearch className="w-3 h-3" />
              <span className="ml-1 hidden sm:inline text-xs">Search</span>
            </Button>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="h-8 w-40 text-sm border-medical-gray-300 px-2"
          />
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="h-8 w-40 text-sm border-medical-gray-300 px-2"
          />
          <Button
            variant="default"
            size="sm"
            onClick={handleSearch}
            className="h-8 px-2 bg-medical-blue hover:bg-medical-blue-dark"
          >
            <FiSearch className="w-3 h-3" />
            <span className="ml-1 hidden sm:inline text-xs">Search</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="h-8 px-3 border-orange-300 text-orange-600 hover:bg-orange-50 hover:border-orange-400"
          >
            <FiRefreshCw className="w-3 h-3 mr-1" />
            <span className="text-xs">Refresh</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
