import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { FiLink, FiFileText, FiImage, FiEye } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { BsInfoCircle } from "react-icons/bs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  isAssigned?: boolean;
}

const doctorNames = [
  "Dr Gopinath",
  "Dr Prem Kumar",
  "Dr Suresh",
  "Dr Priya",
  "Dr Anitha",
];

const completedStudiesData: Study[] = [
  {
    orderId: "34e27dd850fa",
    patientName: "MALLA BINDU",
    gender: "F",
    study: "Extremities (MSK)",
    modality: "MRI",
    assignedTo: "",
    assignedDate: "21 March 2017 14:17PM",
    completedDate: "21 March 2017 18:44PM",
    priority: "ROUTINE",
    isAssigned: false,
  },
  {
    orderId: "E2138ae25e8a",
    patientName: "JINCY",
    gender: "F",
    study: "Extremities (MSK)",
    modality: "MRI",
    assignedTo: "",
    assignedDate: "21 March 2017 14:44PM",
    completedDate: "21 March 2017 15:45PM",
    priority: "URGENT",
    isAssigned: false,
  },
  {
    orderId: "Baa41f844d57",
    patientName: "RAM PRASAD 45/M",
    gender: "M",
    study: "Chest",
    modality: "CT",
    assignedTo: "",
    assignedDate: "20 March 2017 18:54PM",
    completedDate: "20 March 2017 19:28PM",
    priority: "URGENT",
    isAssigned: false,
  },
  {
    orderId: "Ec3c488b60ee",
    patientName: "CHENDIL V 39/YRS/M",
    gender: "M",
    study: "Brain (Plain Study)",
    modality: "CT",
    assignedTo: "",
    assignedDate: "14 March 2017 15:47PM",
    completedDate: "14 March 2017 17:08PM",
    priority: "URGENT",
    isAssigned: false,
  },
  {
    orderId: "039d53f712ea",
    patientName: "NAGARAJ 23 YRS/M",
    gender: "M",
    study: "Neck (Contrast)",
    modality: "CT",
    assignedTo: "",
    assignedDate: "8 March 2017 13:23PM",
    completedDate: "8 March 2017 21:34PM",
    priority: "ROUTINE",
    isAssigned: false,
  },
  {
    orderId: "Ce4aa2a81910",
    patientName: "MR SHIVU 44YRS",
    gender: "M",
    study: "Brain (Plain Study)",
    modality: "CT",
    assignedTo: "",
    assignedDate: "8 March 2017 12:24PM",
    completedDate: "8 March 2017 19:40PM",
    priority: "ROUTINE",
    isAssigned: false,
  },
];

interface CompletedStudiesTableProps {
  filteredData?: Study[];
  handleViewStudy?: () => void;
}

const CompletedStudiesTable: React.FC<CompletedStudiesTableProps> = ({
  filteredData = completedStudiesData,
  handleViewStudy = () => {},
}) => {
  const [studies, setStudies] = useState(filteredData);

  const handleDoctorChange = (orderId: string, doctorName: string) => {
    setStudies((prev) =>
      prev.map((study) =>
        study.orderId === orderId ? { ...study, assignedTo: doctorName } : study
      )
    );
  };

const handleAssignClick = (orderId: string) => {
  setStudies((prev) =>
    prev.map((study) => {
      // Only assign if doctor is selected
      if (study.orderId === orderId && study.assignedTo.trim() !== "") {
        return { ...study, isAssigned: true };
      }
      return study;
    })
  );
};


  return (
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
                  <FiFileText className="w-4 h-4" />
                  <BsInfoCircle className="w-4 h-4" />
                </div>
              </th>
              <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {studies.map((study) => {
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
                    <Select
                      value={study.assignedTo}
                      onValueChange={(value) =>
                        handleDoctorChange(study.orderId, value)
                      }
                    >
                      <SelectTrigger className="w-full h-7 text-xs">
                        <SelectValue placeholder="Select Doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        {doctorNames.map((doc) => (
                          <SelectItem key={doc} value={doc}>
                            {doc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                  {/* <td className="px-2 py-2 text-xs border-r text-center">
                    <div className="flex justify-center bg-white rounded overflow-hidden space-x-1">
                      <button className="p-1 text-gray-600 hover:bg-gray-100 rounded" title="Email"><FaEnvelope className="w-4 h-4" /></button>
                      <button className="p-1 text-gray-600 hover:bg-gray-100 rounded" title="Link"><FiLink className="w-4 h-4" /></button>
                      <button className="p-1 text-gray-600 hover:bg-gray-100 rounded" title="File"><FiFileText className="w-4 h-4" /></button>
                      <button className="p-1 text-gray-600 hover:bg-gray-200 rounded" title="Image"><BsInfoCircle className="w-4 h-4" /></button>
                    </div>
                  </td> */}
                  <td className="px-2 py-2 text-xs border-r text-center">
                    <div className="flex justify-center bg-white rounded overflow-hidden space-x-3">
                      <button
                        className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                        title="Email"
                      >
                        <FaEnvelope className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                        title="Link"
                      >
                        <FiLink className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                        title="File"
                      >
                        <FiFileText className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                        title="Image"
                      >
                        <BsInfoCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </td>

                  <td className="px-2 py-2 text-xs text-center">
                    <div className="flex flex-col space-y-1 items-center">
                      {!study.isAssigned ? (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleAssignClick(study.orderId)}
                          className="h-7 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs w-20 flex items-center justify-center"
                        >
                          Assign
                        </Button>
                      ) : (
                        <div className="text-xs text-green-600 font-medium text-center">
                          <div>Assigned to</div>
                          <div className="font-semibold">
                            {study.assignedTo}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedStudiesTable;
