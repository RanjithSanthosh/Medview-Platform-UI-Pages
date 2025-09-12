import React from "react";
import {
  FaTachometerAlt,
  FaCheckCircle,
  FaHistory,
} from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { FiX } from "react-icons/fi";
import { SlSupport } from "react-icons/sl";
import { MdOutlineSecurity, MdOutlinePayment, MdHistoryEdu } from "react-icons/md";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { FaBars } from "react-icons/fa";

interface AdminSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}

const navItems = [
  { name: "Dashboard", icon: <FaTachometerAlt />, view: "dashboard" },
  { name: "Assign Case", icon: <FaHistory />, view: "assigned" },
  { name: "Completed Cases", icon: <FaCheckCircle />, view: "completed" },
  { name: "Institution Audit", icon: <MdOutlineSecurity />, view: "institution-audit" },
  { name: "Technician Audit", icon: <MdOutlineSecurity />, view: "technician-audit" },
  { name: "Doctor", icon: <RiMoneyRupeeCircleFill />, view: "doctor" },
  { name: "Technician", icon: <RiMoneyRupeeCircleFill />, view: "technician" },
  { name: "Case History", icon: <MdHistoryEdu />, view: "case-history" },
  { name: "Payment Approval", icon: <MdOutlinePayment />, view: "payment-approval" },
  { name: "Institution Payments", icon: <RiMoneyRupeeCircleFill />, view: "institution-payments" },
  { name: "Doctor Payments", icon: <RiMoneyRupeeCircleFill />, view: "doctor-payments" },
  { name: "Chat", icon: <FaMessage />, view: "chat" },
  { name: "Support", icon: <SlSupport />, view: "support" },
];

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentView,
  onViewChange,
  sidebarOpen,
  setSidebarOpen,
}) => {
  return (
    <>
      {/* Mobile hamburger */}
      <button
        type="button"
        className="lg:hidden fixed top-3 left-3 z-50 p-2 rounded-md bg-medical-blue text-white shadow"
        aria-label="Open menu"
        aria-expanded={sidebarOpen}
        onClick={() => setSidebarOpen(true)}
      >
        <FaBars className="w-5 h-5" />
      </button>

      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <div
        className={[
          sidebarOpen ? "fixed inset-y-0 left-0 z-40 w-64 translate-x-0" : "hidden",
          "lg:block lg:static lg:overflow-hidden lg:scrollbar-hide lg:transition-all lg:duration-300 lg:ease-in-out",
          sidebarOpen ? "lg:w-64" : "lg:w-16 lg:hover:w-64",
          "bg-medical-sidebar",
          "transform transition-all duration-300 ease-in-out group",
        ].join(" ")}
      >
        <div className="flex flex-col h-full min-h-screen">
          {/* Brand / Logo + Close Button */}
          <div className="flex items-center justify-between h-16 border-b border-medical-gray-600 px-4 flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-medical-blue rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">CT</span>
              </div>
            </div>
            {/* Close button (only mobile) */}
            <button
              className="lg:hidden text-white hover:text-medical-blue"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
            >
              <FiX size={22} />
            </button>
          </div>

          {/* Navigation: scrollable only */}
          <nav className="flex-1 overflow-y-auto scrollbar-hide">
            <ul className="py-4">
              {navItems.map((item) => {
                const active = currentView === item.view;
                return (
                  <li
                    key={item.name}
                    onClick={() => {
                      onViewChange(item.view);
                      setSidebarOpen(false); // close sidebar on mobile after click
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
    </>
  );
};

export default AdminSidebar;




// import React from "react";
// import {
//   FaTachometerAlt,
//   FaCheckCircle,
//   FaHistory,
// } from "react-icons/fa";
// import { FaMessage } from "react-icons/fa6";
// import { FiX } from "react-icons/fi";
// import { SlSupport } from "react-icons/sl";
// import { MdOutlineSecurity, MdOutlinePayment, MdHistoryEdu } from "react-icons/md";
// import { RiMoneyRupeeCircleFill } from "react-icons/ri";
// import { FaBars } from "react-icons/fa";

// interface AdminSidebarProps {
//   currentView: string;
//   onViewChange: (view: string) => void;
//   sidebarOpen: boolean;
//   setSidebarOpen: (value: boolean) => void;
// }

// const navItems = [
//   { name: "Dashboard", icon: <FaTachometerAlt />, view: "dashboard" },
//   { name: "Assign Case", icon: <FaHistory />, view: "assigned" },
//   { name: "Completed Cases", icon: <FaCheckCircle />, view: "completed" },
//   { name: "Institution Audit", icon: <MdOutlineSecurity />, view: "institution-audit" },
//   { name: "Technician Audit", icon: <MdOutlineSecurity />, view: "technician-audit" },
//   { name: "Doctor", icon: <RiMoneyRupeeCircleFill />, view: "doctor" },
//   { name: "Technician", icon: <RiMoneyRupeeCircleFill />, view: "technician" },
//   { name: "Case History", icon: <MdHistoryEdu />, view: "case-history" },
//   { name: "Payment Approval", icon: <MdOutlinePayment />, view: "payment-approval" },
//   { name: "Institution Payments", icon: <RiMoneyRupeeCircleFill />, view: "institution-payments" },
//   { name: "Doctor Payments", icon: <RiMoneyRupeeCircleFill />, view: "doctor-payments" },
//   { name: "Chat", icon: <FaMessage />, view: "chat" },
//   { name: "Support", icon: <SlSupport />, view: "support" },
// ];

// const AdminSidebar: React.FC<AdminSidebarProps> = ({
//   currentView,
//   onViewChange,
//   sidebarOpen,
//   setSidebarOpen,
// }) => {
//   return (
//     <>
//       {/* Mobile hamburger */}
//       <button
//         type="button"
//         className="lg:hidden fixed top-3 left-3 z-50 p-2 rounded-md bg-medical-blue text-white shadow"
//         aria-label="Open menu"
//         aria-expanded={sidebarOpen}
//         onClick={() => setSidebarOpen(true)}
//       >
//         <FaBars className="w-5 h-5" />
//       </button>

//       {/* Mobile overlay backdrop */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//           aria-hidden="true"
//         />
//       )}

//       {/* Sidebar container */}
//       <div
//         className={[
//           sidebarOpen ? "fixed inset-y-0 left-0 z-40 w-64 translate-x-0" : "hidden",
//           "lg:block lg:static lg:overflow-y-auto lg:scrollbar-hide lg:transition-all lg:duration-300 lg:ease-in-out",
//           sidebarOpen ? "lg:w-64" : "lg:w-16 lg:hover:w-64",
//           "bg-medical-sidebar",
//           "transform transition-all duration-300 ease-in-out group",
//         ].join(" ")}
//       >
//         <div className="flex flex-col h-full min-h-screen">
//           {/* Brand / Logo + Close Button */}
//           <div className="flex items-center justify-between h-16 border-b border-medical-gray-600 px-4">
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-medical-blue rounded-full flex items-center justify-center">
//                 <span className="text-white text-sm font-bold">CT</span>
//               </div>
//             </div>
//             {/* Close button (only mobile) */}
//             <button
//               className="lg:hidden text-white hover:text-medical-blue"
//               onClick={() => setSidebarOpen(false)}
//               aria-label="Close menu"
//             >
//               <FiX size={22} />
//             </button>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 overflow-y-auto scrollbar-hide">
//             <ul className="py-4">
//               {navItems.map((item) => {
//                 const active = currentView === item.view;
//                 return (
//                   <li
//                     key={item.name}
//                     onClick={() => {
//                       onViewChange(item.view);
//                       setSidebarOpen(false); // close sidebar on mobile after click
//                     }}
//                     className={[
//                       "flex items-center px-4 py-3 mb-2 cursor-pointer transition-colors whitespace-nowrap rounded-md",
//                       active
//                         ? "text-medical-blue bg-medical-blue/10"
//                         : "text-white hover:text-medical-blue hover:bg-medical-blue/5",
//                     ].join(" ")}
//                   >
//                     <div className="text-xl">{item.icon}</div>
//                     <span
//                       className={[
//                         "ml-4 transition-opacity duration-300",
//                         sidebarOpen ? "opacity-100" : "opacity-0",
//                         "lg:opacity-0 lg:group-hover:opacity-100",
//                       ].join(" ")}
//                     >
//                       {item.name}
//                     </span>
//                   </li>
//                 );
//               })}
//             </ul>
//           </nav>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminSidebar;
