// import React, { useState } from 'react';
// import { FiMenu, FiX, FiSearch, FiRefreshCw, FiMoreVertical, FiFolder, FiLink, FiFileText, FiImage, FiEye } from 'react-icons/fi';
// import { FaEnvelope } from 'react-icons/fa';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// interface Study {
//   orderId: string;
//   hospital?: string;
//   patientName: string;
//   gender: string;
//   study: string;
//   modality: string;
//   assignedTo: string;
//   assignedDate: string;
//   priority: 'ROUTINE' | 'NORMAL' | 'URGENT';
// }

// const activeStudiesData: Study[] = [
//   {
//     orderId: '4cf869248293',
//     hospital: 'Jeevan Hospital',
//     patientName: 'KASTURI',
//     gender: 'F',
//     study: 'Brain (Plain Study)',
//     modality: 'CT',
//     assignedTo: 'Select',
//     assignedDate: '23 March 2017 21:32PM',
//     priority: 'ROUTINE'
//   },
//   {
//     orderId: '97bfca30510',
//     hospital: 'Jeevan Hospital',
//     patientName: 'PRATHAM 4 MONTHS',
//     gender: 'M',
//     study: 'Radiograph',
//     modality: 'XRay',
//     assignedTo: 'Select',
//     assignedDate: '23 March 2017 21:31PM',
//     priority: 'NORMAL'
//   }
// ];

// const doctorNames = [
//   'Dr. Gopinath',
//   'Dr. Prem Kumar',
//   'Dr. Sarah Johnson',
//   'Dr. Michael Chen',
//   'Dr. Priya Sharma',
//   'Dr. Arvind Menon',
//   'Telerad Providers',
//   'Quest Teleradiology Solutions'
// ];

// const CenterPage: React.FC = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   const handleSearch = () => {
//     console.log('Search clicked');
//     // Implement search logic here
//   };

//   const handleRefresh = () => {
//     console.log('Refresh clicked');
//     // Implement refresh logic here
//   };

//   const handleViewStudy = () => {
//     console.log('View Study clicked');
//     // Implement view study logic here
//   };

