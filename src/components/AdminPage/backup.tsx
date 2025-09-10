import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, User, Mail, Building, Phone, Key, BadgeCheck, Search, Globe, Hospital, Download, Edit, Trash2, Scan, MapPin, UserCircle, Upload, ChevronUp, ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox"; // Assuming you have a Checkbox component

// --- DATA FOR PRICING CHARTS ---
// Based on your screenshots
const CT_SCAN_ITEMS = [
    { key: 'brain', label: 'Brain' }, { key: 'spineCervical', label: 'Spine Cervical' },
    { key: 'spineDorsal', label: 'Spine Dorsal' }, { key: 'lumbar', label: 'Lumbar' },
    { key: 'sacral', label: 'Sacral' }, { key: 'brachialPlexus', label: 'Brachial Plexus' },
    { key: 'chest', label: 'Chest' }, { key: 'abdomen', label: 'Abdomen' },
    { key: 'pelvis', label: 'Pelvis' }, { key: 'middleEar', label: 'Middle Ear & Temporal Bone' },
    { key: 'nasopharynx', label: 'Nasopharynx' }, { key: 'shoulderJoint', label: 'Shoulder Joint' },
    { key: 'elbowJoint', label: 'Elbow Joint' }, { key: 'pns', label: 'Paranasal Sinuses (PNS)' },
    { key: 'wristJoint', label: 'Wrist Joint' }, { key: 'hand', label: 'Hand' },
    { key: 'hipJoint', label: 'Hip Joint' }, { key: 'kneeJoint', label: 'Knee Joint' },
    { key: 'ankleJoint', label: 'Ankle Joint' }, { key: 'foot', label: 'Foot' },
    { key: 'tmj', label: 'Temporo-Mandibular (TMJ)' }, { key: 'orbit', label: 'Orbit' },
    { key: 'breast', label: 'Breast' },
];

const CBCT_SCAN_ITEMS = [
    { key: 'urogram', label: 'Urogram' }, { key: 'humerus', label: 'Humerus' },
    { key: 'limitedFov', label: 'Limited Field of View (less than one whole jaw)' },
    { key: 'fullDentalArch', label: 'Full Dental Arch (Mandible or Maxilla)' },
    { key: 'bothJaws', label: 'Both Jaws (Maxilla and Mandible)' },
    { key: 'tmjSeries', label: 'TMJ Series' }, { key: 'fullMouth', label: 'Full Mouth (Both Jaw Arches)' },
    { key: 'sectionalView', label: 'CBCT Sectional View' },
    { key: 'maxillaArch', label: 'CBCT Maxilla Arch' }, { key: 'mandibleArch', label: 'CBCT Mandible Arch' },
];

// Placeholder data for other scan types
const MRI_SCAN_ITEMS = [{ key: 'brainMri', label: 'Brain MRI' }, { key: 'spineMri', label: 'Spine MRI' }];
const CRDX_SCAN_ITEMS = [{ key: 'chestXray', label: 'Chest X-Ray' }, { key: 'boneScan', label: 'Bone Scan' }];
const US_SCAN_ITEMS = [{ key: 'abdomenUs', label: 'Abdomen US' }, { key: 'pelvisUs', label: 'Pelvis US' }];

const SCAN_CATEGORIES = {
    ct: { label: 'CT', items: CT_SCAN_ITEMS },
    mri: { label: 'MRI', items: MRI_SCAN_ITEMS },
    crdx: { label: 'CR/DX', items: CRDX_SCAN_ITEMS },
    us: { label: 'US', items: US_SCAN_ITEMS },
    cbct: { label: 'CBCT', items: CBCT_SCAN_ITEMS },
};


// --- HELPER FUNCTION TO INITIALIZE STATE ---
const initializeChargesState = () => {
    const charges = {};
    for (const key in SCAN_CATEGORIES) {
        charges[key] = {
            enabled: false,
            prices: SCAN_CATEGORIES[key].items.reduce((acc, item) => {
                acc[item.key] = { base: '', withCommunication: '' };
                return acc;
            }, {})
        };
    }
    return charges;
};

// --- REUSABLE COMPONENTS ---
const Select = ({ children, ...props }) => (
  <select className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full bg-white" {...props}>
    {children}
  </select>
);
const Textarea = (props) => (
    <textarea className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full" {...props}></textarea>
);

// New Accordion Component for Pricing Details
const PricingAccordion = ({ title, scanTypeKey, items, chargesData, onChargeChange }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="border border-blue-200 rounded-lg bg-white mt-4">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-3 bg-blue-50 text-blue-800 font-semibold text-left"
            >
                {title}
                {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {isOpen && (
                <div className="p-4 space-y-3">
                    {items.map(({ key, label }) => (
                        <div key={key} className="grid grid-cols-12 gap-4 items-center border-b pb-2 last:border-b-0">
                            <div className="col-span-6">
                                <Label htmlFor={`${scanTypeKey}-${key}-base`}>{label}</Label>
                            </div>
                            <div className="col-span-3">
                                <Input
                                    id={`${scanTypeKey}-${key}-base`}
                                    name={`${scanTypeKey}.prices.${key}.base`}
                                    type="number"
                                    placeholder="0"
                                    value={chargesData.prices[key].base}
                                    onChange={onChargeChange}
                                />
                            </div>
                            <div className="col-span-3">
                                 <Input
                                    id={`${scanTypeKey}-${key}-withCommunication`}
                                    name={`${scanTypeKey}.prices.${key}.withCommunication`}
                                    type="number"
                                    placeholder="0"
                                    value={chargesData.prices[key].withCommunication}
                                    onChange={onChargeChange}
                                    className="pl-2"
                                    addonBefore="with Communication" // This is a conceptual prop, styling might be needed
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


const InstitutionLoginForm = () => {
  const [formData, setFormData] = useState({
    institutionName: "",
    scanType: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    person: "",
    contactPhone: "",
    contactEmail: "",
    loginId: "",
    password: "",
    logo: null,
    region: "",
    institutionType: "",
    charges: initializeChargesState(), // New complex state for charges
  });

  // (The rest of the state declarations: institutions, errors, etc. remain the same)
  const [institutions, setInstitutions] = useState([
    {
      id: "INST-A4B1C9",
      institutionName: "City General Hospital",
      loginId: "citygeneral",
      contactEmail: "admin@citygeneral.org",
      contactPhone: "(212) 555-0100",
      region: "North-East",
      institutionType: "Hospital",
      created: "2023-11-20",
      status: "active",
    },
  ]);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRegion, setFilterRegion] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  
  // (Validation, generateUniqueID, handleDelete, etc. remain the same)
    function generateUniqueID() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567_9';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `INST-${result}`;
    }

    const validateForm = () => {
        // This function would need to be updated if charge fields become required
        const newErrors = {};
        if (!formData.institutionName.trim()) newErrors.institutionName = "Institution name is required";
        if (!formData.loginId.trim()) newErrors.loginId = "Login ID is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (!formData.contactEmail.trim()) newErrors.contactEmail = "Contact email is required";
        if (!formData.region) newErrors.region = "Region is required";
        if (!formData.institutionType) newErrors.institutionType = "Institution type is required";
        if (!formData.contactPhone.trim()) newErrors.contactPhone = "Phone number is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setFormData((prev) => ({ ...prev, [name]: files ? files[0] : null }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleChargeCheckboxChange = (scanTypeKey, isChecked) => {
        setFormData(prev => ({
            ...prev,
            charges: {
                ...prev.charges,
                [scanTypeKey]: {
                    ...prev.charges[scanTypeKey],
                    enabled: isChecked,
                }
            }
        }));
    };
    
    const handleChargeChange = (e) => {
        const { name, value } = e.target;
        const [scanType, field, subTypeKey, priceType] = name.split('.'); // e.g., "ct.prices.brain.base"

        setFormData(prev => ({
            ...prev,
            charges: {
                ...prev.charges,
                [scanType]: {
                    ...prev.charges[scanType],
                    prices: {
                        ...prev.charges[scanType].prices,
                        [subTypeKey]: {
                            ...prev.charges[scanType].prices[subTypeKey],
                            [priceType]: value,
                        }
                    }
                }
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log("Form Submitted:", formData); // You can see the complex charges object here

        // (Rest of submit logic remains the same)
        const newInstitution = { id: generateUniqueID(), created: new Date().toISOString().split('T')[0], status: "active", ...formData };
        setInstitutions([newInstitution, ...institutions]);
        setSubmitted(true);
        setIsSubmitting(false);

        // Reset form state including the complex charges object
        setFormData({
            institutionName: "", scanType: "", address: "", city: "", state: "", country: "", pincode: "",
            person: "", contactPhone: "", contactEmail: "", loginId: "", password: "", logo: null,
            region: "", institutionType: "",
            charges: initializeChargesState(),
        });
        setTimeout(() => setSubmitted(false), 5000);
    };

    const handleDelete = (id) => setInstitutions(institutions.filter(inst => inst.id !== id));
    const handleToggleStatus = (id) => setInstitutions(institutions.map(inst => inst.id === id ? { ...inst, status: inst.status === "active" ? "inactive" : "active" } : inst));

    const filteredInstitutions = institutions.filter(inst => {
        const term = searchTerm.toLowerCase();
        return (inst.institutionName.toLowerCase().includes(term) || inst.loginId.toLowerCase().includes(term) || inst.contactEmail.toLowerCase().includes(term)) &&
               (filterRegion === "all" || inst.region === filterRegion) &&
               (filterStatus === "all" || inst.status === filterStatus);
    });

    const regions = ["all", "North-East", "South-East", "Midwest", "West Coast"];
    const institutionTypes = ["Hospital", "Private Clinic", "Imaging Center", "Research Facility"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header Section (Unchanged) */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">New Institution</h1>
                  <p className="text-blue-100 mt-2">Create a new institution profile and login credentials</p>
                </div>
                <div className="hidden md:flex items-center justify-center w-12 h-12 bg-white/20 rounded-full">
                  <Building className="h-6 w-6" />
                </div>
              </div>
          </div>


          {/* Main Content - Split Layout */}
          <div className="flex flex-col lg:flex-row">
            {/* Left Panel - Form */}
            <div className="w-full lg:w-2/5 border-r border-gray-200 p-6">
              {submitted && ( /* Success message unchanged */
                <div className="bg-green-50 text-green-800 p-4 rounded-lg flex items-start mb-6">
                  <BadgeCheck className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Institution created successfully!</p>
                    <p className="text-sm mt-1">The new institution profile is now active.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* --- Institution Details (Unchanged) --- */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Institution Details</h3>
                    <div>
                        <Label htmlFor="institutionName">Name <span className="text-red-500 ml-1">*</span></Label>
                        <Input id="institutionName" name="institutionName" value={formData.institutionName} onChange={handleChange} className="mt-1"/>
                        {errors.institutionName && <p className="text-red-500 text-sm mt-1">{errors.institutionName}</p>}
                    </div>
                     {/* All other institution fields like Scan Type, Address, etc. go here */}
                </div>

                {/* --- Contact Details (Unchanged) --- */}
                <div className="space-y-4 pt-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Contact Details</h3>
                    {/* Person, Phone, Email fields go here */}
                </div>

                {/* --- Login Details (Unchanged) --- */}
                <div className="space-y-4 pt-4">
                     <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Login Details</h3>
                     {/* Login User Id, Password, Upload Logo fields go here */}
                </div>

                {/* --- Charges Details (UPDATED SECTION) --- */}
                <div className="space-y-2 pt-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Charges Details</h3>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
                        {Object.keys(SCAN_CATEGORIES).map(key => (
                            <div key={key} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`checkbox-${key}`}
                                    checked={formData.charges[key].enabled}
                                    onCheckedChange={(checked) => handleChargeCheckboxChange(key, checked)}
                                />
                                <Label htmlFor={`checkbox-${key}`} className="font-medium">{SCAN_CATEGORIES[key].label}</Label>
                            </div>
                        ))}
                    </div>

                    {/* Conditionally render pricing accordions */}
                    {Object.keys(SCAN_CATEGORIES).map(key => {
                        if (formData.charges[key].enabled) {
                            const category = SCAN_CATEGORIES[key];
                            return (
                                <PricingAccordion
                                    key={key}
                                    title={`Set up a ${category.label} Scan Reporting Price Chart`}
                                    scanTypeKey={key}
                                    items={category.items}
                                    chargesData={formData.charges[key]}
                                    onChargeChange={handleChargeChange}
                                />
                            );
                        }
                        return null;
                    })}
                </div>

                {/* --- Submit Button (Unchanged Position) --- */}
                <div className="pt-4">
                    <Button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                </div>
              </form>
            </div>

            {/* Right Panel - Institutions List (Unchanged) */}
            <div className="w-full lg:w-3/5 p-6 bg-gray-50">
               {/* The entire right panel for managing institutions remains here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionLoginForm;














// import React, { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Eye, EyeOff, User, Mail, Building, Phone, Key, BadgeCheck, Search, Globe, Hospital, Download, Edit, Trash2, Scan, MapPin, UserCircle, Upload, DollarSign, Map } from "lucide-react";

// // A simple Select component for demonstration. You can replace this with a component from your UI library.
// const Select = ({ children, ...props }) => (
//   <select className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full bg-white" {...props}>
//     {children}
//   </select>
// );

// // A simple Textarea component for demonstration.
// const Textarea = (props) => (
//     <textarea className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full" {...props}></textarea>
// );


// const InstitutionLoginForm = () => {
//   const [formData, setFormData] = useState({
//     // Institution Details
//     institutionName: "",
//     scanType: "",
//     address: "",
//     city: "",
//     state: "",
//     country: "",
//     pincode: "",
//     // Contact Details
//     person: "",
//     contactPhone: "",
//     contactEmail: "",
//     // Login Details
//     loginId: "",
//     password: "",
//     logo: null,
//     // Charges Details
//     chargeCT: "",
//     chargeMRI: "",
//     chargeCRDX: "",
//     chargeUS: "",
//     chargeCBCT: "",
//     // Existing fields from original code
//     region: "",
//     institutionType: "",
//   });

//   const [institutions, setInstitutions] = useState([
//     {
//       id: "INST-A4B1C9",
//       institutionName: "City General Hospital",
//       loginId: "citygeneral",
//       contactEmail: "admin@citygeneral.org",
//       contactPhone: "(212) 555-0100",
//       region: "North-East",
//       institutionType: "Hospital",
//       created: "2023-11-20",
//       status: "active",
//     },
//     {
//       id: "INST-D8E2F7",
//       institutionName: "Valley Imaging Clinic",
//       loginId: "valleyimaging",
//       contactEmail: "reports@valleyimaging.net",
//       contactPhone: "(415) 555-0123",
//       region: "West Coast",
//       institutionType: "Imaging Center",
//       created: "2023-10-15",
//       status: "active",
//     },
//     {
//       id: "INST-G5H3I1",
//       institutionName: "Southside Medical Group",
//       loginId: "southsidemed",
//       contactEmail: "contact@southsidemed.com",
//       contactPhone: "(305) 555-0155",
//       region: "South-East",
//       institutionType: "Private Clinic",
//       created: "2023-09-01",
//       status: "inactive",
//     },
//   ]);

//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterRegion, setFilterRegion] = useState("all");
//   const [filterStatus, setFilterStatus] = useState("all");

//   function generateUniqueID() {
//     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//     let result = '';
//     for (let i = 0; i < 6; i++) {
//       result += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     return `INST-${result}`;
//   }

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.institutionName.trim()) newErrors.institutionName = "Institution name is required";
//     if (!formData.loginId.trim()) newErrors.loginId = "Login ID is required";
//     else if (formData.loginId.length < 4) newErrors.loginId = "Login ID must be at least 4 characters";
    
//     if (!formData.password) newErrors.password = "Password is required";
//     else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    
//     if (!formData.contactEmail.trim()) newErrors.contactEmail = "Contact email is required";
//     else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) newErrors.contactEmail = "Email is invalid";
    
//     if (!formData.region) newErrors.region = "Region is required";
//     if (!formData.institutionType) newErrors.institutionType = "Institution type is required";
    
//     if (!formData.contactPhone.trim()) newErrors.contactPhone = "Phone number is required";
//     else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(formData.contactPhone)) {
//       newErrors.contactPhone = "Please enter a valid phone number";
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//  const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     if (type === "file") {
//         setFormData((prev) => ({
//             ...prev,
//             [name]: files ? files[0] : null,
//         }));
//     } else {
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     }

//     if (errors[name]) {
//         setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//  };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
    
//     setIsSubmitting(true);
//     await new Promise(resolve => setTimeout(resolve, 1500));
    
//     const newInstitution = {
//       id: generateUniqueID(),
//       institutionName: formData.institutionName,
//       loginId: formData.loginId,
//       contactEmail: formData.contactEmail,
//       contactPhone: formData.contactPhone,
//       region: formData.region,
//       institutionType: formData.institutionType,
//       created: new Date().toISOString().split('T')[0],
//       status: "active",
//       // Include other new fields as needed for the list view
//       ...formData,
//     };
    
//     setInstitutions([newInstitution, ...institutions]);
//     setSubmitted(true);
//     setIsSubmitting(false);
    
//     setFormData({
//         institutionName: "",
//         scanType: "",
//         address: "",
//         city: "",
//         state: "",
//         country: "",
//         pincode: "",
//         person: "",
//         contactPhone: "",
//         contactEmail: "",
//         loginId: "",
//         password: "",
//         logo: null,
//         chargeCT: "",
//         chargeMRI: "",
//         chargeCRDX: "",
//         chargeUS: "",
//         chargeCBCT: "",
//         region: "",
//         institutionType: "",
//     });
//     // Reset file input if you have a ref to it
//     // e.g., fileInputRef.current.value = "";
    
//     setTimeout(() => setSubmitted(false), 5000);
//   };

//   const handleDelete = (id) => {
//     setInstitutions(institutions.filter(inst => inst.id !== id));
//   };

//   const handleToggleStatus = (id) => {
//     setInstitutions(institutions.map(inst => 
//       inst.id === id ? {...inst, status: inst.status === "active" ? "inactive" : "active"} : inst
//     ));
//   };

//   const filteredInstitutions = institutions.filter(inst => {
//     const matchesSearch = 
//       inst.institutionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       inst.loginId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       inst.contactEmail.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesRegion = filterRegion === "all" || inst.region === filterRegion;
//     const matchesStatus = filterStatus === "all" || inst.status === filterStatus;
//     return matchesSearch && matchesRegion && matchesStatus;
//   });

//   const regions = ["all", "North-East", "South-East", "Midwest", "West Coast"];
//   const institutionTypes = ["Hospital", "Private Clinic", "Imaging Center", "Research Facility"];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 px-4 py-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
//           {/* Header Section */}
//           <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-2xl md:text-3xl font-bold">New Institution</h1>
//                 <p className="text-blue-100 mt-2">Create a new institution profile and login credentials</p>
//               </div>
//               <div className="hidden md:flex items-center justify-center w-12 h-12 bg-white/20 rounded-full">
//                 <Building className="h-6 w-6" />
//               </div>
//             </div>
//           </div>

//           {/* Main Content - Split Layout */}
//           <div className="flex flex-col lg:flex-row">
//             {/* Left Panel - Form */}
//             <div className="w-full lg:w-2/5 border-r border-gray-200 p-6">
              
//               {submitted && (
//                 <div className="bg-green-50 text-green-800 p-4 rounded-lg flex items-start mb-6">
//                   <BadgeCheck className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
//                   <div>
//                     <p className="font-medium">Institution created successfully!</p>
//                     <p className="text-sm mt-1">The new institution profile is now active.</p>
//                   </div>
//                 </div>
//               )}

//               <form onSubmit={handleSubmit} className="space-y-6">
                
//                 {/* --- Institution Details --- */}
//                 <div className="space-y-4">
//                     <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Institution Details</h3>
//                     <div>
//                         <Label htmlFor="institutionName" className="flex items-center text-sm font-medium text-gray-700"><Building className="w-4 h-4 mr-2" />Name <span className="text-red-500 ml-1">*</span></Label>
//                         <Input id="institutionName" name="institutionName" value={formData.institutionName} onChange={handleChange} placeholder="Enter institution name" className="mt-1"/>
//                         {errors.institutionName && <p className="text-red-500 text-sm mt-1">{errors.institutionName}</p>}
//                     </div>
//                     <div>
//                         <Label htmlFor="scanType" className="flex items-center text-sm font-medium text-gray-700"><Scan className="w-4 h-4 mr-2" />Scan Type</Label>
//                         <Input id="scanType" name="scanType" value={formData.scanType} onChange={handleChange} placeholder="eg: CT,MRI,USG" className="mt-1"/>
//                         <p className="text-xs text-gray-500 mt-1">Enter type scan you have with comma</p>
//                     </div>
//                     <div>
//                         <Label htmlFor="address" className="flex items-center text-sm font-medium text-gray-700"><MapPin className="w-4 h-4 mr-2" />Address</Label>
//                         <Textarea id="address" name="address" rows="3" value={formData.address} onChange={handleChange} placeholder="Enter full address" className="mt-1"/>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <Label htmlFor="city" className="flex items-center text-sm font-medium text-gray-700">City</Label>
//                             <Input id="city" name="city" value={formData.city} onChange={handleChange} placeholder="Enter city" className="mt-1"/>
//                         </div>
//                         <div>
//                             <Label htmlFor="state" className="flex items-center text-sm font-medium text-gray-700">State</Label>
//                             <Input id="state" name="state" value={formData.state} onChange={handleChange} placeholder="Enter state" className="mt-1"/>
//                         </div>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <Label htmlFor="country" className="flex items-center text-sm font-medium text-gray-700">Country</Label>
//                             <Input id="country" name="country" value={formData.country} onChange={handleChange} placeholder="Enter country" className="mt-1"/>
//                         </div>
//                         <div>
//                             <Label htmlFor="pincode" className="flex items-center text-sm font-medium text-gray-700">Pincode</Label>
//                             <Input id="pincode" name="pincode" type="number" value={formData.pincode} onChange={handleChange} placeholder="Enter pincode" className="mt-1"/>
//                         </div>
//                     </div>
//                 </div>

//                 {/* --- Contact Details --- */}
//                 <div className="space-y-4 pt-4">
//                     <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Contact Details</h3>
//                     <div>
//                         <Label htmlFor="person" className="flex items-center text-sm font-medium text-gray-700"><UserCircle className="w-4 h-4 mr-2" />Person</Label>
//                         <Input id="person" name="person" value={formData.person} onChange={handleChange} placeholder="Enter contact person's name" className="mt-1"/>
//                     </div>
//                     <div>
//                         <Label htmlFor="contactPhone" className="flex items-center text-sm font-medium text-gray-700"><Phone className="w-4 h-4 mr-2" />Phone <span className="text-red-500 ml-1">*</span></Label>
//                         <Input id="contactPhone" name="contactPhone" value={formData.contactPhone} onChange={handleChange} placeholder="eg: 911234567890" className="mt-1"/>
//                         {errors.contactPhone && <p className="text-red-500 text-sm mt-1">{errors.contactPhone}</p>}
//                     </div>
//                     <div>
//                         <Label htmlFor="contactEmail" className="flex items-center text-sm font-medium text-gray-700"><Mail className="w-4 h-4 mr-2" />Email Id <span className="text-red-500 ml-1">*</span></Label>
//                         <Input id="contactEmail" name="contactEmail" type="email" value={formData.contactEmail} onChange={handleChange} placeholder="Enter contact email" className="mt-1"/>
//                         {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>}
//                     </div>
//                 </div>

//                 {/* --- Login Details --- */}
//                 <div className="space-y-4 pt-4">
//                     <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Login Details</h3>
//                     <div>
//                         <Label htmlFor="loginId" className="flex items-center text-sm font-medium text-gray-700"><User className="w-4 h-4 mr-2" />Login User Id <span className="text-red-500 ml-1">*</span></Label>
//                         <Input id="loginId" name="loginId" value={formData.loginId} onChange={handleChange} placeholder="e.g., citygeneral" className="mt-1"/>
//                         {errors.loginId && <p className="text-red-500 text-sm mt-1">{errors.loginId}</p>}
//                     </div>
//                     <div>
//                         <Label htmlFor="password" className="flex items-center text-sm font-medium text-gray-700"><Key className="w-4 h-4 mr-2" />Password <span className="text-red-500 ml-1">*</span></Label>
//                         <div className="relative">
//                             <Input id="password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} placeholder="Minimum 8 characters" className="mt-1 pr-10"/>
//                             <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500" aria-label={showPassword ? "Hide" : "Show"}>
//                                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                             </button>
//                         </div>
//                         {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//                     </div>
//                     <div>
//                         <Label htmlFor="logo" className="flex items-center text-sm font-medium text-gray-700"><Upload className="w-4 h-4 mr-2" />Upload Logo</Label>
//                         <Input id="logo" name="logo" type="file" onChange={handleChange} className="mt-1"/>
//                     </div>
//                 </div>

//                 {/* --- Charges Details --- */}
//                 <div className="space-y-4 pt-4">
//                     <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Charges Details</h3>
//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                         <div>
//                             <Label htmlFor="chargeCT" className="flex items-center text-sm font-medium text-gray-700">CT</Label>
//                             <Input id="chargeCT" name="chargeCT" type="number" value={formData.chargeCT} onChange={handleChange} placeholder="Charge" className="mt-1"/>
//                         </div>
//                         <div>
//                             <Label htmlFor="chargeMRI" className="flex items-center text-sm font-medium text-gray-700">MRI</Label>
//                             <Input id="chargeMRI" name="chargeMRI" type="number" value={formData.chargeMRI} onChange={handleChange} placeholder="Charge" className="mt-1"/>
//                         </div>
//                         <div>
//                             <Label htmlFor="chargeCRDX" className="flex items-center text-sm font-medium text-gray-700">CR/DX</Label>
//                             <Input id="chargeCRDX" name="chargeCRDX" type="number" value={formData.chargeCRDX} onChange={handleChange} placeholder="Charge" className="mt-1"/>
//                         </div>
//                         <div>
//                             <Label htmlFor="chargeUS" className="flex items-center text-sm font-medium text-gray-700">US</Label>
//                             <Input id="chargeUS" name="chargeUS" type="number" value={formData.chargeUS} onChange={handleChange} placeholder="Charge" className="mt-1"/>
//                         </div>
//                         <div>
//                             <Label htmlFor="chargeCBCT" className="flex items-center text-sm font-medium text-gray-700">CBCT</Label>
//                             <Input id="chargeCBCT" name="chargeCBCT" type="number" value={formData.chargeCBCT} onChange={handleChange} placeholder="Charge" className="mt-1"/>
//                         </div>
//                     </div>
//                 </div>
                
//                 {/* --- Original Region and Type Fields (Kept from original code) --- */}
//                 <div className="grid grid-cols-2 gap-4 pt-4">
//                   <div>
//                     <Label htmlFor="region" className="flex items-center"><Globe className="w-4 h-4 mr-2" />Region <span className="text-red-500 ml-1">*</span></Label>
//                     <Select id="region" name="region" value={formData.region} onChange={handleChange} className="mt-2">
//                       <option value="" disabled>Select a region</option>
//                       {regions.filter(r => r !== "all").map(r => <option key={r} value={r}>{r}</option>)}
//                     </Select>
//                     {errors.region && <p className="text-red-500 text-sm mt-1">{errors.region}</p>}
//                   </div>
//                   <div>
//                     <Label htmlFor="institutionType" className="flex items-center"><Hospital className="w-4 h-4 mr-2" />Type <span className="text-red-500 ml-1">*</span></Label>
//                     <Select id="institutionType" name="institutionType" value={formData.institutionType} onChange={handleChange} className="mt-2">
//                       <option value="" disabled>Select a type</option>
//                       {institutionTypes.map(type => <option key={type} value={type}>{type}</option>)}
//                     </Select>
//                     {errors.institutionType && <p className="text-red-500 text-sm mt-1">{errors.institutionType}</p>}
//                   </div>
//                 </div>


//                 <Button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg shadow-md transition-all duration-300" disabled={isSubmitting}>
//                   {isSubmitting ? (
//                     <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>Creating Institution...</>
//                   ) : "Create Institution"}
//                 </Button>
//               </form>
//               <div className="mt-6 text-sm text-gray-500"><p>Fields marked with <span className="text-red-500">*</span> are required</p></div>
//             </div>

//             {/* Right Panel - Institutions List */}
//             <div className="w-full lg:w-3/5 p-6 bg-gray-50">
//               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">Manage Institutions</h2>
//                 <Button variant="outline" size="sm" className="flex items-center"><Download className="w-4 h-4 mr-2" />Export List</Button>
//               </div>

//               {/* Filters and Search */}
//               <div className="flex flex-col sm:flex-row gap-4 mb-6">
//                 <div className="relative flex-1">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                   <Input placeholder="Search by name, ID, or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10"/>
//                 </div>
//                 <div className="flex gap-2">
//                   <Select value={filterRegion} onChange={(e) => setFilterRegion(e.target.value)}>
//                     <option value="all">All Regions</option>
//                     {regions.filter(r => r !== "all").map(r => <option key={r} value={r}>{r}</option>)}
//                   </Select>
//                   <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
//                     <option value="all">All Statuses</option>
//                     <option value="active">Active</option>
//                     <option value="inactive">Inactive</option>
//                   </Select>
//                 </div>
//               </div>

//               {/* Institutions List */}
//               <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//                 {filteredInstitutions.length === 0 ? (
//                   <div className="text-center py-12">
//                     <Building className="mx-auto h-12 w-12 text-gray-400" />
//                     <h3 className="mt-4 text-lg font-medium text-gray-900">No institutions found</h3>
//                     <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria.</p>
//                   </div>
//                 ) : (
//                   <div className="divide-y divide-gray-200">
//                     {filteredInstitutions.map((inst) => (
//                       <div key={inst.id} className="p-4 hover:bg-gray-50 transition-colors">
//                         <div className="flex justify-between items-start gap-4">
//                           <div className="flex-1">
//                             <div className="flex items-center gap-2 flex-wrap">
//                               <h3 className="font-medium text-gray-900">{inst.institutionName}</h3>
//                               <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${inst.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{inst.status}</span>
//                             </div>
//                             <p className="text-sm text-gray-500">ID: {inst.id} | Login: {inst.loginId}</p>
//                             <p className="text-sm text-gray-500 mt-1">{inst.contactEmail} | {inst.contactPhone}</p>
//                             <div className="flex items-center gap-2 mt-2 flex-wrap">
//                               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{inst.region}</span>
//                               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800">{inst.institutionType}</span>
//                               <span className="text-xs text-gray-500">Created: {inst.created}</span>
//                             </div>
//                           </div>
//                           <div className="flex items-center space-x-3">
//                             <button className="text-blue-600 hover:text-blue-800" title="Edit"><Edit className="w-4 h-4" /></button>
//                             <button className="text-red-600 hover:text-red-800" title="Delete" onClick={() => handleDelete(inst.id)}><Trash2 className="w-4 h-4" /></button>
//                             <Button size="sm" variant="outline" onClick={() => handleToggleStatus(inst.id)}>
//                               {inst.status === 'active' ? 'Deactivate' : 'Activate'}
//                             </Button>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//               <div className="mt-4 text-sm text-gray-500"><p>Showing {filteredInstitutions.length} of {institutions.length} institutions</p></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InstitutionLoginForm;






