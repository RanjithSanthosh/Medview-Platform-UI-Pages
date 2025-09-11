


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
import DoctorPayment from '@/components/AdminPage/DoctorPaymentHistory';
import DoctorDetailes from '@/components/AdminPage/DoctorDetailes';
import TechnicianDetailes from '@/components/AdminPage/TechnicianDetailes';



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
      case 'doctor':
        return (
          <>

            <DoctorDetailes
             
              handleViewStudy={handleViewStudy}
            />
       
          </>
        );
      case 'technician':
        return (
          <>

            <TechnicianDetailes
             
              handleViewStudy={handleViewStudy}
            />
          
          </>
        );
      case 'institution-payments':
        return (
          <>

            <InstitutionPayment
             
              handleViewStudy={handleViewStudy}
            />
           
          </>
        );
      case 'doctor-payments':
        return (
          <>

            <DoctorPayment
             
              handleViewStudy={handleViewStudy}
            />
           
          </>
        );
      case 'support':
        return (
          <>

            <SupportPage
             
              handleViewStudy={handleViewStudy}
            />
           
          </>
        );
      case 'chat':
        return (
          <>

            <ChatFunctionality
             
              handleViewStudy={handleViewStudy}
            />
          
          </>
        );
      case 'payment-invoice':
        return (
          <>

            <PaymentInvoice
             
              handleViewStudy={handleViewStudy}
            />
           
          </>
        );
      case 'case-history':
        return (
          <>

            <AssignHistory
             
              handleViewStudy={handleViewStudy}
            />
          
          </>
        );
      case 'payment-approval':
        return (
          <>

            <PaymentApproval
             
              handleViewStudy={handleViewStudy}
            />
           
          </>
        );
      case 'institution-audit':
        return (
          <>

            <InstitutionAudit
             
              handleViewStudy={handleViewStudy}
            />
        
          </>
        );
      case 'technician-audit':
        return (
          <>

            <TechnicianAudit
             
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
