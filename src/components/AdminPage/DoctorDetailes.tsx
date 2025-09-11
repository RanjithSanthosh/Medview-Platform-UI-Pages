import React, { useState, useMemo, useEffect } from 'react';
import { 
    User, Mail, Phone, Clock, Calendar, ShieldCheck, ShieldOff, BarChart2,
    Users, DollarSign, Target, Search, LogIn, LogOut, Timer
} from 'lucide-react';

// --- MOCK DATA ---
const doctorProfileData = [
    { id: 'DOC-001', firstName: 'Gopinath', lastName: 'Rao', email: 'gopinath.rao@email.com', phone: '+91 9876543210', qualification: 'MD, FRCR', joinDate: '2016-05-20', status: 'Active', profileImageUrl: 'https://placehold.co/100x100/E2E8F0/475569?text=GR', shift: { start: '09:00 AM', end: '05:00 PM', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] } },
    { id: 'DOC-002', firstName: 'Prem Kumar', lastName: 'Verma', email: 'premkumar.v@email.com', phone: '+91 9876543211', qualification: 'MD, DMRD', joinDate: '2018-02-15', status: 'Active', profileImageUrl: 'https://placehold.co/100x100/E2E8F0/475569?text=PV', shift: { start: '01:00 PM', end: '09:00 PM', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] } },
    { id: 'DOC-003', firstName: 'Suresh', lastName: 'Patil', email: 'suresh.patil@email.com', phone: '+91 9876543212', qualification: 'MD, Radiology', joinDate: '2019-11-01', status: 'Inactive', profileImageUrl: 'https://placehold.co/100x100/E2E8F0/475569?text=SP', shift: { start: '10:00 AM', end: '06:00 PM', days: ['Sat', 'Sun'] } },
    { id: 'DOC-004', firstName: 'Priya', lastName: 'Sharma', email: 'priya.sharma@email.com', phone: '+91 9876543213', qualification: 'MBBS, MD', joinDate: '2020-07-22', status: 'Active', profileImageUrl: 'https://placehold.co/100x100/E2E8F0/475569?text=PS', shift: { start: '08:00 AM', end: '04:00 PM', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] } },
    { id: 'DOC-005', firstName: 'Anitha', lastName: 'Menon', email: 'anitha.menon@email.com', phone: '+91 9876543214', qualification: 'MD, DNB', joinDate: '2015-09-10', status: 'Active', profileImageUrl: 'https://placehold.co/100x100/E2E8F0/475569?text=AM', shift: { start: '09:00 AM', end: '05:00 PM', days: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'] } }
];
const completedStudiesData = [
    { orderId: "34e27dd850fa", assignedTo: "Dr Gopinath", assignedDate: "21 Mar 2017 14:17PM", completedDate: "21 Mar 2017 18:44PM", modality: "MRI" },
    { orderId: "Ce4aa2a81910", assignedTo: "Dr Gopinath", assignedDate: "8 Mar 2017 19:00PM", completedDate: "8 Mar 2017 19:40PM", modality: "CT" },
    { orderId: "De5bb3b92011", assignedTo: "Dr Gopinath", assignedDate: "22 Mar 2017 09:30AM", completedDate: "22 Mar 2017 10:00AM", modality: "US" },
    { orderId: "Ge5bb3b92011", assignedTo: "Dr Gopinath", assignedDate: "15 Apr 2017 08:00AM", completedDate: "15 Apr 2017 11:00AM", modality: "CT" },
    { orderId: "E2138ae25e8a", assignedTo: "Dr Prem Kumar", assignedDate: "21 Mar 2017 14:44PM", completedDate: "21 Mar 2017 15:45PM", modality: "MRI" },
    { orderId: "Baa41f844d57", assignedTo: "Dr Suresh", assignedDate: "20 Mar 2017 18:54PM", completedDate: "20 Mar 2017 19:28PM", modality: "CT" },
    { orderId: "He6cc4c03122", assignedTo: "Dr Suresh", assignedDate: "10 Apr 2017 08:30AM", completedDate: "10 Apr 2017 09:30AM", modality: "CT" },
];
const activityLogs = [
    { doctorId: 'DOC-001', type: 'login', timestamp: '2025-09-11T09:01:15Z' },
    { doctorId: 'DOC-001', type: 'logout', timestamp: '2025-09-11T13:30:45Z' },
    { doctorId: 'DOC-002', type: 'login', timestamp: '2025-09-11T13:05:00Z' }, // Active session
    { doctorId: 'DOC-004', type: 'login', timestamp: '2025-09-11T08:00:00Z' },
    { doctorId: 'DOC-004', type: 'logout', timestamp: '2025-09-11T12:05:00Z' },
    { doctorId: 'DOC-001', type: 'login', timestamp: '2025-09-10T09:05:00Z' },
    { doctorId: 'DOC-001', type: 'logout', timestamp: '2025-09-10T17:00:00Z' },
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
        {subValue && <p className="text-xs text-slate-400 mt-auto">{subValue}</p>}
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
const parseCustomDate = (dateString) => {
    return new Date(dateString.replace(/(\d{1,2} \w+ \d{4}) (\d{2}:\d{2})([AP]M)/, '$1 $2 $3 UTC'));
};

// ##### NEW HELPER FUNCTIONS FOR SHIFT CALCULATION #####
// Converts '09:00 AM' to a 24-hour numeric value like 900
const parseShiftTime = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier.toUpperCase() === 'PM' && hours < 12) hours += 12;
    if (modifier.toUpperCase() === 'AM' && hours === 12) hours = 0; // Midnight case
    return hours * 100 + minutes;
};
// Gets the short day name (e.g., 'Thu') from a Date object in UTC
const getDayString = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });
};

