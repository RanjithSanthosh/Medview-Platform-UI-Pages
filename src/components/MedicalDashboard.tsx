import React, { useState } from 'react';
import { 
  FiMenu, 
  FiX, 
  FiSearch, 
  FiRefreshCw, 
  FiMail, 
  FiLock, 
  FiEdit, 
  FiEye,
  FiMoreVertical,
  FiFolder,
  FiCheckCircle,
  FiLink,
  FiFileText,
  FiImage
} from 'react-icons/fi';
import { FaEnvelope, FaLock, FaEdit, FaEye } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Study {
  orderId: string;
  hospital?: string;
  patientName: string;
  gender: string;
  study: string;
  modality: string;
  assignedTo: string;
  assignedDate: string;
  completedDate?: string;
  priority: 'ROUTINE' | 'NORMAL' | 'URGENT';
}

const activeStudiesData: Study[] = [
  {
    orderId: '4cf869248293',
    hospital: 'Jeevan Hospital',
    patientName: 'KASTURI',
    gender: 'F',
    study: 'Brain (Plain Study)',
    modality: 'CT',
    assignedTo: 'Select',
    assignedDate: '23 March 2017 21:32PM',
    priority: 'ROUTINE'
  },
  {
    orderId: '97bfca30510',
    hospital: 'Jeevan Hospital',
    patientName: 'PRATHAM 4 MONTHS',
    gender: 'M',
    study: 'Radiograph',
    modality: 'XRay',
    assignedTo: 'Select',
    assignedDate: '23 March 2017 21:31PM',
    priority: 'NORMAL'
  }
];

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
  {
    orderId: 'E2138ae25e8a',
    patientName: 'JINCY',
    gender: 'F',
    study: 'Extremities (MSK)',
    modality: 'MRI',
    assignedTo: 'Dr Gopinath',
    assignedDate: '21 March 2017 14:44PM',
    completedDate: '21 March 2017 15:45PM',
    priority: 'URGENT'
  },
  {
    orderId: 'Baa41f844d57',
    patientName: 'RAM PRASAD 45/M',
    gender: 'M',
    study: 'Chest',
    modality: 'CT',
    assignedTo: 'Dr Gopinath',
    assignedDate: '20 March 2017 18:54PM',
    completedDate: '20 March 2017 19:28PM',
    priority: 'URGENT'
  },
  {
    orderId: 'Ec3c488b60ee',
    patientName: 'CHENDIL V 39/YRS/M',
    gender: 'M',
    study: 'Brain (Plain Study)',
    modality: 'CT',
    assignedTo: 'Dr Prem Kumar',
    assignedDate: '14 March 2017 15:47PM',
    completedDate: '14 March 2017 17:08PM',
    priority: 'URGENT'
  },
  {
    orderId: '039d53f712ea',
    patientName: 'NAGARAJ 23 YRS/M',
    gender: 'M',
    study: 'Neck (Contrast)',
    modality: 'CT',
    assignedTo: 'Quest Teleradiology Solutions',
    assignedDate: '8 March 2017 13:23PM',
    completedDate: '8 March 2017 21:34PM',
    priority: 'ROUTINE'
  },
  {
    orderId: 'Ce4aa2a81910',
    patientName: 'MR SHIVU 44YRS',
    gender: 'M',
    study: 'Brain (Plain Study)',
    modality: 'CT',
    assignedTo: 'Quest Teleradiology Solutions',
    assignedDate: '8 March 2017 12:24PM',
    completedDate: '8 March 2017 19:40PM',
    priority: 'ROUTINE'
  }
];

const MedicalDashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<'active' | 'completed'>('active');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // Doctor names for dropdown
  const doctorNames = [
    'Dr. Gopinath',
    'Dr. Prem Kumar',
    'Dr. Sarah Johnson',
    'Dr. Michael Chen',
    'Dr. Priya Sharma',
    'Dr. Arvind Menon',
    'Telerad Providers',
    'Quest Teleradiology Solutions'
  ];

  const currentData = currentView === 'active' ? activeStudiesData : completedStudiesData;

  const filteredData = currentData.filter(study => {
    // Text search filter
    const matchesSearch = searchTerm === '' || 
      study.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.orderId.toLowerCase().includes(searchTerm.toLowerCase());

    // Date filter
    let matchesDate = true;
    if (startDate || endDate) {
      // Parse the date from the format "23 March 2017 21:32PM"
      const dateString = study.assignedDate.split(' ').slice(0, 3).join(' ');
      const studyDate = new Date(dateString);
      
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

    return matchesSearch && matchesDate;
  });

  const handleSearch = () => {
    // Search functionality is already handled by the filteredData logic above
    // This function can be used for additional search logic if needed
  };

  const handleRefresh = () => {
    setSearchTerm('');
    setStartDate('');
    setEndDate('');
  };

  const handleViewStudy = () => {
    window.open('https://viewer.ohif.org/viewer?StudyInstanceUIDs=2.16.840.1.114362.1.11972228.22789312658.616067305.306.2', '_blank');
  };

  const handleActionClick = (action: string) => {
    // Replace with actual URLs based on your requirements
    const actionUrls = {
      email: 'mailto:example@email.com',
      lock: '/secure-access',
      edit: '/edit-study',
      view: '/view-details',
    };
    
    if (actionUrls[action as keyof typeof actionUrls]) {
      window.open(actionUrls[action as keyof typeof actionUrls], '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-medical-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed lg:translate-x-0 lg:static lg:inset-0 z-30 w-16 bg-medical-sidebar transition-transform duration-300 ease-in-out lg:w-16`}>
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center h-16 border-b border-medical-gray-600">
            <div className="w-8 h-8 bg-medical-blue rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">CT</span>
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex-1 flex flex-col py-4">
            <button
              onClick={() => setCurrentView('active')}
              className={`flex items-center justify-center h-12 mx-2 mb-2 rounded transition-colors ${
                currentView === 'active' 
                  ? 'bg-medical-blue text-white' 
                  : 'text-medical-gray-300 hover:bg-medical-sidebar-hover hover:text-white'
              }`}
              title="Active Studies"
            >
              <FiFolder className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentView('completed')}
              className={`flex items-center justify-center h-12 mx-2 mb-2 rounded transition-colors ${
                currentView === 'completed' 
                  ? 'bg-medical-blue text-white' 
                  : 'text-medical-gray-300 hover:bg-medical-sidebar-hover hover:text-white'
              }`}
              title="Completed Studies"
            >
              <FiCheckCircle className="w-5 h-5" />
            </button>
            <button className="flex items-center justify-center h-12 mx-2 mb-2 rounded text-medical-gray-300 hover:bg-medical-sidebar-hover hover:text-white transition-colors">
              <FiMoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-0 min-w-0">
        {/* Header */}
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
            Welcome <span className="text-medical-blue font-medium">CyberTeckNinja Radiologist</span>
          </div>
        </header>

        {/* Page Content */}
        <div 
          className="p-2 lg:p-4 h-[calc(100vh-4rem)] overflow-y-auto scrollbar-hide"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <div className="bg-white rounded-lg shadow-sm border border-medical-gray-200 min-h-full flex flex-col">
            {/* Page Header */}
            <div className="px-4 py-2 border-b border-medical-gray-200 flex-shrink-0">
              <div className="flex items-center mb-2">
                <div className="w-4 h-4 bg-medical-gray-200 rounded mr-2"></div>
                <h2 className="text-base font-medium text-medical-gray-700">
                  {currentView === 'active' ? 'Active Studies' : 'Completed Studies'}
                </h2>
              </div>

              {/* Search and Filters */}
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
                    className="h-8 w-32 text-sm border-medical-gray-300"
                    placeholder="Start Date"
                  />
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="h-8 w-32 text-sm border-medical-gray-300"
                    placeholder="End Date"
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
                </div>
                
                {/* Refresh Button - Aligned to the right */}
                <div className="flex justify-end lg:ml-auto">
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

            {/* Table Container */}
            <div className="flex-1 overflow-hidden">
              <div className="overflow-x-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#d1d5db #f3f4f6' }}>
                <table className="w-full divide-y divide-medical-gray-200 table-fixed min-w-[1400px] xl:min-w-0 xl:w-full">
                <thead className="bg-medical-gray-50">
                  <tr>
                    <th className="px-2 py-2 text-center text-xs font-medium text-medical-gray-500 uppercase tracking-wider border-r border-medical-gray-200 w-20">Order ID</th>
                    {currentView === 'active' && (
                      <th className="px-2 py-2 text-center text-xs font-medium text-medical-gray-500 uppercase tracking-wider border-r border-medical-gray-200 w-24">Hospital</th>
                    )}
                    <th className="px-2 py-2 text-center text-xs font-medium text-medical-gray-500 uppercase tracking-wider border-r border-medical-gray-200 w-28">Patient Name</th>
                    <th className="px-2 py-2 text-center text-xs font-medium text-medical-gray-500 uppercase tracking-wider border-r border-medical-gray-200 w-12">Gender</th>
                    <th className="px-2 py-2 text-center text-xs font-medium text-medical-gray-500 uppercase tracking-wider border-r border-medical-gray-200 w-32">Study</th>
                    <th className="px-2 py-2 text-center text-xs font-medium text-medical-gray-500 uppercase tracking-wider border-r border-medical-gray-200 w-20">Modality</th>
                    <th className="px-2 py-2 text-center text-xs font-medium text-medical-gray-500 uppercase tracking-wider border-r border-medical-gray-200 w-24">Assigned To</th>
                    <th className="px-2 py-2 text-center text-xs font-medium text-medical-gray-500 uppercase tracking-wider border-r border-medical-gray-200 w-28">Assigned Date</th>
                    {currentView === 'completed' && (
                      <th className="px-2 py-2 text-center text-xs font-medium text-medical-gray-500 uppercase tracking-wider border-r border-medical-gray-200 w-28">Completed Date</th>
                    )}
                    <th className="px-2 py-2 text-center text-xs font-medium text-medical-gray-500 uppercase tracking-wider border-r border-medical-gray-200 w-20">Priority</th>
                    <th className="px-2 py-2 text-center text-xs font-medium text-medical-gray-500 uppercase tracking-wider border-r border-medical-gray-200 w-32">
                      <div className="flex justify-center space-x-1">
                        <span className="px-2 flex items-center justify-center"><FaEnvelope className="w-4 h-4" /></span>
                        <span className="px-2 flex items-center justify-center"><FiLink className="w-4 h-4" /></span>
                        <span className="px-2 flex items-center justify-center"><FiFileText className="w-4 h-4" /></span>
                        <span className="px-2 flex items-center justify-center"><FiImage className="w-4 h-4" /></span>
                      </div>
                    </th>
                    <th className="px-2 py-2 text-center text-xs font-medium text-medical-gray-500 uppercase tracking-wider w-20">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-medical-gray-200">
                  {filteredData.map((study) => (
                    <tr key={study.orderId} className="hover:bg-medical-gray-50">
                      <td className="px-2 py-2 text-xs text-medical-blue font-medium border-r border-medical-gray-200 truncate text-center">
                        {study.orderId}
                      </td>
                      {currentView === 'active' && (
                        <td className="px-2 py-2 text-xs text-medical-gray-700 border-r border-medical-gray-200 truncate text-center">
                          {study.hospital}
                        </td>
                      )}
                      <td className="px-2 py-2 text-xs text-medical-gray-700 border-r border-medical-gray-200 truncate text-center">
                        {study.patientName}
                      </td>
                      <td className="px-2 py-2 text-xs text-medical-gray-700 border-r border-medical-gray-200 truncate text-center">
                        {study.gender}
                      </td>
                      <td className="px-2 py-2 text-xs text-medical-blue border-r border-medical-gray-200 truncate text-center">
                        {study.study}
                      </td>
                      <td className="px-2 py-2 text-xs text-medical-gray-700 border-r border-medical-gray-200 truncate text-center">
                        {study.modality}
                      </td>
                      <td className="px-2 py-2 text-xs text-medical-gray-700 border-r border-medical-gray-200 truncate text-center">
                        {currentView === 'active' ? (
                          <Select>
                            <SelectTrigger className="h-6 w-full text-xs border-0 p-0">
                              <SelectValue placeholder={study.assignedTo} />
                            </SelectTrigger>
                            <SelectContent>
                              {doctorNames.map((doctor) => (
                                <SelectItem key={doctor} value={doctor}>
                                  {doctor}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          study.assignedTo
                        )}
                      </td>
                      <td className="px-2 py-2 text-xs text-medical-gray-700 border-r border-medical-gray-200 text-center">
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {study.assignedDate.split(' ').slice(0, 3).join(' ')}
                          </span>
                          <span className="text-gray-500">
                            {study.assignedDate.split(' ').slice(3).join(' ')}
                          </span>
                        </div>
                      </td>
                      {currentView === 'completed' && (
                        <td className="px-2 py-2 text-xs text-medical-gray-700 border-r border-medical-gray-200 text-center">
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {study.completedDate?.split(' ').slice(0, 3).join(' ')}
                            </span>
                            <span className="text-gray-500">
                              {study.completedDate?.split(' ').slice(3).join(' ')}
                            </span>
                          </div>
                        </td>
                      )}
                      <td className="px-2 py-2 border-r border-medical-gray-200 text-center">
                        <span className={`inline-flex px-1 py-0.5 text-xs font-semibold rounded-full ${
                          study.priority === 'URGENT' 
                            ? 'bg-red-100 text-red-800' 
                            : study.priority === 'NORMAL'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {study.priority}
                        </span>
                      </td>
                      <td className="px-2 py-2 text-xs border-r border-medical-gray-200 text-center">
                        <div className="flex justify-center bg-white rounded overflow-hidden space-x-1">
                          <button 
                            onClick={() => handleActionClick('email')}
                            className="px-2 flex items-center justify-center text-gray-600 hover:bg-medical-gray-100 p-1 focus:outline-none rounded"
                            title="Email"
                          >
                            <FaEnvelope className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleActionClick('lock')}
                            className="px-2 flex items-center justify-center text-gray-600 hover:bg-medical-gray-100 p-1 focus:outline-none rounded"
                            title="Lock"
                          >
                            <FiLink className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleActionClick('edit')}
                            className="px-2 flex items-center justify-center text-gray-600 hover:bg-medical-gray-100 p-1 focus:outline-none rounded"
                            title="Edit"
                          >
                            <FiFileText className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleActionClick('view')}
                            className="px-2 flex items-center justify-center text-gray-600 hover:bg-medical-gray-200 p-1 focus:outline-none rounded"
                            title="View Details"
                          >
                            <FiImage className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="px-2 py-2 text-xs text-center">
                        <div className="flex flex-col space-y-1 items-center">
                          <Button
                            variant="default"
                            size="sm"
                            onClick={handleViewStudy}
                            className="h-6 px-2 bg-medical-blue hover:bg-medical-blue-dark text-white text-xs w-16"
                          >
                            <FiEye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          {currentView === 'active' ? (
                            <Button
                              variant="default"
                              size="sm"
                              className="h-6 px-2 bg-green-600 hover:bg-green-700 text-white text-xs w-16"
                            >
                              Assign
                            </Button>
                          ) : (
                            <Button
                              variant="default"
                              size="sm"
                              className="h-6 px-2 bg-purple-600 hover:bg-purple-700 text-white text-xs w-16"
                            >
                              Rework
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
                </div>
            </div>
          </div>

          {/* Legend */}
          <div className="px-4 py-2 border-t border-medical-gray-200 text-xs text-medical-gray-600 bg-white rounded-b-lg">
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-1"></div>
                <span>Indicates studies exceeded 3 hours and requires action.</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                <span>Indicates studies of critical priority</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalDashboard;