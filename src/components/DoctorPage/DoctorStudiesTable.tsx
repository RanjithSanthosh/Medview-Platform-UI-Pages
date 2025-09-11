import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import {
  FiLink,
  FiFileText,
  FiImage,
  FiEye,
  FiSearch,
  FiRefreshCw,
  FiInfo,
  FiX,
} from "react-icons/fi";
import { BsInfoCircle } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PatientReport, { PatientInfo } from "./PatientReport";

interface Study {
  orderId: string;
  patientName: string;
  gender: string;
  study: string;
  modality: string;
  assignedTo: string;
  status: "pending" | "active" | "completed";
  priority: "ROUTINE" | "NORMAL" | "URGENT";
}

const studiesData: Study[] = [
  {
    orderId: "34e27dd850fa",
    patientName: "MALLA BINDU",
    gender: "F",
    study: "Extremities (MSK)",
    modality: "MRI",
    assignedTo: "Telerad Providers",
    status: "completed",
    priority: "ROUTINE",
  },
  {
    orderId: "E2138ae25e8a",
    patientName: "JINCY",
    gender: "F",
    study: "Extremities (MSK)",
    modality: "MRI",
    assignedTo: "Dr Gopinath",
    status: "completed",
    priority: "URGENT",
  },
  {
    orderId: "Baa41f844d57",
    patientName: "RAM PRASAD 45/M",
    gender: "M",
    study: "Chest",
    modality: "CT",
    assignedTo: "Dr Gopinath",
    status: "completed",
    priority: "URGENT",
  },
  {
    orderId: "4cf869248293",
    patientName: "KASTURI",
    gender: "F",
    study: "Brain (Plain Study)",
    modality: "CT",
    assignedTo: "Select",
    status: "active",
    priority: "ROUTINE",
  },
  {
    orderId: "97bfca30510",
    patientName: "PRATHAM 4 MONTHS",
    gender: "M",
    study: "Radiograph",
    modality: "XRay",
    assignedTo: "Select",
    status: "active",
    priority: "NORMAL",
  },
  {
    orderId: "pending001",
    patientName: "JOHN DOE",
    gender: "M",
    study: "Brain (Plain Study)",
    modality: "CT",
    assignedTo: "Unassigned",
    status: "pending",
    priority: "URGENT",
  },
  {
    orderId: "pending002",
    patientName: "JANE SMITH",
    gender: "F",
    study: "Chest X-Ray",
    modality: "XRay",
    assignedTo: "Unassigned",
    status: "pending",
    priority: "NORMAL",
  },
  {
    orderId: "pending003",
    patientName: "MIKE JOHNSON",
    gender: "M",
    study: "Abdominal CT",
    modality: "CT",
    assignedTo: "Unassigned",
    status: "pending",
    priority: "ROUTINE",
  },
];

interface DoctorStudiesTableProps {
  statusFilter: "pending" | "active" | "completed";
  title: string;
}

