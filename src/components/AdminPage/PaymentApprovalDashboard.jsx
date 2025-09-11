import React from 'react';
import { Clock, CheckCircle, Users, Search, Check, X, Loader2, MoreHorizontal, XCircle, FileText, Receipt, Download, Printer, ArrowLeft } from 'lucide-react';

// --- Invoice Component (Now included in the same file) ---
const PaymentInvoice = ({ doctorName, payments = [], onBack, isMonthlyReport = false }) => {
  const processedPayments = payments;
  const subtotal = processedPayments.reduce((acc, payment) => acc + payment.amount, 0);
  const taxRate = 0.05;
  const taxAmount = subtotal * taxRate;
  const totalAmount = subtotal + taxAmount;
  const currentDate = new Date('2025-09-09');
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  const invoiceDate = currentDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  const dueDate = new Date('2025-09-09');
  dueDate.setDate(currentDate.getDate() + 30);
  const dueDateFormatted = dueDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });

  const handleDownloadPdf = () => {
    const invoiceElement = document.getElementById('invoice-to-print');
    if (window.html2canvas && window.jspdf) {
        const { jsPDF } = window.jspdf;
        window.html2canvas(invoiceElement, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            const fileName = isMonthlyReport ? `monthly-invoice-${month}-${year}.pdf` : `invoice-${doctorName.replace(/\s+/g, '-')}-${month}-${year}.pdf`;
            pdf.save(fileName);
        });
    } else {
        console.error("PDF generation libraries are not loaded.");
        alert("Could not generate PDF. Required libraries are missing.");
    }
  };
  
  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans p-4 sm:p-6 lg:p-8">
      <style>{`@media print { body * { visibility: hidden; } #invoice-to-print, #invoice-to-print * { visibility: visible; } #invoice-to-print { position: absolute; left: 0; top: 0; right: 0; width: 100%; } .no-print { display: none !important; } }`}</style>
      <div className="max-w-5xl w-full mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 no-print">
            <div>
                 <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-semibold mb-2">
                    <ArrowLeft className="h-4 w-4" /> Back to Dashboard
                 </button>
                <h1 className="text-3xl font-bold text-gray-800">Payment Invoice</h1>
                <p className="text-gray-500 mt-1">
                    {isMonthlyReport ? `Consolidated invoice for ${month} ${year}` : `Invoice for services rendered by ${doctorName}`}
                </p>
            </div>
            <div className="flex items-center gap-2 mt-4 sm:mt-0">
                <button onClick={handleDownloadPdf} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
                    <Download className="h-4 w-4" /> Download PDF
                </button>
                <button onClick={handlePrint} className="flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300 transition">
                    <Printer className="h-4 w-4" /> Print
                </button>
            </div>
        </header>
        <div id="invoice-to-print" className="bg-white p-8 md:p-12 border border-gray-200 rounded-lg shadow-sm">
            <header className="flex justify-between items-start pb-6 border-b">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">INVOICE</h1>
                    <p className="text-gray-500 mt-1">Invoice #INV-{year}-{currentDate.getMonth() + 1}-001</p>
                </div>
                <div className="text-right">
                    <p className="text-xl font-semibold text-gray-800">CyberStudy Inc.</p>
                    <p className="text-sm text-gray-500">123 Health St, MedCity, India</p>
                </div>
            </header>
            <section className="grid md:grid-cols-2 gap-8 my-8">
                <div>
                    <p className="font-semibold text-gray-500 text-sm uppercase tracking-wide mb-2">BILL TO</p>
                    <p className="font-bold text-gray-800 text-lg">{isMonthlyReport ? "All Doctors" : doctorName}</p>
                    {isMonthlyReport ? (
                         <p className="text-gray-600">Consolidated Monthly Payments</p>
                    ) : (
                        <>
                        <p className="text-gray-600">Radiology Department</p>
                        <p className="text-gray-600">Main General Hospital</p>
                        </>
                    )}
                </div>
                <div className="text-left md:text-right">
                    <p><span className="font-semibold text-gray-600">Date Issued:</span> {invoiceDate}</p>
                    <p><span className="font-semibold text-gray-600">Payment Due:</span> {dueDateFormatted}</p>
                </div>
            </section>
            <section>
                <h3 className="font-semibold text-gray-500 text-sm uppercase tracking-wide mb-3">Invoice for services rendered in {month} {year}</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                {isMonthlyReport && <th className="px-4 py-2 text-left font-semibold text-gray-700">Doctor</th>}
                                <th className="px-4 py-2 text-left font-semibold text-gray-700">Case ID</th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700">Completion Date</th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700">Description</th>
                                <th className="px-4 py-2 text-right font-semibold text-gray-700">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {processedPayments.length > 0 ? processedPayments.map(p => (
                                <tr key={p.id} className="border-b">
                                     {isMonthlyReport && <td className="px-4 py-3 text-gray-800 font-medium">{p.doctorName}</td>}
                                    <td className="px-4 py-3 text-gray-800">{p.caseId}</td>
                                    <td className="px-4 py-3 text-gray-600">{p.caseDate}</td>
                                    <td className="px-4 py-3 text-gray-600">Professional fee for case review</td>
                                    <td className="px-4 py-3 text-right font-medium text-gray-800">₹{p.amount.toLocaleString('en-IN')}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={isMonthlyReport ? "5" : "4"} className="text-center py-8 text-gray-500">No processed payments found for this period.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
            <section className="flex justify-end mt-8">
                <div className="w-full max-w-xs">
                    <div className="flex justify-between py-2"><span className="text-gray-600">Subtotal:</span><span className="font-medium text-gray-800">₹{subtotal.toLocaleString('en-IN')}</span></div>
                    <div className="flex justify-between py-2"><span className="text-gray-600">Taxes (5%):</span><span className="font-medium text-gray-800">₹{taxAmount.toLocaleString('en-IN')}</span></div>
                    <div className="border-t-2 my-2"></div>
                    <div className="flex justify-between py-2 bg-gray-100 px-4 rounded-lg"><span className="font-bold text-gray-900 text-lg">Total Amount Due:</span><span className="font-bold text-gray-900 text-lg">₹{totalAmount.toLocaleString('en-IN')}</span></div>
                </div>
            </section>
            <footer className="mt-12 pt-6 border-t"><p className="text-center text-gray-500 text-sm">Thank you for your services. Payment will be processed within 30 business days.</p></footer>
        </div>
      </div>
    </div>
  );
};


// --- Helper Components ---

const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-6 border-l-4" style={{ borderColor: color }}>
    <div className="p-4 rounded-full" style={{ backgroundColor: `${color}20` }}>
      {React.cloneElement(icon, { className: "h-7 w-7", style: { color } })}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const statusStyles = {
    'Pending Approval': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Approved': 'bg-blue-100 text-blue-800 border-blue-200',
    'Processed': 'bg-green-100 text-green-800 border-green-200',
    'Rejected': 'bg-red-100 text-red-800 border-red-200',
  };
  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
};

// --- Main Component ---

const PaymentApprovalDashboard = () => {
  // --- State Management ---
  const [payments, setPayments] = React.useState([
    { id: 'pay_1', caseId: 'CASE-8A3B9C', doctorName: 'Dr. Evelyn Reed', doctorAvatar: 'https://placehold.co/40x40/a78bfa/ffffff?text=ER', caseDate: '2025-09-08', amount: 300, status: 'Pending Approval' },
    { id: 'pay_2', caseId: 'CASE-7D2E4F', doctorName: 'Dr. Marcus Thorne', doctorAvatar: 'https://placehold.co/40x40/38bdf8/ffffff?text=MT', caseDate: '2025-09-08', amount: 300, status: 'Pending Approval' },
    { id: 'pay_3', caseId: 'CASE-5G6H1I', doctorName: 'Dr. Lena Petrova', doctorAvatar: 'https://placehold.co/40x40/f472b6/ffffff?text=LP', caseDate: '2025-09-07', amount: 300, status: 'Pending Approval' },
    { id: 'pay_4', caseId: 'CASE-K2J1M0', doctorName: 'Dr. Samuel Chen', doctorAvatar: 'https://placehold.co/40x40/34d399/ffffff?text=SC', caseDate: '2025-09-06', amount: 300, status: 'Approved' },
    { id: 'pay_5', caseId: 'CASE-P9O8L7', doctorName: 'Dr. Evelyn Reed', doctorAvatar: 'https://placehold.co/40x40/a78bfa/ffffff?text=ER', caseDate: '2025-09-05', amount: 300, status: 'Processed' },
    { id: 'pay_6', caseId: 'CASE-Z1Y2X3', doctorName: 'Dr. Marcus Thorne', doctorAvatar: 'https://placehold.co/40x40/38bdf8/ffffff?text=MT', caseDate: '2025-09-04', amount: 300, status: 'Processed' },
    { id: 'pay_7', caseId: 'CASE-Q4R5S6', doctorName: 'Dr. Lena Petrova', doctorAvatar: 'https://placehold.co/40x40/f472b6/ffffff?text=LP', caseDate: '2025-09-03', amount: 300, status: 'Processed' },
  ]);

  const [selectedPayments, setSelectedPayments] = React.useState([]);
  const [filterStatus, setFilterStatus] = React.useState('all');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [loading, setLoading] = React.useState(null);

  // --- State for controlling view ---
  const [view, setView] = React.useState('dashboard'); // 'dashboard' or 'invoice'
  const [invoiceData, setInvoiceData] = React.useState({ doctorName: null, payments: [], isMonthlyReport: false });


  // --- Logic and Handlers ---

  const handleStatusChange = (paymentIds, newStatus) => {
    setLoading({ action: newStatus, ids: paymentIds });
    setTimeout(() => {
      setPayments(prevPayments =>
        prevPayments.map(p =>
          paymentIds.includes(p.id) ? { ...p, status: newStatus } : p
        )
      );
      setSelectedPayments([]);
      setLoading(null);
    }, 1000);
  };

  const handleGenerateInvoice = (doctorName) => {
    const currentMonth = new Date('2025-09-01').getMonth(); 
    const doctorPaymentsForInvoice = payments.filter(p => 
      p.doctorName === doctorName && 
      p.status === 'Processed' &&
      new Date(p.caseDate).getMonth() === currentMonth
    );

    setInvoiceData({
      doctorName: doctorName,
      payments: doctorPaymentsForInvoice,
      isMonthlyReport: false,
    });
    setView('invoice');
  };

  const handleGenerateMonthlyInvoice = () => {
    const currentMonth = new Date('2025-09-01').getMonth();
    const allProcessedForMonth = payments.filter(p => 
        p.status === 'Processed' && new Date(p.caseDate).getMonth() === currentMonth
    );

    setInvoiceData({
        doctorName: null, // No single doctor
        payments: allProcessedForMonth,
        isMonthlyReport: true, // Flag for the invoice component
    });
    setView('invoice');
  };


  const handleSelectOne = (id) => {
    setSelectedPayments(prev =>
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  const filteredPayments = React.useMemo(() => {
    return payments
      .filter(p => filterStatus === 'all' || p.status === filterStatus)
      .filter(p =>
        p.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.caseId.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [payments, filterStatus, searchTerm]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedPayments(filteredPayments.map(p => p.id));
    } else {
      setSelectedPayments([]);
    }
  };

  const totalPending = payments.reduce((acc, p) => p.status === 'Pending Approval' ? acc + p.amount : acc, 0);
  const processedThisMonth = payments.reduce((acc, p) => p.status === 'Processed' ? acc + p.amount : acc, 0);
  const doctorsAwaitingPayment = new Set(payments.filter(p => p.status === 'Pending Approval').map(p => p.doctorName)).size;
  
  // --- Conditional Rendering ---
  if (view === 'invoice') {
    return <PaymentInvoice 
        doctorName={invoiceData.doctorName} 
        payments={invoiceData.payments} 
        onBack={() => setView('dashboard')} 
        isMonthlyReport={invoiceData.isMonthlyReport}
    />;
  }

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Payment Approval Center</h1>
                <p className="text-gray-500 mt-1">Review and process payments for completed cases.</p>
            </div>
            <button
                onClick={handleGenerateMonthlyInvoice}
                className="mt-4 sm:mt-0 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
            >
                <Receipt className="h-4 w-4" />
                Generate Monthly Invoice
            </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard icon={<Clock />} title="Total Pending Amount" value={`₹${totalPending.toLocaleString('en-IN')}`} color="#f59e0b" />
          <StatCard icon={<CheckCircle />} title="Processed This Month" value={`₹${processedThisMonth.toLocaleString('en-IN')}`} color="#10b981" />
          <StatCard icon={<Users />} title="Doctors Awaiting Payment" value={doctorsAwaitingPayment} color="#3b82f6" />
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
          <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-gray-200 bg-gray-50/50">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Doctor or Case ID..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-600">Status:</span>
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm"
              >
                <option value="all">All</option>
                <option value="Pending Approval">Pending Approval</option>
                <option value="Approved">Approved</option>
                <option value="Processed">Processed</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {selectedPayments.length > 0 && (
            <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
              <span className="font-medium">{selectedPayments.length} payment(s) selected</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusChange(selectedPayments, 'Approved')}
                  className="bg-white text-blue-600 px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-blue-50 transition flex items-center gap-2"
                >
                  <Check className="h-4 w-4" /> Approve Selected
                </button>
                 <button
                  onClick={() => handleStatusChange(selectedPayments, 'Rejected')}
                  className="bg-red-200 text-red-800 px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-red-300 transition flex items-center gap-2"
                >
                  <X className="h-4 w-4" /> Reject Selected
                </button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="bg-gray-100 text-xs text-gray-700 uppercase tracking-wider">
                <tr>
                  <th scope="col" className="p-4">
                    <input type="checkbox" onChange={handleSelectAll} checked={selectedPayments.length > 0 && selectedPayments.length === filteredPayments.length} className="rounded" />
                  </th>
                  <th scope="col" className="px-6 py-3">Doctor</th>
                  <th scope="col" className="px-6 py-3">Case Details</th>
                  <th scope="col" className="px-6 py-3 text-right">Amount</th>
                  <th scope="col" className="px-6 py-3 text-center">Status</th>
                  <th scope="col" className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map(payment => (
                  <tr key={payment.id} className="bg-white border-b hover:bg-gray-50 transition">
                    <td className="w-4 p-4">
                      <input type="checkbox" checked={selectedPayments.includes(payment.id)} onChange={() => handleSelectOne(payment.id)} className="rounded" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img className="h-10 w-10 rounded-full object-cover" src={payment.doctorAvatar} alt={payment.doctorName} />
                        <div>
                          <div className="font-semibold text-gray-800">{payment.doctorName}</div>
                          <div className="text-gray-500">{`ID: ${payment.id}`}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800">{payment.caseId}</div>
                      <div className="text-gray-500">Completed: {payment.caseDate}</div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-800 text-right">
                      ₹{payment.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <StatusBadge status={payment.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {payment.status === 'Pending Approval' && (
                          <>
                            <button 
                              onClick={() => handleStatusChange([payment.id], 'Approved')}
                              disabled={loading && loading.ids.includes(payment.id)}
                              className="p-2 text-green-600 hover:bg-green-100 rounded-full transition disabled:opacity-50" title="Approve">
                              {loading && loading.action === 'Approved' && loading.ids.includes(payment.id) ? <Loader2 className="h-5 w-5 animate-spin" /> : <CheckCircle className="h-5 w-5" />}
                            </button>
                            <button
                              onClick={() => handleStatusChange([payment.id], 'Rejected')}
                              disabled={loading && loading.ids.includes(payment.id)}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-full transition disabled:opacity-50" title="Reject">
                                {loading && loading.action === 'Rejected' && loading.ids.includes(payment.id) ? <Loader2 className="h-5 w-5 animate-spin" /> : <XCircle className="h-5 w-5" />}
                            </button>
                          </>
                        )}
                        <button onClick={() => handleGenerateInvoice(payment.doctorName)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition" title="Generate Invoice">
                           <Receipt className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-500 hover:bg-gray-200 rounded-full transition" title="View Case Details">
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredPayments.length === 0 && (
                 <div className="text-center py-16">
                   <FileText className="mx-auto h-12 w-12 text-gray-400" />
                   <h3 className="mt-2 text-lg font-medium text-gray-900">No Payments Found</h3>
                   <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentApprovalDashboard;

