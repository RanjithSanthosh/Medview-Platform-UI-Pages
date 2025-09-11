// import React from 'react';
// import { FiUsers, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

// const DoctorDashboard: React.FC = () => {
//   const stats = [
//     {
//       title: 'Total Cases',
//       value: '156',
//       icon: <FiUsers className="w-6 h-6" />,
//       color: 'bg-blue-500',
//       textColor: 'text-blue-500'
//     },
//     {
//       title: 'Pending Cases',
//       value: '23',
//       icon: <FiClock className="w-6 h-6" />,
//       color: 'bg-yellow-500',
//       textColor: 'text-yellow-500'
//     },
//     {
//       title: 'Active Cases',
//       value: '8',
//       icon: <FiAlertCircle className="w-6 h-6" />,
//       color: 'bg-orange-500',
//       textColor: 'text-orange-500'
//     },
//     {
//       title: 'Completed Cases',
//       value: '125',
//       icon: <FiCheckCircle className="w-6 h-6" />,
//       color: 'bg-green-500',
//       textColor: 'text-green-500'
//     }
//   ];

//   const recentActivity = [
//     {
//       type: 'completed',
//       message: 'Completed study for MALLA BINDU',
//       time: '2 hours ago',
//       orderId: '34e27dd850fa'
//     },
//     {
//       type: 'assigned',
//       message: 'Assigned new case for KASTURI',
//       time: '4 hours ago',
//       orderId: '4cf869248293'
//     },
//     {
//       type: 'pending',
//       message: 'New case received for JOHN DOE',
//       time: '6 hours ago',
//       orderId: 'pending001'
//     }
//   ];

//   return (
//     <div className="w-full p-6">
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-gray-800 mb-2">Doctor Dashboard</h1>
//         <p className="text-gray-600">Welcome back! Here's an overview of your cases.</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {stats.map((stat, index) => (
//           <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">{stat.title}</p>
//                 <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//               </div>
//               <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
//                 <div className={stat.textColor}>{stat.icon}</div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Recent Activity */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
//         </div>
//         <div className="p-6">
//           <div className="space-y-4">
//             {recentActivity.map((activity, index) => (
//               <div key={index} className="flex items-center space-x-4">
//                 <div className={`w-3 h-3 rounded-full ${
//                   activity.type === 'completed' ? 'bg-green-500' :
//                   activity.type === 'assigned' ? 'bg-blue-500' : 'bg-yellow-500'
//                 }`}></div>
//                 <div className="flex-1">
//                   <p className="text-sm font-medium text-gray-800">{activity.message}</p>
//                   <p className="text-xs text-gray-500">Order ID: {activity.orderId}</p>
//                 </div>
//                 <div className="text-xs text-gray-400">{activity.time}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
//         </div>
//         <div className="p-6">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
//               <div className="flex items-center space-x-3">
//                 <FiClock className="w-5 h-5 text-yellow-500" />
//                 <div>
//                   <p className="font-medium text-gray-800">View Pending Cases</p>
//                   <p className="text-sm text-gray-500">23 cases waiting</p>
//                 </div>
//               </div>
//             </button>
//             <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
//               <div className="flex items-center space-x-3">
//                 <FiAlertCircle className="w-5 h-5 text-orange-500" />
//                 <div>
//                   <p className="font-medium text-gray-800">Active Studies</p>
//                   <p className="text-sm text-gray-500">8 in progress</p>
//                 </div>
//               </div>
//             </button>
//             <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
//               <div className="flex items-center space-x-3">
//                 <FiCheckCircle className="w-5 h-5 text-green-500" />
//                 <div>
//                   <p className="font-medium text-gray-800">Completed Cases</p>
//                   <p className="text-sm text-gray-500">125 completed</p>
//                 </div>
//               </div>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;






// import React from 'react';
// // Added new icons for the financial section
// import { 
//     FiUsers, 
//     FiClock, 
//     FiCheckCircle, 
//     FiAlertCircle, 
//     FiTrendingUp,
//     FiDollarSign,
//     FiGrid,
//     FiLayers,
//     FiActivity,
//     FiRadio
// } from 'react-icons/fi';

