


// import React from 'react';
// import { ClipboardList, CheckSquare, Wrench, Hospital, Stethoscope, UserPlus, Settings, FileBarChart, History } from 'lucide-react';

// // --- Reusable Helper Components ---

// // StatCard: Displays a single key metric on the dashboard.
// const StatCard = ({ title, value, icon, color, bgColor }) => (
//   <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-between transition-transform transform hover:-translate-y-1">
//     <div>
//       <p className="text-sm font-medium text-gray-500">{title}</p>
//       <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
//     </div>
//     <div className={`p-4 rounded-full ${bgColor}`}>
//       {React.cloneElement(icon, { className: `w-7 h-7 ${color}` })}
//     </div>
//   </div>
// );

// // ActivityItem: Renders a single item in the recent activity feed.
// const ActivityItem = ({ icon, text, time, color }) => (
//     <div className="flex items-start gap-4 py-3">
//       <div className={`mt-1 p-2 rounded-full ${color} bg-opacity-10`}>
//         {React.cloneElement(icon, { className: `w-5 h-5 ${color}`})}
//       </div>
//       <div className="flex-1">
//         <p className="text-sm text-gray-700">{text}</p>
//         <p className="text-xs text-gray-500 mt-1">{time}</p>
//       </div>
//     </div>
// );

// // QuickActionButton: A button for common admin tasks.
// const QuickActionButton = ({ icon, title, description }) => (
//     <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
//         <div className="flex items-center gap-4">
//             {icon}
//             <div>
//                 <p className="font-semibold text-gray-800">{title}</p>
//                 <p className="text-sm text-gray-500">{description}</p>
//             </div>
//         </div>
//     </button>
// );


// // --- Main Admin Dashboard Component ---

// const AdminDashboard = () => {
//   // Mock data for the dashboard stats
//   const stats = [
//     { title: 'Total Assigned Cases', value: '1,240', icon: <ClipboardList />, color: 'text-indigo-600', bgColor: 'bg-indigo-100' },
//     { title: 'Cases Completed (Month)', value: '892', icon: <CheckSquare />, color: 'text-green-600', bgColor: 'bg-green-100' },
//     { title: 'Active Technicians', value: '45', icon: <Wrench />, color: 'text-sky-600', bgColor: 'bg-sky-100' },
//     { title: 'Partner Centers', value: '28', icon: <Hospital />, color: 'text-red-600', bgColor: 'bg-red-100' },
//     { title: 'Registered Doctors', value: '122', icon: <Stethoscope />, color: 'text-purple-600', bgColor: 'bg-purple-100' },
//   ];

//   // Mock data for the recent activity feed
//   const recentActivity = [
//       { icon: <CheckSquare />, text: <span><strong>Dr. Reed</strong> completed case <strong>CASE-P9O8L7</strong>. Payment processed.</span>, time: "15 minutes ago", color: "text-green-600" },
//       { icon: <UserPlus />, text: <span>A new technician, <strong>John Smith</strong>, has been registered.</span>, time: "1 hour ago", color: "text-sky-600" },
//       { icon: <Hospital />, text: <span><strong>Valley Imaging Clinic</strong> was added as a new partner center.</span>, time: "3 hours ago", color: "text-red-600" },
//       { icon: <FileBarChart />, text: <span>The monthly payment report for August 2025 has been generated.</span>, time: "Yesterday", color: "text-purple-600" },
//       { icon: <ClipboardList />, text: <span>An urgent case <strong>CASE-7D2E4F</strong> was assigned to <strong>Dr. Thorne</strong>.</span>, time: "2 days ago", color: "text-indigo-600" },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50/50 font-sans p-4 sm:p-6 lg:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* --- Dashboard Header --- */}
//         <header className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
//           <p className="text-gray-500 mt-1">Welcome back, Admin! Here is a summary of platform activity.</p>
//         </header>

//         {/* --- Stats Grid --- */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
//           {stats.map((stat, index) => (
//             <StatCard key={index} {...stat} />
//           ))}
//         </div>

//         {/* --- Main Content Area (Activity & Actions) --- */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
//             {/* --- Recent Activity Section --- */}
//             <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="px-6 py-4 border-b border-gray-200">
//                     <div className="flex items-center gap-3">
//                          <History className="h-6 w-6 text-gray-500" />
//                         <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
//                     </div>
//                 </div>
//                 <div className="p-6 divide-y divide-gray-100">
//                    {recentActivity.map((activity, index) => (
//                        <ActivityItem key={index} {...activity} />
//                    ))}
//                 </div>
//             </div>

//             {/* --- Quick Actions Section --- */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="px-6 py-4 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
//                 </div>
//                 <div className="p-6 space-y-4">
//                     <QuickActionButton icon={<UserPlus className="h-6 w-6 text-blue-600"/>} title="Add New User" description="Register a new doctor or technician." />
//                     <QuickActionButton icon={<Hospital className="h-6 w-6 text-red-600"/>} title="Manage Centers" description="Edit details of partner centers." />
//                     <QuickActionButton icon={<FileBarChart className="h-6 w-6 text-purple-600"/>} title="View Reports" description="Access payment and case reports." />
//                     <QuickActionButton icon={<Settings className="h-6 w-6 text-gray-600"/>} title="System Settings" description="Configure platform-wide settings." />
//                 </div>
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;




import React from 'react';
import { ClipboardList, CheckSquare, Wrench, Hospital, Stethoscope, UserPlus, Settings, FileBarChart, History, AlertTriangle, UserCheck, LineChart, Star } from 'lucide-react';

// --- Reusable Helper Components ---

// StatCard: Displays a single key metric on the dashboard.
const StatCard = ({ title, value, icon, color, bgColor }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-between transition-transform transform hover:-translate-y-1">
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
    <div className={`p-4 rounded-full ${bgColor}`}>
      {React.cloneElement(icon, { className: `w-7 h-7 ${color}` })}
    </div>
  </div>
);

// ActionItem: Renders a single task in the "Action Required" list.
const ActionItem = ({ icon, title, description, time, color }) => (
    <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
        <div className={`mt-1 p-2 rounded-full ${color} bg-opacity-10`}>
            {React.cloneElement(icon, { className: `w-5 h-5 ${color}` })}
        </div>
        <div className="flex-1">
            <p className="font-semibold text-gray-800">{title}</p>
            <p className="text-sm text-gray-600">{description}</p>
            <p className="text-xs text-gray-400 mt-1">{time}</p>
        </div>
        <button className="text-sm font-semibold text-blue-600 hover:text-blue-800">View</button>
    </div>
);

// AnalyticsChart: A simple bar chart for visualizing data.
const AnalyticsChart = ({ data }) => (
    <div>
        <h4 className="text-sm font-semibold text-gray-600 mb-3">Case Distribution by Modality</h4>
        <div className="space-y-2">
            {data.map(item => (
                <div key={item.name} className="flex items-center gap-2">
                    <span className="w-12 text-xs text-gray-500">{item.name}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-4">
                        <div
                            className={`${item.color} h-4 rounded-full`}
                            style={{ width: `${item.value}%` }}
                        />
                    </div>
                    <span className="w-8 text-xs font-medium text-gray-600">{item.value}%</span>
                </div>
            ))}
        </div>
    </div>
);

// TopPerformerItem: Renders a doctor in the top performers list.
const TopPerformerItem = ({ name, cases, avatar }) => (
    <div className="flex items-center gap-3">
        <img src={avatar} alt={name} className="h-10 w-10 rounded-full" />
        <div className="flex-1">
            <p className="text-sm font-semibold text-gray-800">{name}</p>
            <p className="text-xs text-gray-500">{cases} cases completed</p>
        </div>
        <div className="flex items-center gap-1 text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
        </div>
    </div>
);


// --- Main Admin Dashboard Component ---

const AdminDashboard = () => {
  // Mock data for the dashboard stats
  const stats = [
    { title: 'Total Assigned Cases', value: '1,240', icon: <ClipboardList />, color: 'text-indigo-600', bgColor: 'bg-indigo-100' },
    { title: 'Cases Completed (Month)', value: '892', icon: <CheckSquare />, color: 'text-green-600', bgColor: 'bg-green-100' },
    { title: 'Active Technicians', value: '45', icon: <Wrench />, color: 'text-sky-600', bgColor: 'bg-sky-100' },
    { title: 'Partner Centers', value: '28', icon: <Hospital />, color: 'text-red-600', bgColor: 'bg-red-100' },
    { title: 'Registered Doctors', value: '122', icon: <Stethoscope />, color: 'text-purple-600', bgColor: 'bg-purple-100' },
  ];

  // Mock data for the new "Action Required" section
  const actionItems = [
      { icon: <AlertTriangle />, title: "Urgent Case Unassigned", description: "Case #CASE-URG-004 for patient Sarah Lee requires immediate assignment.", time: "Pending for 2 hours", color: "text-red-600" },
      { icon: <UserCheck />, title: "New Doctor Awaiting Approval", description: "Dr. Alisha Chen has registered and needs verification to access the platform.", time: "Submitted 1 day ago", color: "text-blue-600" },
      { icon: <ClipboardList />, title: "Case Pending for >24 Hours", description: "Case #CASE-OLD-012 has been pending assignment for over a day.", time: "Pending for 30 hours", color: "text-yellow-600" },
  ];
  
  // Mock data for "Platform Analytics" section
  const chartData = [
      { name: 'MRI', value: 45, color: 'bg-indigo-500' },
      { name: 'CT', value: 30, color: 'bg-sky-500' },
      { name: 'X-Ray', value: 15, color: 'bg-green-500' },
      { name: 'Other', value: 10, color: 'bg-gray-400' },
  ];
  
  const topPerformers = [
      { name: 'Dr. Evelyn Reed', cases: 128, avatar: 'https://placehold.co/40x40/a78bfa/ffffff?text=ER' },
      { name: 'Dr. Marcus Thorne', cases: 112, avatar: 'https://placehold.co/40x40/38bdf8/ffffff?text=MT' },
      { name: 'Dr. Lena Petrova', cases: 98, avatar: 'https://placehold.co/40x40/f472b6/ffffff?text=LP' },
  ];


  return (
    <div className="min-h-screen bg-gray-50/50 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* --- Dashboard Header --- */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, Admin! Here is a summary of platform activity.</p>
        </header>

        {/* --- Stats Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* --- Main Content Area (Action Queue & Analytics) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* --- Action Required Section --- */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                         <AlertTriangle className="h-6 w-6 text-yellow-600" />
                        <h2 className="text-lg font-semibold text-gray-800">Action Required</h2>
                    </div>
                </div>
                <div className="p-4 divide-y divide-gray-100">
                   {actionItems.map((item, index) => (
                       <ActionItem key={index} {...item} />
                   ))}
                </div>
            </div>

            {/* --- Platform Analytics Section --- */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                     <div className="flex items-center gap-3">
                         <LineChart className="h-6 w-6 text-gray-500" />
                        <h2 className="text-lg font-semibold text-gray-800">Platform Analytics</h2>
                    </div>
                </div>
                <div className="p-6 space-y-6">
                    <AnalyticsChart data={chartData} />
                    <div>
                        <h4 className="text-sm font-semibold text-gray-600 mb-3">Top Performing Doctors (Month)</h4>
                        <div className="space-y-4">
                            {topPerformers.map(performer => (
                                <TopPerformerItem key={performer.name} {...performer} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

