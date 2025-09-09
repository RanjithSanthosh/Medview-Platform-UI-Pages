// import React, { useState } from "react";
// import FAQAccordion from "./FAQAccordion";
// import ComplaintForm from "./ComplaintForm";
// import { Button } from "@/components/ui/button";

// const SupportPage = () => {
//   const [activeTab, setActiveTab] = useState("faq");

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
//           Support Center
//         </h1>

//         {/* Tabs */}
//         <div className="flex justify-center gap-4 mb-8">
//           <Button
//             variant={activeTab === "email" ? "default" : "outline"}
//             onClick={() => setActiveTab("email")}
//             className="px-6 py-2"
//           >
//             Contact via Email
//           </Button>
//           <Button
//             variant={activeTab === "faq" ? "default" : "outline"}
//             onClick={() => setActiveTab("faq")}
//             className="px-6 py-2"
//           >
//             FAQ
//           </Button>
//           <Button
//             variant={activeTab === "complaint" ? "default" : "outline"}
//             onClick={() => setActiveTab("complaint")}
//             className="px-6 py-2"
//           >
//             Raise a Complaint
//           </Button>
//         </div>

//         {/* Content */}
//         <div>
//           {activeTab === "email" && (
//             <div className="text-center text-lg text-gray-700">
//               <p>
//                 Contact us via email at{" "}
//                 <a
//                   href="mailto:support@example.com"
//                   className="text-indigo-600 font-semibold underline"
//                 >
//                   support@example.com
//                 </a>
//               </p>
//             </div>
//           )}

//           {activeTab === "faq" && <FAQAccordion />}

//           {activeTab === "complaint" && <ComplaintForm />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SupportPage;



import React, { useState } from "react";
import FAQAccordion from "./FAQAccordion";
import ComplaintForm from "./ComplaintForm";
import ContactForm from "./ContactForm";
import SupportTabs from "./SupportTabs";
import SupportHeader from "./SupportHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SupportPage = () => {
  const [activeTab, setActiveTab] = useState("faq");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SupportHeader />
        
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-8 mt-8">
          <SupportTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="mt-8">
            {activeTab === "contact" && <ContactForm />}
            {activeTab === "faq" && <FAQAccordion />}
            {activeTab === "complaint" && <ComplaintForm />}
          </div>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Support Hours</h3>
            <p className="text-gray-600">Mon-Fri: 9AM-6PM EST</p>
            <p className="text-gray-600">Sat: 10AM-4PM EST</p>
            <p className="text-gray-600">Sun: Closed</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Emergency Contact</h3>
            <p className="text-gray-600">Phone: +1 (800) 123-HELP</p>
            <p className="text-gray-600">Available 24/7 for critical issues</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Response Time</h3>
            <p className="text-gray-600">Email: Within 24 hours</p>
            <p className="text-gray-600">Complaints: Within 48 hours</p>
            <p className="text-gray-600">Urgent: Within 4 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;