//   const filteredData = activeStudiesData.filter(study =>
//     study.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     study.patientName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-medical-gray-50 flex">
//       {/* Sidebar */}
//       <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed lg:translate-x-0 lg:static lg:inset-0 z-30 w-16 bg-medical-sidebar transition-transform duration-300 ease-in-out lg:w-16`}>
//         <div className="flex flex-col h-full">
//           {/* Logo/Brand */}
//           <div className="flex items-center justify-center h-16 border-b border-medical-gray-600">
//             <div className="w-8 h-8 bg-medical-blue rounded-full flex items-center justify-center">
//               <span className="text-white text-sm font-bold">CT</span>
//             </div>
//           </div>
//           {/* Navigation Icons */}
//           <div className="flex-1 flex flex-col py-4">
//             <button
//               className={`flex items-center justify-center h-12 mx-2 mb-2 rounded transition-colors bg-medical-blue text-white`}
//               title="Active Studies"
//             >
//               <FiFolder className="w-5 h-5" />
//             </button>
//             <button className="flex items-center justify-center h-12 mx-2 mb-2 rounded text-medical-gray-300 hover:bg-medical-sidebar-hover hover:text-white transition-colors">
//               <FiMoreVertical className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </div>
//       {/* Mobile Overlay */}
//       {sidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}
//       {/* Main Content */}
//       <div className="flex-1 lg:ml-0 min-w-0">
//         {/* Header */}
//         <header className="bg-white border-b border-medical-gray-200 px-4 lg:px-6 h-16 flex items-center justify-between">
//           <div className="flex items-center">
//             <button
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="lg:hidden mr-4 text-medical-gray-600 hover:text-medical-gray-700"
//             >
//               {sidebarOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
//             </button>
//             <h1 className="text-xl font-semibold text-medical-gray-700">CyberTeckNinja</h1>
//           </div>
//           <div className="text-sm text-medical-gray-500">
//             Welcome <span className="text-medical-blue font-medium">CyberTeckNinja Center</span>
//           </div>
//         </header>
//         {/* Page Content */}
//         <div className="p-2 lg:p-4 h-[calc(100vh-4rem)] overflow-y-auto scrollbar-hide">
//           <div className="bg-white rounded-lg shadow-sm border border-medical-gray-200 min-h-full flex flex-col">
//             {/* Page Header */}
//             <div className="px-4 py-2 border-b border-medical-gray-200 flex-shrink-0">
//               <div className="flex items-center mb-2">
//                 <div className="w-4 h-4 bg-medical-gray-200 rounded mr-2"></div>
//                 <h2 className="text-base font-medium text-medical-gray-700">Active Studies</h2>
//               </div>
//               {/* Search and Filters */}
//               <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
//                 <div className="flex-1 max-w-sm">
//                   <div className="relative">
//                     <Input
//                       type="text"
//                       placeholder="Search by Order Id, Patient Name"
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="pl-3 pr-10 h-8 text-sm border-medical-gray-300"
//                     />
//                     <Button
//                       variant="default"
//                       size="sm"
//                       className="absolute right-1 top-0.5 h-7 px-2 bg-medical-blue hover:bg-medical-blue-dark"
//                     >
//                       <FiSearch className="w-3 h-3" />
//                       <span className="ml-1 hidden sm:inline text-xs">Search</span>
//                     </Button>
//                   </div>
//                 </div>
//                 <div className="flex gap-3 items-center">
//                   <Input
//                     type="date"
//                     value={startDate}
//                     onChange={(e) => setStartDate(e.target.value)}
//                     className="h-8 w-32 text-sm border-medical-gray-300"
//                     placeholder="Start Date"
//                   />
//                   <Input
//                     type="date"
//                     value={endDate}
//                     onChange={(e) => setEndDate(e.target.value)}
//                     className="h-8 w-32 text-sm border-medical-gray-300"
//                     placeholder="End Date"
//                   />
//                   <Button
//                     variant="default"
//                     size="sm"
//                     onClick={handleSearch}
//                     className="h-8 px-2 bg-medical-blue hover:bg-medical-blue-dark"
//                   >
//                     <FiSearch className="w-3 h-3" />
//                     <span className="ml-1 hidden sm:inline text-xs">Search</span>
//                   </Button>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={handleRefresh}
//                     className="h-8 px-3 border-orange-300 text-orange-600 hover:bg-orange-50 hover:border-orange-400"
//                   >
//                     <FiRefreshCw className="w-3 h-3 mr-1" />
//                     <span className="text-xs">Refresh</span>
//                   </Button>
//                 </div>
//               </div>
//             </div>
//             {/* Table Container */}
//             <div className="flex-1 overflow-hidden">
//               <div className="overflow-x-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#d1d5db #f3f4f6' }}>
//                 <table className="w-full divide-y divide-medical-gray-200 table-fixed min-w-[1400px] xl:min-w-0 xl:w-full">
//                   <thead className="bg-medical-gray-50">
//                     <tr>
//                       <th className="px-2 py-2 text-center text-xs font-medium text-medical-gray-500 uppercase tracking-wider border-r border-medical-gray-200 w-20">Order ID</th>
//                       <th className="px-2 py-2 text-center text-xs font-medium text-medical-gray-500 uppercase tracking-wider border-r border-medical-gray-200 w-24">Hospital</th>
//                       <th className="px-2 py-2 text-center text-xs font-medium text-medical-gray-500 uppercase tracking-wider border-r border-medical-gray-200 w-28">Patient Name</th>
//                       <th className="px-2 py-2 text-center text-xs font-medium text-medical-gray-500 uppercase tracking-wider border-r border-medical-gray-200 w-12">Gender</th>
//                       <th className="px-2 py-2 text-center text-xs font-medium text-medical-gray-500 uppercase tracking-wider border-r border-medical-gray-200 w-32">Study</th>
//                       <th className="px-2 py-2 text-center text-xs font-medium text-medical-gray-500 uppercase tracking-wider border-r border-medical-gray-200 w-20">Modality</th>
//                       <th className="px-2 py-2 text-center text-xs font-medium text-medical-gray-500 uppercase tracking-wider border-r border-medical-gray-200 w-24">Assigned To</th>
//                       <th className="px-2 py-2 text-center text-xs font-medium text-medical-gray-500 uppercase tracking-wider border-r border-medical-gray-200 w-28">Assigned Date</th>
//                       <th className="px-2 py-2 text-center text-xs font-medium text-medical-gray-500 uppercase tracking-wider border-medical-gray-200 w-20">Priority</th>
//                       <th className="px-2 py-2 text-center text-xs font-medium text-medical-gray-500 uppercase tracking-wider border-r border-medical-gray-200 w-32">
//                         <div className="flex justify-center space-x-1">
//                           <span className="px-2 flex items-center justify-center"><FaEnvelope className="w-4 h-4" /></span>
//                           <span className="px-2 flex items-center justify-center"><FiLink className="w-4 h-4" /></span>
//                           <span className="px-2 flex items-center justify-center"><FiFileText className="w-4 h-4" /></span>
//                           <span className="px-2 flex items-center justify-center"><FiImage className="w-4 h-4" /></span>
//                         </div>
//                       </th>
//                       <th className="px-2 py-2 text-center text-xs font-medium text-medical-gray-500 uppercase tracking-wider w-20">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-medical-gray-200">
//                     {filteredData.map((study) => (
//                       <tr key={study.orderId} className="hover:bg-medical-gray-50">
//                         <td className="px-2 py-2 text-xs text-medical-blue font-medium border-r border-medical-gray-200 truncate text-center">
//                           {study.orderId}
//                         </td>
//                         <td className="px-2 py-2 text-xs text-medical-gray-700 border-r border-medical-gray-200 truncate text-center">
//                           {study.hospital}
//                         </td>
//                         <td className="px-2 py-2 text-xs text-medical-gray-700 border-r border-medical-gray-200 truncate text-center">
//                           {study.patientName}
//                         </td>
//                         <td className="px-2 py-2 text-xs text-medical-gray-700 border-r border-medical-gray-200 truncate text-center">
//                           {study.gender}
//                         </td>
//                         <td className="px-2 py-2 text-xs text-medical-blue border-r border-medical-gray-200 truncate text-center">
//                           {study.study}
//                         </td>
//                         <td className="px-2 py-2 text-xs text-medical-gray-700 border-r border-medical-gray-200 truncate text-center">
//                           {study.modality}
//                         </td>
//                         <td className="px-2 py-2 text-xs text-medical-gray-700 border-r border-medical-gray-200 truncate text-center">
//                           <Select>
//                             <SelectTrigger className="h-6 w-full text-xs border-0 p-0">
//                               <SelectValue placeholder={study.assignedTo} />
//                             </SelectTrigger>
//                             <SelectContent>
//                               {doctorNames.map((doctor) => (
//                                 <SelectItem key={doctor} value={doctor}>
//                                   {doctor}
//                                 </SelectItem>
//                               ))}
//                             </SelectContent>
//                           </Select>
//                         </td>
//                         <td className="px-2 py-2 text-xs text-medical-gray-700 border-r border-medical-gray-200 text-center">
//                           <div className="flex flex-col">
//                             <span className="font-medium">
//                               {study.assignedDate.split(' ').slice(0, 3).join(' ')}
//                             </span>
//                             <span className="text-gray-500">
//                               {study.assignedDate.split(' ').slice(3).join(' ')}
//                             </span>
//                           </div>
//                         </td>
//                         <td className="px-2 py-2 border-r border-medical-gray-200 text-center">
//                           <span className={`inline-flex px-1 py-0.5 text-xs font-semibold rounded-full ${
//                             study.priority === 'URGENT' 
//                               ? 'bg-red-100 text-red-800' 
//                               : study.priority === 'NORMAL'
//                               ? 'bg-yellow-100 text-yellow-800'
//                               : 'bg-blue-100 text-blue-800'
//                           }`}>
//                             {study.priority}
//                           </span>
//                         </td>
//                         <td className="px-2 py-2 text-xs border-r border-medical-gray-200 text-center">
//                           <div className="flex justify-center bg-white rounded overflow-hidden space-x-1">
//                             <button className="px-2 flex items-center justify-center text-gray-600 hover:bg-medical-gray-100 p-1 focus:outline-none rounded" title="Email">
//                               <FaEnvelope className="w-4 h-4" />
//                             </button>
//                             <button className="px-2 flex items-center justify-center text-gray-600 hover:bg-medical-gray-100 p-1 focus:outline-none rounded" title="Lock">
//                               <FiLink className="w-4 h-4" />
//                             </button>
//                             <button className="px-2 flex items-center justify-center text-gray-600 hover:bg-medical-gray-100 p-1 focus:outline-none rounded" title="Edit">
//                               <FiFileText className="w-4 h-4" />
//                             </button>
//                             <button className="px-2 flex items-center justify-center text-gray-600 hover:bg-medical-gray-200 p-1 focus:outline-none rounded" title="View Details">
//                               <FiImage className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </td>
//                         <td className="px-2 py-2 text-xs text-center">
//                           <div className="flex flex-col space-y-1 items-center">
//                             <Button
//                               variant="default"
//                               size="sm"
//                               onClick={handleViewStudy}
//                               className="h-6 px-2 bg-medical-blue hover:bg-medical-blue-dark text-white text-xs w-16"
//                             >
//                               <FiEye className="w-3 h-3 mr-1" />
//                               View
//                             </Button>
//                             <Button
//                               variant="default"
//                               size="sm"
//                               className="h-6 px-2 bg-green-600 hover:bg-green-700 text-white text-xs w-16"
//                             >
//                               Assign
//                             </Button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//             {/* Legend */}
//             <div className="px-4 py-2 border-t border-medical-gray-200 text-xs text-medical-gray-600 bg-white rounded-b-lg">
//               <div className="flex flex-wrap gap-2">
//                 <div className="flex items-center">
//                   <div className="w-2 h-2 bg-yellow-400 rounded-full mr-1"></div>
//                   <span>Indicates studies exceeded 3 hours and requires action.</span>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
//                   <span>Indicates studies of critical priority</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CenterPage;



