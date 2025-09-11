import React from "react";
import {
  FiCreditCard,
  FiDownload,
  FiClock,
  FiArrowDown,
  FiArrowUp,
} from "react-icons/fi";
import { BiRupee } from "react-icons/bi";

interface Transaction {
  id: string;
  caseId: string;
  patientName: string;
  amount: number;
  date: string;
  status: "completed" | "pending";
  type: "earning" | "withdrawal";
}

const DoctorPaymentPage: React.FC = () => {
  const [transactions] = React.useState<Transaction[]>([
    {
      id: "TRX001",
      caseId: "CASE001",
      patientName: "John Doe",
      amount: 300,
      date: "2024-01-15",
      status: "completed",
      type: "earning",
    },
    {
      id: "TRX002",
      caseId: "CASE002",
      patientName: "Jane Smith",
      amount: 300,
      date: "2024-01-16",
      status: "completed",
      type: "earning",
    },
  ]);

  const totalEarnings = transactions
    .filter((t) => t.type === "earning")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalWithdrawals = transactions
    .filter((t) => t.type === "withdrawal")
    .reduce((sum, t) => sum + t.amount, 0);

  const walletBalance = totalEarnings - totalWithdrawals;

  const handleWithdraw = () => {
    console.log("Withdraw clicked");
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-medical-gray-800 text-center sm:text-left">
        Payment Dashboard
      </h1>

      {/* Wallet + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Wallet Card */}
        <div className="bg-gradient-to-br from-medical-blue to-medical-blue-dark rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-center sm:text-left">
              Wallet Balance
            </h2>
            <FiCreditCard className="w-8 h-8 mx-auto sm:mx-0 mt-2 sm:mt-0" />
          </div>
          <div className="flex items-center justify-center sm:justify-start text-3xl sm:text-4xl font-bold mb-6">
            <BiRupee className="w-8 h-8" />
            <span>{walletBalance.toFixed(2)}</span>
          </div>
          <button
            className="w-full bg-white text-medical-blue-dark px-6 py-3 rounded-xl font-medium hover:bg-opacity-90 transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
            onClick={handleWithdraw}
          >
            <FiDownload className="w-5 h-5" />
            Withdraw Funds
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-medical-gray-100 hover:border-medical-blue transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <FiArrowUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-medical-gray-600 text-sm sm:text-base">
                Total Earnings
              </h3>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-medical-gray-800">
              ₹{totalEarnings.toFixed(2)}
            </p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-medical-gray-100 hover:border-medical-blue transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiArrowDown className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-medical-gray-600 text-sm sm:text-base">
                Withdrawals
              </h3>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-medical-gray-800">
              ₹{totalWithdrawals.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-xl shadow-lg border border-medical-gray-100">
        <div className="p-4 sm:p-6 border-b border-medical-gray-200">
          <div className="flex items-center gap-3">
            <FiClock className="w-6 h-6 text-medical-blue" />
            <h2 className="text-xl sm:text-2xl font-semibold text-medical-gray-800">
              Transaction History
            </h2>
          </div>
        </div>

        {/* Mobile: Card layout | Desktop: Table */}
        <div className="block md:hidden p-4 space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="border border-medical-gray-200 rounded-lg p-4 shadow-sm"
            >
              <p className="font-semibold text-medical-gray-800">
                {transaction.patientName} - ₹{transaction.amount}
              </p>
              <p className="text-sm text-medical-gray-600">
                {transaction.date} | {transaction.caseId}
              </p>
              <div className="flex gap-2 mt-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    transaction.type === "earning"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {transaction.type}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    transaction.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {transaction.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-medical-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-medical-gray-600">
                  Transaction ID
                </th>
                <th className="px-6 py-4 text-left text-medical-gray-600">
                  Case ID
                </th>
                <th className="px-6 py-4 text-left text-medical-gray-600">
                  Patient Name
                </th>
                <th className="px-6 py-4 text-left text-medical-gray-600">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-medical-gray-600">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-medical-gray-600">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-medical-gray-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-medical-gray-200">
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-medical-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-medical-gray-800">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-4 text-medical-gray-800">
                    {transaction.caseId}
                  </td>
                  <td className="px-6 py-4 text-medical-gray-800">
                    {transaction.patientName}
                  </td>
                  <td className="px-6 py-4 text-medical-gray-800">
                    ₹{transaction.amount}
                  </td>
                  <td className="px-6 py-4 text-medical-gray-800">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        transaction.type === "earning"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        transaction.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {transaction.status}
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

export default DoctorPaymentPage;
