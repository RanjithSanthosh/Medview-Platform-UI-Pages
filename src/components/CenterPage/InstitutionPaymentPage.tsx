import React, { useState, useEffect, useMemo } from "react";
import { 
    DollarSign, Banknote, Calendar, Receipt, Landmark, Loader2, 
    CircleCheck, Inbox, ArrowLeft, ArrowRight, Download, AlertTriangle 
} from "lucide-react";

// --- MOCK DATA (Simulating data fetched from a server API) ---
const MOCK_UNPAID_CASES = [
    // September 2025
    { id: 'CASE-001', patientName: 'Rohan Sharma', scanType: 'CT', scanSubType: 'Brain', caseDate: '2025-09-05', amount: 500 },
    { id: 'CASE-002', patientName: 'Priya Patel', scanType: 'MRI', scanSubType: 'Knee Joint', caseDate: '2025-09-05', amount: 1200 },
    { id: 'CASE-003', patientName: 'Amit Singh', scanType: 'CT', scanSubType: 'Abdomen', caseDate: '2025-09-04', amount: 750 },
    { id: 'CASE-004', patientName: 'Sunita Gupta', scanType: 'US', scanSubType: 'Obstetric', caseDate: '2025-09-04', amount: 300 },
    { id: 'CASE-005', patientName: 'Vikram Kumar', scanType: 'CT', scanSubType: 'Brain', caseDate: '2025-09-03', amount: 500 },
    { id: 'CASE-006', patientName: 'Anjali Desai', scanType: 'CR/DX', scanSubType: 'Chest', caseDate: '2025-09-02', amount: 150 },

    // August 2025
    { id: 'CASE-007', patientName: 'Kavita Iyer', scanType: 'MRI', scanSubType: 'Spine', caseDate: '2025-08-28', amount: 1200 },
    { id: 'CASE-008', patientName: 'Suresh Reddy', scanType: 'US', scanSubType: 'KUB', caseDate: '2025-08-25', amount: 350 },
    { id: 'CASE-009', patientName: 'Deepa Verma', scanType: 'CT', scanSubType: 'Chest', caseDate: '2025-08-22', amount: 800 },

    // July 2025
    { id: 'CASE-010', patientName: 'Manoj Tiwari', scanType: 'CR/DX', scanSubType: 'Limb', caseDate: '2025-07-15', amount: 200 },
];

const MOCK_PAYMENT_HISTORY = [
    { id: 'PAY-001', paymentDate: '2025-08-01', amount: 4800, paymentMethod: 'Bank Transfer', transactionId: 'TXN73920485', description: 'Payment for July 2025 Dues', status: 'Paid' },
    { id: 'PAY-002', paymentDate: '2025-07-03', amount: 6200, paymentMethod: 'Bank Transfer', transactionId: 'TXN69219374', description: 'Payment for June 2025 Dues', status: 'Paid' },
];

// --- Helper Functions ---
const formatDate = (date) => date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
const formatCurrency = (amount) => amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 });
const getMonthYear = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

// --- UI Card Components ---
const Card = ({ children, className = '' }) => <div className={`bg-white rounded-xl shadow-sm border border-slate-200 ${className}`}>{children}</div>;
const CardHeader = ({ children, className = '' }) => <div className={`p-5 border-b border-slate-200 ${className}`}>{children}</div>;
const CardTitle = ({ children }) => <h2 className="text-lg font-semibold text-slate-800">{children}</h2>;
const CardContent = ({ children, className = '' }) => <div className={`p-5 ${className}`}>{children}</div>;
const CardFooter = ({ children, className = '' }) => <div className={`p-5 bg-slate-50/70 border-t border-slate-200 rounded-b-xl ${className}`}>{children}</div>;