// const DoctorDashboard: React.FC = () => {
//     // --- Existing Data ---
//     const stats = [
//         { title: 'Total Cases', value: '156', icon: <FiUsers className="w-6 h-6" />, color: 'bg-blue-500', textColor: 'text-blue-500' },
//         { title: 'Pending Cases', value: '23', icon: <FiClock className="w-6 h-6" />, color: 'bg-yellow-500', textColor: 'text-yellow-500' },
//         { title: 'Active Cases', value: '8', icon: <FiAlertCircle className="w-6 h-6" />, color: 'bg-orange-500', textColor: 'text-orange-500' },
//         { title: 'Completed Cases', value: '125', icon: <FiCheckCircle className="w-6 h-6" />, color: 'bg-green-500', textColor: 'text-green-500' }
//     ];

//     const recentActivity = [
//         { type: 'completed', message: 'Completed study for MALLA BINDU', time: '2 hours ago', orderId: '34e27dd850fa' },
//         { type: 'assigned', message: 'Assigned new case for KASTURI', time: '4 hours ago', orderId: '4cf869248293' },
//         { type: 'pending', message: 'New case received for JOHN DOE', time: '6 hours ago', orderId: 'pending001' }
//     ];

//     // --- New Financial Data ---
//     // This data structure is scalable. In a real application, this would come from an API.
//     const financialData = [
//         { type: 'CR/DX Payments', cases: 50, amount: 25000, icon: <FiRadio className="w-5 h-5" />, color: 'text-cyan-500', bgColor: 'bg-cyan-500' },
//         { type: 'US Payments', cases: 30, amount: 45000, icon: <FiActivity className="w-5 h-5" />, color: 'text-indigo-500', bgColor: 'bg-indigo-500' },
//         { type: 'CBCT Payments', cases: 15, amount: 37500, icon: <FiGrid className="w-5 h-5" />, color: 'text-purple-500', bgColor: 'bg-purple-500' },
//         { type: 'CT Payments', cases: 20, amount: 80000, icon: <FiLayers className="w-5 h-5" />, color: 'text-pink-500', bgColor: 'bg-pink-500' },
//         { type: 'MRI Payments', cases: 10, amount: 100000, icon: <FiTrendingUp className="w-5 h-5" />, color: 'text-red-500', bgColor: 'bg-red-500' },
//     ];
    
//     // Calculate total earnings dynamically from the financial data array.
//     // This avoids data inconsistency and hardcoding.
//     const totalEarnings = financialData.reduce((acc, item) => acc + item.amount, 0);

//     // Formatter for currency. Using Intl.NumberFormat is the standard and correct way.
//     // Since you are likely in India, I've used the 'en-IN' locale for INR (₹).
//     const currencyFormatter = new Intl.NumberFormat('en-IN', {
//         style: 'currency',
//         currency: 'INR',
//         minimumFractionDigits: 0,
//     });

//     return (
//         <div className="w-full p-6 bg-gray-50 min-h-screen">
//             <div className="mb-8">
//                 <h1 className="text-3xl font-bold text-gray-800 mb-2">Doctor Dashboard</h1>
//                 <p className="text-gray-600">Welcome back! Here's an overview of your cases and earnings.</p>
//             </div>