const DoctorStudiesTable: React.FC<DoctorStudiesTableProps> = ({
  statusFilter,
  title,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Modal state for patient report
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [selectedStudyForReport, setSelectedStudyForReport] =
    useState<Study | null>(null);

  // Doctor names for dropdown
  const doctorNames = [
    "Dr. Gopinath",
    "Dr. Prem Kumar",
    "Dr. Sarah Johnson",
    "Dr. Michael Chen",
    "Dr. Priya Sharma",
    "Dr. Arvind Menon",
    "Telerad Providers",
    "Quest Teleradiology Solutions",
  ];

  const filteredData = studiesData.filter((study) => {
    // Status filter
    if (study.status !== statusFilter) return false;

    // Text search filter
    const matchesSearch =
      searchTerm === "" ||
      study.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.orderId.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const handleSearch = () => {
    // no-op because filtering is live (keeps your existing UI)
  };

  const handleRefresh = () => {
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
    setReportModalOpen(false);
    setSelectedStudyForReport(null);
  };

  const handleOpenReportModal = (study: Study) => {
    setSelectedStudyForReport(study);
    setReportModalOpen(true);
  };

  const handleCloseReportModal = () => {
    setReportModalOpen(false);
    setSelectedStudyForReport(null);
  };

  const handleViewStudy = (orderId?: string) => {
    // If you want to open specific viewer per study, use orderId to build URL.
    window.open(
      "https://viewer.ohif.org/viewer?StudyInstanceUIDs=2.16.840.1.114362.1.11972228.22789312658.616067305.306.2",
      "_blank"
    );
  };

  const handleActionClick = (action: string) => {
    const actionUrls = {
      email: "mailto:example@email.com",
      lock: "/secure-access",
      edit: "/edit-study",
      view: "/view-details",
    };

    if (actionUrls[action as keyof typeof actionUrls]) {
      window.open(actionUrls[action as keyof typeof actionUrls], "_blank");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "active":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center mb-4">
          <div className="w-6 h-6 bg-gray-200 rounded mr-3"></div>
          <h2 className="text-lg font-medium text-gray-700">{title}</h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between w-full">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="flex flex-col">
              <label className="text-xs text-gray-600 mb-1">Search</label>
              <div className="relative w-full max-w-md">
                <Input
                  type="text"
                  placeholder="Search by Order Id, Patient Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-4 pr-16 h-10 border-gray-300 w-[400px] min-w-full"
                />
                <Button
                  variant="default"
                  size="sm"
                  className="absolute right-2 top-1 h-8 px-3 bg-blue-600 hover:bg-blue-700"
                  onClick={handleSearch}
                >
                  <FiSearch className="w-4 h-4" />
                  <span className="ml-1 hidden sm:inline">Search</span>
                </Button>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <label className="text-xs text-gray-600 mb-1">Start Date</label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="h-10 w-40 border-gray-300"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-gray-600 mb-1">End Date</label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="h-10 w-40 border-gray-300"
                />
              </div>
              <div className="flex flex-col">
                <div className="h-4 mb-1"></div>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSearch}
                  className="h-10 px-3 bg-blue-600 hover:bg-blue-700"
                >
                  <FiSearch className="w-4 h-4" />
                  <span className="ml-1 hidden sm:inline">Search</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end w-full lg:w-auto ">
            <div className="h-4 mb-1"></div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="h-10 px-3 text-white bg-blue-600 hover:bg-blue-700"
            >
              <FiRefreshCw className="w-4 h-4 " />
              <span className="ml-1 hidden sm:inline">Refresh</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 table-fixed">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                  Patient Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                  Gender
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                  Study
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                  Modality
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                  Assigned To
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                  Priority
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                  <div className="flex justify-center space-x-1">
                    <span className="px-2 flex items-center justify-center">
                      <FaEnvelope className="w-4 h-4" />
                    </span>
                    <span className="px-2 flex items-center justify-center">
                      <FiLink className="w-4 h-4" />
                    </span>
                    <span className="px-2 flex items-center justify-center">
                      <FiFileText className="w-4 h-4" />
                    </span>
                    <span className="px-2 flex items-center justify-center">
                      <BsInfoCircle className="w-4 h-4" />
                    </span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((study) => {
                const urgentCellClass =
                  study.priority === "URGENT" ? "bg-red-50" : "";

                return (
                  <tr key={study.orderId} className="hover:bg-gray-50">
                    <td
                      className={`px-4 py-4 whitespace-nowrap text-sm text-blue-600 font-medium border-r border-gray-200 ${urgentCellClass}`}
                    >
                      {study.orderId}
                    </td>
                    <td
                      className={`px-4 py-4 whitespace-nowrap text-sm text-gray-700 border-r border-gray-200 ${urgentCellClass}`}
                    >
                      {study.patientName}
                    </td>
                    <td
                      className={`px-4 py-4 whitespace-nowrap text-sm text-gray-700 border-r border-gray-200 ${urgentCellClass}`}
                    >
                      {study.gender}
                    </td>
                    <td
                      className={`px-4 py-4 whitespace-nowrap text-sm text-blue-600 border-r border-gray-200 ${urgentCellClass}`}
                    >
                      {study.study}
                    </td>
                    <td
                      className={`px-4 py-4 whitespace-nowrap text-sm text-gray-700 border-r border-gray-200 ${urgentCellClass}`}
                    >
                      {study.modality}
                    </td>
                    <td
                      className={`px-4 py-4 whitespace-nowrap text-sm text-gray-700 border-r border-gray-200 ${urgentCellClass}`}
                    >
                      {doctorNames[0]}
                    </td>
                    <td
                      className={`px-4 py-4 whitespace-nowrap border-r border-gray-200 ${urgentCellClass}`}
                    >
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          study.status
                        )}`}
                      >
                        {study.status.toUpperCase()}
                      </span>
                    </td>
                    <td
                      className={`px-4 py-4 whitespace-nowrap border-r border-gray-200 ${urgentCellClass}`}
                    >
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
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
                    {/* Icons column (no red background to keep it clean like in original) */}
                    <td className="px-4 py-4 whitespace-nowrap text-sm border-r border-gray-200">
                      <div className="flex justify-center bg-white rounded overflow-hidden space-x-1">
                        <button
                          className="px-2 flex items-center justify-center text-gray-600 hover:bg-gray-100 p-1 focus:outline-none rounded"
                          title="Email"
                        >
                          <FaEnvelope className="w-4 h-4" />
                        </button>
                        <button
                          className="px-2 flex items-center justify-center text-gray-600 hover:bg-gray-100 p-1 focus:outline-none rounded"
                          title="Lock"
                        >
                          <FiLink className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenReportModal(study)}
                          className="px-2 flex items-center justify-center text-gray-600 hover:bg-gray-100 p-1 focus:outline-none rounded"
                          title="View Report"
                        >
                          <FiFileText className="w-4 h-4" />
                        </button>
                        <button
                          className="px-2 flex items-center justify-center text-gray-600 hover:bg-gray-200 p-1 focus:outline-none rounded"
                          title="View Details"
                        >
                          <BsInfoCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                    {/* Action column (no red background to keep it clean like in original) */}
                    <td className="px-4 py-2 text-sm">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white bg-blue-600 hover:bg-blue-700 flex items-center gap-1"
                        onClick={() => handleViewStudy(study.orderId)}
                      >
                        <FiEye className="h-4 w-4" />
                        <span>Viewer</span>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Report Modal */}
      {reportModalOpen && selectedStudyForReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Patient Report - {selectedStudyForReport.patientName}
              </h2>
              <button
                onClick={handleCloseReportModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
              <PatientReport
                patient={
                  {
                    name: selectedStudyForReport.patientName,
                    id: selectedStudyForReport.orderId,
                    gender: selectedStudyForReport.gender,
                    study: selectedStudyForReport.study,
                    referringDoctor: "Dr. Smith",
                    patientType: "Outpatient",
                    ageDOB: "Unknown",
                    modality: selectedStudyForReport.modality,
                    date: "Mar 23, 2017",
                  } as PatientInfo
                }
                onBack={handleCloseReportModal}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorStudiesTable;
