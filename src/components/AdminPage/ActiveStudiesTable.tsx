import React from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { FiLink, FiFileText, FiImage, FiEye } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

interface StudiesTableProps {
  filteredData: Study[];
  doctorNames: string[];
  handleViewStudy: () => void;
}

const StudiesTable: React.FC<StudiesTableProps> = ({ filteredData, doctorNames, handleViewStudy }) => {
  return (
    <div className="flex-1 overflow-hidden">
      <div className="overflow-x-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#d1d5db #f3f4f6' }}>
        <table className="w-full divide-y divide-medical-gray-200 table-fixed min-w-[1400px] xl:min-w-0 xl:w-full">
          <thead className="bg-medical-gray-50">
            <tr>
              <th className="px-2 py-2 text-center text-xs font-medium text-medical-gray-500 uppercase border-r w-20">Order ID</th>
              <th className="px-2 py-2 text-center text-xs font-medium text-medical-gray-500 uppercase border-r w-24">Hospital</th>
              <th className="px-2 py-2 text-center text-xs font-medium text-medical-gray-500 uppercase border-r w-28">Patient Name</th>
              <th className="px-2 py-2 text-center text-xs font-medium text-medical-gray-500 uppercase border-r w-12">Gender</th>
              <th className="px-2 py-2 text-center text-xs font-medium text-medical-gray-500 uppercase border-r w-32">Study</th>
              <th className="px-2 py-2 text-center text-xs font-medium text-medical-gray-500 uppercase border-r w-20">Modality</th>
              <th className="px-2 py-2 text-center text-xs font-medium text-medical-gray-500 uppercase border-r w-24">Assigned To</th>
              <th className="px-2 py-2 text-center text-xs font-medium text-medical-gray-500 uppercase border-r w-28">Assigned Date</th>
              <th className="px-2 py-2 text-center text-xs font-medium text-medical-gray-500 uppercase w-20">Priority</th>
              <th className="px-2 py-2 text-center text-xs font-medium text-medical-gray-500 uppercase border-r w-32">
                <div className="flex justify-center space-x-3">
                  <FaEnvelope className="w-4 h-4" />
                  <FiLink className="w-4 h-4" />
                  <FiFileText className="w-4 h-4" />
                  <FiImage className="w-4 h-4" />
                </div>
              </th>
              <th className="px-2 py-2 text-center text-xs font-medium text-medical-gray-500 uppercase w-20">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-medical-gray-200">
            {filteredData.map((study) => (
              <tr key={study.orderId} className="hover:bg-medical-gray-50">
                <td className="px-2 py-2 text-xs text-medical-blue font-medium border-r truncate text-center">{study.orderId}</td>
                <td className="px-2 py-2 text-xs text-medical-gray-700 border-r truncate text-center">{study.hospital}</td>
                <td className="px-2 py-2 text-xs text-medical-gray-700 border-r truncate text-center">{study.patientName}</td>
                <td className="px-2 py-2 text-xs text-medical-gray-700 border-r truncate text-center">{study.gender}</td>
                <td className="px-2 py-2 text-xs text-medical-blue border-r truncate text-center">{study.study}</td>
                <td className="px-2 py-2 text-xs text-medical-gray-700 border-r truncate text-center">{study.modality}</td>
                <td className="px-2 py-2 text-xs text-medical-gray-700 border-r truncate text-center">
                  <Select>
                    <SelectTrigger className="h-6 w-full text-xs border-0 p-0">
                      <SelectValue placeholder={study.assignedTo} />
                    </SelectTrigger>
                    <SelectContent>
                      {doctorNames.map((doctor) => (
                        <SelectItem key={doctor} value={doctor}>
                          {doctor}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-2 py-2 text-xs text-medical-gray-700 border-r text-center">
                  <div className="flex flex-col">
                    <span className="font-medium">{study.assignedDate.split(' ').slice(0, 3).join(' ')}</span>
                    <span className="text-gray-500">{study.assignedDate.split(' ').slice(3).join(' ')}</span>
                  </div>
                </td>
                <td className="px-2 py-2 border-r text-center">
                  <span className={`inline-flex px-1 py-0.5 text-xs font-semibold rounded-full ${
                    study.priority === 'URGENT'
                      ? 'bg-red-100 text-red-800'
                      : study.priority === 'NORMAL'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {study.priority}
                  </span>
                </td>
                <td className="px-2 py-2 text-xs border-r text-center">
                  <div className="flex justify-center bg-white rounded overflow-hidden space-x-1">
                    <button className="p-1 text-gray-600 hover:bg-medical-gray-100 rounded" title="Email"><FaEnvelope className="w-4 h-4" /></button>
                    <button className="p-1 text-gray-600 hover:bg-medical-gray-100 rounded" title="Link"><FiLink className="w-4 h-4" /></button>
                    <button className="p-1 text-gray-600 hover:bg-medical-gray-100 rounded" title="File"><FiFileText className="w-4 h-4" /></button>
                    <button className="p-1 text-gray-600 hover:bg-medical-gray-200 rounded" title="Image"><FiImage className="w-4 h-4" /></button>
                  </div>
                </td>
                <td className="px-2 py-2 text-xs text-center">
                  <div className="flex flex-col space-y-1 items-center">
                    <Button variant="default" size="sm" onClick={handleViewStudy} className="h-6 px-2 bg-medical-blue hover:bg-medical-blue-dark text-white text-xs w-16">
                      <FiEye className="w-3 h-3 mr-1" /> View
                    </Button>
                    <Button variant="default" size="sm" className="h-6 px-2 bg-green-600 hover:bg-green-700 text-white text-xs w-16">
                      Assign
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudiesTable;
