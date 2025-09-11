import React, { useState, useMemo, useEffect } from 'react';
import { FileText, ChevronDown, DollarSign, Calendar, Activity, BarChart2 } from 'lucide-react';
// For the chart, you would typically install a library like Recharts or Chart.js
// yarn add recharts
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// --- CONSTANTS & CONFIGURATION ---
const PAYMENT_PER_CASE = 300;
const REPORT_STATUSES = {
  SIGNED_OFF: 'Signed Off',
  PRELIM: 'Prelim',
  DICTATED: 'Dictated',
};

// --- AUTHENTICATION SIMULATION ---
const MOCK_LOGGED_IN_DOCTOR = {
  name: "Dr Gopinath",
  id: "DOC-GOP-01"
};

// --- ENHANCED MOCK DATA (More realistic structure) ---
const completedStudiesData = [
    // Dr Gopinath's cases
    { caseId: "34e27dd850fa", patientName: "MALLA BINDU", study: "Extremities (MSK)", modality: "MRI", assignedTo: "Dr Gopinath", completedAt: "2017-03-21T18:44:00Z", reportStatus: REPORT_STATUSES.SIGNED_OFF, turnaroundTimeHours: 4 },
    { caseId: "Ce4aa2a81910", patientName: "MR SHIVU 44YRS", study: "Brain (Plain Study)", modality: "CT", assignedTo: "Dr Gopinath", completedAt: "2017-03-08T19:40:00Z", reportStatus: REPORT_STATUSES.SIGNED_OFF, turnaroundTimeHours: 6 },
    { caseId: "De5bb3b92011", patientName: "ANOTHER PATIENT", study: "Abdomen", modality: "US", assignedTo: "Dr Gopinath", completedAt: "2017-03-22T10:00:00Z", reportStatus: REPORT_STATUSES.SIGNED_OFF, turnaroundTimeHours: 2 },
    { caseId: "Ge7dd5d04133", patientName: "NEW CASE 1", study: "Spine", modality: "MRI", assignedTo: "Dr Gopinath", completedAt: "2017-02-15T12:00:00Z", reportStatus: REPORT_STATUSES.SIGNED_OFF, turnaroundTimeHours: 5 },
    { caseId: "He8ee6e05144", patientName: "NEW CASE 2", study: "Pelvis", modality: "CT", assignedTo: "Dr Gopinath", completedAt: "2017-02-25T14:30:00Z", reportStatus: REPORT_STATUSES.SIGNED_OFF, turnaroundTimeHours: 3 },

    // Other doctors' cases for filtering demonstration
    { caseId: "E2138ae25e8a", patientName: "JINCY", study: "Extremities (MSK)", modality: "MRI", assignedTo: "Dr Prem Kumar", completedAt: "2017-03-21T15:45:00Z", reportStatus: REPORT_STATUSES.SIGNED_OFF, turnaroundTimeHours: 3 },
    { caseId: "Baa41f844d57", patientName: "RAM PRASAD 45/M", study: "Chest", modality: "CT", assignedTo: "Dr Suresh", completedAt: "2017-03-20T19:28:00Z", reportStatus: REPORT_STATUSES.SIGNED_OFF, turnaroundTimeHours: 8 },
    { caseId: "Ec3c488b60ee", patientName: "CHENDIL V 39/YRS/M", study: "Brain (Plain Study)", modality: "CT", assignedTo: "Dr Priya", completedAt: "2017-03-14T17:08:00Z", reportStatus: REPORT_STATUSES.SIGNED_OFF, turnaroundTimeHours: 4 },
];

// --- HELPER FUNCTIONS ---
const formatDate = (date) => new Date(date).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

// --- CHILD COMPONENTS ---