// import React, { useState } from 'react';
// import Sidebar from '@/components/CenterPage/Sidebar';
// import Header from '@/components/CenterPage/Header';
// import PageHeader from '@/components/CenterPage/PageHeader';
// import StudiesTable from '@/components/CenterPage/ActiveStudiesTable';
// import Legend from '@/components/CenterPage/Legend';
// import CenterAssigned from '@/components/CenterPage/ActiveStudiesTable';
// import CompletedStudiesTable from '@/components/CenterPage/CompletedStudiesTable';



// interface Study {
//   orderId: string;
//   hospital?: string;
//   patientName: string;
//   gender: string;
//   study: string;
//   modality: string;
//   assignedTo: string;
//   assignedDate: string;
//   priority: 'ROUTINE' | 'NORMAL' | 'URGENT';
// }

// const activeStudiesData: Study[] = [
//   {
//     orderId: '4cf869248293',
//     hospital: 'Jeevan Hospital',
//     patientName: 'KASTURI',
//     gender: 'F',
//     study: 'Brain (Plain Study)',
//     modality: 'CT',
//     assignedTo: 'Select',
//     assignedDate: '23 March 2017 21:32PM',
//     priority: 'ROUTINE'
//   },
//   {
//     orderId: '97bfca30510',
//     hospital: 'Jeevan Hospital',
//     patientName: 'PRATHAM 4 MONTHS',
//     gender: 'M',
//     study: 'Radiograph',
//     modality: 'XRay',
//     assignedTo: 'Select',
//     assignedDate: '23 March 2017 21:31PM',
//     priority: 'NORMAL'
//   }
// ];

