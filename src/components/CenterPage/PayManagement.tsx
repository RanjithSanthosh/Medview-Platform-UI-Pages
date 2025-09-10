import React, { useState, useMemo } from 'react';
import { Landmark, FileText, CircleDollarSign, Clock, Search, ArrowRight, X } from 'lucide-react';

// --- MOCK DATA ---
// In a real application, this would come from an API

const doctorNames = ["Dr Gopinath", "Dr Prem Kumar", "Dr Suresh", "Dr Priya", "Dr Anitha", "Dr Mehra"];

// A configuration object for scan costs. This is better than hardcoding prices.
const SCAN_COSTS = {
    'CT': 120,
    'MRI': 250,
    'CR/DX': 80,
    'US': 150,
    'CBCT': 180,
};

const mockCaseData = [
    { caseId: "PAY-2024-001", patientName: "MALLA BINDU", scanType: "MRI", doctorName: "Dr Gopinath", completedDate: "2024-08-21", paymentStatus: "Paid" },
    { caseId: "PAY-2024-002", patientName: "JINCY", scanType: "MRI", doctorName: "Dr Prem Kumar", completedDate: "2024-08-21", paymentStatus: "Pending" },
    { caseId: "PAY-2024-003", patientName: "RAM PRASAD", scanType: "CT", doctorName: "Dr Suresh", completedDate: "2024-08-20", paymentStatus: "Paid" },
    { caseId: "PAY-2024-004", patientName: "CHENDIL V", scanType: "CT", doctorName: "Dr Priya", completedDate: "2024-08-20", paymentStatus: "Pending" },
    { caseId: "PAY-2024-005", patientName: "NAGARAJ", scanType: "US", doctorName: "Dr Anitha", completedDate: "2024-08-18", paymentStatus: "Pending" },
    { caseId: "PAY-2024-006", patientName: "MR SHIVU", scanType: "CBCT", doctorName: "Dr Gopinath", completedDate: "2024-08-18", paymentStatus: "Paid" },
    { caseId: "PAY-2024-007", patientName: "ANNA GEORGE", scanType: "CR/DX", doctorName: "Dr Mehra", completedDate: "2024-08-17", paymentStatus: "Paid" },
    { caseId: "PAY-2024-008", patientName: "SUNITHA", scanType: "MRI", doctorName: "Dr Prem Kumar", completedDate: "2024-08-17", paymentStatus: "Pending" },
    { caseId: "PAY-2024-009", patientName: "KAVITHA R", scanType: "CT", doctorName: "Dr Suresh", completedDate: "2024-08-16", paymentStatus: "Paid" },
    { caseId: "PAY-2024-010", patientName: "VIKRAM S", scanType: "US", doctorName: "Dr Anitha", completedDate: "2024-08-15", paymentStatus: "Pending" },
];

// --- Reusable UI Components ---

