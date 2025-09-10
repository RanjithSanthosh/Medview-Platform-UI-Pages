// import React from 'react';
// import { FiFolder, FiMoreVertical } from 'react-icons/fi';

// interface SidebarProps {
//   sidebarOpen: boolean;
//   setSidebarOpen: (value: boolean) => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
//   return (
//     <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed lg:translate-x-0 lg:static lg:inset-0 z-30 w-16 bg-medical-sidebar transition-transform duration-300 ease-in-out lg:w-16`}>
//       <div className="flex flex-col h-full">
//         <div className="flex items-center justify-center h-16 border-b border-medical-gray-600">
//           <div className="w-8 h-8 bg-medical-blue rounded-full flex items-center justify-center">
//             <span className="text-white text-sm font-bold">CT</span>
//           </div>
//         </div>
//         <div className="flex-1 flex flex-col py-4">
//           <button className="flex items-center justify-center h-12 mx-2 mb-2 rounded transition-colors bg-medical-blue text-white" title="Active Studies">
//             <FiFolder className="w-5 h-5" />
//           </button>
//           <button className="flex items-center justify-center h-12 mx-2 mb-2 rounded text-medical-gray-300 hover:bg-medical-sidebar-hover hover:text-white transition-colors">
//             <FiMoreVertical className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;



// import { FaTachometerAlt, FaHourglassHalf, FaPlayCircle, FaCheckCircle, FaUser, FaWallet, FaHistory } from 'react-icons/fa';

// interface DoctorSidebarProps {
//   currentView: string;
//   onViewChange: (view: string) => void;
//   sidebarOpen: boolean;
// }

// const navItems = [
//   { name: 'Dashboard', icon: <FaTachometerAlt />, view: 'dashboard' },
//   { name: 'Assigned Case', icon: <FaHistory />, view: 'assigned' },
//   { name: 'Completed Cases', icon: <FaCheckCircle />, view: 'completed' },
//   { name: 'Profile', icon: <FaUser />, view: 'profile' },
// ];

// const DoctorSidebar: React.FC<DoctorSidebarProps> = ({ currentView, onViewChange, sidebarOpen }) => (
//   <div 
//     className={`${sidebarOpen ? 'w-64' : 'w-16'} fixed lg:static lg:inset-0 z-30 bg-medical-sidebar transition-all duration-300 ease-in-out group hover:w-64`}
//   >
//     <div className="flex flex-col h-full">
//       {/* Logo/Brand */}
//       <div className="flex items-center h-16 border-b border-medical-gray-600 px-4">
//         <div className="w-8 h-8 bg-medical-blue rounded-full flex items-center justify-center">
//           <span className="text-white text-sm font-bold">CT</span>
//         </div>
//       </div>

//       {/* Navigation Icons */}
//       <nav className="flex-1">
//         <ul className="py-4">
//           {navItems.map((item) => (
//             <li 
//               key={item.name} 
//               className={`flex items-center px-4 py-3 mb-2 cursor-pointer transition-colors whitespace-nowrap
//                 ${currentView === item.view 
//                   ? 'text-medical-blue bg-medical-blue/10' 
//                   : 'text-white hover:text-medical-blue hover:bg-medical-blue/5'}`}
//               onClick={() => onViewChange(item.view)}
//             >
//               <div className="text-xl">{item.icon}</div>
//               <span className={`ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${currentView !== item.view ? 'text-white' : ''}`}>
//                 {item.name}
//               </span>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </div>
//   </div>
// );

// export default DoctorSidebar;



import {
  FaTachometerAlt,
  FaCheckCircle,
  FaUser,
  FaHistory,
} from "react-icons/fa";
import { FiX } from "react-icons/fi"; // close icon
import { SlSupport } from "react-icons/sl";
import { FaMessage } from "react-icons/fa6"; // close button icon
import { MdOutlineSecurity } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";
import { MdHistoryEdu } from "react-icons/md";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";


interface DoctorSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  sidebarOpen: boolean; // controlled from parent
  setSidebarOpen: (value: boolean) => void;
}

const navItems = [
  { name: "Dashboard", icon: <FaTachometerAlt />, view: "dashboard" },
  { name: "Assign Case", icon: <FaHistory />, view: "assigned" },
  { name: "Completed Cases", icon: <FaCheckCircle />, view: "completed" },
  { name: "Institution Audit", icon: <MdOutlineSecurity />, view: "institution-audit" },
  { name: "Technician Audit", icon: <MdOutlineSecurity />, view: "technician-audit" },
  { name: "Payment Approval", icon: <MdOutlinePayment />, view: "payment-approval" },
  { name: "Case History", icon: <MdHistoryEdu />, view: "case-history" },
   { name: "Support", icon: <SlSupport />, view: "support" },
  { name: "Chat", icon: <FaMessage />, view: "chat" },
  { name: "Institution Payments", icon: <RiMoneyRupeeCircleFill />, view: "institution-payments" },
  { name: "Doctor Payments", icon: <RiMoneyRupeeCircleFill />, view: "doctor-payments" },
  // { name: "Payment Invoice", icon: <FaCheckCircle />, view: "payment-invoice" },
];

const DoctorSidebar: React.FC<DoctorSidebarProps> = ({
  currentView,
  onViewChange,
  sidebarOpen,
  setSidebarOpen,
}) => {
  return (
    <>
      {/* Sidebar container */}
      <div
        className={[
          "fixed inset-y-0 left-0 z-40 bg-medical-sidebar transform transition-all duration-300 ease-in-out group",
          sidebarOpen ? "w-64 translate-x-0" : "w-16 -translate-x-full",
          "lg:translate-x-0 lg:static lg:w-16 lg:hover:w-64",
        ].join(" ")}
      >
        <div className="flex flex-col h-full">
          {/* Brand / Logo + Close Button for mobile */}
          <div className="flex items-center justify-between h-16 border-b border-medical-gray-600 px-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-medical-blue rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">CT</span>
              </div>
            </div>

            {/* Close button (only mobile) */}
            <button
              className="lg:hidden text-white hover:text-medical-blue"
              onClick={() => setSidebarOpen(false)}
            >
              <FiX size={22} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="py-4">
              {navItems.map((item) => {
                const active = currentView === item.view;
                return (
                  <li
                    key={item.name}
                    onClick={() => {
                      onViewChange(item.view);
                      setSidebarOpen(false); // auto close after selection in mobile
                    }}
                    className={[
                      "flex items-center px-4 py-3 mb-2 cursor-pointer transition-colors whitespace-nowrap rounded-md",
                      active
                        ? "text-medical-blue bg-medical-blue/10"
                        : "text-white hover:text-medical-blue hover:bg-medical-blue/5",
                    ].join(" ")}
                  >
                    <div className="text-xl">{item.icon}</div>
                    <span
                      className={[
                        "ml-4 transition-opacity duration-300",
                        sidebarOpen ? "opacity-100" : "opacity-0",
                        "lg:opacity-0 lg:group-hover:opacity-100",
                      ].join(" ")}
                    >
                      {item.name}
                    </span>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)} // close when clicking overlay
        />
      )}
    </>
  );
};

export default DoctorSidebar;