// --- Reusable Badge Component ---
const StatusBadge = ({ status }) => {
    const styles = {
        Paid: "bg-green-100 text-green-800 border-green-200",
        Processing: "bg-blue-100 text-blue-800 border-blue-200",
        Failed: "bg-red-100 text-red-800 border-red-200",
    };
    const icon = {
        Paid: <CircleCheck className="h-3 w-3" />,
        Processing: <Loader2 className="h-3 w-3 animate-spin" />,
        Failed: <AlertTriangle className="h-3 w-3" />,
    }
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${styles[status] || 'bg-slate-100 text-slate-800'}`}>
            {icon[status]}
            {status}
        </span>
    );
};

// --- CHILD COMPONENT: MonthlyDuesSummary ---
const MonthlyDuesSummary = ({ casesForMonth, totalDue, selectedMonth, onSubmitPayment, isSubmitting }) => {
    const monthName = new Date(`${selectedMonth}-02`).toLocaleString('default', { month: 'long', year: 'numeric' });

    if (casesForMonth.length === 0) {
        return (
            <Card>
                <CardHeader className="border-l-4 border-l-green-500"><CardTitle>Dues for {monthName}</CardTitle></CardHeader>
                <CardContent className="text-center py-12">
                    <CircleCheck className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-800">All Dues Cleared!</h3>
                    <p className="text-slate-500 mt-1 text-sm">No outstanding payments for this month.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader className="border-l-4 border-l-amber-500"><CardTitle>Outstanding Dues for {monthName}</CardTitle></CardHeader>
            <CardContent>
                <div className="space-y-1 max-h-80 overflow-y-auto pr-2 -mr-2">
                    {casesForMonth.map((item, index) => (
                        <div key={item.id} className={`flex justify-between items-center text-sm p-2.5 rounded-lg ${index % 2 === 0 ? 'bg-slate-50/70' : ''}`}>
                            <div>
                                <p className="font-medium text-slate-700">{item.patientName} <span className="text-slate-500">({item.scanType})</span></p>
                                <p className="text-xs text-slate-500">Case: {item.id} &bull; {formatDate(new Date(item.caseDate))}</p>
                            </div>
                            <div className="font-semibold text-slate-800 shrink-0 ml-4">{formatCurrency(item.amount)}</div>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-slate-600">Total for {monthName}</span>
                    <span className="text-2xl font-bold text-indigo-600">{formatCurrency(totalDue)}</span>
                </div>
                <button
                    onClick={onSubmitPayment}
                    disabled={isSubmitting || totalDue <= 0}
                    className="w-full flex items-center justify-center py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                >
                    {isSubmitting ? (
                        <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing Payment...</>
                    ) : (
                        <><Banknote className="mr-2 h-5 w-5" /> Pay Total Amount</>
                    )}
                </button>
            </CardFooter>
        </Card>
    );
};

// --- CHILD COMPONENT: PaymentHistory ---
const PaymentHistory = ({ history }) => (
    <Card>
        <CardHeader><CardTitle>Payment History</CardTitle></CardHeader>
        <CardContent className="!p-0">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {history.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-16 text-slate-500">
                                    <Inbox className="w-12 h-12 mx-auto text-slate-400 mb-3"/>
                                    <h3 className="font-semibold">No Payment History</h3>
                                    <p className="text-sm">Previous transactions will appear here.</p>
                                </td>
                            </tr>
                        ) : (
                            history.map(payment => (
                                <tr key={payment.id} className="hover:bg-slate-50/70 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{formatDate(new Date(payment.paymentDate))}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 font-medium">{payment.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">{formatCurrency(payment.amount)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={payment.status} /></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button className="p-2 text-slate-500 rounded-full hover:bg-slate-200 hover:text-slate-800 transition-colors" title="Download Invoice">
                                            <Download className="h-4 w-4"/>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </CardContent>
    </Card>
);

// --- SKELETON LOADER ---
const PageSkeletonLoader = () => (
     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-pulse">
        <div className="lg:col-span-2 bg-slate-200 rounded-xl h-[30rem]"></div>
        <div className="lg:col-span-1 bg-slate-200 rounded-xl h-96"></div>
    </div>
);

// --- PARENT CONTAINER: The Main Page ---
const InstitutionPaymentPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [unpaidCases, setUnpaidCases] = useState([]);
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(getMonthYear(new Date('2025-09-10')));
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setUnpaidCases(MOCK_UNPAID_CASES);
            setPaymentHistory(MOCK_PAYMENT_HISTORY);
            setIsLoading(false);
        }, 1500);
    }, []);

    const { casesForMonth, totalDueForMonth } = useMemo(() => {
        const filtered = unpaidCases.filter(c => getMonthYear(new Date(c.caseDate)) === selectedMonth);
        const total = filtered.reduce((sum, item) => sum + item.amount, 0);
        return { casesForMonth: filtered, totalDueForMonth: total };
    }, [unpaidCases, selectedMonth]);

    const handleMonthChange = (increment) => {
        const currentDate = new Date(`${selectedMonth}-02`);
        currentDate.setMonth(currentDate.getMonth() + increment);
        setSelectedMonth(getMonthYear(currentDate));
    };

    const handlePaymentSubmit = async () => {
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 2000));

        const monthName = new Date(`${selectedMonth}-02`).toLocaleString('default', { month: 'long', year: 'numeric' });
        const newPayment = {
            id: `PAY-${Date.now()}`,
            paymentDate: new Date().toISOString(),
            amount: totalDueForMonth,
            paymentMethod: 'Bank Transfer',
            transactionId: `TXN${Math.floor(Math.random() * 100000000)}`,
            description: `Payment for ${monthName} Dues`,
            status: 'Processing', // Show processing status initially
        };
        
        setPaymentHistory(prev => [newPayment, ...prev]);
        setUnpaidCases(prev => prev.filter(c => getMonthYear(new Date(c.caseDate)) !== selectedMonth));
        setIsSubmitting(false);

        // Simulate payment confirmation after a delay
        setTimeout(() => {
            setPaymentHistory(prev => prev.map(p => p.id === newPayment.id ? {...p, status: 'Paid'} : p));
        }, 3000);
    };
    
    const monthDisplay = new Date(`${selectedMonth}-02`).toLocaleString('default', { month: 'long', year: 'numeric' });

    return (
        <div className="min-h-screen bg-slate-50 font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8 flex items-center gap-4">
                     <div className="bg-indigo-100 p-3 rounded-xl">
                        <Landmark className="h-8 w-8 text-indigo-600" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Institution Payments</h1>
                        <p className="text-slate-600 mt-1">Review and settle your outstanding dues on a monthly basis.</p>
                    </div>
                </header>
                
                 <div className="mb-6 flex items-center justify-center p-2 bg-white rounded-xl shadow-sm border border-slate-200 max-w-sm mx-auto">
                    <button onClick={() => handleMonthChange(-1)} className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors">
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <h2 className="text-lg font-semibold text-slate-700 text-center w-48">{monthDisplay}</h2>
                    <button onClick={() => handleMonthChange(1)} className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors">
                        <ArrowRight className="h-5 w-5" />
                    </button>
                </div>

                {isLoading ? <PageSkeletonLoader /> : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                        
                        {/* Right Column: Dues and Payment (narrower) */}
                        <div className="lg:col-span-1 space-y-8">
                            <MonthlyDuesSummary
                                casesForMonth={casesForMonth}
                                totalDue={totalDueForMonth}
                                selectedMonth={selectedMonth}
                                onSubmitPayment={handlePaymentSubmit}
                                isSubmitting={isSubmitting}
                            />
                        </div>
                                                {/* Left Column: Payment History (wider) */}
                        <div className="lg:col-span-2">
                            <PaymentHistory history={paymentHistory} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InstitutionPaymentPage;

