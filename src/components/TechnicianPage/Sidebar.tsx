import {
  FaTachometerAlt,
  FaCheckCircle,
  FaUser,
  FaHistory,
} from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { FaMessage } from "react-icons/fa6"; // close button icon
import { FcSupport } from "react-icons/fc";
import { SlSupport } from "react-icons/sl";

interface DoctorSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void; // added for closing
}

const navItems = [
  { name: "Dashboard", icon: <FaTachometerAlt />, view: "dashboard" },
  { name: "Assign Case", icon: <FaHistory />, view: "assigned" },
  { name: "Completed Cases", icon: <FaCheckCircle />, view: "completed" },
  { name: "Profile", icon: <FaUser />, view: "profile" },
  { name: "Chat", icon: <FaMessage />, view: "chat" },
  { name: "Support", icon: <SlSupport />, view: "support" },
];

const TechnicianSidebar: React.FC<DoctorSidebarProps> = ({
  currentView,
  onViewChange,
  sidebarOpen,
  setSidebarOpen,
}) => {
  return (
    <>
      {/* Sidebar */}
      <div
        className={[
          "fixed inset-y-0 left-0 z-40 bg-medical-sidebar transform transition-all duration-300 ease-in-out group",
          sidebarOpen ? "w-64 translate-x-0" : "w-16 -translate-x-full",
          "lg:translate-x-0 lg:static lg:w-16 lg:hover:w-64",
        ].join(" ")}
      >
        <div className="flex flex-col h-full">
          {/* Logo + Close button (mobile only) */}
          <div className="flex items-center justify-between h-16 border-b border-medical-gray-600 px-4">
            <div className="w-8 h-8 bg-medical-blue rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">CT</span>
            </div>

            {/* Close button only in mobile */}
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
                      setSidebarOpen(false); // auto-close in mobile
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
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default TechnicianSidebar;