// 1. Monthly Payout Accordion (Slightly updated)
const MonthlyPayoutAccordion = ({ month, studies, totalPayout }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-gray-200 rounded-lg mb-3">
            <button className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100 transition" onClick={() => setIsOpen(!isOpen)}>
                <div>
                    <p className="font-semibold text-blue-800">{month}</p>
                    <p className="text-sm text-gray-600">{studies.length} Cases</p>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-lg font-semibold text-green-700">{totalPayout.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </button>
            {isOpen && (
                <div className="border-t border-gray-200 overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="bg-white text-xs text-gray-500 uppercase tracking-wider">
                            <tr>
                                <th className="px-4 py-2">Patient / Case ID</th>
                                <th className="px-4 py-2">Study</th>
                                <th className="px-4 py-2">Completed Date</th>
                                <th className="px-4 py-2 text-center">TAT (Hours)</th>
                                <th className="px-4 py-2 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {studies.map(study => (
                                <tr key={study.caseId} className="border-b border-gray-100 last:border-b-0">
                                    <td className="px-4 py-3">
                                        <div className="font-medium text-gray-800">{study.patientName}</div>
                                        <div className="text-xs text-gray-400 font-mono">{study.caseId}</div>
                                    </td>
                                    <td className="px-4 py-3">{study.study} ({study.modality})</td>
                                    <td className="px-4 py-3 text-xs">{formatDate(study.completedAt)}</td>
                                    <td className="px-4 py-3 text-center">{study.turnaroundTimeHours}</td>
                                    <td className="px-4 py-3 text-right font-semibold text-gray-700">{PAYMENT_PER_CASE.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

// 2. Summary Metric Cards
const DashboardMetrics = ({ totalPayout, totalCases, avgTat }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-50 border border-green-200 p-5 rounded-xl flex items-start gap-4">
            <div className="bg-green-100 p-3 rounded-full"><DollarSign className="h-6 w-6 text-green-700" /></div>
            <div>
                <h3 className="font-semibold text-green-800">Total Payout</h3>
                <p className="text-3xl font-bold text-green-700 mt-1">{totalPayout.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
            </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-full"><FileText className="h-6 w-6 text-blue-700" /></div>
            <div>
                <h3 className="font-semibold text-blue-800">Cases Completed</h3>
                <p className="text-3xl font-bold text-blue-700 mt-1">{totalCases}</p>
            </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-xl flex items-start gap-4">
            <div className="bg-yellow-100 p-3 rounded-full"><Activity className="h-6 w-6 text-yellow-700" /></div>
            <div>
                <h3 className="font-semibold text-yellow-800">Avg. Turnaround</h3>
                <p className="text-3xl font-bold text-yellow-700 mt-1">{avgTat} <span className="text-lg">hours</span></p>
            </div>
        </div>
    </div>
);

// 3. Filter Controls
const FilterControls = ({ modalityFilter, setModalityFilter, dateRange, setDateRange, uniqueModalities }) => (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <div className="flex-1">
            <label htmlFor="modality-filter" className="block text-sm font-medium text-gray-700 mb-1">Modality</label>
            <select
                id="modality-filter"
                value={modalityFilter}
                onChange={(e) => setModalityFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="ALL">All Modalities</option>
                {uniqueModalities.map(mod => <option key={mod} value={mod}>{mod}</option>)}
            </select>
        </div>
        <div className="flex-1">
            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
                type="date"
                id="start-date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
        <div className="flex-1">
            <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
                type="date"
                id="end-date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    </div>
);

// --- PARENT COMPONENT: The Main Page ---
const DoctorPaymentHistoryPage = () => {
    const loggedInDoctor = MOCK_LOGGED_IN_DOCTOR;

    const [allCases, setAllCases] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [modalityFilter, setModalityFilter] = useState('ALL');
    const [dateRange, setDateRange] = useState({ start: '2017-01-01', end: '2017-12-31' });

    // Simulate fetching data on component mount
    useEffect(() => {
        setIsLoading(true);
        // Simulate a network delay
        setTimeout(() => {
            const doctorsCases = completedStudiesData.filter(
                study => study.assignedTo === loggedInDoctor.name
            );
            setAllCases(doctorsCases);
            setIsLoading(false);
        }, 1000);
    }, [loggedInDoctor.name]);

    // Memoize filtered data processing to avoid re-calculation on every render
    const filteredData = useMemo(() => {
        return allCases.filter(study => {
            const completedDate = new Date(study.completedAt);
            const startDate = dateRange.start ? new Date(dateRange.start) : null;
            const endDate = dateRange.end ? new Date(dateRange.end) : null;
            
            // Adjust end date to be inclusive of the entire day
            if(endDate) endDate.setHours(23, 59, 59, 999);

            const isModalityMatch = modalityFilter === 'ALL' || study.modality === modalityFilter;
            const isDateMatch = (!startDate || completedDate >= startDate) && (!endDate || completedDate <= endDate);

            return isModalityMatch && isDateMatch;
        });
    }, [allCases, modalityFilter, dateRange]);

    // Aggregate filtered data by month
    const monthlyAggregatedData = useMemo(() => {
        const data = {};
        filteredData.forEach(study => {
            const monthKey = new Date(study.completedAt).toLocaleString('en-GB', { month: 'long', year: 'numeric' });
            if (!data[monthKey]) {
                data[monthKey] = { studies: [], totalPayout: 0 };
            }
            data[monthKey].studies.push(study);
            data[monthKey].totalPayout += PAYMENT_PER_CASE;
        });
        return data;
    }, [filteredData]);

    // Calculate overall metrics
    const totalPayout = filteredData.reduce((sum, study) => sum + PAYMENT_PER_CASE, 0);
    const totalCases = filteredData.length;
    const avgTat = totalCases > 0 ? (filteredData.reduce((sum, study) => sum + study.turnaroundTimeHours, 0) / totalCases).toFixed(1) : 'N/A';
    
    // Data for charts and filters
    const sortedMonths = Object.keys(monthlyAggregatedData).sort((a, b) => new Date(`1 ${b}`) - new Date(`1 ${a}`));
    const chartData = sortedMonths.map(month => ({
        name: month.split(' ')[0], // e.g., "March"
        Payout: monthlyAggregatedData[month].totalPayout
    })).reverse(); // Reverse for chronological order
    const uniqueModalities = [...new Set(allCases.map(c => c.modality))];

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50/50"><p className="text-gray-500">Loading payment history...</p></div>;
    }

    return (
        <div className="min-h-screen bg-gray-50/50 font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Payment Dashboard</h1>
                    <p className="text-gray-500 mt-1">Hello, <span className="font-semibold">{loggedInDoctor.name}</span>. Here is your detailed payout analysis.</p>
                </header>

                <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200 p-6">
                    {/* --- Filter Controls --- */}
                    <FilterControls 
                        modalityFilter={modalityFilter}
                        setModalityFilter={setModalityFilter}
                        dateRange={dateRange}
                        setDateRange={setDateRange}
                        uniqueModalities={uniqueModalities}
                    />

                    {/* --- Summary Cards --- */}
                    <DashboardMetrics totalPayout={totalPayout} totalCases={totalCases} avgTat={avgTat} />
                    
                    {filteredData.length > 0 ? (
                        <>
                             {/* --- Chart Visualization --- */}
                            <div className="mb-10">
                                <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2"><BarChart2 className="w-6 h-6 text-gray-400"/>Monthly Earnings Overview</h3>
                                <div className="h-80 w-full bg-gray-50 p-4 rounded-lg border border-gray-200">
                                     <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                            <XAxis dataKey="name" stroke="#6b7280" />
                                            <YAxis stroke="#6b7280" tickFormatter={(value) => `₹${value/1000}k`} />
                                            <Tooltip cursor={{fill: 'rgba(239, 246, 255, 0.5)'}} contentStyle={{ background: '#fff', border: '1px solid #ddd', borderRadius: '0.5rem' }} formatter={(value) => [value.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }), 'Payout']}/>
                                            <Bar dataKey="Payout" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            
                            {/* --- Monthly Accordions --- */}
                            <h3 className="text-xl font-semibold text-gray-700 mb-4">Detailed Payouts by Month</h3>
                            <div>
                                {sortedMonths.map(month => (
                                    <MonthlyPayoutAccordion
                                        key={month}
                                        month={month}
                                        studies={monthlyAggregatedData[month].studies}
                                        totalPayout={monthlyAggregatedData[month].totalPayout}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-16">
                            <FileText className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-lg font-medium text-gray-900">No Data Found</h3>
                            <p className="mt-1 text-sm text-gray-500">No completed cases match your current filter criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorPaymentHistoryPage;