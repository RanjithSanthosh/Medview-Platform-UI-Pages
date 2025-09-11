import React, { useState, useMemo, useEffect } from 'react';
import {
    User, Mail, Phone, Clock, Calendar, ShieldCheck, ShieldOff, BarChart2,
    Users, Search, Wrench, Scan, Cpu, CheckSquare, ListTodo, LogIn, LogOut
} from 'lucide-react';

// --- MOCK DATA ---
// Data sources are designed to reflect a technician's operational role.
const technicianProfileData = [
    { id: 'TECH-01', firstName: 'Rajesh', lastName: 'Kumar', email: 'rajesh.k@email.com', phone: '+91 9123456780', joinDate: '2019-08-10', status: 'Active', profileImageUrl: 'https://placehold.co/100x100/E2E8F0/475569?text=RK', specializations: ['CT', 'MRI'], assignedCenter: 'Main Hospital Wing', shift: { start: '07:00 AM', end: '03:00 PM', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] } },
    { id: 'TECH-02', firstName: 'Sita', lastName: 'Nair', email: 'sita.nair@email.com', phone: '+91 9123456781', joinDate: '2021-03-25', status: 'Active', profileImageUrl: 'https://placehold.co/100x100/E2E8F0/475569?text=SN', specializations: ['US', 'CR/DX'], assignedCenter: 'Outpatient Clinic', shift: { start: '09:00 AM', end: '05:00 PM', days: ['Mon', 'Tue', 'Wed', 'Sat', 'Sun'] } },
    { id: 'TECH-03', firstName: 'Arjun', lastName: 'Singh', email: 'arjun.singh@email.com', phone: '+91 9123456782', joinDate: '2020-01-15', status: 'Inactive', profileImageUrl: 'https://placehold.co/100x100/E2E8F0/475569?text=AS', specializations: ['MRI'], assignedCenter: 'Main Hospital Wing', shift: { start: '02:00 PM', end: '10:00 PM', days: ['Wed', 'Thu', 'Fri'] } },
    { id: 'TECH-04', firstName: 'Meera', lastName: 'Joshi', email: 'meera.joshi@email.com', phone: '+91 9123456783', joinDate: '2022-06-01', status: 'Active', profileImageUrl: 'https://placehold.co/100x100/E2E8F0/475569?text=MJ', specializations: ['CT'], assignedCenter: 'Emergency Department', shift: { start: '10:00 PM', end: '06:00 AM', days: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'] } }
];
const scanEventsData = [
    { scanId: "SCAN-101", technicianId: "TECH-01", patientName: "Patient A", modality: "CT", machine: "Siemens CT 1", scanStart: "2025-09-11T08:05:00Z", scanEnd: "2025-09-11T08:17:00Z" },
    { scanId: "SCAN-102", technicianId: "TECH-02", patientName: "Patient B", modality: "US", machine: "GE Ultrasound 2", scanStart: "2025-09-11T09:15:00Z", scanEnd: "2025-09-11T09:35:00Z" },
    { scanId: "SCAN-103", technicianId: "TECH-01", patientName: "Patient C", modality: "MRI", machine: "Philips MRI 1.5T", scanStart: "2025-09-11T09:40:00Z", scanEnd: "2025-09-11T10:15:00Z" },
    { scanId: "SCAN-104", technicianId: "TECH-01", patientName: "Patient D", modality: "CT", machine: "Siemens CT 1", scanStart: "2025-09-10T14:30:00Z", scanEnd: "2025-09-10T14:41:00Z" },
    { scanId: "SCAN-105", technicianId: "TECH-02", patientName: "Patient E", modality: "CR/DX", machine: "X-Ray Room 3", scanStart: "2025-09-10T11:00:00Z", scanEnd: "2025-09-10T11:07:00Z" },
];
const technicianActivityLogs = [
    { technicianId: 'TECH-01', type: 'login', timestamp: '2025-09-11T01:31:00Z' }, // 7:01 AM IST
    { technicianId: 'TECH-01', type: 'logout', timestamp: '2025-09-11T07:00:00Z' }, // 12:30 PM IST
    { technicianId: 'TECH-02', type: 'login', timestamp: '2025-09-11T03:35:00Z' }, // 9:05 AM IST - Active session
    { technicianId: 'TECH-04', type: 'login', timestamp: '2025-09-10T16:30:00Z' }, // 10:00 PM IST
    { technicianId: 'TECH-04', type: 'logout', timestamp: '2025-09-11T00:35:00Z' }, // 6:05 AM IST
];

// --- UTILITY & HELPER COMPONENTS ---
const Card = ({ children, className = '' }) => <div className={`bg-white rounded-xl shadow-sm border border-slate-200 ${className}`}>{children}</div>;
const StatCard = ({ icon, label, value, subValue, color }) => (
     <Card className="p-4 flex flex-col">
        <div className="flex justify-between items-start">
            <p className="text-sm text-slate-500">{label}</p>
            <div className={`p-2 rounded-full inline-block ${color.bg}`}>{React.cloneElement(icon, { className: `h-5 w-5 ${color.text}` })}</div>
        </div>
        <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
        {subValue && <p className="text-xs text-slate-400 mt-auto pt-1">{subValue}</p>}
    </Card>
);
const StatusBadge = ({ status, className='' }) => {
    const active = status === 'Active';
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${active ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'} ${className}`}>
            {active ? <ShieldCheck className="h-3 w-3" /> : <ShieldOff className="h-3 w-3" />}
            {status}
        </span>
    );
};

// --- DATA PROCESSING LOGIC ---
const parseShiftTime = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier.toUpperCase() === 'PM' && hours < 12) hours += 12;
    if (modifier.toUpperCase() === 'AM' && hours === 12) hours = 0;
    return hours * 100 + minutes;
};
const getDayString = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });
};

