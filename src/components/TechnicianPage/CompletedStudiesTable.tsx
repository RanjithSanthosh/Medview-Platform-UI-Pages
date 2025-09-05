


import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { FiLink, FiFileText, FiImage, FiEye, FiX, FiDownload, FiPrinter } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { BsInfoCircle } from "react-icons/bs";
import { MdFileDownload } from "react-icons/md";

interface Study {
  orderId: string;
  patientName: string;
  gender: string;
  study: string;
  modality: string;
  assignedTo: string;
  assignedDate: string;
  completedDate?: string;
  priority: "ROUTINE" | "NORMAL" | "URGENT";
}

const completedStudiesData: Study[] = [
  {
    orderId: "34e27dd850fa",
    patientName: "MALLA BINDU",
    gender: "F",
    study: "Extremities (MSK)",
    modality: "MRI",
    assignedTo: "Telerad Providers",
    assignedDate: "21 March 2017 14:17PM",
    completedDate: "21 March 2017 18:44PM",
    priority: "ROUTINE",
  },
  {
    orderId: "E2138ae25e8a",
    patientName: "JINCY",
    gender: "F",
    study: "Extremities (MSK)",
    modality: "MRI",
    assignedTo: "Dr Gopinath",
    assignedDate: "21 March 2017 14:44PM",
    completedDate: "21 March 2017 15:45PM",
    priority: "URGENT",
  },
  {
    orderId: "Baa41f844d57",
    patientName: "RAM PRASAD 45/M",
    gender: "M",
    study: "Chest",
    modality: "CT",
    assignedTo: "Dr Gopinath",
    assignedDate: "20 March 2017 18:54PM",
    completedDate: "20 March 2017 19:28PM",
    priority: "URGENT",
  },
  {
    orderId: "Ec3c488b60ee",
    patientName: "CHENDIL V 39/YRS/M",
    gender: "M",
    study: "Brain (Plain Study)",
    modality: "CT",
    assignedTo: "Dr Prem Kumar",
    assignedDate: "14 March 2017 15:47PM",
    completedDate: "14 March 2017 17:08PM",
    priority: "URGENT",
  },
  {
    orderId: "039d53f712ea",
    patientName: "NAGARAJ 23 YRS/M",
    gender: "M",
    study: "Neck (Contrast)",
    modality: "CT",
    assignedTo: "Quest Teleradiology Solutions",
    assignedDate: "8 March 2017 13:23PM",
    completedDate: "8 March 2017 21:34PM",
    priority: "ROUTINE",
  },
  {
    orderId: "Ce4aa2a81910",
    patientName: "MR SHIVU 44YRS",
    gender: "M",
    study: "Brain (Plain Study)",
    modality: "CT",
    assignedTo: "Quest Teleradiology Solutions",
    assignedDate: "8 March 2017 12:24PM",
    completedDate: "8 March 2017 19:40PM",
    priority: "ROUTINE",
  },
];

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  study: Study | null;
}

const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose, study }) => {
  const handleDownloadPDF = () => {
    // Simulate PDF download
    console.log(`Downloading PDF report for Order ID: ${study?.orderId}`);
    // In real implementation, trigger actual PDF download
    alert(`Downloading PDF report for ${study?.patientName} - Order ID: ${study?.orderId}`);
    onClose();
  };

  const handlePrint = () => {
    // Simulate print functionality
    console.log(`Printing report for Order ID: ${study?.orderId}`);
    // In real implementation, trigger print dialog or print specific content
    alert(`Printing report for ${study?.patientName} - Order ID: ${study?.orderId}`);
    onClose();
  };

  if (!isOpen || !study) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Download Report</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-2">Report Details</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p><span className="font-medium">Order ID:</span> {study.orderId}</p>
              <p><span className="font-medium">Patient:</span> {study.patientName}</p>
              <p><span className="font-medium">Study:</span> {study.study}</p>
              <p><span className="font-medium">Modality:</span> {study.modality}</p>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleDownloadPDF}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md transition-colors duration-200"
            >
              <FiDownload className="w-4 h-4" />
              <span>Download PDF Report</span>
            </Button>
            <Button
              onClick={handleDownloadPDF}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md transition-colors duration-200"
            >
              <FiDownload className="w-4 h-4" />
              <span>Download Doc Report</span>
            </Button>

            <Button
              onClick={handlePrint}
              className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md transition-colors duration-200"
            >
              <FiPrinter className="w-4 h-4" />
              <span>Print Report</span>
            </Button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-gray-200">
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

interface CompletedStudiesTableProps {
  filteredData?: Study[];
  handleViewStudy: () => void;
}

