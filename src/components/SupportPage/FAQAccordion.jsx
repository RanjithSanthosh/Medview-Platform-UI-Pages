// import React, { useState } from "react";
// import { faqs } from "./faqs";
// import { ChevronDown, ChevronUp } from "lucide-react";

// const FAQAccordion = () => {
//   const [openIndex, setOpenIndex] = useState(null);

//   const toggleAnswer = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <div className="space-y-4">
//       {faqs.map((faq, index) => (
//         <div
//           key={index}
//           className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-4 bg-white"
//         >
//           <button
//             onClick={() => toggleAnswer(index)}
//             className="flex justify-between items-center w-full text-left text-lg font-medium text-gray-800 hover:text-indigo-600 transition"
//           >
//             {faq.question}
//             {openIndex === index ? (
//               <ChevronUp className="w-5 h-5 text-indigo-600" />
//             ) : (
//               <ChevronDown className="w-5 h-5 text-gray-400" />
//             )}
//           </button>

//           {openIndex === index && (
//             <div className="mt-4 text-gray-700 bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-600 animate-fadeIn">
//               {faq.answer}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FAQAccordion;




import React, { useState } from "react";
import { faqs } from "./faqs";
import { ChevronDown, ChevronUp, Search, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

// Removed TypeScript interface (not valid in .jsx)

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const categories = ["all", "account", "billing", "technical", "general"];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-2 rounded-lg"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filteredFaqs.length === 0 ? (
        <div className="text-center py-12">
          <HelpCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No FAQs found</h3>
          <p className="mt-2 text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 bg-white"
            >
              <button
                onClick={() => toggleAnswer(index)}
                className="flex justify-between items-center w-full text-left text-lg font-semibold text-gray-800 hover:text-indigo-700 transition-colors"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span>{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>

              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
                }`}
              >
                <div className="text-gray-700 bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-600">
                  {faq.answer}
                </div>
                
                {index === 0 && openIndex === index && (
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <span>Was this helpful?</span>
                    <button className="ml-3 text-indigo-600 hover:text-indigo-800 font-medium">
                      Yes
                    </button>
                    <button className="ml-3 text-gray-500 hover:text-gray-700">
                      No
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FAQAccordion;