const useTechnicianAnalytics = () => useMemo(() => {
    // UPDATED: Time is now precisely 2:55 PM IST (09:25 UTC) on Thursday.
    const MOCK_CURRENT_TIME = new Date('2025-09-11T09:25:00Z'); 

    return technicianProfileData.map(tech => {
        const fullName = `${tech.firstName} ${tech.lastName}`;
        const scans = scanEventsData.filter(s => s.technicianId === tech.id);
        const todayScans = scans.filter(s => new Date(s.scanStart).toDateString() === MOCK_CURRENT_TIME.toDateString());

        const avgScanMinutes = scans.length > 0 ? scans.reduce((acc, s) => acc + (new Date(s.scanEnd) - new Date(s.scanStart)), 0) / (scans.length * 60000) : 0;
        
        const todayLogs = technicianActivityLogs.filter(log => 
            log.technicianId === tech.id && 
            new Date(log.timestamp).toDateString() === MOCK_CURRENT_TIME.toDateString()
        ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        // --- REFINED LOGIC FOR "ACTIVE" STATUS ---

        // 1. Is the technician currently logged in?
        const lastEvent = todayLogs[todayLogs.length - 1];
        const isLoggedIn = lastEvent && lastEvent.type === 'login';

        // 2. Is the technician scheduled to be on shift right now?
        const currentDayStr = getDayString(MOCK_CURRENT_TIME);
        const currentTime = MOCK_CURRENT_TIME.getUTCHours() * 100 + MOCK_CURRENT_TIME.getUTCMinutes();
        const shiftStartTime = parseShiftTime(tech.shift.start);
        const shiftEndTime = parseShiftTime(tech.shift.end);

        let isOnShift;
        if (shiftStartTime > shiftEndTime) { // Handles overnight shifts
            isOnShift = tech.status === 'Active' && tech.shift.days.includes(currentDayStr) && (currentTime >= shiftStartTime || currentTime <= shiftEndTime);
        } else { // Handles normal day shifts
            isOnShift = tech.status === 'Active' && tech.shift.days.includes(currentDayStr) && currentTime >= shiftStartTime && currentTime <= shiftEndTime;
        }

        // 3. A technician is "Actively Working" only if BOTH conditions are true.
        const isActivelyWorking = isOnShift && isLoggedIn;

        return {
            ...tech,
            fullName,
            totalScans: scans.length,
            todayScansCount: todayScans.length,
            avgScanMinutes,
            isOnShift, 
            isLoggedIn,
            isActivelyWorking, // This new property drives the green dot.
            activityToday: todayLogs,
        };
    });
}, []);

// --- CHILD COMPONENTS ---
const TechnicianList = ({ technicians, onSelect, selectedId, filter, setFilter }) => (
    <div className="flex flex-col h-full bg-slate-50/70 border-r border-slate-200">
        <div className="p-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2"><Wrench /> Technicians ({technicians.length})</h2>
            <div className="relative mt-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1-2 h-4 w-4 text-slate-400"/>
                <input 
                    type="text" 
                    placeholder="Search technicians..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>
        <div className="overflow-y-auto flex-1">
            {technicians.map(tech => (
                <button
                    key={tech.id}
                    onClick={() => onSelect(tech.id)}
                    className={`w-full text-left p-4 flex items-center gap-4 border-b border-slate-200 hover:bg-blue-50 transition-colors ${selectedId === tech.id ? 'bg-blue-100 border-l-4 border-blue-500' : ''}`}
                >
                    <img src={tech.profileImageUrl} alt={tech.fullName} className="h-12 w-12 rounded-full"/>
                    <div>
                        <p className={`font-semibold text-slate-900 ${selectedId === tech.id ? 'text-blue-800' : ''}`}>{tech.fullName}</p>
                        <p className="text-sm text-slate-500">{tech.specializations.join(', ')}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-3 shrink-0">
                        {/* UPDATED: Green dot now uses the more accurate 'isActivelyWorking' status */}
                        {tech.isActivelyWorking && <div className="w-2.5 h-2.5 rounded-full bg-green-500" title="Actively Working"></div>}
                        <StatusBadge status={tech.status} />
                    </div>
                </button>
            ))}
        </div>
    </div>
);

const TechnicianDetail = ({ technician }) => {
    if (!technician) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 p-6 bg-slate-50/50">
                <Wrench className="w-16 h-16 mb-4 text-slate-300" />
                <h3 className="text-xl font-semibold text-slate-700">Select a Technician</h3>
                <p className="mt-1">Choose a technician to view their operational details and performance.</p>
            </div>
        );
    }
    
    return (
        <div className="h-full overflow-y-auto p-6 bg-slate-50/50">
            <header className="flex items-start justify-between mb-8">
                 <div className="flex items-center gap-6">
                    <div className="relative">
                        <img src={technician.profileImageUrl} alt={technician.fullName} className="h-24 w-24 rounded-full border-4 border-white shadow-lg"/>
                        {/* UPDATED: Green dot now uses the more accurate 'isActivelyWorking' status */}
                        {technician.isActivelyWorking && <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white" title="Actively Working"></div>}
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800">{technician.fullName}</h2>
                        <div className="mt-2"><StatusBadge status={technician.status} /></div>
                        <p className="text-slate-600 text-lg mt-2">{technician.specializations.join(' / ')} Specialist</p>
                        <p className="text-sm text-slate-500 mt-1">Center: {technician.assignedCenter}</p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                 <StatCard icon={<ListTodo/>} label="Scans Today" value={technician.todayScansCount} subValue={`Total: ${technician.totalScans}`} color={{bg: 'bg-blue-100', text: 'text-blue-600'}}/>
                 {/* <StatCard icon={<Clock/>} label="Avg. Scan Duration" value={`${Math.round(technician.avgScanMinutes)} min`} subValue="From start to end" color={{bg: 'bg-indigo-100', text: 'text-indigo-600'}}/> */}
                 <StatCard icon={<Calendar/>} label="Member Since" value={new Date(technician.joinDate).getFullYear()} subValue={`${Math.floor((new Date() - new Date(technician.joinDate)) / (1000 * 60 * 60 * 24 * 365.25))} years`} color={{bg: 'bg-slate-100', text: 'text-slate-600'}}/>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg-col-span-1 space-y-6">
                    <Card><div className="p-5">
                        <h3 className="font-semibold text-slate-800 mb-4">Contact & Shift</h3>
                        <div className="space-y-3 text-sm mb-4">
                            <p className="flex items-center gap-3"><Mail className="h-4 w-4 text-slate-400"/> <a href={`mailto:${technician.email}`} className="text-blue-600 hover:underline">{technician.email}</a></p>
                            <p className="flex items-center gap-3"><Phone className="h-4 w-4 text-slate-400"/> {technician.phone}</p>
                        </div>
                        <div className="flex justify-center gap-2 pt-4 border-t border-slate-200">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                <span key={day} className={`w-9 h-9 flex items-center justify-center text-xs font-semibold rounded-full ${technician.shift.days.includes(day) ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>{day}</span>
                            ))}
                        </div>
                        <div className="text-center bg-slate-100 p-2 rounded-lg mt-3"><p className="text-sm font-bold text-slate-800">{technician.shift.start} - {technician.shift.end}</p></div>
                    </div></Card>
                </div>
                 <div className="lg:col-span-2">
                    <Card>
                         <div className="p-5">
                            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2"><BarChart2 className="h-5 w-5"/> Today's Activity Log</h3>
                            <div>
                               {technician.activityToday.length > 0 ? (
                                   <ul className="relative border-l-2 border-slate-200 ml-3">
                                        {technician.activityToday.map((log, index) => (
                                            <li key={index} className="mb-5 ml-6">
                                                <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-4 ring-white ${log.type === 'login' ? 'bg-green-200' : 'bg-red-200'}`}>
                                                    {log.type === 'login' ? <LogIn className="w-3 h-3 text-green-800"/> : <LogOut className="w-3 h-3 text-red-800"/>}
                                                </span>
                                                <p className="font-semibold text-slate-700 capitalize">{log.type}</p>
                                                <time className="block text-xs text-slate-500">{new Date(log.timestamp).toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' })} IST</time>
                                            </li>
                                        ))}
                                   </ul>
                               ) : (
                                <div className="text-center text-slate-500 py-12">
                                    <Clock className="h-10 w-10 mx-auto text-slate-400 mb-2"/>
                                    <p>No activity recorded today.</p>
                                </div>
                               )}
                            </div>
                        </div>
                    </Card>
                 </div>
            </div>
        </div>
    );
};

