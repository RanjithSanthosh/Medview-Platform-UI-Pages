import React from 'react';
import { CheckCircle, FileText, UserCheck } from 'lucide-react';

// --- Assigned Case History Component ---

const doctorNames = [ "Dr Gopinath", "Dr Prem Kumar", "Dr Suresh", "Dr Priya", "Dr Anitha" ];

const completedStudiesData = [
    { orderId: "34e27dd850fa", patientName: "MALLA BINDU", gender: "F", study: "Extremities (MSK)", modality: "MRI", assignedTo: "Dr Gopinath", assignedDate: "21 March 2017 14:17PM", completedDate: "21 March 2017 18:44PM", priority: "ROUTINE", isAssigned: true },
    { orderId: "E2138ae25e8a", patientName: "JINCY", gender: "F", study: "Extremities (MSK)", modality: "MRI", assignedTo: "Dr Prem Kumar", assignedDate: "21 March 2017 14:44PM", completedDate: "21 March 2017 15:45PM", priority: "URGENT", isAssigned: true },
    { orderId: "Baa41f844d57", patientName: "RAM PRASAD 45/M", gender: "M", study: "Chest", modality: "CT", assignedTo: "Dr Suresh", assignedDate: "20 March 2017 18:54PM", completedDate: "20 March 2017 19:28PM", priority: "URGENT", isAssigned: true },
    { orderId: "Ec3c488b60ee", patientName: "CHENDIL V 39/YRS/M", gender: "M", study: "Brain (Plain Study)", modality: "CT", assignedTo: "Dr Priya", assignedDate: "14 March 2017 15:47PM", completedDate: "14 March 2017 17:08PM", priority: "URGENT", isAssigned: true },
    { orderId: "039d53f712ea", patientName: "NAGARAJ 23 YRS/M", gender: "M", study: "Neck (Contrast)", modality: "CT", assignedTo: "Dr Anitha", assignedDate: "8 March 2017 13:23PM", completedDate: "8 March 2017 21:34PM", priority: "ROUTINE", isAssigned: true },
    { orderId: "Ce4aa2a81910", patientName: "MR SHIVU 44YRS", gender: "M", study: "Brain (Plain Study)", modality: "CT", assignedTo: "Dr Gopinath", assignedDate: "8 March 2017 12:24PM", completedDate: "8 March 2017 19:40PM", priority: "ROUTINE", isAssigned: true },
];

const CaseHistoryDashboard = () => {
    const [studies] = React.useState(completedStudiesData);
    const [filterDoctor, setFilterDoctor] = React.useState('all');
    const [filterPriority, setFilterPriority] = React.useState('all');

    const filteredStudies = React.useMemo(() => {
        return studies
            .filter(s => filterDoctor === 'all' || s.assignedTo === filterDoctor)
            .filter(s => filterPriority === 'all' || s.priority === filterPriority)
    }, [studies, filterDoctor, filterPriority]);

    const PriorityBadge = ({ priority }) => {
        const priorityStyles = {
            'ROUTINE': 'bg-blue-100 text-blue-800 border-blue-200',
            'NORMAL': 'bg-yellow-100 text-yellow-800 border-yellow-200',
            'URGENT': 'bg-red-100 text-red-800 border-red-200',
        };
        return <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${priorityStyles[priority]}`}>{priority}</span>;
    };
    
    return (
        <div className="min-h-screen bg-gray-50/50 font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                 <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Assigned Case History</h1>
                    <p className="text-gray-500 mt-1">Review historical data of cases assigned to doctors.</p>
                </header>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
                    <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-gray-200 bg-gray-50/50">
                        <div/>
                        <div className="flex items-center gap-4">
                            <select value={filterDoctor} onChange={e => setFilterDoctor(e.target.value)} className="border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 transition text-sm bg-white">
                                <option value="all">All Doctors</option>
                                {doctorNames.map(doc => <option key={doc} value={doc}>{doc}</option>)}
                            </select>
                            <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)} className="border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 transition text-sm bg-white">
                                <option value="all">All Priorities</option>
                                <option value="ROUTINE">Routine</option>
                                <option value="NORMAL">Normal</option>
                                <option value="URGENT">Urgent</option>
                            </select>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600">
                            <thead className="bg-gray-100 text-xs text-gray-700 uppercase tracking-wider">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Patient / Case Details</th>
                                    <th scope="col" className="px-6 py-3">Study / Modality</th>
                                    <th scope="col" className="px-6 py-3">Assigned To</th>
                                    <th scope="col" className="px-6 py-3">Dates</th>
                                    <th scope="col" className="px-6 py-3 text-center">Priority</th>
                                    <th scope="col" className="px-6 py-3 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudies.map(study => (
                                    <tr key={study.orderId} className={`bg-white border-b hover:bg-gray-50 transition ${study.priority === 'URGENT' ? 'bg-red-50/50' : ''}`}>
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-gray-800">{study.patientName} ({study.gender})</div>
                                            <div className="text-gray-500 text-xs">CASE: {study.orderId}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-800">{study.study}</div>
                                            <div className="text-gray-500 text-xs">{study.modality}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <UserCheck className="h-4 w-4 text-gray-500"/>
                                                <span className="font-medium text-gray-700">{study.assignedTo}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs">
                                            <div><span className="font-semibold text-gray-600">Assigned:</span> {study.assignedDate}</div>
                                            <div><span className="font-semibold text-gray-600">Completed:</span> {study.completedDate}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center"><PriorityBadge priority={study.priority} /></td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 border border-green-200">
                                                <CheckCircle className="h-3 w-3" />
                                                Completed
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredStudies.length === 0 && (
                            <div className="text-center py-16">
                                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-lg font-medium text-gray-900">No Case History Found</h3>
                                <p className="mt-1 text-sm text-gray-500">Try adjusting your filter criteria.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CaseHistoryDashboard;