//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                 {stats.map((stat, index) => (
//                     <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <p className="text-sm font-medium text-gray-600">{stat.title}</p>
//                                 <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//                             </div>
//                             <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
//                                 <div className={stat.textColor}>{stat.icon}</div>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* ===== START: NEW FINANCIAL OVERVIEW SECTION ===== */}
//             <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200">
//                 <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//                     <h2 className="text-lg font-semibold text-gray-800">Financial Overview</h2>
//                     <FiDollarSign className="w-5 h-5 text-gray-400" />
//                 </div>
//                 <div className="p-6">
//                     {/* Grid for payment breakdown */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
//                         {financialData.map((item, index) => (
//                             <div key={index} className="border border-gray-200 rounded-lg p-4 flex items-start space-x-4">
//                                 <div className={`p-2 rounded-full ${item.bgColor} bg-opacity-10`}>
//                                     <div className={item.color}>{item.icon}</div>
//                                 </div>
//                                 <div>
//                                     <p className="text-sm font-medium text-gray-600">{item.type}</p>
//                                     <p className="text-lg font-bold text-gray-900">{currencyFormatter.format(item.amount)}</p>
//                                     <p className="text-xs text-gray-500">{item.cases} completed cases</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                     {/* Total Earnings Summary */}
//                     <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col items-end sm:flex-row sm:items-center sm:justify-between">
//                         <p className="text-sm text-gray-600 mb-2 sm:mb-0">Based on 125 completed cases.</p>
//                         <div className="text-right">
//                            <p className="text-md font-semibold text-gray-800">Total Earnings</p>
//                            <p className="text-3xl font-bold text-green-600">{currencyFormatter.format(totalEarnings)}</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {/* ===== END: NEW FINANCIAL OVERVIEW SECTION ===== */}
            
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                  {/* Recent Activity */}
//                 <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200">
//                     <div className="px-6 py-4 border-b border-gray-200">
//                         <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
//                     </div>
//                     <div className="p-6">
//                         <div className="space-y-4">
//                             {recentActivity.map((activity, index) => (
//                                 <div key={index} className="flex items-center space-x-4">
//                                     <div className={`w-3 h-3 rounded-full ${
//                                         activity.type === 'completed' ? 'bg-green-500' :
//                                         activity.type === 'assigned' ? 'bg-blue-500' : 'bg-yellow-500'
//                                     }`}></div>
//                                     <div className="flex-1">
//                                         <p className="text-sm font-medium text-gray-800">{activity.message}</p>
//                                         <p className="text-xs text-gray-500">Order ID: {activity.orderId}</p>
//                                     </div>
//                                     <div className="text-xs text-gray-400">{activity.time}</div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Quick Actions */}
//                 <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
//                     <div className="px-6 py-4 border-b border-gray-200">
//                         <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
//                     </div>
//                     <div className="p-6">
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                             <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
//                                 <div className="flex items-center space-x-3">
//                                     <FiClock className="w-5 h-5 text-yellow-500" />
//                                     <div>
//                                         <p className="font-medium text-gray-800">View Pending Cases</p>
//                                         <p className="text-sm text-gray-500">23 cases waiting</p>
//                                     </div>
//                                 </div>
//                             </button>
//                             <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
//                                 <div className="flex items-center space-x-3">
//                                     <FiAlertCircle className="w-5 h-5 text-orange-500" />
//                                     <div>
//                                         <p className="font-medium text-gray-800">Active Studies</p>
//                                         <p className="text-sm text-gray-500">8 in progress</p>
//                                     </div>
//                                 </div>
//                             </button>
//                             <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
//                                 <div className="flex items-center space-x-3">
//                                     <FiCheckCircle className="w-5 h-5 text-green-500" />
//                                     <div>
//                                         <p className="font-medium text-gray-800">Completed Cases</p>
//                                         <p className="text-sm text-gray-500">125 completed</p>
//                                     </div>
//                                 </div>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     );
// };

// export default DoctorDashboard;



import React from 'react';
import { 
    FiUsers, 
    FiClock, 
    FiCheckCircle, 
    FiAlertCircle, 
    FiTrendingUp,
    FiDollarSign,
    FiGrid,
    FiLayers,
    FiActivity,
    FiRadio,
} from 'react-icons/fi';

