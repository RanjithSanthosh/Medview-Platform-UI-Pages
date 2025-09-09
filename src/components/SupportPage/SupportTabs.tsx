import React from "react";
import { Button } from "@/components/ui/button";
import { Mail, HelpCircle, AlertCircle } from "lucide-react";

const SupportTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center gap-4 mb-8">
      <Button
        variant={activeTab === "contact" ? "default" : "outline"}
        onClick={() => setActiveTab("contact")}
        className="px-6 py-2 flex items-center gap-2"
      >
        <Mail className="w-4 h-4" />
        Contact Support
      </Button>
      <Button
        variant={activeTab === "faq" ? "default" : "outline"}
        onClick={() => setActiveTab("faq")}
        className="px-6 py-2 flex items-center gap-2"
      >
        <HelpCircle className="w-4 h-4" />
        FAQ
      </Button>
      <Button
        variant={activeTab === "complaint" ? "default" : "outline"}
        onClick={() => setActiveTab("complaint")}
        className="px-6 py-2 flex items-center gap-2"
      >
        <AlertCircle className="w-4 h-4" />
        File a Complaint
      </Button>
    </div>
  );
};

export default SupportTabs;