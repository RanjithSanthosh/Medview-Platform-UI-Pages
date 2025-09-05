import React from 'react';
import { BiRupee } from 'react-icons/bi';

interface HistoryEntry {
  orderId: string;
  patientName: string;
  study: string;
  assignedTo: string;
  status: string;
  date: string;
  amount: number;
}

const DoctorHistory: React.FC = () => {
  const [historyData, setHistoryData] = React.useState<HistoryEntry[]>([
    {
      orderId: 'CASE001',
      patientName: 'John Doe',
      study: 'Brain (Plain Study)',
      assignedTo: 'Dr. Smith',
      status: 'completed',
      date: '2024-01-15',
      amount: 300
    },
    // Add more sample data as needed
  ]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-medical-gray-800">Case History</h2>
        <div className="bg-medical-blue/10 px-4 py-2 rounded-lg flex items-center gap-2">
          <span className="text-medical-blue font-semibold">Total Earnings: </span>
          <span className="text-medical-blue font-bold flex items-center inline-flex">
            <BiRupee className="w-5 h-5 " />
            {historyData.reduce((sum, entry) => sum + entry.amount, 0)}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-medical-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-medical-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-medical-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-medical-gray-500 uppercase tracking-wider">Patient Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-medical-gray-500 uppercase tracking-wider">Study</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-medical-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-medical-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-medical-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-medical-gray-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-medical-gray-200">
              {historyData.map((entry, index) => (
                <tr key={index} className="hover:bg-medical-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-medical-gray-900">{entry.orderId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-medical-gray-900">{entry.patientName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-medical-gray-900">{entry.study}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-medical-gray-900">{entry.assignedTo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                      {entry.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-medical-gray-900">{entry.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-medical-gray-900 flex items-center">
                    <BiRupee className="w-4 h-4" />
                    {entry.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorHistory;