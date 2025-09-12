


// import React, { useState } from 'react';
// import Sidebar from '@/components/TechnicianPage/Sidebar';
// import Header from '@/components/TechnicianPage/Header';
// import PageHeader from '@/components/TechnicianPage/PageHeader';
// import CompletedStudiesTable from '@/components/TechnicianPage/CompletedStudiesTable';
// import Legend from '@/components/TechnicianPage/Legend';
// import TechnicianDashboard from '@/components/TechnicianPage/TechnicianDashboard';
// import TechnicianProfile from '@/components/TechnicianPage/TechnecianProfile';
// import TechnicianAssigned from '@/components/TechnicianPage/AssignedCases';
// import ChatFunctionality from '@/components/TechnicianPage/chat/chatFuncionality';
// import SupportPage from '@/components/SupportPage/SupportPage';



// const StaffPage: React.FC = () => {
//   const [currentView, setCurrentView] = useState<'dashboard' | 'completed' | 'assigned'>('dashboard');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [sidebarOpen, setSidebarOpen] = useState(false);


//   // Controls what content appears in the main area
//   const handleViewStudy = () => {
//     // Implement view study logic or leave empty
//   };
//   const handleSearch = () => {};
//   const handleRefresh = () => {};

//   const renderContent = () => {
//     switch (currentView) {
//       case 'dashboard':
//         return (
//           <>
//             <TechnicianDashboard />
//           </>
//         );
//       case 'support':
//         return (
//           <>
//             <SupportPage />
//           </>
//         );
//         case 'profile':
//         return (
//           <>
//             <TechnicianProfile />
//           </>
//         );
//         case 'chat':
//         return (
//           <>
//             <ChatFunctionality />
//           </>
//         );
//       case 'completed':
//         return (
//           <>
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
//             <CompletedStudiesTable handleViewStudy={handleViewStudy} />
          
//           </>
//         );
//       case 'assigned':
//         return (
//           <>
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
//             <TechnicianAssigned />
//             <Legend />
//           </>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-medical-gray-50 flex">
//       {/* Sidebar with view change callback */}
//       <Sidebar
//         currentView={currentView}
//         onViewChange={(view) => setCurrentView(view as typeof currentView)}
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//       />

//       {/* Main content area */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <Header sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

//         {/* Page content */}
//         <div className="p-2 lg:p-4 flex-1 overflow-y-auto scrollbar-hide">
//           <div className="bg-white rounded-lg shadow-sm border border-medical-gray-200 p-4 flex flex-col gap-4">
//             {renderContent()}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StaffPage;






import React, { useState } from 'react';
import Sidebar from '@/components/TechnicianPage/Sidebar';
import Header from '@/components/TechnicianPage/Header';
import PageHeader from '@/components/TechnicianPage/PageHeader';
import CompletedStudiesTable from '@/components/TechnicianPage/CompletedStudiesTable';
import Legend from '@/components/TechnicianPage/Legend';
import TechnicianDashboard from '@/components/TechnicianPage/TechnicianDashboard';
import TechnicianProfile from '@/components/TechnicianPage/TechnecianProfile';
import TechnicianAssigned from '@/components/TechnicianPage/AssignedCases';
import ChatFunctionality from '@/components/TechnicianPage/chat/chatFuncionality';
import SupportPage from '@/components/SupportPage/SupportPage';



const StaffPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'completed' | 'assigned'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);


  // Controls what content appears in the main area
  const handleViewStudy = () => {
    // Implement view study logic or leave empty
  };
  const handleSearch = () => {};
  const handleRefresh = () => {};

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <>
            <TechnicianDashboard />
          </>
        );
      case 'support':
        return (
          <>
            <SupportPage />
          </>
        );
        case 'profile':
        return (
          <>
            <TechnicianProfile />
          </>
        );
        case 'chat':
        return (
          <>
            <ChatFunctionality />
          </>
        );
      case 'completed':
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
            <CompletedStudiesTable handleViewStudy={handleViewStudy} />
          
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
            <TechnicianAssigned />
            <Legend />
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
        onViewChange={(view) => setCurrentView(view as typeof currentView)}
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

export default StaffPage;