const PaymentStatusBadge = ({ status }) => {
    const statusStyles = {
        'Paid': 'bg-green-100 text-green-800 border-green-200',
        'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    };
    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${statusStyles[status]}`}>
            {status === 'Paid' ? <CircleDollarSign className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
            {status}
        </span>
    );
};

const StatCard = ({ title, value, icon, description }) => (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex-1">
        <div className="flex justify-between items-center mb-1">
            <h3 className="text-sm font-semibold text-gray-500">{title}</h3>
            {icon}
        </div>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        <p className="text-xs text-gray-400 mt-1">{description}</p>
    </div>
);

const PaymentModal = ({ isOpen, onClose, caseDetails, onConfirm }) => {
    if (!isOpen || !caseDetails) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md transform transition-all">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">Confirm Payment</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="p-6">
                    <p className="text-sm text-gray-600 mb-4">
                        You are about to make a payment for the following case:
                    </p>
                    <div className="bg-gray-50/70 border border-gray-200 rounded-lg p-4 space-y-2 text-sm">
                        <div><strong>Case ID:</strong> <span className="text-gray-700 font-mono">{caseDetails.caseId}</span></div>
                        <div><strong>Patient:</strong> <span className="text-gray-700">{caseDetails.patientName}</span></div>
                        <div><strong>Scan Type:</strong> <span className="text-gray-700">{caseDetails.scanType}</span></div>
                        <div><strong>Doctor:</strong> <span className="text-gray-700">{caseDetails.doctorName}</span></div>
                        <div className="pt-2 mt-2 border-t border-gray-200">
                            <strong>Amount:</strong> 
                            <span className="text-xl font-bold text-indigo-600 ml-2">
                                ${SCAN_COSTS[caseDetails.scanType].toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 rounded-b-2xl flex justify-end gap-3">
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors flex items-center gap-2"
                    >
                        Confirm Payment <ArrowRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- Main Dashboard Component ---

const CenterPaymentsDashboard = () => {
    const [cases, setCases] = useState(mockCaseData);
    const [filters, setFilters] = useState({ doctor: 'all', status: 'all', scanType: 'all', search: '' });
    const [modalState, setModalState] = useState({ isOpen: false, selectedCase: null });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const filteredCases = useMemo(() => {
        return cases
            .map(c => ({ ...c, cost: SCAN_COSTS[c.scanType] }))
            .filter(c => filters.doctor === 'all' || c.doctorName === filters.doctor)
            .filter(c => filters.status === 'all' || c.paymentStatus === filters.status)
            .filter(c => filters.scanType === 'all' || c.scanType === filters.scanType)
            .filter(c => c.caseId.toLowerCase().includes(filters.search.toLowerCase()) || 
                         c.patientName.toLowerCase().includes(filters.search.toLowerCase()));
    }, [cases, filters]);

    const stats = useMemo(() => {
        const totalCases = filteredCases.length;
        const totalValue = filteredCases.reduce((sum, c) => sum + c.cost, 0);
        const pendingCases = filteredCases.filter(c => c.paymentStatus === 'Pending');
        const pendingValue = pendingCases.reduce((sum, c) => sum + c.cost, 0);
        return {
            totalCases,
            totalValue,
            pendingCasesCount: pendingCases.length,
            pendingValue
        };
    }, [filteredCases]);

    const openPaymentModal = (caseData) => {
        setModalState({ isOpen: true, selectedCase: caseData });
    };
    
    const closePaymentModal = () => {
        setModalState({ isOpen: false, selectedCase: null });
    };

    const handleConfirmPayment = () => {
        if (!modalState.selectedCase) return;
        
        // This simulates an API call to update the payment status.
        setCases(prevCases => prevCases.map(c => 
            c.caseId === modalState.selectedCase.caseId 
                ? { ...c, paymentStatus: 'Paid' } 
                : c
        ));
        
        closePaymentModal();
    };

    const scanTypes = Object.keys(SCAN_COSTS);

    return (
        <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Center Payments Dashboard</h1>
                    <p className="text-gray-500 mt-1">Track and manage payments for completed cases.</p>
                </header>

                {/* --- Stats Cards --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard title="Total Cases" value={stats.totalCases} icon={<FileText className="h-5 w-5 text-gray-400"/>} description="Cases matching current filters"/>
                    <StatCard title="Total Value" value={`$${stats.totalValue.toLocaleString()}`} icon={<Landmark className="h-5 w-5 text-gray-400"/>} description="Total value of filtered cases"/>
                    <StatCard title="Pending Payments" value={stats.pendingCasesCount} icon={<Clock className="h-5 w-5 text-gray-400"/>} description="Cases awaiting payment"/>
                    <StatCard title="Amount Due" value={`$${stats.pendingValue.toLocaleString()}`} icon={<CircleDollarSign className="h-5 w-5 text-gray-400"/>} description="Total value of pending payments"/>
                </div>

                {/* --- Main Content Area --- */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
                    <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-gray-200 bg-gray-50/50 flex-wrap">
                        <div className="relative w-full sm:w-auto sm:flex-1 sm:max-w-xs">
                             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"/>
                             <input 
                                 type="text" 
                                 name="search"
                                 value={filters.search}
                                 onChange={handleFilterChange}
                                 placeholder="Search by Case ID or Patient..." 
                                 className="w-full border border-gray-300 rounded-lg py-2 pl-9 pr-3 focus:ring-2 focus:ring-indigo-500 transition text-sm"
                             />
                        </div>
                        <div className="flex items-center gap-3 flex-wrap justify-end">
                            <select name="doctor" value={filters.doctor} onChange={handleFilterChange} className="border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 transition text-sm bg-white">
                                <option value="all">All Doctors</option>
                                {doctorNames.map(doc => <option key={doc} value={doc}>{doc}</option>)}
                            </select>
                            <select name="scanType" value={filters.scanType} onChange={handleFilterChange} className="border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 transition text-sm bg-white">
                                <option value="all">All Scan Types</option>
                                {scanTypes.map(type => <option key={type} value={type}>{type}</option>)}
                            </select>
                             <select name="status" value={filters.status} onChange={handleFilterChange} className="border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 transition text-sm bg-white">
                                <option value="all">All Statuses</option>
                                <option value="Pending">Pending</option>
                                <option value="Paid">Paid</option>
                            </select>
                        </div>
                    </div>
                    
                    {/* --- Data Table --- */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600">
                            <thead className="bg-gray-100 text-xs text-gray-700 uppercase tracking-wider">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Case / Patient</th>
                                    <th scope="col" className="px-6 py-3">Assigned Doctor</th>
                                    <th scope="col" className="px-6 py-3">Scan Details</th>
                                    <th scope="col" className="px-6 py-3">Completed On</th>
                                    <th scope="col" className="px-6 py-3 text-right">Amount</th>
                                    <th scope="col" className="px-6 py-3 text-center">Status</th>
                                    {/* <th scope="col" className="px-6 py-3 text-center">Action</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCases.map(caseItem => (
                                    <tr key={caseItem.caseId} className="bg-white border-b hover:bg-gray-50/70 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-gray-800">{caseItem.patientName}</div>
                                            <div className="text-gray-500 text-xs font-mono">{caseItem.caseId}</div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-700">{caseItem.doctorName}</td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-800">{caseItem.scanType}</div>
                                            <div className="text-gray-500 text-xs">Cost: ${caseItem.cost.toFixed(2)}</div>
                                        </td>
                                        <td className="px-6 py-4">{caseItem.completedDate}</td>
                                        <td className="px-6 py-4 text-right font-medium text-gray-800">${caseItem.cost.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-center"><PaymentStatusBadge status={caseItem.paymentStatus} /></td>
                                        {/* <td className="px-6 py-4 text-center">
                                            {caseItem.paymentStatus === 'Pending' ? (
                                                <button 
                                                    onClick={() => openPaymentModal(caseItem)}
                                                    className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-sm"
                                                >
                                                    Pay Now
                                                </button>
                                            ) : (
                                                <span className="text-xs text-gray-400">-</span>
                                            )}
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredCases.length === 0 && (
                            <div className="text-center py-16">
                                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-lg font-medium text-gray-900">No Cases Found</h3>
                                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <PaymentModal 
                isOpen={modalState.isOpen}
                onClose={closePaymentModal}
                onConfirm={handleConfirmPayment}
                caseDetails={modalState.selectedCase}
            />
        </div>
    );
};

export default CenterPaymentsDashboard;
