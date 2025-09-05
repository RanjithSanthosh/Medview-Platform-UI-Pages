import React from 'react';
import { FiUsers, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const DoctorDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Cases',
      value: '156',
      icon: <FiUsers className="w-6 h-6" />,
      color: 'bg-blue-500',
      textColor: 'text-blue-500'
    },
    {
      title: 'Pending Cases',
      value: '23',
      icon: <FiClock className="w-6 h-6" />,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-500'
    },
    {
      title: 'Active Cases',
      value: '8',
      icon: <FiAlertCircle className="w-6 h-6" />,
      color: 'bg-orange-500',
      textColor: 'text-orange-500'
    },
    {
      title: 'Completed Cases',
      value: '125',
      icon: <FiCheckCircle className="w-6 h-6" />,
      color: 'bg-green-500',
      textColor: 'text-green-500'
    }
  ];

  const recentActivity = [
    {
      type: 'completed',
      message: 'Completed study for MALLA BINDU',
      time: '2 hours ago',
      orderId: '34e27dd850fa'
    },
    {
      type: 'assigned',
      message: 'Assigned new case for KASTURI',
      time: '4 hours ago',
      orderId: '4cf869248293'
    },
    {
      type: 'pending',
      message: 'New case received for JOHN DOE',
      time: '6 hours ago',
      orderId: 'pending001'
    }
  ];

  return (
    <div className="w-full p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Doctor Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's an overview of your cases.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                <div className={stat.textColor}>{stat.icon}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  activity.type === 'completed' ? 'bg-green-500' :
                  activity.type === 'assigned' ? 'bg-blue-500' : 'bg-yellow-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{activity.message}</p>
                  <p className="text-xs text-gray-500">Order ID: {activity.orderId}</p>
                </div>
                <div className="text-xs text-gray-400">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <FiClock className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="font-medium text-gray-800">View Pending Cases</p>
                  <p className="text-sm text-gray-500">23 cases waiting</p>
                </div>
              </div>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <FiAlertCircle className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="font-medium text-gray-800">Active Studies</p>
                  <p className="text-sm text-gray-500">8 in progress</p>
                </div>
              </div>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <FiCheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium text-gray-800">Completed Cases</p>
                  <p className="text-sm text-gray-500">125 completed</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