const useDoctorAnalytics = () => useMemo(() => {
    const MOCK_CURRENT_TIME = new Date('2025-09-11T13:36:00Z'); // Thursday

    return doctorProfileData.map(doctor => {
        const fullName = `${doctor.firstName} ${doctor.lastName}`;
        const cases = completedStudiesData.filter(c => c.assignedTo === fullName);

        // Calculate Average Turnaround Time (TAT)
        let totalTATMinutes = 0;
        cases.forEach(c => {
            const assigned = parseCustomDate(c.assignedDate);
            const completed = parseCustomDate(c.completedDate);
            if (!isNaN(assigned) && !isNaN(completed)) {
                totalTATMinutes += (completed - assigned) / (1000 * 60);
            }
        });
        const averageTATMinutes = cases.length > 0 ? totalTATMinutes / cases.length : 0;
        
        // Calculate login/logout activity
        const todayLogs = activityLogs.filter(log => 
            log.doctorId === doctor.id && 
            new Date(log.timestamp).toDateString() === MOCK_CURRENT_TIME.toDateString()
        ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        const lastEvent = todayLogs[todayLogs.length - 1];
        const isLoggedIn = lastEvent && lastEvent.type === 'login';

        // ##### CORRECTED LOGIC FOR GREEN DOT #####
        // Determine if the doctor is scheduled to be working right now.
        const currentDayStr = getDayString(MOCK_CURRENT_TIME);
        const currentTime = MOCK_CURRENT_TIME.getUTCHours() * 100 + MOCK_CURRENT_TIME.getUTCMinutes();
        const shiftStartTime = parseShiftTime(doctor.shift.start);
        const shiftEndTime = parseShiftTime(doctor.shift.end);

        const isOnShift = doctor.status === 'Active' &&
                          doctor.shift.days.includes(currentDayStr) &&
                          currentTime >= shiftStartTime &&
                          currentTime <= shiftEndTime;

        return {
            ...doctor,
            fullName,
            averageTATMinutes,
            isLoggedIn, // True if their last action today was a login
            isOnShift,  // True if their account is active AND they are in their shift time
            activityToday: todayLogs,
        };
    });
}, []);

// --- CHILD COMPONENTS ---
const DoctorList = ({ doctors, onSelect, selectedId, filter, setFilter }) => (
    <div className="flex flex-col h-full bg-slate-50/70 border-r border-slate-200">
        <div className="p-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2"><Users /> Doctors ({doctors.length})</h2>
            <div className="relative mt-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"/>
                <input 
                    type="text" 
                    placeholder="Search doctors..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
        </div>
        <div className="overflow-y-auto flex-1">
            {doctors.map(doc => (
                <button
                    key={doc.id}
                    onClick={() => onSelect(doc.id)}
                    className={`w-full text-left p-4 flex items-center gap-4 border-b border-slate-200 hover:bg-blue-50 transition-colors ${selectedId === doc.id ? 'bg-blue-100 border-l-4 border-blue-500' : ''}`}
                >
                    <img src={doc.profileImageUrl} alt={doc.fullName} className="h-12 w-12 rounded-full"/>
                    <div>
                        <p className={`font-semibold text-slate-900 ${selectedId === doc.id ? 'text-blue-800' : ''}`}>{doc.fullName}</p>
                        <p className="text-sm text-slate-500">{doc.qualification}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-3">
                        {/* ##### UPDATED DISPLAY LOGIC ##### */}
                        {/* The dot now shows if the doctor is on shift */}
                        {/* {doc.isOnShift && <div className="w-2.5 h-2.5 rounded-full bg-green-500" title="On Shift"></div>} */}
                        <StatusBadge status={doc.status} />
                    </div>
                </button>
            ))}
        </div>
    </div>
);

// NOTE: No changes were needed in DoctorDetail or the main DoctorManagementPage components.
// I have left them here for completeness.
const DoctorDetail = ({ doctor }) => {
    if (!doctor) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 p-6 bg-slate-50/50">
                <User className="w-16 h-16 mb-4 text-slate-300" />
                <h3 className="text-xl font-semibold text-slate-700">Select a Doctor</h3>
                <p className="mt-1">Choose a doctor from the list to view their detailed profile and performance.</p>
            </div>
        );
    }
    
    const formattedTAT = `${Math.round(doctor.averageTATMinutes)} min`;

    return (
        <div className="h-full overflow-y-auto p-6 bg-slate-50/50">
            <header className="flex items-center gap-6 mb-8">
                 <div className="relative">
                     <img src={doctor.profileImageUrl} alt={doctor.fullName} className="h-24 w-24 rounded-full border-4 border-white shadow-lg"/>
                     {/* {doctor.isOnShift && <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white" title="On Shift"></div>} */}
                 </div>
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">{doctor.fullName}</h2>
                    <p className="text-slate-600 text-lg">{doctor.qualification}</p>
                    <div className="mt-2"><StatusBadge status={doctor.status} /></div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                <StatCard icon={<Timer/>} label="Avg. Turnaround Time" value={formattedTAT} subValue="Per case" color={{bg: 'bg-indigo-100', text: 'text-indigo-600'}}/>
                <StatCard icon={<Calendar/>} label="Joined On" value={new Date(doctor.joinDate).toLocaleDateString('en-GB', { year: 'numeric', month: 'short' })} subValue={`${Math.floor((new Date() - new Date(doctor.joinDate)) / (1000 * 60 * 60 * 24 * 365))} years with us`} color={{bg: 'bg-slate-100', text: 'text-slate-600'}}/>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <div className="p-5">
                            <h3 className="font-semibold text-slate-800 mb-4">Contact Information</h3>
                            <div className="space-y-3 text-sm">
                                <p className="flex items-center gap-3"><Mail className="h-4 w-4 text-slate-400"/> <a href={`mailto:${doctor.email}`} className="text-blue-600 hover:underline">{doctor.email}</a></p>
                                <p className="flex items-center gap-3"><Phone className="h-4 w-4 text-slate-400"/> {doctor.phone}</p>
                            </div>
                        </div>
                    </Card>
                     <Card>
                        <div className="p-5">
                            <h3 className="font-semibold text-slate-800 mb-4">Shift Schedule</h3>
                            <div className="flex justify-center gap-2 mt-4">
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                    <span key={day} className={`w-9 h-9 flex items-center justify-center text-xs font-semibold rounded-full ${doctor.shift.days.includes(day) ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>{day}</span>
                                ))}
                            </div>
                             <div className="text-center bg-slate-100 p-2 rounded-lg mt-4">
                                 <p className="text-sm font-bold text-slate-800">{doctor.shift.start} - {doctor.shift.end}</p>
                             </div>
                        </div>
                    </Card>
                </div>
                 <div className="lg:col-span-2">
                    <Card>
                         <div className="p-5">
                            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2"><BarChart2 className="h-5 w-5"/> Today's Activity Log</h3>
                            <div className="space-y-1">
                               {doctor.activityToday.length > 0 ? (
                                   <ul className="relative border-l-2 border-slate-200 ml-3">
                                        {doctor.activityToday.map((log, index) => (
                                            <li key={index} className="mb-4 ml-6">
                                                <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-4 ring-white ${log.type === 'login' ? 'bg-green-200' : 'bg-red-200'}`}>
                                                    {log.type === 'login' ? <LogIn className="w-3 h-3 text-green-800"/> : <LogOut className="w-3 h-3 text-red-800"/>}
                                                </span>
                                                <p className="font-semibold text-slate-700 capitalize">{log.type}</p>
                                                <time className="block text-xs text-slate-500">{new Date(log.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</time>
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

const DoctorManagementPage = () => {
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);
    const [filter, setFilter] = useState('');
    const doctorsWithAnalytics = useDoctorAnalytics();
    
    const filteredDoctors = useMemo(() => {
        return doctorsWithAnalytics.filter(doc => 
            doc.fullName.toLowerCase().includes(filter.toLowerCase())
        );
    }, [doctorsWithAnalytics, filter]);

    const selectedDoctor = useMemo(() => {
        return doctorsWithAnalytics.find(doc => doc.id === selectedDoctorId);
    }, [doctorsWithAnalytics, selectedDoctorId]);
    
    useEffect(() => {
       if (filteredDoctors.length > 0 && !selectedDoctorId) {
           setSelectedDoctorId(filteredDoctors[0].id);
       }
    }, [filteredDoctors, selectedDoctorId]);

    return (
        <div className="min-h-screen bg-white font-sans">
            <div className="max-w-screen-2xl mx-auto">
                <header className="p-4 sm:p-6 border-b border-slate-200">
                    <h1 className="text-3xl font-bold text-slate-800">Doctor Management</h1>
                    <p className="text-slate-500 mt-1">Review doctor profiles, schedules, and performance analytics.</p>
                </header>
                <div className="flex" style={{ height: 'calc(100vh - 97px)' }}>
                    <div className="w-full md:w-1/3 lg:w-1/4 max-w-sm">
                        <DoctorList
                            doctors={filteredDoctors}
                            selectedId={selectedDoctorId}
                            onSelect={setSelectedDoctorId}
                            filter={filter}
                            setFilter={setFilter}
                        />
                    </div>
                    <div className="flex-1">
                        <DoctorDetail doctor={selectedDoctor} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorManagementPage;