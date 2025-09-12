import React from "react";

import {
  FaTachometerAlt,
  FaHourglassHalf,
  FaCheckCircle,
  FaUser,
  FaWallet,
  FaHistory,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { FaMessage } from "react-icons/fa6"; // close button icon
import { FcSupport } from "react-icons/fc";
import { SlSupport } from "react-icons/sl";

interface DoctorSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  sidebarOpen: boolean; // controls mobile open/close
  onToggleSidebar: (open: boolean) => void; // new: toggle handler from parent
}

const navItems = [
  { name: "Dashboard", icon: <FaTachometerAlt />, view: "dashboard" },
  { name: "Pending Cases", icon: <FaHourglassHalf />, view: "pending" },
  { name: "Completed Cases", icon: <FaCheckCircle />, view: "completed" },
  { name: "History", icon: <FaHistory />, view: "history" },
  { name: "Withdrawal", icon: <FaWallet />, view: "payment" },
  { name: "Payment History", icon: <FaUser />, view: "payment-history" },
  { name: "Chat", icon: <FaMessage />, view: "chat" },
  { name: "Profile", icon: <FaUser />, view: "profile" },
  { name: "Support", icon: <SlSupport />, view: "support" },
];

const DoctorSidebar: React.FC<DoctorSidebarProps> = ({
  currentView,
  onViewChange,
  sidebarOpen,
  onToggleSidebar,
}) => {
  return (
    <>
      {/* Mobile hamburger */}
      <button
        type="button"
        className="lg:hidden fixed top-3 left-3 z-50 p-2 rounded-md bg-medical-blue text-white shadow"
        aria-label="Open menu"
        aria-expanded={sidebarOpen}
        onClick={() => onToggleSidebar(true)}
      >
        <FaBars className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => onToggleSidebar(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={[
          // base
          "fixed inset-y-0 left-0 z-50 bg-medical-sidebar transform transition-all duration-300 ease-in-out group",
          // width behavior
          "w-64 lg:w-16 lg:hover:w-64",
          // mobile open/close
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          // desktop always visible
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
              onClick={() => onToggleSidebar(false)}
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1">
            <ul className="py-4">
              {navItems.map((item) => {
                const active = currentView === item.view;
                return (
                  // <li
                  //   key={item.name}
                  //   onClick={() => {
                  //     onViewChange(item.view);
                  //     // auto-close on mobile after selection
                  //     onToggleSidebar(false);
                  //   }}
                  //   className={[
                  //     'flex items-center px-4 py-3 mb-2 cursor-pointer transition-colors whitespace-nowrap',
                  //     active
                  //       ? 'text-medical-blue bg-medical-blue/10'
                  //       : 'text-white hover:text-medical-blue hover:bg-medical-blue/5',
                  //   ].join(' ')}
                  // >
                  //   <div className="text-xl">{item.icon}</div>
                  //   {/* Labels:
                  //      - Mobile: always visible when sidebar is open
                  //      - Desktop: hidden when collapsed, show on hover/expand */}
                  //   <span
                  //     className={[
                  //       'ml-4 transition-opacity duration-300',
                  //       // mobile (lg:hidden): sidebar is full width; keep labels visible
                  //       'opacity-100',
                  //       // desktop: hide when collapsed, show on hover/expand
                  //       'lg:opacity-0 lg:group-hover:opacity-100',
                  //       active ? '' : 'lg:group-hover:text-medical-blue',
                  //     ].join(' ')}
                  //   >
                  //     {item.name}
                  //   </span>
                  // </li>
                  <li
                    key={item.name}
                    onClick={() => {
                      onViewChange(item.view);
                      onToggleSidebar(false);
                    }}
                    className={[
                      "flex items-center px-4 py-3 mb-2 cursor-pointer transition-colors whitespace-nowrap",
                      active
                        ? "text-medical-blue bg-medical-blue/10"
                        : "text-white hover:text-medical-blue hover:bg-medical-blue/5",
                    ].join(" ")}
                  >
                    <div className="text-xl">{item.icon}</div>
                    <span
                      className={[
                        "ml-4 transition-opacity duration-300",
                        // mobile: labels always visible
                        "opacity-100",
                        // desktop: hide when collapsed, show on hover/expand
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
