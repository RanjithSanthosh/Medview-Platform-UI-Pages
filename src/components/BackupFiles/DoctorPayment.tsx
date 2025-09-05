import React from 'react';
import { FiCreditCard, FiDownload, FiClock } from 'react-icons/fi';
import { BiRupee } from 'react-icons/bi';

interface PaymentHistory {
  caseId: string;
  patientName: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending';
}

const DoctorPayment: React.FC = () => {
  const [paymentHistory, setPaymentHistory] = React.useState<PaymentHistory[]>([
    {
      caseId: 'CASE001',
      patientName: 'John Doe',
      amount: 300,
      date: '2024-01-15',
      status: 'completed'
    },
    // Add more sample data as needed
  ]);

  const totalEarnings = paymentHistory.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Wallet Card */}
      <div className="bg-gradient-to-r from-medical-blue to-medical-blue-dark rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Wallet Balance</h2>
          <FiCreditCard className="w-8 h-8" />
        </div>
        <div className="flex items-center text-3xl font-bold mb-4">
          <BiRupee className="w-8 h-8" />
          <span>{totalEarnings.toFixed(2)}</span>
        </div>
        <button
          className="bg-white text-medical-blue-dark px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors flex items-center gap-2"
          onClick={() => console.log('Withdraw clicked')}
        >
          <FiDownload className="w-5 h-5" />
          Withdraw Funds
        </button>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border border-medical-gray-200">
          <h3 className="text-medical-gray-600 mb-2">Total Cases</h3>
          <p className="text-2xl font-bold text-medical-blue-dark">{paymentHistory.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-medical-gray-200">
          <h3 className="text-medical-gray-600 mb-2">This Month</h3>
          <p className="text-2xl font-bold text-medical-blue-dark">₹{(paymentHistory.length * 300).toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-medical-gray-200">
          <h3 className="text-medical-gray-600 mb-2">Pending Amount</h3>
          <p className="text-2xl font-bold text-medical-blue-dark">₹0.00</p>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-lg shadow border border-medical-gray-200">
        <div className="p-4 border-b border-medical-gray-200">
          <div className="flex items-center gap-2">
            <FiClock className="w-5 h-5 text-medical-blue" />
            <h2 className="text-xl font-semibold">Payment History</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-medical-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-medical-gray-600">Case ID</th>
                <th className="px-4 py-3 text-left text-medical-gray-600">Patient Name</th>
                <th className="px-4 py-3 text-left text-medical-gray-600">Amount</th>
                <th className="px-4 py-3 text-left text-medical-gray-600">Date</th>
                <th className="px-4 py-3 text-left text-medical-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-medical-gray-200">
              {paymentHistory.map((payment, index) => (
                <tr key={index} className="hover:bg-medical-gray-50">
                  <td className="px-4 py-3 text-medical-gray-800">{payment.caseId}</td>
                  <td className="px-4 py-3 text-medical-gray-800">{payment.patientName}</td>
                  <td className="px-4 py-3 text-medical-gray-800">₹{payment.amount}</td>
                  <td className="px-4 py-3 text-medical-gray-800">{payment.date}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${payment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                    >
                      {payment.status}
                    </span>
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

export default DoctorPayment;