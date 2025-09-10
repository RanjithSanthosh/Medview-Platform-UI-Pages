import React from 'react';
import { 
    ClipboardList, CheckSquare, Wrench, Hospital, Stethoscope, 
    UserPlus, Settings, FileBarChart, History, AlertTriangle, 
    UserCheck, LineChart, Star, TrendingUp, TrendingDown, MessageCircle 
} from 'lucide-react';

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
  // Mock data for the top operational stats
  const operationalStats = [
    { title: 'Total Assigned Cases', value: '1,240', icon: <ClipboardList />, color: 'text-indigo-600', bgColor: 'bg-indigo-100' },
    { title: 'Cases Completed (Month)', value: '892', icon: <CheckSquare />, color: 'text-green-600', bgColor: 'bg-green-100' },
    { title: 'Active Technicians', value: '45', icon: <Wrench />, color: 'text-sky-600', bgColor: 'bg-sky-100' },
    { title: 'Partner Centers', value: '28', icon: <Hospital />, color: 'text-red-600', bgColor: 'bg-red-100' },
    { title: 'Registered Doctors', value: '122', icon: <Stethoscope />, color: 'text-purple-600', bgColor: 'bg-purple-100' },
  ];

  // Mock data for the financial stats
  const financialStats = [
    { title: "Today's Charges (In)", value: "₹500.00", icon: <TrendingUp />, color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
    { title: "Charges w/ Communication (In)", value: "₹350.00", icon: <MessageCircle />, color: 'text-cyan-600', bgColor: 'bg-cyan-100' },
    { title: "Today's Charges (Out)", value: "₹250.00", icon: <TrendingDown />, color: 'text-orange-600', bgColor: 'bg-orange-100' },
  ];

  // Mock data for the "Action Required" section
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
          <p className="text-gray-500 mt-1">Welcome back, Admin! Here is a summary of platform activity for September 10, 2025.</p>
        </header>

        {/* --- Operational Stats Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {operationalStats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* --- Financial Overview Section --- */}
        <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 px-1">Financial Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {financialStats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>
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