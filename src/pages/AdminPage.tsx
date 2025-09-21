import React, { useState } from 'react';
import Sidebar from '@/components/AdminPage/Sidebar';
import Header from '@/components/AdminPage/Header';
import PageHeader from '@/components/AdminPage/PageHeader';
import StudiesTable from '@/components/AdminPage/AssignedCases';
import Legend from '@/components/AdminPage/Legend';
import CompletedStudiesTable from '@/components/AdminPage/CompletedStudiesTable';
import CenterDashboard from '@/components/AdminPage/AdminDashboard';
import InstitutionAudit from '@/components/AdminPage/InstitutionAudit';
import TechnicianAudit from '@/components/AdminPage/TechnicianAudit';
import PaymentApproval from '@/components/AdminPage/PaymentApprovalDashboard';
import AssignHistory from '@/components/AdminPage/CaseHistoryDashboard';
import PaymentInvoice from '@/components/AdminPage/PaymentInvoice';
import SupportPage from '@/components/SupportPage/SupportPage';
import ChatFunctionality from '@/components/TechnicianPage/chat/chatFuncionality';
import InstitutionPayment from '@/components/AdminPage/InstitutionReceiptsPage';
// import DoctorPaymentPage from '@/components/DoctorPage/DoctorPaymentPage';
import DoctorDetailes from '@/components/AdminPage/DoctorDetailes';
import TechnicianDetailes from '@/components/AdminPage/TechnicianDetailes';
import DoctorPaymentPage from '@/components/AdminPage/DoctorPaymentHistory';


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

const CenterPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentView, setCurrentView] = useState('dashboard');

  const handleSearch = () => {
    console.log('Search clicked');
  };

  const handleRefresh = () => {
    console.log('Refresh clicked');
  };

  const handleViewStudy = () => {
    console.log('View Study clicked');
  };

  const renderContent = () => {
    const contentSwitch = () => {
      switch (currentView) {
        case 'dashboard':
          return <CenterDashboard />;
        case 'doctor':
          return <DoctorDetailes />;
        case 'technician':
          return <TechnicianDetailes />;
        case 'institution-payments':
          return <InstitutionPayment />;
        case 'doctor-payments':
          return <DoctorPaymentPage />;
        case 'support':
          return <SupportPage />;
        case 'chat':
          return <ChatFunctionality />;
        case 'payment-invoice':
          return <PaymentInvoice />;
        case 'case-history':
          return <AssignHistory />;
        case 'payment-approval':
          return <PaymentApproval />;
        case 'institution-audit':
          return <InstitutionAudit />;
        case 'technician-audit':
          return <TechnicianAudit />;
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
              <StudiesTable />
              <Legend />
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
        default:
          return null;
      }
    };

    // Conditionally apply the wrapper. The InstitutionAudit page has its own background and padding.
    if (currentView === 'institution-audit') {
      return contentSwitch();
    }

    return (
      <div className="bg-white rounded-lg shadow-sm border border-medical-gray-200 flex flex-col min-h-full">
        {contentSwitch()}
      </div>
    );
  };

  return (
    <div className="bg-medical-gray-50 flex h-screen">
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
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-1 overflow-y-auto p-2 lg:p-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default CenterPage;