// --- PARENT COMPONENT ---
const TechnicianManagementPage = () => {
    const [selectedTechId, setSelectedTechId] = useState(null);
    const [filter, setFilter] = useState('');
    const techniciansWithAnalytics = useTechnicianAnalytics();
    
    const filteredTechnicians = useMemo(() => {
        return techniciansWithAnalytics.filter(tech => 
            tech.fullName.toLowerCase().includes(filter.toLowerCase())
        );
    }, [techniciansWithAnalytics, filter]);

    const selectedTechnician = useMemo(() => {
        return techniciansWithAnalytics.find(tech => tech.id === selectedTechId);
    }, [techniciansWithAnalytics, selectedTechId]);
    
    useEffect(() => {
       if (filteredTechnicians.length > 0 && !selectedTechId) {
           setSelectedTechId(filteredTechnicians[0].id);
       }
    }, [filteredTechnicians, selectedTechId]);

    return (
        <div className="min-h-screen bg-white font-sans">
            <div className="max-w-screen-2xl mx-auto">
                <header className="p-4 sm:p-6 border-b border-slate-200">
                    <h1 className="text-3xl font-bold text-slate-800">Technician Management</h1>
                    <p className="text-slate-500 mt-1">Review technician profiles, schedules, and operational analytics.</p>
                </header>
                <div className="flex" style={{ height: 'calc(100vh - 97px)' }}>
                    <div className="w-full md:w-3/3 lg:w-1/4 max-w-sm">
                        <TechnicianList
                            technicians={filteredTechnicians}
                            selectedId={selectedTechId}
                            onSelect={setSelectedTechId}
                            filter={filter}
                            setFilter={setFilter}
                        />
                    </div>
                    <div className="flex-1">
                        <TechnicianDetail technician={selectedTechnician} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechnicianManagementPage;

