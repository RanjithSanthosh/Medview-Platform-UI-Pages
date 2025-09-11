import React from 'react';
import { Download, Printer, ArrowLeft } from 'lucide-react';

// NOTE: For the PDF export to work, you must include the following scripts 
// in your main index.html file, typically before your main application script.
// <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

const PaymentInvoice = ({ doctorName, payments = [], onBack }) => {
  // The parent component now sends only the relevant processed payments
  const processedPayments = payments;

  const subtotal = processedPayments.reduce((acc, payment) => acc + payment.amount, 0);
  const taxRate = 0.05; // Example tax rate of 5%
  const taxAmount = subtotal * taxRate;
  const totalAmount = subtotal + taxAmount;

  // Get the current month and year for the invoice details
  const currentDate = new Date();
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  const invoiceDate = currentDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  
  // Calculate due date (30 days from now)
  const dueDate = new Date();
  dueDate.setDate(currentDate.getDate() + 30);
  const dueDateFormatted = dueDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });


  const handleDownloadPdf = () => {
    const invoiceElement = document.getElementById('invoice-to-print');
    // Access libraries from the window object, loaded via script tags
    if (window.html2canvas && window.jspdf) {
        const { jsPDF } = window.jspdf;
        window.html2canvas(invoiceElement, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`invoice-${doctorName.replace(/\s+/g, '-')}-${month}-${year}.pdf`);
        });
    } else {
        console.error("PDF generation libraries (html2canvas, jspdf) are not loaded. Please add their <script> tags to your index.html file.");
        alert("Could not generate PDF. Required libraries are missing.");
    }
  };
  
  const handlePrint = () => {
      window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans p-4 sm:p-6 lg:p-8">
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #invoice-to-print, #invoice-to-print * {
            visibility: visible;
          }
          #invoice-to-print {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
      <div className="max-w-5xl w-full mx-auto">
        {/* --- Page Header & Actions --- */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 no-print">
            <div>
                 <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-semibold mb-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                 </button>
                <h1 className="text-3xl font-bold text-gray-800">Payment Invoice</h1>
                <p className="text-gray-500 mt-1">Invoice for services rendered by {doctorName}</p>
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

        {/* --- Printable Invoice Area --- */}
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
                    <p className="font-bold text-gray-800 text-lg">{doctorName}</p>
                    <p className="text-gray-600">Radiology Department</p>
                    <p className="text-gray-600">Main General Hospital</p>
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
                                <th className="px-4 py-2 text-left font-semibold text-gray-700">Case ID</th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700">Completion Date</th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700">Description</th>
                                <th className="px-4 py-2 text-right font-semibold text-gray-700">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {processedPayments.length > 0 ? processedPayments.map(p => (
                                <tr key={p.id} className="border-b">
                                    <td className="px-4 py-3 text-gray-800">{p.caseId}</td>
                                    <td className="px-4 py-3 text-gray-600">{p.caseDate}</td>
                                    <td className="px-4 py-3 text-gray-600">Professional fee for case review</td>
                                    <td className="px-4 py-3 text-right font-medium text-gray-800">₹{p.amount.toLocaleString('en-IN')}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-8 text-gray-500">No processed payments found for this period.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
            
            <section className="flex justify-end mt-8">
                <div className="w-full max-w-xs">
                    <div className="flex justify-between py-2">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-medium text-gray-800">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-gray-600">Taxes (5%):</span>
                        <span className="font-medium text-gray-800">₹{taxAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="border-t-2 my-2"></div>
                    <div className="flex justify-between py-2 bg-gray-100 px-4 rounded-lg">
                        <span className="font-bold text-gray-900 text-lg">Total Amount Due:</span>
                        <span className="font-bold text-gray-900 text-lg">₹{totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                </div>
            </section>
            
            <footer className="mt-12 pt-6 border-t">
                <p className="text-center text-gray-500 text-sm">Thank you for your services. Payment will be processed within 30 business days.</p>
            </footer>
        </div>
      </div>
    </div>
  );
};

export default PaymentInvoice;

