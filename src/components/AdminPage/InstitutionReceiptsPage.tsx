import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search, Library, FileText, Hash, DollarSign, Calendar, ArrowLeft, Printer } from "lucide-react";

// --- TYPE DEFINITIONS ---
interface Institution {
    id: string;
    institutionName: string;
    city: string;
}

interface Receipt {
    id: string;
    institutionId: string;
    scanType: string;
    caseCount: number;
    amount: number;
    receivedDate: string;
}

interface MonthlyData {
    receipts: Receipt[];
    totalAmount: number;
    totalCases: number;
}

// --- Prop Types for Components ---
// (These are good practice but kept brief for clarity)
interface InstitutionListProps { institutions: Institution[]; selectedId: string | null; onSelect: (id: string) => void; searchTerm: string; onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void; }
interface PrintableInvoiceProps { institution: Institution; month: string; monthData: MonthlyData; }
interface InvoiceViewProps { institution: Institution; month: string; monthData: MonthlyData; onBack: () => void; }
interface ReceiptDetailsProps { institution: Institution | undefined; receipts: Receipt[]; monthlyData: Record<string, MonthlyData>; onSelectMonth: (month: string) => void; selectedMonth: string | null; onBackToSummary: () => void; }


// --- MOCK DATA ---
const MOCK_INSTITUTIONS: Institution[] = [
    { id: "INST-A4B1C9", institutionName: "City General Hospital", city: "New York" },
    { id: "INST-D8E2F7", institutionName: "Valley Imaging Clinic", city: "San Francisco" },
    { id: "INST-G5H3I1", institutionName: "Southside Medical Group", city: "Miami" },
    { id: "INST-J2K9L4", institutionName: "Northstar Diagnostics", city: "Chicago" },
];

const MOCK_RECEIPTS: Receipt[] = [
    { id: "REC-001", institutionId: "INST-A4B1C9", scanType: "CT", caseCount: 15, amount: 7500, receivedDate: "2025-09-01" },
    { id: "REC-002", institutionId: "INST-A4B1C9", scanType: "MRI", caseCount: 10, amount: 12000, receivedDate: "2025-09-01" },
    { id: "REC-003", institutionId: "INST-D8E2F7", scanType: "CBCT", caseCount: 25, amount: 11250, receivedDate: "2025-09-02" },
    { id: "REC-004", institutionId: "INST-A4B1C9", scanType: "US", caseCount: 30, amount: 9000, receivedDate: "2025-09-03" },
    { id: "REC-005", institutionId: "INST-G5H3I1", scanType: "CT", caseCount: 12, amount: 6000, receivedDate: "2025-09-04" },
    { id: "REC-006", institutionId: "INST-D8E2F7", scanType: "CT", caseCount: 5, amount: 2500, receivedDate: "2025-09-05" },
    { id: "REC-007", institutionId: "INST-J2K9L4", scanType: "MRI", caseCount: 22, amount: 26400, receivedDate: "2025-09-08" },
    { id: "REC-008", institutionId: "INST-A4B1C9", scanType: "CT", caseCount: 20, amount: 10000, receivedDate: "2025-08-15" },
    { id: "REC-009", institutionId: "INST-A4B1C9", scanType: "X-RAY", caseCount: 50, amount: 7500, receivedDate: "2025-08-20" },
];

// --- CHILD COMPONENT: InstitutionList ---
const InstitutionList = ({ institutions, selectedId, onSelect, searchTerm, onSearchChange }: InstitutionListProps) => (
    <div className="flex flex-col h-full bg-slate-50">
        <div className="p-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">Institutions</h2>
            <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input placeholder="Search institutions..." value={searchTerm} onChange={onSearchChange} className="pl-9" />
            </div>
        </div>
        <div className="overflow-y-auto flex-1">
            {institutions.length > 0 ? (
                institutions.map(inst => (
                    <button key={inst.id} onClick={() => onSelect(inst.id)} className={`w-full text-left p-4 border-b border-slate-200 hover:bg-sky-100 transition-colors duration-150 ${selectedId === inst.id ? 'bg-sky-100 border-l-4 border-sky-500' : ''}`}>
                        <p className="font-semibold text-slate-900">{inst.institutionName}</p>
                        <p className="text-sm text-slate-500">{inst.city}</p>
                    </button>
                ))
            ) : (<p className="p-4 text-slate-500">No institutions found.</p>)}
        </div>
    </div>
);

// --- Printable Invoice Component ---
const PrintableInvoice = ({ institution, month, monthData }: PrintableInvoiceProps) => {
    const invoiceDate = new Date(`${month}-01T12:00:00Z`);
    const formattedMonth = invoiceDate.toLocaleString('en-IN', { month: 'long', year: 'numeric' });

    return (
        // This div is our designated printable area
        <div className="p-4 printable-area">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Invoice</h2>
                    <p className="text-slate-500">For {institution.institutionName}</p>
                    <p className="text-sm font-semibold text-sky-600 mt-1">{formattedMonth}</p>
                </div>
                <div className="text-right">
                    <p className="text-slate-500 text-sm">Invoice ID</p>
                    <p className="font-mono text-slate-700">{`INV-${month.replace('-', '')}-${institution.id.slice(-4)}`}</p>
                    <p className="text-slate-500 text-sm mt-2">Issue Date</p>
                    <p className="font-mono text-slate-700">{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                </div>
            </div>
        
            <div className="overflow-x-auto border rounded-lg">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"><FileText className="inline-block w-4 h-4 mr-2" />Scan Type</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"><Hash className="inline-block w-4 h-4 mr-2" />Cases</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"><Calendar className="inline-block w-4 h-4 mr-2" />Date</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider"><DollarSign className="inline-block w-4 h-4 mr-2" />Amount</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {monthData.receipts.map(receipt => (
                            <tr key={receipt.id}>
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{receipt.scanType}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">{receipt.caseCount}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">{new Date(receipt.receivedDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-800 text-right font-mono">{receipt.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="bg-slate-100">
                        <tr>
                            <td colSpan={2} className="px-4 py-4 text-sm font-semibold text-slate-800">Total Cases: {monthData.totalCases}</td>
                            <td className="px-4 py-4 text-right text-sm font-semibold text-slate-800">Month Total:</td>
                            <td className="px-4 py-4 text-right text-lg font-bold text-green-700 font-mono">
                                {monthData.totalAmount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

// --- CHILD COMPONENT: InvoiceView ---
const InvoiceView = ({ institution, month, monthData, onBack }: InvoiceViewProps) => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="p-6 md:p-8 bg-white h-full overflow-y-auto">
            {/* STEP 1: ADD "no-print" CLASS TO THE BUTTON CONTAINER */}
            <div className="flex justify-between items-center border-b pb-4 mb-6 no-print">
                <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 font-semibold">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Summary
                </button>
                <button onClick={handlePrint} className="bg-sky-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-700 transition-colors flex items-center gap-2">
                    <Printer className="w-4 h-4" />
                    Print / Download
                </button>
            </div>
            <PrintableInvoice institution={institution} month={month} monthData={monthData} />
        </div>
    );
};

// --- CHILD COMPONENT: ReceiptDetails ---
const ReceiptDetails = ({ institution, receipts, monthlyData, onSelectMonth, selectedMonth, onBackToSummary }: ReceiptDetailsProps) => {
    if (selectedMonth && monthlyData[selectedMonth] && institution) {
        return <InvoiceView institution={institution} month={selectedMonth} monthData={monthlyData[selectedMonth]} onBack={onBackToSummary} />;
    }
    
    if (!institution) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 bg-white p-6">
                <Library className="w-16 h-16 mb-4 text-slate-300" />
                <h3 className="text-xl font-semibold">Select an Institution</h3>
                <p className="mt-1">Choose an institution to view their cash receipts.</p>
            </div>
        );
    }
    
    const totalReceived = receipts.reduce((sum, receipt) => sum + receipt.amount, 0);
    const availableMonths = Object.keys(monthlyData).sort().reverse();

    return (
        <div className="p-6 bg-white overflow-y-auto h-full">
            <div className="border-b pb-4 mb-6">
                <h2 className="text-2xl font-bold text-slate-800">{institution.institutionName}</h2>
                <p className="text-slate-500">Cash Receipt Summary</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-slate-700">Total Received (All Time)</h3>
                <p className="text-3xl font-bold text-green-600 mt-1">{totalReceived.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
            </div>
            <div className="border-t pt-6 mb-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Generate Monthly Invoice</h3>
                {availableMonths.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                       {availableMonths.map(month => {
                           const monthDate = new Date(`${month}-01T12:00:00Z`);
                           const formattedMonth = monthDate.toLocaleString('en-IN', {month: 'long', year: 'numeric'});
                           return (
                               <button key={month} onClick={() => onSelectMonth(month)} className="p-3 bg-white border border-slate-300 rounded-lg text-left hover:border-sky-500 hover:bg-sky-50 transition-all">
                                    <p className="font-semibold text-slate-800">{formattedMonth}</p>
                                    <p className="text-sm text-green-700 font-mono">{monthlyData[month].totalAmount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 })}</p>
                               </button>
                           )
                       })}
                    </div>
                ) : (<p className="text-slate-500">No monthly data available to generate an invoice.</p>)}
            </div>
        </div>
    );
};

// --- PARENT COMPONENT: The Main Page ---
const InstitutionReceiptsPage = () => {
    const [institutions] = useState<Institution[]>(MOCK_INSTITUTIONS);
    const [receipts] = useState<Receipt[]>(MOCK_RECEIPTS);
    const [selectedInstitutionId, setSelectedInstitutionId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

    const filteredInstitutions = useMemo(() => institutions.filter(inst => inst.institutionName.toLowerCase().includes(searchTerm.toLowerCase())), [institutions, searchTerm]);
    const selectedInstitution = useMemo(() => institutions.find(inst => inst.id === selectedInstitutionId), [institutions, selectedInstitutionId]);
    const receiptsForSelectedInstitution = useMemo(() => receipts.filter(rec => rec.institutionId === selectedInstitutionId), [receipts, selectedInstitutionId]);

    const monthlyAggregatedData = useMemo(() => {
        if (!receiptsForSelectedInstitution) return {};
        return receiptsForSelectedInstitution.reduce((acc, receipt) => {
            const monthKey = receipt.receivedDate.substring(0, 7); // "YYYY-MM"
            if (!acc[monthKey]) { acc[monthKey] = { receipts: [], totalAmount: 0, totalCases: 0 }; }
            acc[monthKey].receipts.push(receipt);
            acc[monthKey].totalAmount += receipt.amount;
            acc[monthKey].totalCases += receipt.caseCount;
            return acc;
        }, {} as Record<string, MonthlyData>);
    }, [receiptsForSelectedInstitution]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value);
    const handleSelectInstitution = (id: string) => { setSelectedInstitutionId(id); setSelectedMonth(null); };
    const handleSelectMonth = (month: string) => setSelectedMonth(month);
    const handleBackToSummary = () => setSelectedMonth(null);

    return (
        <div className="w-full h-screen bg-slate-100 flex flex-col">
            {/* STEP 2: ADD CSS STYLES FOR PRINTING. This is the magic. */}
            <style type="text/css">
                {`
                    @media print {
                        body * {
                            visibility: hidden;
                        }
                        .printable-area, .printable-area * {
                            visibility: visible;
                        }
                        .printable-area {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                        }
                        .no-print {
                            display: none;
                        }
                    }
                `}
            </style>
            
            {/* STEP 3: ADD "no-print" CLASS TO HEADER AND SIDEBAR */}
            <header className="p-4 bg-white border-b border-slate-200 no-print">
                <h1 className="text-xl font-bold text-slate-800">Institution Cash Receipts</h1>
            </header>
            <main className="flex-1 flex overflow-hidden">
                <div className="w-full md:w-1/3 lg:w-1/4 border-r border-slate-200 no-print">
                    <InstitutionList institutions={filteredInstitutions} selectedId={selectedInstitutionId} onSelect={handleSelectInstitution} searchTerm={searchTerm} onSearchChange={handleSearchChange} />
                </div>
                <div className="flex-1 w-full md:w-2/3 lg:w-3/4">
                    <ReceiptDetails institution={selectedInstitution} receipts={receiptsForSelectedInstitution} monthlyData={monthlyAggregatedData} selectedMonth={selectedMonth} onSelectMonth={handleSelectMonth} onBackToSummary={handleBackToSummary} />
                </div>
            </main>
        </div>
    );
};

export default InstitutionReceiptsPage;