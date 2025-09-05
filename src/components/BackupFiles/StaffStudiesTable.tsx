import React, { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { FiLink, FiFileText, FiImage, FiEye, FiSearch, FiRefreshCw } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Study {
  orderId: string;
  patientName: string;
  gender: string;
  study: string;
  modality: string;
  assignedTo: string;
  assignedDate?: string;
  completedDate?: string;
  priority: 'ROUTINE' | 'NORMAL' | 'URGENT';
}

const completedStudiesData: Study[] = [
  {
    orderId: '34e27dd850fa',
    patientName: 'MALLA BINDU',
    gender: 'F',
    study: 'Extremities (MSK)',
    modality: 'MRI',
    assignedTo: 'Telerad Providers',
    assignedDate: '21 March 2017 14:17PM',
    completedDate: '21 March 2017 18:44PM',
    priority: 'ROUTINE'
  },
  // ... other studies ...
];

const StaffStudiesTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredData = completedStudiesData.filter(study => {
    const matchesSearch = searchTerm === '' || 
      study.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    let matchesDate = true;
    if (startDate || endDate) {
      const dateString = study.assignedDate?.split(' ').slice(0, 3).join(' ');
      const studyDate = dateString ? new Date(dateString) : null;
      if (studyDate) {
        if (startDate) {
          const start = new Date(startDate);
          start.setHours(0, 0, 0, 0);
          studyDate.setHours(0, 0, 0, 0);
          matchesDate = matchesDate && studyDate >= start;
        }
        if (endDate) {
          const end = new Date(endDate);
          end.setHours(23, 59, 59, 999);
          studyDate.setHours(0, 0, 0, 0);
          matchesDate = matchesDate && studyDate <= end;
        }
      }
    }
    return matchesSearch && matchesDate;
  });

  const handleSearch = () => {};
  const handleRefresh = () => {
    setSearchTerm('');
    setStartDate('');
    setEndDate('');
  };
  const handleViewStudy = () => {
    window.open('https://viewer.ohif.org/viewer?StudyInstanceUIDs=2.16.840.1.114362.1.11972228.22789312658.616067305.306.2', '_blank');
  };
  const handleActionClick = (action: string) => {};

  return (
    <div className="w-full">
      <div className="px-6 py-4 border-b border-medical-gray-200">
        <div className="flex items-center mb-4">
          <div className="w-6 h-6 bg-medical-gray-200 rounded mr-3"></div>
          <h2 className="text-lg font-medium text-medical-gray-700">Completed Studies</h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search by Order Id, Patient Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 pr-12 h-10 border-medical-gray-300"
              />
              <Button
                variant="default"
                size="sm"
                className="absolute right-1 top-1 h-8 px-3 bg-medical-blue hover:bg-medical-blue-dark"
              >
                <FiSearch className="w-4 h-4" />
                <span className="ml-1 hidden sm:inline">Search</span>
              </Button>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex flex-col">
              <label className="text-xs text-medical-gray-600 mb-1">Start Date</label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-10 w-40 border-medical-gray-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs text-medical-gray-600 mb-1">End Date</label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-10 w-40 border-medical-gray-300"
              />
            </div>
            <div className="flex flex-col">
              <div className="h-4 mb-1"></div>
              <Button
                variant="default"
                size="sm"
                onClick={handleSearch}
                className="h-10 px-3 bg-medical-blue hover:bg-medical-blue-dark"
              >
                <FiSearch className="w-4 h-4" />
                <span className="ml-1 hidden sm:inline">Search</span>
              </Button>
            </div>
            <div className="flex flex-col">
              <div className="h-4 mb-1"></div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className="h-10 px-3 border-medical-gray-300 text-medical-gray-600 hover:bg-medical-gray-50"
              >
                <FiRefreshCw className="w-4 h-4" />
                <span className="ml-1 hidden sm:inline">Refresh</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <table className="w-full divide-y divide-medical-gray-200">
          <thead className="bg-medical-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-medical-gray-500 uppercase tracking-wider border-r border-medical-gray-200">Order ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-medical-gray-500 uppercase tracking-wider border-r border-medical-gray-200">Patient Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-medical-gray-500 uppercase tracking-wider border-r border-medical-gray-200">Gender</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-medical-gray-500 uppercase tracking-wider border-r border-medical-gray-200">Study</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-medical-gray-500 uppercase tracking-wider border-r border-medical-gray-200">Modality</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-medical-gray-500 uppercase tracking-wider border-r border-medical-gray-200">Assigned To</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-medical-gray-500 uppercase tracking-wider border-r border-medical-gray-200">Assigned Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-medical-gray-500 uppercase tracking-wider border-r border-medical-gray-200">Completed Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-medical-gray-500 uppercase tracking-wider border-medical-gray-200">Priority</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-medical-gray-500 uppercase tracking-wider border-r border-medical-gray-200">
                <div className="flex justify-center space-x-1">
                  <span className="px-2 flex items-center justify-center"><FaEnvelope className="w-4 h-4" /></span>
                  <span className="px-2 flex items-center justify-center"><FiLink className="w-4 h-4" /></span>
                  <span className="px-2 flex items-center justify-center"><FiFileText className="w-4 h-4" /></span>
                  <span className="px-2 flex items-center justify-center"><FiImage className="w-4 h-4" /></span>
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-medical-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-medical-gray-200">
            {filteredData.map((study) => (
              <tr key={study.orderId} className="hover:bg-medical-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm text-medical-blue font-medium border-r border-medical-gray-200">{study.orderId}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-medical-gray-700 border-r border-medical-gray-200">{study.patientName}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-medical-gray-700 border-r border-medical-gray-200">{study.gender}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-medical-blue border-r border-medical-gray-200">{study.study}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-medical-gray-700 border-r border-medical-gray-200">{study.modality}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-medical-gray-700 border-r border-medical-gray-200">{study.assignedTo}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-medical-gray-700 border-r border-medical-gray-200">{study.assignedDate}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-medical-gray-700 border-r border-medical-gray-200">{study.completedDate}</td>
                <td className="px-4 py-4 whitespace-nowrap border-r border-medical-gray-200">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${study.priority === 'URGENT' ? 'bg-red-100 text-red-800' : study.priority === 'NORMAL' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>{study.priority}</span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm border-r border-medical-gray-200">
                  <div className="flex justify-center bg-white rounded overflow-hidden space-x-1">
                    <button className="px-2 flex items-center justify-center text-gray-600 hover:bg-medical-gray-100 p-1 focus:outline-none rounded" title="Email"><FaEnvelope className="w-4 h-4" /></button>
                    <button className="px-2 flex items-center justify-center text-gray-600 hover:bg-medical-gray-100 p-1 focus:outline-none rounded" title="Lock"><FiLink className="w-4 h-4" /></button>
                    <button className="px-2 flex items-center justify-center text-gray-600 hover:bg-medical-gray-100 p-1 focus:outline-none rounded" title="Edit"><FiFileText className="w-4 h-4" /></button>
                    <button className="px-2 flex items-center justify-center text-gray-600 hover:bg-medical-gray-200 p-1 focus:outline-none rounded" title="View Details"><FiImage className="w-4 h-4" /></button>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  <div className="flex space-x-2">
                    <Button variant="default" size="sm" onClick={handleViewStudy} className="h-8 px-3 bg-medical-blue hover:bg-medical-blue-dark text-white">
                      <FiEye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button variant="default" size="sm" className="h-8 px-3 bg-cyan-500 hover:bg-cyan-600 text-white">
                      Rework
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffStudiesTable;
