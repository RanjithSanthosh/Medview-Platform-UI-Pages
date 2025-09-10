import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search, Building, DollarSign, Library, FileText, Hash } from "lucide-react";

// --- MOCK DATA (In a real app, this would come from an API) ---
const MOCK_INSTITUTIONS = [
    { id: "INST-A4B1C9", institutionName: "City General Hospital", city: "New York" },
    { id: "INST-D8E2F7", institutionName: "Valley Imaging Clinic", city: "San Francisco" },
    { id: "INST-G5H3I1", institutionName: "Southside Medical Group", city: "Miami" },
    { id: "INST-J2K9L4", institutionName: "Northstar Diagnostics", city: "Chicago" },
];

const MOCK_RECEIPTS = [
    { id: "REC-001", institutionId: "INST-A4B1C9", scanType: "CT", caseCount: 15, amount: 7500, receivedDate: "2025-09-01" },
    { id: "REC-002", institutionId: "INST-A4B1C9", scanType: "MRI", caseCount: 10, amount: 12000, receivedDate: "2025-09-01" },
    { id: "REC-003", institutionId: "INST-D8E2F7", scanType: "CBCT", caseCount: 25, amount: 11250, receivedDate: "2025-09-02" },
    { id: "REC-004", institutionId: "INST-A4B1C9", scanType: "US", caseCount: 30, amount: 9000, receivedDate: "2025-09-03" },
    { id: "REC-005", institutionId: "INST-G5H3I1", scanType: "CT", caseCount: 12, amount: 6000, receivedDate: "2025-09-04" },
    { id: "REC-006", institutionId: "INST-D8E2F7", scanType: "CT", caseCount: 5, amount: 2500, receivedDate: "2025-09-05" },
    { id: "REC-007", institutionId: "INST-J2K9L4", scanType: "MRI", caseCount: 22, amount: 26400, receivedDate: "2025-09-08" },
];

// --- CHILD COMPONENT: InstitutionList ---
const InstitutionList = ({ institutions, selectedId, onSelect, searchTerm, onSearchChange }) => (
    <div className="flex flex-col h-full bg-slate-50">
        <div className="p-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">Institutions</h2>
            <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                    placeholder="Search institutions..."
                    value={searchTerm}
                    onChange={onSearchChange}
                    className="pl-9"
                />
            </div>
        </div>
        <div className="overflow-y-auto flex-1">
            {institutions.length > 0 ? (
                institutions.map(inst => (
                    <button
                        key={inst.id}
                        onClick={() => onSelect(inst.id)}
                        className={`w-full text-left p-4 border-b border-slate-200 hover:bg-sky-100 transition-colors duration-150 ${selectedId === inst.id ? 'bg-sky-100 border-l-4 border-sky-500' : ''}`}
                    >
                        <p className="font-semibold text-slate-900">{inst.institutionName}</p>
                        <p className="text-sm text-slate-500">{inst.city}</p>
                    </button>
                ))
            ) : (
                <p className="p-4 text-slate-500">No institutions found.</p>
            )}
        </div>
    </div>
);

// --- CHILD COMPONENT: ReceiptDetails ---
const ReceiptDetails = ({ institution, receipts }) => {
    if (!institution) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 bg-white p-6">
                <Library className="w-16 h-16 mb-4 text-slate-300" />
                <h3 className="text-xl font-semibold">Select an Institution</h3>
                <p className="mt-1">Choose an institution from the list to view their cash receipt details.</p>
            </div>
        );
    }
    
    const totalReceived = receipts.reduce((sum, receipt) => sum + receipt.amount, 0);

    return (
        <div className="p-6 bg-white overflow-y-auto h-full">
            <div className="border-b pb-4 mb-6">
                <h2 className="text-2xl font-bold text-slate-800">{institution.institutionName}</h2>
                <p className="text-slate-500">Cash Receipt Summary</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-slate-700">Total Received</h3>
                <p className="text-3xl font-bold text-green-600 mt-1">
                    {totalReceived.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                </p>
            </div>
            
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Receipt Breakdown</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"><FileText className="inline-block w-4 h-4 mr-2" />Scan Type</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"><Hash className="inline-block w-4 h-4 mr-2" />Cases</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"><DollarSign className="inline-block w-4 h-4 mr-2" />Amount</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {receipts.length > 0 ? receipts.map(receipt => (
                            <tr key={receipt.id}>
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{receipt.scanType}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">{receipt.caseCount}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">{receipt.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">{new Date(receipt.receivedDate).toLocaleDateString('en-GB')}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" className="text-center py-10 text-slate-500">No receipts found for this institution.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


// --- PARENT COMPONENT: The Main Page ---
const InstitutionReceiptsPage = () => {
    // --- STATE MANAGEMENT ---
    const [institutions] = useState(MOCK_INSTITUTIONS);
    const [receipts] = useState(MOCK_RECEIPTS);
    const [selectedInstitutionId, setSelectedInstitutionId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // --- DERIVED STATE & LOGIC ---
    // Memoization prevents re-calculating on every render, enhancing performance.
    const filteredInstitutions = useMemo(() =>
        institutions.filter(inst =>
            inst.institutionName.toLowerCase().includes(searchTerm.toLowerCase())
        ), [institutions, searchTerm]);

    const selectedInstitution = useMemo(() =>
        institutions.find(inst => inst.id === selectedInstitutionId),
        [institutions, selectedInstitutionId]);
        
    const receiptsForSelectedInstitution = useMemo(() =>
        receipts.filter(rec => rec.institutionId === selectedInstitutionId),
        [receipts, selectedInstitutionId]);

    // --- HANDLERS ---
    const handleSearchChange = (event) => setSearchTerm(event.target.value);
    const handleSelectInstitution = (id) => setSelectedInstitutionId(id);

    return (
        <div className="w-full h-screen bg-slate-100 flex flex-col">
            <header className="p-4 bg-white border-b border-slate-200">
                <h1 className="text-xl font-bold text-slate-800">Institution Cash Receipts</h1>
            </header>
            <main className="flex-1 flex overflow-hidden">
                {/* Left Panel: Master List */}
                <div className="w-full md:w-1/3 lg:w-1/4 border-r border-slate-200">
                    <InstitutionList
                        institutions={filteredInstitutions}
                        selectedId={selectedInstitutionId}
                        onSelect={handleSelectInstitution}
                        searchTerm={searchTerm}
                        onSearchChange={handleSearchChange}
                    />
                </div>
                {/* Right Panel: Detail View */}
                <div className="flex-1 w-full md:w-2/3 lg:w-3/4">
                    <ReceiptDetails
                        institution={selectedInstitution}
                        receipts={receiptsForSelectedInstitution}
                    />
                </div>
            </main>
        </div>
    );
};

export default InstitutionReceiptsPage;