// const doctorNames = [
//   'Dr. Gopinath',
//   'Dr. Prem Kumar',
//   'Dr. Sarah Johnson',
//   'Dr. Michael Chen',
//   'Dr. Priya Sharma',
//   'Dr. Arvind Menon',
//   'Telerad Providers',
//   'Quest Teleradiology Solutions'
// ];

// const CenterPage: React.FC = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   const handleSearch = () => {
//     console.log('Search clicked');
//   };

//   const handleRefresh = () => {
//     console.log('Refresh clicked');
//   };

//   const handleViewStudy = () => {
//     console.log('View Study clicked');
//   };

//   const filteredData = activeStudiesData.filter(study =>
//     study.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     study.patientName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const renderContent = () => {
//     switch (currentView) {
//       case 'dashboard':
//         return (
//           <>
            
//             <CenterAssigned />
//           </>
//         );
//       case 'completed':
//         return (
//           <>
//             <PageHeader title="Completed Studies" />
//             <CompletedStudiesTable  />
//             {/* studies={mockCompletedStudies} */}
//             <Legend />
//           </>
//         );
//       case 'profile':
//         return (
//           <>
            
            
//           </>
//         );
//       case 'assigned':
//         return (
//           <>
//             {/* <PageHeader title="Assigned Studies" />
//             <TechnicianAssigned />
//             <Legend /> */}
//             <CenterAssigned/>
//           </>
//         );

//     }
//   };

//   return (
//     <div className="min-h-screen bg-medical-gray-50 flex">
//             {/* Sidebar with view change callback */}
//       <Sidebar
//         currentView={currentView}
//         onViewChange={setCurrentView}
//         sidebarOpen={sidebarOpen}
//       />
//       {sidebarOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
//       )}
//       <div className="flex-1 lg:ml-0 min-w-0">
//         <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//         <div className="p-2 lg:p-4 h-[calc(100vh-4rem)] overflow-y-auto scrollbar-hide">
//           <div className="bg-white rounded-lg shadow-sm border border-medical-gray-200 min-h-full flex flex-col">
//             <PageHeader
//               searchTerm={searchTerm}
//               setSearchTerm={setSearchTerm}
//               startDate={startDate}
//               setStartDate={setStartDate}
//               endDate={endDate}
//               setEndDate={setEndDate}
//               handleSearch={handleSearch}
//               handleRefresh={handleRefresh}
//             />
//             <StudiesTable
//               filteredData={filteredData}
//               doctorNames={doctorNames}
//               handleViewStudy={handleViewStudy}
//             />
//             <Legend />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CenterPage;





import React, { useState } from 'react';
import Sidebar from '@/components/CenterPage/Sidebar';
import Header from '@/components/CenterPage/Header';
import PageHeader from '@/components/CenterPage/PageHeader';
import StudiesTable from '@/components/CenterPage/AssignedCases';
import Legend from '@/components/CenterPage/Legend';
import CompletedStudiesTable from '@/components/CenterPage/CompletedStudiesTable';
import CenterDashboard from '@/components/CenterPage/CenterDashboard';
import CenterProfile from '@/components/CenterPage/CenterProfile';
import PaymentHistory from '@/components/CenterPage/InstitutionPaymentPage';
import PayManagement from '@/components/CenterPage/PayManagement';
import ChatFunctionality from '@/components/TechnicianPage/chat/chatFuncionality';
import SupportPage from '@/components/SupportPage/SupportPage';

interface Study {
  orderId: string;
  hospital?: string;
  patientName: string;
  gender: string;
  study: string;
  modality: string;
  assignedTo: string;
  assignedDate: string;
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
    priority: 'ROUTINE',
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
    priority: 'NORMAL',
  },
];

const doctorNames = [
  'Dr. Gopinath',
  'Dr. Prem Kumar',
  'Dr. Sarah Johnson',
  'Dr. Michael Chen',
  'Dr. Priya Sharma',
  'Dr. Arvind Menon',
  'Telerad Providers',
  'Quest Teleradiology Solutions',
];

const CenterPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentView, setCurrentView] = useState('dashboard'); // ✅ Added missing state

  const handleSearch = () => {
    console.log('Search clicked');
  };

  const handleRefresh = () => {
    console.log('Refresh clicked');
  };

  const handleViewStudy = () => {
    console.log('View Study clicked');
  };

  const filteredData = activeStudiesData.filter(
    (study) =>
      study.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <>

            <CenterDashboard
             
              handleViewStudy={handleViewStudy}
            />
           
          </>
        );
      case 'payment-history':
        return (
          <>

            <PaymentHistory
             
              handleViewStudy={handleViewStudy}
            />
           
          </>
        );
        case 'chat':
        return (
          <>
            <ChatFunctionality />
          </>
        );
      case 'support':
        return (
          <>
            <SupportPage />
          </>
        );
      case 'pay-management':
        return (
          <>

            <PayManagement
             
              handleViewStudy={handleViewStudy}
            />
          
          </>
        );
      case 'assigned':
        return (
          <>
            <PageHeader
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              handleSearch={handleSearch}
              handleRefresh={handleRefresh}
            />
            <StudiesTable
             
              handleViewStudy={handleViewStudy}
            />
            <Legend />
          </>
        );
      case 'completed':
        return (
          <>
            <PageHeader
              title="Completed Studies"
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              handleSearch={handleSearch}
              handleRefresh={handleRefresh}
            />
            <CompletedStudiesTable />
            
          </>
        );
      case 'profile':
        return (
          <>

            <CenterProfile
             
              handleViewStudy={handleViewStudy}
            />
            
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-medical-gray-50 flex">
      {/* Sidebar with view change callback */}
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="flex-1 lg:ml-0 min-w-0">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="p-2 lg:p-4 h-[calc(100vh-4rem)] overflow-y-auto scrollbar-hide">
          <div className="bg-white rounded-lg shadow-sm border border-medical-gray-200 min-h-full flex flex-col">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterPage;
