import React from "react";
import { LifeBuoy, Clock, Phone } from "lucide-react";

const SupportHeader = () => {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center p-4 bg-indigo-100 rounded-full">
        <LifeBuoy className="h-8 w-8 text-indigo-600" />
      </div>
      <h1 className="mt-6 text-4xl font-bold text-gray-900">Support Center</h1>
      <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
        We're here to help you with any questions or issues you might have. 
        Find answers, get in touch, or file a complaint.
      </p>
      
      <div className="mt-8 flex flex-wrap justify-center gap-6">
        <div className="flex items-center text-gray-600">
          <Clock className="w-5 h-5 mr-2 text-indigo-500" />
          <span>Typically replies within 4 hours</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Phone className="w-5 h-5 mr-2 text-indigo-500" />
          <span>24/7 emergency support available</span>
        </div>
      </div>
    </div>
  );
};

export default SupportHeader;