const CompletedStudiesTable: React.FC<CompletedStudiesTableProps> = ({
  filteredData = completedStudiesData,
  handleViewStudy,
}) => {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null);

  const handleDownloadClick = (study: Study) => {
    setSelectedStudy(study);
    setDownloadModalOpen(true);
  };

  const closeDownloadModal = () => {
    setDownloadModalOpen(false);
    setSelectedStudy(null);
  };

  return (
    <>
      <div className="flex-1 overflow-hidden">
        <div
          className="overflow-x-auto"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#d1d5db #f3f4f6" }}
        >
          <table className="w-full divide-y divide-gray-200 table-fixed min-w-[1400px] xl:min-w-0 xl:w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 w-20">
                  Order ID
                </th>
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase border-r border-gray-200 w-28">
                  Patient Name
                </th>
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase border-r border-gray-200 w-12">
                  Gender
                </th>
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase border-r border-gray-200 w-32">
                  Study
                </th>
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase border-r border-gray-200 w-20">
                  Modality
                </th>
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase border-r border-gray-200 w-24">
                  Assigned To
                </th>
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase border-r border-gray-200 w-28">
                  Assigned Date
                </th>
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase border-gray-200 w-28">
                  Completed Date
                </th>
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase border-gray-200 w-20">
                  Priority
                </th>
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase border-r w-32">
                  <div className="flex justify-center space-x-5">
                    <FaEnvelope className="w-4 h-4" />
                    <FiLink className="w-4 h-4" />
                    <MdFileDownload className="w-4 h-4"/>
                    <BsInfoCircle className="w-4 h-4" />
                  </div>
                </th>
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {(filteredData || []).map((study) => {
                const urgentRowClass =
                  study.priority === "URGENT" ? "bg-red-50" : "";

                return (
                  <tr key={study.orderId} className="hover:bg-gray-50">
                    <td
                      className={`px-2 py-2 text-xs text-blue-600 font-medium border-r border-gray-200 truncate text-center ${urgentRowClass}`}
                    >
                      {study.orderId}
                    </td>
                    <td
                      className={`px-2 py-2 text-xs text-gray-700 border-r border-gray-200 truncate text-center ${urgentRowClass}`}
                    >
                      {study.patientName}
                    </td>
                    <td
                      className={`px-2 py-2 text-xs text-gray-700 border-r border-gray-200 truncate text-center ${urgentRowClass}`}
                    >
                      {study.gender}
                    </td>
                    <td
                      className={`px-2 py-2 text-xs text-blue-600 border-r border-gray-200 truncate text-center ${urgentRowClass}`}
                    >
                      {study.study}
                    </td>
                    <td
                      className={`px-2 py-2 text-xs text-gray-700 border-r border-gray-200 truncate text-center ${urgentRowClass}`}
                    >
                      {study.modality}
                    </td>
                    <td
                      className={`px-2 py-2 text-xs text-gray-700 border-r border-gray-200 truncate text-center ${urgentRowClass}`}
                    >
                      {study.assignedTo}
                    </td>
                    <td
                      className={`px-2 py-2 text-xs text-gray-700 border-r border-gray-200 text-center ${urgentRowClass}`}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {study.assignedDate.split(" ").slice(0, 3).join(" ")}
                        </span>
                        <span className="text-gray-500">
                          {study.assignedDate.split(" ").slice(3).join(" ")}
                        </span>
                      </div>
                    </td>
                    <td
                      className={`px-2 py-2 text-xs text-gray-700 border-r border-gray-200 text-center ${urgentRowClass}`}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {study.completedDate?.split(" ").slice(0, 3).join(" ")}
                        </span>
                        <span className="text-gray-500">
                          {study.completedDate?.split(" ").slice(3).join(" ")}
                        </span>
                      </div>
                    </td>
                    <td
                      className={`px-2 py-2 border-r border-gray-200 text-center ${urgentRowClass}`}
                    >
                      <span
                        className={`inline-flex px-1 py-0.5 text-xs font-semibold rounded-full ${
                          study.priority === "URGENT"
                            ? "bg-red-100 text-red-800"
                            : study.priority === "NORMAL"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {study.priority}
                      </span>
                    </td>

                    <td className="px-2 py-2 text-xs border-r text-center">
                      <div className="flex justify-center bg-white rounded overflow-hidden space-x-3">
                        <button
                          className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                          title="Email"
                        >
                          <FaEnvelope className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                          title="Link"
                        >
                          <FiLink className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                          title="Download Report"
                          onClick={() => handleDownloadClick(study)}
                        >
                          <MdFileDownload className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1 text-gray-600 hover:bg-gray-200 rounded transition-colors"
                          title="Info"
                        >
                          <BsInfoCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                    <td className="px-2 py-2 text-xs text-center">
                      <div className="flex flex-col space-y-1 items-center">
                        <Button
                          variant="default"
                          size="sm"
                          onClick={handleViewStudy}
                          className="h-7 px-3 bg-green-700 hover:bg-green-800 text-white text-xs w-24 flex items-center justify-center transition-colors duration-200"
                        >
                          <FiEye className="w-3 h-3 mr-1 flex-shrink-0" />
                          <span>Reported</span>
                        </Button>

                        <Button
                          variant="default"
                          size="sm"
                          className="h-7 px-3 bg-red-500 hover:bg-red-600 text-white text-xs w-24 flex items-center justify-center transition-colors duration-200"
                        >
                          <span>Rework</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Download Modal */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={closeDownloadModal}
        study={selectedStudy}
      />
    </>
  );
};

export default CompletedStudiesTable;