const DoctorDashboard: React.FC = () => {
    // --- Existing Data ---
    const stats = [
        { title: 'Total Cases', value: '156', icon: <FiUsers className="w-6 h-6" />, color: 'bg-blue-500', textColor: 'text-blue-500' },
        { title: 'Pending Cases', value: '23', icon: <FiClock className="w-6 h-6" />, color: 'bg-yellow-500', textColor: 'text-yellow-500' },
        { title: 'Active Cases', value: '8', icon: <FiAlertCircle className="w-6 h-6" />, color: 'bg-orange-500', textColor: 'text-orange-500' },
        { title: 'Completed Cases', value: '125', icon: <FiCheckCircle className="w-6 h-6" />, color: 'bg-green-500', textColor: 'text-green-500' }
    ];

    const recentActivity = [
        { type: 'completed', message: 'Completed study for MALLA BINDU', time: '2 hours ago', orderId: '34e27dd850fa' },
        { type: 'assigned', message: 'Assigned new case for KASTURI', time: '4 hours ago', orderId: '4cf869248293' },
        { type: 'pending', message: 'New case received for JOHN DOE', time: '6 hours ago', orderId: 'pending001' }
    ];

    // --- Financial Data REVERTED to original content as requested ---
    const financialData = [
        { type: 'CR/DX Payments', cases: 50, amount: 25000, icon: <FiRadio className="w-6 h-6" />, color: 'text-blue-500' },
        { type: 'US Payments', cases: 30, amount: 45000, icon: <FiActivity className="w-6 h-6" />, color: 'text-orange-500' },
        { type: 'CBCT Payments', cases: 15, amount: 37500, icon: <FiGrid className="w-6 h-6" />, color: 'text-cyan-500' },
        { type: 'CT Payments', cases: 20, amount: 80000, icon: <FiLayers className="w-6 h-6" />, color: 'text-teal-500' },
        { type: 'MRI Payments', cases: 10, amount: 100000, icon: <FiTrendingUp className="w-6 h-6" />, color: 'text-pink-500' },
    ];
    
    // Total is calculated dynamically, now reflecting the updated amounts.
    const totalEarnings = financialData.reduce((acc, item) => acc + item.amount, 0);

    const currencyFormatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
    });

    return (
        <div className="w-full p-6 bg-gray-50 min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Doctor Dashboard</h1>
                <p className="text-gray-600">Welcome back! Here's an overview of your cases and earnings.</p>
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

            {/* ===== START: Financial Overview with Updated Content ===== */}
            <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">Financial Overview</h2>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Total Earnings Card - Spanning 1 column */}
                        <div className="bg-gray-800 text-white rounded-lg shadow-md p-6 flex flex-col justify-center text-center">
                            <p className="text-md font-medium text-gray-300">Total Earnings</p>
                            <p className="text-4xl font-bold my-2">{currencyFormatter.format(totalEarnings)}</p>
                            <p className="text-xs text-gray-400">Based on 125 completed cases.</p>
                        </div>

                        {/* Payment Breakdown Cards - Spanning 2 columns */}
                        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {financialData.map((item, index) => {
                                // Find the data for the current item
                                const data = financialData.find(d => d.type === item.type);
                                if (!data) return null; // Safety check

                                return (
                                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                                    <div className="flex items-start space-x-3">
                                        <div className={`p-2 rounded-full ${item.color.replace('text-', 'bg-')} bg-opacity-10`}>
                                            <div className={item.color}>{item.icon}</div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">{data.type}</p>
                                            <p className="text-lg font-bold text-gray-900">{currencyFormatter.format(data.amount)}</p>
                                            <p className="text-xs text-gray-500">{data.cases} completed cases</p>
                                        </div>
                                    </div>
                                </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            {/* ===== END: Financial Overview Section ===== */}
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 {/* Recent Activity */}
                <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200">
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
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                                <div className="flex items-center space-x-3">
                                    <FiClock className="w-5 h-5 text-yellow-500" />
                                    <div>
                                        <p className="font-medium text-gray-800">View Pending Cases</p>
                                        <p className="text-sm text-gray-500">23 cases waiting</p>
                                    </div>
                                </div>
                            </button>
                            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                                <div className="flex items-center space-x-3">
                                    <FiAlertCircle className="w-5 h-5 text-orange-500" />
                                    <div>
                                        <p className="font-medium text-gray-800">Active Studies</p>
                                        <p className="text-sm text-gray-500">8 in progress</p>
                                    </div>
                                </div>
                            </button>
                            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
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

        </div>
    );
};

export default DoctorDashboard;