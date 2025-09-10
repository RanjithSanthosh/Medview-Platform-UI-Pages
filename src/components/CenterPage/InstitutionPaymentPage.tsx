import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DollarSign, FileText, Banknote, Calendar, Receipt, Landmark, Loader2 } from "lucide-react";

// --- MOCK DATA (Simulating data fetched from a server API) ---
const MOCK_UNPAID_CASES = [
    { id: 'CASE-001', patientName: 'Rohan Sharma', scanType: 'CT', scanSubType: 'Brain', caseDate: '2025-09-05', amount: 500 },
    { id: 'CASE-002', patientName: 'Priya Patel', scanType: 'MRI', scanSubType: 'Knee Joint', caseDate: '2025-09-05', amount: 1200 },
    { id: 'CASE-003', patientName: 'Amit Singh', scanType: 'CT', scanSubType: 'Abdomen', caseDate: '2025-09-04', amount: 750 },
    { id: 'CASE-004', patientName: 'Sunita Gupta', scanType: 'US', scanSubType: 'Obstetric', caseDate: '2025-09-04', amount: 300 },
    { id: 'CASE-005', patientName: 'Vikram Kumar', scanType: 'CT', scanSubType: 'Brain', caseDate: '2025-09-03', amount: 500 },
    { id: 'CASE-006', patientName: 'Anjali Desai', scanType: 'CR/DX', scanSubType: 'Chest', caseDate: '2025-09-02', amount: 150 },
];

const MOCK_PAYMENT_HISTORY = [
    { id: 'PAY-001', paymentDate: '2025-09-01', amount: 5000, paymentMethod: 'Bank Transfer', transactionId: 'TXN73920485' },
    { id: 'PAY-002', paymentDate: '2025-08-15', amount: 3500, paymentMethod: 'Bank Transfer', transactionId: 'TXN69219374' },
];

// --- CHILD COMPONENT: DuesSummary ---
const DuesSummary = ({ cases }) => {
    const { totalDue, groupedCases } = useMemo(() => {
        const total = cases.reduce((sum, item) => sum + item.amount, 0);
        const grouped = cases.reduce((acc, item) => {
            (acc[item.scanType] = acc[item.scanType] || []).push(item);
            return acc;
        }, {});
        return { totalDue: total, groupedCases: grouped };
    }, [cases]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Outstanding Dues</h2>
            <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg mb-6">
                <p className="font-semibold">Total Amount Due</p>
                <p className="text-3xl font-bold">
                    {totalDue.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                </p>
            </div>
            <div className="space-y-4">
                {Object.entries(groupedCases).map(([scanType, items]) => (
                    <div key={scanType}>
                        <h3 className="font-semibold text-gray-700">{scanType} ({items.length} cases)</h3>
                        <ul className="list-disc list-inside pl-2 mt-1 text-gray-600 text-sm space-y-1">
                            {items.map(item => (
                                <li key={item.id}>
                                    {item.scanSubType} for {item.patientName} on {new Date(item.caseDate).toLocaleDateString('en-GB')} - <strong>{item.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</strong>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- CHILD COMPONENT: PaymentForm ---
const PaymentForm = ({ amount, onAmountChange, onSubmit, isSubmitting }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Make a Payment</h2>
        <form onSubmit={onSubmit}>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="paymentAmount" className="flex items-center"><DollarSign className="w-4 h-4 mr-2" />Amount to Pay</Label>
                    <Input 
                        id="paymentAmount"
                        type="number"
                        placeholder="e.g., 5000"
                        value={amount}
                        onChange={onAmountChange}
                        className="mt-2"
                        required
                    />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
                    ) : (
                        <><Banknote className="mr-2 h-4 w-4" /> Pay Now</>
                    )}
                </Button>
            </div>
        </form>
    </div>
);

// --- CHILD COMPONENT: PaymentHistory ---
const PaymentHistory = ({ history }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment History</h2>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"><Calendar className="inline-block w-4 h-4 mr-2" />Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"><DollarSign className="inline-block w-4 h-4 mr-2" />Amount</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"><Landmark className="inline-block w-4 h-4 mr-2" />Method</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"><Receipt className="inline-block w-4 h-4 mr-2" />Transaction ID</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {history.map(payment => (
                        <tr key={payment.id}>
                            <td className="px-4 py-4 text-sm text-gray-600">{new Date(payment.paymentDate).toLocaleDateString('en-GB')}</td>
                            <td className="px-4 py-4 text-sm font-medium text-gray-900">{payment.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</td>
                            <td className="px-4 py-4 text-sm text-gray-600">{payment.paymentMethod}</td>
                            <td className="px-4 py-4 text-sm text-gray-600 font-mono">{payment.transactionId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

// --- PARENT CONTAINER: The Main Page ---
const InstitutionPaymentPage = () => {
    // --- STATE MANAGEMENT ---
    const [unpaidCases] = useState(MOCK_UNPAID_CASES);
    const [paymentHistory, setPaymentHistory] = useState(MOCK_PAYMENT_HISTORY);
    const [paymentAmount, setPaymentAmount] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- LOGIC & HANDLERS ---
    const handleAmountChange = (e) => setPaymentAmount(e.target.value);
    
    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        const newPayment = {
            id: `PAY-${Math.floor(Math.random() * 1000)}`,
            paymentDate: new Date().toISOString().split('T')[0],
            amount: parseFloat(paymentAmount),
            paymentMethod: 'Bank Transfer',
            transactionId: `TXN${Math.floor(Math.random() * 100000000)}`,
        };

        setPaymentHistory(prevHistory => [newPayment, ...prevHistory]);
        setPaymentAmount("");
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Institution Payments</h1>
                    <p className="text-gray-600 mt-1">Review your outstanding balance and payment history.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Left Column: Dues and Payment Form */}
                    {/* <div className="lg:col-span-1 space-y-8">
                        <DuesSummary cases={unpaidCases} />
                        <PaymentForm 
                            amount={paymentAmount}
                            onAmountChange={handleAmountChange}
                            onSubmit={handlePaymentSubmit}
                            isSubmitting={isSubmitting}
                        />
                    </div> */}

                    {/* Right Column: Payment History */}
                    <div className="lg:col-span-2">
                        <PaymentHistory history={paymentHistory} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstitutionPaymentPage;