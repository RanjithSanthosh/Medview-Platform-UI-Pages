// import React, { useState, useMemo } from 'react';
// import { CheckCircle, FileText, UserCheck, ChevronDown, DollarSign, Calendar, TrendingUp } from 'lucide-react';

// // --- CONSTANTS ---
// const PAYMENT_PER_CASE = 300;

// // --- MOCK DATA (Using the same source data as the case history page) ---
// const completedStudiesData = [
//     { orderId: "34e27dd850fa", patientName: "MALLA BINDU", study: "Extremities (MSK)", modality: "MRI", assignedTo: "Dr Gopinath", completedDate: "21 March 2017 18:44PM" },
//     { orderId: "E2138ae25e8a", patientName: "JINCY", study: "Extremities (MSK)", modality: "MRI", assignedTo: "Dr Prem Kumar", completedDate: "21 March 2017 15:45PM" },
//     { orderId: "Baa41f844d57", patientName: "RAM PRASAD 45/M", study: "Chest", modality: "CT", assignedTo: "Dr Suresh", completedDate: "20 March 2017 19:28PM" },
//     { orderId: "Ec3c488b60ee", patientName: "CHENDIL V 39/YRS/M", study: "Brain (Plain Study)", modality: "CT", assignedTo: "Dr Priya", completedDate: "14 March 2017 17:08PM" },
//     { orderId: "039d53f712ea", patientName: "NAGARAJ 23 YRS/M", study: "Neck (Contrast)", modality: "CT", assignedTo: "Dr Anitha", completedDate: "8 March 2017 21:34PM" },
//     { orderId: "Ce4aa2a81910", patientName: "MR SHIVU 44YRS", study: "Brain (Plain Study)", modality: "CT", assignedTo: "Dr Gopinath", completedDate: "8 March 2017 19:40PM" },
//     // Adding more data to make the example richer
//     { orderId: "De5bb3b92011", patientName: "ANOTHER PATIENT", study: "Abdomen", modality: "US", assignedTo: "Dr Gopinath", completedDate: "22 March 2017 10:00AM" },
//     { orderId: "Fe6cc4c03122", patientName: "TEST USER", study: "Spine", modality: "MRI", assignedTo: "Dr Suresh", completedDate: "22 February 2017 11:30AM" },
// ];

// const allDoctorNames = [...new Set(completedStudiesData.map(s => s.assignedTo))];

// // --- CHILD COMPONENT: MonthlyPayoutAccordion ---
// const MonthlyPayoutAccordion = ({ month, studies, totalPayout }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const caseCount = studies.length;

//     return (
//         <div className="border border-gray-200 rounded-lg mb-3">
//             <button
//                 className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100 transition"
//                 onClick={() => setIsOpen(!isOpen)}
//             >
//                 <div>
//                     <p className="font-semibold text-blue-800">{month}</p>
//                     <p className="text-sm text-gray-600">{caseCount} Cases</p>
//                 </div>
//                 <div className="flex items-center gap-4">
//                     <span className="text-lg font-semibold text-green-700">{totalPayout.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span>
//                     <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
//                 </div>
//             </button>
//             {isOpen && (
//                 <div className="border-t border-gray-200">
//                     <table className="w-full text-sm text-left text-gray-600">
//                         <thead className="bg-white text-xs text-gray-500 uppercase tracking-wider">
//                             <tr>
//                                 <th className="px-4 py-2">Patient / Case ID</th>
//                                 <th className="px-4 py-2">Study</th>
//                                 <th className="px-4 py-2">Completed Date</th>
//                                 <th className="px-4 py-2 text-right">Amount</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white">
//                             {studies.map(study => (
//                                 <tr key={study.orderId} className="border-b border-gray-100 last:border-b-0">
//                                     <td className="px-4 py-3">
//                                         <div className="font-medium text-gray-800">{study.patientName}</div>
//                                         <div className="text-xs text-gray-400 font-mono">{study.orderId}</div>
//                                     </td>
//                                     <td className="px-4 py-3">{study.study} ({study.modality})</td>
//                                     <td className="px-4 py-3 text-xs">{study.completedDate}</td>
//                                     <td className="px-4 py-3 text-right font-semibold text-gray-700">{PAYMENT_PER_CASE.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// // --- CHILD COMPONENT: PaymentDetails ---
// const PaymentDetails = ({ doctorName, paymentData }) => {
//     if (!doctorName || !paymentData) {
//         return (
//             <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-6">
//                 <DollarSign className="w-16 h-16 mb-4 text-gray-300" />
//                 <h3 className="text-xl font-semibold">Select a Doctor</h3>
//                 <p className="mt-1">Choose a doctor from the list to view their payment history.</p>
//             </div>
//         );
//     }
    
//     const totalPayout = Object.values(paymentData).reduce((sum, month) => sum + month.totalPayout, 0);
//     const totalCases = Object.values(paymentData).reduce((sum, month) => sum + month.caseCount, 0);
//     const sortedMonths = Object.keys(paymentData).sort((a, b) => new Date(b) - new Date(a));

//     return (
//         <div className="p-6 h-full overflow-y-auto">
//             <header className="pb-4 border-b border-gray-200 mb-6">
//                 <h2 className="text-2xl font-bold text-gray-800">{doctorName}</h2>
//                 <p className="text-gray-500">Payment History & Breakdown</p>
//             </header>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//                 <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
//                     <h3 className="font-semibold text-green-800">Total Payout (All Time)</h3>
//                     <p className="text-3xl font-bold text-green-700 mt-1">{totalPayout.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
//                 </div>
//                 <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
//                     <h3 className="font-semibold text-blue-800">Total Cases Completed</h3>
//                     <p className="text-3xl font-bold text-blue-700 mt-1">{totalCases}</p>
//                 </div>
//             </div>
            
//             <h3 className="text-lg font-semibold text-gray-700 mb-4">Payouts by Month</h3>
//             <div>
//                 {sortedMonths.length > 0 ? (
//                     sortedMonths.map(month => (
//                         <MonthlyPayoutAccordion
//                             key={month}
//                             month={month}
//                             studies={paymentData[month].studies}
//                             totalPayout={paymentData[month].totalPayout}
//                         />
//                     ))
//                 ) : (
//                      <div className="text-center py-10">
//                          <FileText className="mx-auto h-12 w-12 text-gray-400" />
//                          <h3 className="mt-2 text-lg font-medium text-gray-900">No Payment History</h3>
//                          <p className="mt-1 text-sm text-gray-500">No completed cases found for this doctor.</p>
//                      </div>
//                 )}
//             </div>
//         </div>
//     );
// };


// // --- CHILD COMPONENT: DoctorList ---
// const DoctorList = ({ doctors, selectedDoctor, onSelect }) => {
//     return (
//         <div className="flex flex-col h-full bg-gray-50/50 border-r border-gray-200">
//              <div className="p-4 border-b border-gray-200">
//                 <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2"><UserCheck /> Doctors</h2>
//             </div>
//             <div className="overflow-y-auto flex-1">
//                 {doctors.map(doc => (
//                     <button
//                         key={doc.name}
//                         onClick={() => onSelect(doc.name)}
//                         className={`w-full text-left p-4 border-b border-gray-200 hover:bg-blue-100 transition-colors duration-150 ${selectedDoctor === doc.name ? 'bg-blue-100 border-l-4 border-blue-500' : ''}`}
//                     >
//                         <p className="font-semibold text-gray-900">{doc.name}</p>
//                         <div className="text-sm text-gray-500 mt-1 flex justify-between">
//                            <span>{doc.totalCases} Cases</span>
//                            <span className="font-medium text-green-600">{doc.totalPayout.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span>
//                         </div>
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// };

// // --- PARENT COMPONENT: The Main Page ---
// const DoctorPaymentHistoryPage = () => {
//     const [selectedDoctorName, setSelectedDoctorName] = useState(null);

//     // This is the core data transformation logic.
//     // It processes the raw case data into a structure perfect for this payment page.
//     const { paymentDataByDoctor, doctorSummaries } = useMemo(() => {
//         const data = {};
        
//         completedStudiesData.forEach(study => {
//             const doctor = study.assignedTo;
//             const completedDate = new Date(study.completedDate.replace(/(\d{1,2} \w+ \d{4}) (\d{2}:\d{2})([AP]M)/, '$1 $2 $3 UTC'));
            
//             // Format to "Month Year" e.g., "March 2017"
//             const monthKey = completedDate.toLocaleString('en-GB', { month: 'long', year: 'numeric' });

//             if (!data[doctor]) {
//                 data[doctor] = {};
//             }
//             if (!data[doctor][monthKey]) {
//                 data[doctor][monthKey] = { studies: [], caseCount: 0, totalPayout: 0 };
//             }

//             data[doctor][monthKey].studies.push(study);
//             data[doctor][monthKey].caseCount += 1;
//             data[doctor][monthKey].totalPayout += PAYMENT_PER_CASE;
//         });
        
//         const summaries = allDoctorNames.map(name => {
//             const docData = data[name] || {};
//             const totalCases = Object.values(docData).reduce((sum, month) => sum + month.caseCount, 0);
//             return {
//                 name,
//                 totalCases,
//                 totalPayout: totalCases * PAYMENT_PER_CASE,
//             };
//         }).sort((a,b) => b.totalPayout - a.totalPayout); // Sort by highest earner

//         return { paymentDataByDoctor: data, doctorSummaries: summaries };
//     }, []);

//     const handleSelectDoctor = (name) => {
//         setSelectedDoctorName(name);
//     };

//     return (
//         <div className="min-h-screen bg-white font-sans">
//             <div className="max-w-screen-2xl mx-auto">
//                 <header className="p-4 sm:p-6 border-b border-gray-200">
//                     <h1 className="text-3xl font-bold text-gray-800">Doctor Payment History</h1>
//                     <p className="text-gray-500 mt-1">Verify monthly payouts based on completed cases.</p>
//                 </header>

//                 <div className="flex" style={{ height: 'calc(100vh - 97px)'}}>
//                     {/* Master Panel */}
//                     <div className="w-full md:w-1/3 lg:w-1/4">
//                         <DoctorList
//                             doctors={doctorSummaries}
//                             selectedDoctor={selectedDoctorName}
//                             onSelect={handleSelectDoctor}
//                         />
//                     </div>

//                     {/* Detail Panel */}
//                     <div className="flex-1 w-full md:w-2/3 lg:w-3/4 bg-white">
//                         <PaymentDetails
//                             doctorName={selectedDoctorName}
//                             paymentData={selectedDoctorName ? paymentDataByDoctor[selectedDoctorName] : null}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DoctorPaymentHistoryPage;




import React, { useState, useMemo } from 'react';
import { 
    CheckCircle, FileText, UserCheck, ChevronDown, DollarSign, 
    Calendar, TrendingUp, FilePlus, Printer, Send, X 
} from 'lucide-react';

// --- CONSTANTS ---
const PAYMENT_PER_CASE = 300;
const GST_RATE = 0.18; // 18% GST
const YOUR_COMPANY_DETAILS = {
    name: "CyberTek Solutions",
    address: "74/A, Electronics City Phase 1, Bengaluru, Karnataka 560100",
    email: "accounts@teleradsolutions.com",
    phone: "+91 80-4115-4555",
};

// --- MOCK DATA ---
const completedStudiesData = [
    { orderId: "34e27dd850fa", patientName: "MALLA BINDU", study: "Extremities (MSK)", modality: "MRI", assignedTo: "Dr Gopinath", completedDate: "21 March 2017 18:44PM" },
    { orderId: "E2138ae25e8a", patientName: "JINCY", study: "Extremities (MSK)", modality: "MRI", assignedTo: "Dr Prem Kumar", completedDate: "21 March 2017 15:45PM" },
    { orderId: "Baa41f844d57", patientName: "RAM PRASAD 45/M", study: "Chest", modality: "CT", assignedTo: "Dr Suresh", completedDate: "20 March 2017 19:28PM" },
    { orderId: "Ec3c488b60ee", patientName: "CHENDIL V 39/YRS/M", study: "Brain (Plain Study)", modality: "CT", assignedTo: "Dr Priya", completedDate: "14 March 2017 17:08PM" },
    { orderId: "039d53f712ea", patientName: "NAGARAJ 23 YRS/M", study: "Neck (Contrast)", modality: "CT", assignedTo: "Dr Anitha", completedDate: "8 March 2017 21:34PM" },
    { orderId: "Ce4aa2a81910", patientName: "MR SHIVU 44YRS", study: "Brain (Plain Study)", modality: "CT", assignedTo: "Dr Gopinath", completedDate: "8 March 2017 19:40PM" },
    { orderId: "De5bb3b92011", patientName: "ANOTHER PATIENT", study: "Abdomen", modality: "US", assignedTo: "Dr Gopinath", completedDate: "22 March 2017 10:00AM" },
    { orderId: "Fe6cc4c03122", patientName: "TEST USER", study: "Spine", modality: "MRI", assignedTo: "Dr Suresh", completedDate: "22 February 2017 11:30AM" },
];

// --- HELPER FUNCTIONS ---
const formatCurrency = (amount) => amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
const formatDate = (date) => date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });

// --- INVOICE MODAL COMPONENT ---
const InvoiceModal = ({ isOpen, onClose, invoiceData }) => {
    if (!isOpen || !invoiceData) return null;

    const { doctorName, month, studies, subtotal, gstAmount, total } = invoiceData;
    const issueDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(issueDate.getDate() + 15); // Due in 15 days

    const handleSendEmail = () => {
        const subject = `Invoice for ${month} from ${YOUR_COMPANY_DETAILS.name}`;
        const body = `Dear ${doctorName},\n\nPlease find your invoice for the month of ${month} attached.\n\nTotal Amount Due: ${formatCurrency(total)}\n\nThank you for your services.\n\nBest regards,\n${YOUR_COMPANY_DETAILS.name}`;
        // Note: Using a placeholder email. In a real app, this would come from a doctor's profile.
        const doctorEmail = `${doctorName.split(' ').join('.').toLowerCase()}@provider.com`;
        window.location.href = `mailto:${doctorEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <header className="flex justify-between items-center p-4 border-b bg-slate-50 rounded-t-lg">
                    <h2 className="text-xl font-semibold text-slate-800">Invoice Details</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 transition-colors"><X className="w-5 h-5" /></button>
                </header>
                <main id="invoice-content" className="p-8 overflow-y-auto">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">INVOICE</h1>
                            <p className="text-slate-500">Invoice #: {invoiceData.invoiceId}</p>
                        </div>
                        <div className="text-right">
                             <p className="text-xl font-semibold">{YOUR_COMPANY_DETAILS.name}</p>
                             <p className="text-sm text-slate-600">{YOUR_COMPANY_DETAILS.address}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8 mb-8">
                        <div>
                            <p className="font-semibold text-slate-500 text-sm">BILLED TO</p>
                            <p className="text-lg font-medium text-slate-800">{doctorName}</p>
                            {/* Placeholder for doctor's address */}
                        </div>
                        <div className="text-right">
                            <p className="font-semibold text-slate-500 text-sm">Issue Date</p>
                            <p className="text-slate-800 font-medium">{formatDate(issueDate)}</p>
                            <p className="font-semibold text-slate-500 text-sm mt-2">Due Date</p>
                            <p className="text-slate-800 font-medium">{formatDate(dueDate)}</p>
                        </div>
                    </div>
                    {/* Itemized list */}
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-100 text-slate-600">
                            <tr>
                                <th className="p-3 font-semibold">Case ID</th>
                                <th className="p-3 font-semibold">Patient</th>
                                <th className="p-3 font-semibold">Completed On</th>
                                <th className="p-3 font-semibold text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studies.map(study => (
                                <tr key={study.orderId} className="border-b">
                                    <td className="p-3 font-mono text-xs">{study.orderId}</td>
                                    <td className="p-3">{study.patientName}</td>
                                    <td className="p-3 text-xs">{study.completedDate}</td>
                                    <td className="p-3 text-right font-medium">{formatCurrency(PAYMENT_PER_CASE)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     {/* Totals Section */}
                    <div className="flex justify-end mt-6">
                        <div className="w-full max-w-sm">
                            <div className="flex justify-between py-2 text-slate-600"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
                            <div className="flex justify-between py-2 text-slate-600"><span>GST ({GST_RATE * 100}%)</span><span>{formatCurrency(gstAmount)}</span></div>
                            <div className="flex justify-between py-3 text-slate-900 font-bold text-lg border-t-2 mt-2"><span>Total Amount</span><span>{formatCurrency(total)}</span></div>
                        </div>
                    </div>
                </main>
                <footer className="flex justify-end items-center gap-3 p-4 border-t bg-slate-50 rounded-b-lg print:hidden">
                    <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border rounded-lg hover:bg-slate-100 transition-colors">
                        <Printer className="w-4 h-4" /> Print
                    </button>
                     <button onClick={handleSendEmail} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 border rounded-lg hover:bg-blue-700 transition-colors">
                        <Send className="w-4 h-4" /> Send by Email
                    </button>
                </footer>
            </div>
             <style>{`
                @media print {
                    body * { visibility: hidden; }
                    #invoice-content, #invoice-content * { visibility: visible; }
                    #invoice-content { position: absolute; left: 0; top: 0; width: 100%; }
                }
            `}</style>
        </div>
    );
};


// --- CHILD COMPONENT: MonthlyPayoutAccordion ---
const MonthlyPayoutAccordion = ({ month, studies, totalPayout, onGenerateInvoice }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-slate-200 rounded-lg mb-3 shadow-sm">
            <div className="w-full flex justify-between items-center p-4 text-left bg-slate-50/70">
                <div>
                    <p className="font-semibold text-blue-800">{month}</p>
                    <p className="text-sm text-slate-600">{studies.length} Cases</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-green-700">{formatCurrency(totalPayout)}</span>
                    <button onClick={onGenerateInvoice} className="p-2 text-slate-500 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors" title="Generate Invoice">
                        <FilePlus className="w-5 h-5" />
                    </button>
                    <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-500 rounded-full hover:bg-slate-200 transition-colors" title={isOpen ? "Collapse" : "Expand"}>
                        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="border-t border-slate-200 bg-white">
                    <table className="w-full text-sm text-left text-slate-600">
                         <thead className="text-xs text-slate-500 uppercase tracking-wider">
                            <tr>
                                <th className="px-4 py-2 font-medium">Patient / Case ID</th>
                                <th className="px-4 py-2 font-medium">Study</th>
                                <th className="px-4 py-2 font-medium">Completed Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studies.map(study => (
                                <tr key={study.orderId} className="border-b border-slate-100 last:border-b-0">
                                    <td className="px-4 py-3">
                                        <div className="font-medium text-slate-800">{study.patientName}</div>
                                        <div className="text-xs text-slate-400 font-mono">{study.orderId}</div>
                                    </td>
                                    <td className="px-4 py-3">{study.study} ({study.modality})</td>
                                    <td className="px-4 py-3 text-xs">{study.completedDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

// --- CHILD COMPONENT: PaymentDetails ---
const PaymentDetails = ({ doctorName, paymentData, onGenerateInvoice }) => {
    if (!doctorName || !paymentData) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 p-6 bg-slate-50/50">
                <DollarSign className="w-16 h-16 mb-4 text-slate-300" />
                <h3 className="text-xl font-semibold text-slate-700">Select a Doctor</h3>
                <p className="mt-1">Choose a doctor to view their payment history and generate invoices.</p>
            </div>
        );
    }
    
    const totalPayout = Object.values(paymentData).reduce((sum, month) => sum + month.totalPayout, 0);
    const totalCases = Object.values(paymentData).reduce((sum, month) => sum + month.caseCount, 0);
    const sortedMonths = Object.keys(paymentData).sort((a, b) => new Date(b) - new Date(a));

    return (
        <div className="p-6 h-full overflow-y-auto">
            <header className="pb-4 border-b border-slate-200 mb-6">
                <h2 className="text-2xl font-bold text-slate-800">{doctorName}</h2>
                <p className="text-slate-500">Payment History & Invoice Generation</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-800">Total Payout (All Time)</h3>
                    <p className="text-3xl font-bold text-green-700 mt-1">{formatCurrency(totalPayout)}</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800">Total Cases Completed</h3>
                    <p className="text-3xl font-bold text-blue-700 mt-1">{totalCases}</p>
                </div>
            </div>
            
            <h3 className="text-lg font-semibold text-slate-700 mb-4">Payouts by Month</h3>
            <div>
                {sortedMonths.map(month => (
                    <MonthlyPayoutAccordion
                        key={month}
                        month={month}
                        studies={paymentData[month].studies}
                        totalPayout={paymentData[month].totalPayout}
                        onGenerateInvoice={() => onGenerateInvoice(doctorName, month, paymentData[month])}
                    />
                ))}
            </div>
        </div>
    );
};

// --- CHILD COMPONENT: DoctorList ---
const DoctorList = ({ doctors, selectedDoctor, onSelect }) => (
    <div className="flex flex-col h-full bg-slate-50/50 border-r border-slate-200">
        <div className="p-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2"><UserCheck /> Doctors</h2>
        </div>
        <div className="overflow-y-auto flex-1">
            {doctors.map(doc => (
                <button
                    key={doc.name}
                    onClick={() => onSelect(doc.name)}
                    className={`w-full text-left p-4 border-b border-slate-200 hover:bg-blue-100 transition-colors duration-150 ${selectedDoctor === doc.name ? 'bg-blue-100 border-l-4 border-blue-500 font-semibold' : ''}`}
                >
                    <p className="text-slate-900">{doc.name}</p>
                    <div className="text-sm text-slate-500 mt-1 flex justify-between">
                        <span>{doc.totalCases} Cases</span>
                        <span className="font-medium text-green-600">{formatCurrency(doc.totalPayout)}</span>
                    </div>
                </button>
            ))}
        </div>
    </div>
);

// --- PARENT COMPONENT: The Main Page ---
const DoctorPaymentHistoryPage = () => {
    const [selectedDoctorName, setSelectedDoctorName] = useState(null);
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
    const [selectedInvoiceData, setSelectedInvoiceData] = useState(null);

    const { paymentDataByDoctor, doctorSummaries } = useMemo(() => {
        const data = {};
        completedStudiesData.forEach(study => {
            const doctor = study.assignedTo;
            const completedDate = new Date(study.completedDate.replace(/(\d{1,2} \w+ \d{4}) (\d{2}:\d{2})([AP]M)/, '$1 $2 $3 UTC'));
            const monthKey = completedDate.toLocaleString('en-GB', { month: 'long', year: 'numeric' });

            if (!data[doctor]) data[doctor] = {};
            if (!data[doctor][monthKey]) {
                data[doctor][monthKey] = { studies: [], caseCount: 0, totalPayout: 0 };
            }
            data[doctor][monthKey].studies.push(study);
            data[doctor][monthKey].caseCount += 1;
            data[doctor][monthKey].totalPayout += PAYMENT_PER_CASE;
        });
        
        const summaries = [...new Set(completedStudiesData.map(s => s.assignedTo))].map(name => {
            const docData = data[name] || {};
            const totalCases = Object.values(docData).reduce((sum, month) => sum + month.caseCount, 0);
            return { name, totalCases, totalPayout: totalCases * PAYMENT_PER_CASE };
        }).sort((a,b) => b.totalPayout - a.totalPayout);

        return { paymentDataByDoctor: data, doctorSummaries: summaries };
    }, []);

    const handleGenerateInvoice = (doctorName, month, monthData) => {
        const subtotal = monthData.totalPayout;
        const gstAmount = subtotal * GST_RATE;
        const total = subtotal + gstAmount;
        const docInitials = doctorName.split(' ').map(n => n[0]).join('');
        const monthShort = new Date(month).toLocaleString('default', { month: 'short' }).toUpperCase();
        const year = new Date(month).getFullYear();
        
        setSelectedInvoiceData({
            invoiceId: `INV-${year}${monthShort}-${docInitials}`,
            doctorName,
            month,
            studies: monthData.studies,
            subtotal,
            gstAmount,
            total,
        });
        setIsInvoiceModalOpen(true);
    };

    return (
        <>
            <div className="min-h-screen bg-white font-sans">
                <div className="max-w-screen-2xl mx-auto">
                    <header className="p-4 sm:p-6 border-b border-slate-200">
                        <h1 className="text-3xl font-bold text-slate-800">Doctor Payment History</h1>
                        <p className="text-slate-500 mt-1">Verify monthly payouts and generate invoices for completed cases.</p>
                    </header>

                    <div className="flex" style={{ height: 'calc(100vh - 97px)'}}>
                        <div className="w-full md:w-1/3 lg:w-1/4">
                            <DoctorList
                                doctors={doctorSummaries}
                                selectedDoctor={selectedDoctorName}
                                onSelect={setSelectedDoctorName}
                            />
                        </div>

                        <div className="flex-1 w-full md:w-2/3 lg:w-3/4 bg-white">
                            <PaymentDetails
                                doctorName={selectedDoctorName}
                                paymentData={selectedDoctorName ? paymentDataByDoctor[selectedDoctorName] : null}
                                onGenerateInvoice={handleGenerateInvoice}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <InvoiceModal
                isOpen={isInvoiceModalOpen}
                onClose={() => setIsInvoiceModalOpen(false)}
                invoiceData={selectedInvoiceData}
            />
        </>
    );
};

export default DoctorPaymentHistoryPage;
