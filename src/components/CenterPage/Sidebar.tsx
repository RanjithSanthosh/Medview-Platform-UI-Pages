// import {
//   FaTachometerAlt,
//   FaCheckCircle,
//   FaUser,
//   FaHistory,
// } from "react-icons/fa";
// import { FiX } from "react-icons/fi"; // close icon
// import { RiMoneyRupeeCircleFill } from "react-icons/ri";
// import { FaMessage,FaBars } from "react-icons/fa6"; // close button icon
// import { SlSupport } from "react-icons/sl";

// interface DoctorSidebarProps {
//   currentView: string;
//   onViewChange: (view: string) => void;
//   sidebarOpen: boolean; // controlled from parent
//   setSidebarOpen: (value: boolean) => void;
// }

// const navItems = [
//   { name: "Dashboard", icon: <FaTachometerAlt />, view: "dashboard" },
//   { name: "Assigned Case", icon: <FaHistory />, view: "assigned" },
//   { name: "Completed Cases", icon: <FaCheckCircle />, view: "completed" },
//   { name: "Case History", icon: <SlSupport />, view: "case-history" },
//   { name: "Pay Management", icon: <RiMoneyRupeeCircleFill />, view: "payment-history" },
//   { name: "Payment History", icon: <RiMoneyRupeeCircleFill />, view: "pay-management" },
//   { name: "Chat", icon: <FaMessage />, view: "chat" },
//   { name: "Profile", icon: <FaUser />, view: "profile" },
//   { name: "Support", icon: <SlSupport />, view: "support" },
// ];

// const DoctorSidebar: React.FC<DoctorSidebarProps> = ({
//   currentView,
//   onViewChange,
//   sidebarOpen,
//   setSidebarOpen,
// }) => {
//   return (
//     <>
//      {/* Mobile hamburger */}
//       <button
//         type="button"
//         className="lg:hidden fixed top-3 left-3 z-50 p-2 rounded-md bg-medical-blue text-white shadow"
//         aria-label="Open menu"
//         aria-expanded={sidebarOpen}
//         onClick={() => onToggleSidebar(true)}
//       >
//         <FaBars className="w-5 h-5" />
//       </button>

//       {/* Mobile overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40 lg:hidden"
//           onClick={() => onToggleSidebar(false)}
//           aria-hidden="true"
//         />
//       )}

//       {/* Sidebar container */}
//       <div
//         className={[
//           "fixed inset-y-0 left-0 z-40 bg-medical-sidebar transform transition-all duration-300 ease-in-out group",
//           sidebarOpen ? "w-64 translate-x-0" : "w-16 -translate-x-full",
//           "lg:translate-x-0 lg:static lg:w-16 lg:hover:w-64",
//         ].join(" ")}
//       >
//         <div className="flex flex-col h-full">
//           {/* Brand / Logo + Close Button for mobile */}
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
//             >
//               <FiX size={22} />
//             </button>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 overflow-y-auto">
//             <ul className="py-4">
//               {navItems.map((item) => {
//                 const active = currentView === item.view;
//                 return (
//                   <li
//                     key={item.name}
//                     onClick={() => {
//                       onViewChange(item.view);
//                       setSidebarOpen(false); // auto close after selection in mobile
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

//       {/* Mobile overlay */}
//       {/* {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-30 lg:hidden"
//           onClick={() => setSidebarOpen(false)} // close when clicking overlay
//         />
//       )} */}
//     </>
//   );
// };

// export default DoctorSidebar;



// import React from "react";

// import {
//   FaTachometerAlt,
//   FaCheckCircle,
//   FaUser,
//   FaHistory,
//   FaBars,
//   FaTimes,
// } from "react-icons/fa";
// import { FaMessage } from "react-icons/fa6";
// import { RiMoneyRupeeCircleFill } from "react-icons/ri";
// import { SlSupport } from "react-icons/sl";

// interface DoctorSidebarProps {
//   currentView: string;
//   onViewChange: (view: string) => void;
//   sidebarOpen: boolean; // controls mobile open/close
//   setSidebarOpen: (open: boolean) => void; // toggle handler from parent
// }

// const navItems = [
//   { name: "Dashboard", icon: <FaTachometerAlt />, view: "dashboard" },
//   { name: "Assigned Case", icon: <FaHistory />, view: "assigned" },
//   { name: "Completed Cases", icon: <FaCheckCircle />, view: "completed" },
//   { name: "Case History", icon: <SlSupport />, view: "case-history" },
//   { name: "Pay Management", icon: <RiMoneyRupeeCircleFill />, view: "pay-management" },
//   { name: "Payment History", icon: <RiMoneyRupeeCircleFill />, view: "payment-history" },
//   { name: "Chat", icon: <FaMessage />, view: "chat" },
//   { name: "Profile", icon: <FaUser />, view: "profile" },
//   { name: "Support", icon: <SlSupport />, view: "support" },
// ];

// const DoctorSidebar: React.FC<DoctorSidebarProps> = ({
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

//       {/* Mobile overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//           aria-hidden="true"
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={[
//           "fixed inset-y-0 left-0 z-50 bg-medical-sidebar transform transition-all duration-300 ease-in-out group",
//           "w-64 lg:w-16 lg:hover:w-64",
//           sidebarOpen ? "translate-x-0" : "-translate-x-full",
//           "lg:translate-x-0 lg:static",
//         ].join(" ")}
//       >
//         <div className="flex flex-col h-full">
//           {/* Header / Brand */}
//           <div className="flex items-center h-16 border-b border-medical-gray-600 px-4">
//             <div className="w-8 h-8 bg-medical-blue rounded-full flex items-center justify-center">
//               <span className="text-white text-sm font-bold">CT</span>
//             </div>

//             {/* Mobile close button */}
//             <button
//               type="button"
//               className="ml-auto text-white lg:hidden"
//               aria-label="Close menu"
//               onClick={() => setSidebarOpen(false)}
//             >
//               <FaTimes className="w-5 h-5" />
//             </button>
//           </div>

//           {/* Nav */}
//           <nav className="flex-1 overflow-y-auto">
//             <ul className="py-4">
//               {navItems.map((item) => {
//                 const active = currentView === item.view;
//                 return (
//                   <li
//                     key={item.name}
//                     onClick={() => {
//                       onViewChange(item.view);
//                       setSidebarOpen(false);
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
//                         "opacity-100", // labels always visible on mobile
//                         "lg:opacity-0 lg:group-hover:opacity-100", // desktop label toggle on hover
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

// export default DoctorSidebar;





import React from "react";

import {
  FaTachometerAlt,
  FaCheckCircle,
  FaUser,
  FaHistory,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { SlSupport } from "react-icons/sl";

interface DoctorSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const navItems = [
  { name: "Dashboard", icon: <FaTachometerAlt />, view: "dashboard" },
  { name: "Assigned Case", icon: <FaHistory />, view: "assigned" },
  { name: "Completed Cases", icon: <FaCheckCircle />, view: "completed" },
  { name: "Case History", icon: <SlSupport />, view: "case-history" },
  { name: "Pay Management", icon: <RiMoneyRupeeCircleFill />, view: "pay-management" },
  { name: "Payment History", icon: <RiMoneyRupeeCircleFill />, view: "payment-history" },
  { name: "Chat", icon: <FaMessage />, view: "chat" },
  { name: "Profile", icon: <FaUser />, view: "profile" },
  { name: "Support", icon: <SlSupport />, view: "support" },
];

const DoctorSidebar: React.FC<DoctorSidebarProps> = ({
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

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={[
          "fixed inset-y-0 left-0 z-50 bg-medical-sidebar transform transition-all duration-300 ease-in-out group",
          "w-64 lg:w-16 lg:hover:w-64",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:static",
        ].join(" ")}
      >
        <div className="flex flex-col h-full">
          {/* Header / Brand */}
          <div className="flex items-center h-16 border-b border-medical-gray-600 px-4">
            <div className="w-8 h-8 bg-medical-blue rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">CT</span>
            </div>

            {/* Mobile close button */}
            <button
              type="button"
              className="ml-auto text-white lg:hidden"
              aria-label="Close menu"
              onClick={() => setSidebarOpen(false)}
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="py-4">
              {navItems.map((item) => {
                const active = currentView === item.view;
                return (
                  <li
                    key={item.name}
                    onClick={() => {
                      onViewChange(item.view);
                      setSidebarOpen(false); // auto close sidebar on mobile after click
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
                        "opacity-100",
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

export default DoctorSidebar;
