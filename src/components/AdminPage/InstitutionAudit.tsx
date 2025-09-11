import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox"; // Make sure you have this component
import { 
    Eye, EyeOff, User, Mail, Building, Phone, Key, BadgeCheck, 
    Search, Globe, Hospital, Download, Edit, Trash2, Scan, 
    MapPin, UserCircle, Upload, ChevronUp, ChevronDown 
} from "lucide-react";

// --- TYPE DEFINITIONS ---
interface Price {
    base: string;
    withCommunication: string;
}

interface ChargeCategory {
    enabled: boolean;
    prices: Record<string, Price>;
}

interface FormState {
    institutionName: string;
    scanType: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    person: string;
    contactPhone: string;
    contactEmail: string;
    loginId: string;
    password: string;
    logo: File | null;
    region: string;
    institutionType: string;
    charges: Record<string, ChargeCategory>;
}

type FormErrors = {
    [K in keyof FormState]?: K extends 'charges'
        ? { [scanType: string]: { [itemKey: string]: { base?: string; withCommunication?: string } } }
        : string;
};

// --- DATA FOR PRICING CHARTS ---
// Based on your screenshots
const CT_SCAN_ITEMS = [
    { key: 'brain', label: 'Brain' },
    { key: 'spineCervical', label: 'Spine Cervical' },
    { key: 'spineDorsal', label: 'Spine Dorsal' },
    { key: 'lumbar', label: 'Lumbar' },
    { key: 'sacral', label: 'Sacral' },
    { key: 'brachialPlexus', label: 'Brachial Plexus' },
    { key: 'chest', label: 'Chest' },
    { key: 'abdomen', label: 'Abdomen' },
    { key: 'pelvis', label: 'Pelvis' },
    { key: 'middleEarTemporalBone', label: 'Middle Ear & Temporal Bone' },
    { key: 'nasopharynx', label: 'Nasopharynx' },
    { key: 'shoulderJoint', label: 'Shoulder Joint' },
    { key: 'elbowJoint', label: 'Elbow Joint' },
    { key: 'paranasalSinuses', label: 'Paranasal Sinuses (PNS)' },
    { key: 'wristJoint', label: 'Wrist Joint' },
    { key: 'hand', label: 'Hand' },
    { key: 'hipJoint', label: 'Hip Joint' },
    { key: 'kneeJoint', label: 'Knee Joint' },
    { key: 'ankleJoint', label: 'Ankle Joint' },
    { key: 'foot', label: 'Foot' },
    { key: 'temporomandibularJoint', label: 'Temporo-Mandibular (TMJ)' },
    { key: 'orbit', label: 'Orbit' },
    { key: 'breast', label: 'Breast' },
    { key: 'neck', label: 'Neck' },
    { key: 'plainKUB', label: 'Plain KUB' },
    { key: 'opticNerveImaging', label: 'Optic Nerve Imaging' },
    { key: 'ctUrography', label: 'CT Urography' },
    { key: 'abdomenAngiogram', label: 'Abdomen Angiogram' },
    { key: 'aortaAngiogram', label: 'Aorta Angiogram' },
    { key: 'brainAngiogram', label: 'Brain Angiogram' },
    { key: 'coronaryAngiogram', label: 'Coronary Angiogram' },
    { key: 'dlSpine', label: 'DL Spine' },
    { key: 'femur', label: 'Femur' },
    { key: 'forearm', label: 'Forearm' },
    { key: 'leg', label: 'Leg' },
    { key: 'lsSpine', label: 'LS Spine' },
    { key: 'mandible', label: 'Mandible' },
    { key: 'neckAngiogram', label: 'Neck Angiogram' },
    { key: 'pulmonaryAngiogram', label: 'Pulmonary Angiogram' },
    { key: 'renalAngiogram', label: 'Renal Angiogram' },
    { key: 'sacrumCoccyx', label: 'Sacrum Coccyx' },
    { key: 'tmJoint', label: 'TM Joint' },
    { key: 'triphasicAngiogram', label: 'Triphasic Angiogram' },
    { key: 'upperLimbAngiogram', label: 'Upper Limb Angiogram' },
    { key: 'urogram', label: 'Urogram' },
    { key: 'humerus', label: 'Humerus' },
    { key: 'limitedFieldOfView', label: 'Limited Field of View (less than one whole jaw)' },
    { key: 'fullDentalArch', label: 'Full Dental Arch (Mandible or Maxilla)' },
    { key: 'bothJaws', label: 'Both Jaws (Maxilla and Mandible)' },
    { key: 'tmjSeries', label: 'TMJ Series' },
    { key: 'fullMouth', label: 'Full Mouth (Both Jaw Arches)' },
    { key: 'cbctSectionalView', label: 'CBCT Sectional View' },
    { key: 'cbctMaxillaArch', label: 'CBCT Maxilla Arch' },
    { key: 'cbctMandibleArch', label: 'CBCT Mandible Arch' },
];

const MRI_SCAN_ITEMS = [
    { key: 'brain', label: 'Brain' },
    { key: 'pituitary', label: 'Pituitary' },
    { key: 'orbit', label: 'Orbit' },
    { key: 'ear', label: 'Ear' },
    { key: 'tmJoint', label: 'Tm Joint' },
    { key: 'cervicalSpine', label: 'Cervical Spine' },
    { key: 'dorsalSpine', label: 'Dorsal Spine' },
    { key: 'lumboSacralSpine', label: 'Lumbo Sacral Spine' },
    { key: 'brachialPlexus', label: 'Brachial Plexus' },
    { key: 'faceNeck', label: 'Face/Neck' },
    { key: 'chest', label: 'Chest' },
    { key: 'abdomen', label: 'Abdomen' },
    { key: 'mrcp', label: 'MRCP' },
    { key: 'mrUrography', label: 'MR Urography' },
    { key: 'mrFistulography', label: 'MR Fistulography' },
    { key: 'pelvis', label: 'Pelvis' },
    { key: 'fetalMri', label: 'Fetal MRI' },
    { key: 'shoulderJoint', label: 'Shoulder Joint' },
    { key: 'elbowJoint', label: 'Elbow Joint' },
    { key: 'wristJoint', label: 'Wrist Joint' },
    { key: 'hand', label: 'Hand' },
    { key: 'hipStJoint', label: 'Hip/ST Joint' },
    { key: 'kneeJoint', label: 'Knee Joint' },
    { key: 'ankleJoint', label: 'Ankle Joint' },
    { key: 'foot', label: 'Foot' },
    { key: 'dlSpine', label: 'DL Spine' },
    { key: 'femur', label: 'Femur' },
    { key: 'forearm', label: 'Forearm' },
    { key: 'humerus', label: 'Humerus' },
    { key: 'mandible', label: 'Mandible' },
    { key: 'paranasalSinuses', label: 'Paranasal Sinuses (PNS)' },
    { key: 'screening', label: 'Screening' },
    { key: 'temporomandibularJoint', label: 'Tempero-Mandibular Joint (TMJ)' },
    { key: 'tibia', label: 'Tibia' },
];



const CRDX_SCAN_ITEMS = [
    { key: 'abdomen', label: 'Abdomen' },
    { key: 'ankleJoint', label: 'Ankle Joint' },
    { key: 'aug', label: 'AUG' },
    { key: 'bariumEnema', label: 'Barium Enema' },
    { key: 'bariumMealSeries', label: 'Barium Meal Series' },
    { key: 'bariumSwallow', label: 'Barium Swallow' },
    { key: 'bothKneeJointsStanding', label: 'Both Knee Joints Standing' },
    { key: 'calcanium', label: 'Calcanium' },
    { key: 'cervicalSpine', label: 'Cervical Spine' },
    { key: 'chest', label: 'Chest' },
    { key: 'cholecystography', label: 'Cholecystography' },
    { key: 'clavicle', label: 'Clavicle' },
    { key: 'coccyx', label: 'Coccyx' },
    { key: 'cvj', label: 'CVJ' },
    { key: 'cystogram', label: 'Cystogram' },
    { key: 'dorsalLumboSpine', label: 'Dorsal Lumbo Spine (DL Spine)' },
    { key: 'dorsalSpine', label: 'Dorsal Spine' },
    { key: 'elbowJoint', label: 'Elbow Joint' },
    { key: 'femur', label: 'Femur' },
    { key: 'finger', label: 'Finger' },
    { key: 'foot', label: 'Foot' },
    { key: 'forearm', label: 'Forearm' },
    { key: 'hand', label: 'Hand' },
    { key: 'handJoint', label: 'Hand Joint' },
    { key: 'humerus', label: 'Humerus' },
    { key: 'hysteroSalpingography', label: 'Hystero Salpingography' },
    { key: 'intraOral', label: 'Intra Oral' },
    { key: 'invertogram', label: 'Invertogram' },
    { key: 'ivp', label: 'IVP' },
    { key: 'kneeJoint', label: 'Knee Joint' },
    { key: 'kub', label: 'KUB' },
    { key: 'latCephalometry', label: 'Lat Cephalometry' },
    { key: 'leg', label: 'Leg' },
    { key: 'lumboSacralSpine', label: 'Lumbo Sacral Spine (LS Spine)' },
    { key: 'mammography', label: 'Mammography' },
    { key: 'mandible', label: 'Mandible' },
    { key: 'mastoid', label: 'Mastoid' },
    { key: 'mcu', label: 'MCU' },
    { key: 'nasalBones', label: 'Nasal Bones' },
    { key: 'neck', label: 'Neck' },
    { key: 'orbit', label: 'Orbit' },
    { key: 'orthopantomogram', label: 'Orthopantomogram (OPG)' },
    { key: 'paranasalSinuses', label: 'Paranasal Sinuses (PNS)' },
    { key: 'pelvis', label: 'Pelvis' },
    { key: 'sacrum', label: 'Sacrum' },
    { key: 'scapula', label: 'Scapula' },
    { key: 'shoulder', label: 'Shoulder' },
    { key: 'siJoint', label: 'SI Joint' },
    { key: 'sinogram', label: 'Sinogram' },
    { key: 'skull', label: 'Skull' },
    { key: 'tmJoint', label: 'TM Joint' },
    { key: 'wristJoint', label: 'Wrist Joint' },
];

// Placeholder data for other scan types
const US_SCAN_ITEMS = [
    { key: 'abdomen', label: 'Abdomen' },
    { key: 'afi', label: 'AFI' },
    { key: 'aminocentesisStudy', label: 'Aminocentesis Study' },
    { key: 'anomaly', label: 'Anomaly' },
    { key: 'breast', label: 'Breast' },
    { key: 'chest', label: 'Chest' },
    { key: 'earlyObstetric', label: 'Early Obstetric' },
    { key: 'follicularStudy', label: 'Follicular Study' },
    { key: 'gynaec', label: 'Gynaec' },
    { key: 'hip', label: 'Hip' },
    { key: 'inguinalRegion', label: 'Inguinal Region' },
    { key: 'neck', label: 'Neck' },
    { key: 'neurosonogram', label: 'Neurosonogram' },
    { key: 'nuchalTranslucency', label: 'Nuchal Translucency' },
    { key: 'obstetric', label: 'Obstetric' },
    { key: 'overSwelling', label: 'Over Swelling' },
    { key: 'pelvis', label: 'Pelvis' },
    { key: 'perinealRegion', label: 'Perineal Region' },
    { key: 'scrotum', label: 'Scrotum' },
    { key: 'sonosalpingography', label: 'Sonosalpingography' },
    { key: 'spine', label: 'Spine' },
    { key: 'survey', label: 'Survey' },
    { key: 'thyroid', label: 'Thyroid' },
    { key: 'transvaginalScan', label: 'Transvaginal Scan (TVS)' },
    { key: 'usgGuidedMarkingStudy', label: 'USG-guided Marking Study' },
    { key: 'usgGuidedMarkingToppingStudy', label: 'USG-guided Marking & Topping Study' },
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
const PricingAccordion = ({ title, scanTypeKey, items, chargesData, onChargeChange, errors }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="border border-blue-200 rounded-lg bg-white mt-4">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-3 bg-blue-50 text-blue-800 font-semibold text-left rounded-t-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                {title}
                {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {isOpen && (
                <div className="p-4">
                    <div className="hidden md:grid md:grid-cols-12 gap-4 items-center px-2 pb-2 border-b">
                        <div className="md:col-span-6 font-medium text-sm text-gray-600">Scan Item</div>
                        <div className="md:col-span-3 font-medium text-sm text-gray-600">Price</div>
                        <div className="md:col-span-3 font-medium text-sm text-gray-600">with Communication</div>
                    </div>
                    <div className="space-y-3">
                    {items.map(({ key, label }) => {
                        const baseError = errors?.[key]?.base;
                        const withCommunicationError = errors?.[key]?.withCommunication;
                        return (
                            <div key={key} className="grid grid-cols-1 md:grid-cols-12 gap-x-4 gap-y-2 items-start border-t pt-3">
                                <div className="md:col-span-6">
                                    <Label htmlFor={`${scanTypeKey}-${key}-base`} className="font-normal text-sm">{label}</Label>
                                </div>
                                <div className="md:col-span-3">
                                    <Label className="text-xs text-gray-500 md:hidden">Price</Label>
                                    <Input
                                        id={`${scanTypeKey}-${key}-base`}
                                        name={`${scanTypeKey}.prices.${key}.base`}
                                        type="number"
                                        placeholder="0"
                                        min="0"
                                        value={chargesData.prices[key].base}
                                        onChange={onChargeChange}
                                        className={baseError ? 'border-red-500' : ''}
                                    />
                                    {baseError && <p className="text-red-500 text-xs mt-1">{baseError}</p>}
                                </div>
                                <div className="md:col-span-3">
                                    <Label className="text-xs text-gray-500 md:hidden">with Communication</Label>
                                    <Input
                                        id={`${scanTypeKey}-${key}-withCommunication`}
                                        name={`${scanTypeKey}.prices.${key}.withCommunication`}
                                        type="number"
                                        placeholder="0"
                                        min="0"
                                        value={chargesData.prices[key].withCommunication}
                                        onChange={onChargeChange}
                                        className={withCommunicationError ? 'border-red-500' : ''}
                                    />
                                    {withCommunicationError && <p className="text-red-500 text-xs mt-1">{withCommunicationError}</p>}
                                </div>
                            </div>
                        );
                    })}
                    </div>
                </div>
            )}
        </div>
    );
};


const InstitutionLoginForm = () => {
  const [formData, setFormData] = useState<FormState>({
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
    charges: initializeChargesState(),
  });

  const [institutions, setInstitutions] = useState<any[]>([
    { id: "INST-A4B1C9", institutionName: "City General Hospital", loginId: "citygeneral", contactEmail: "admin@citygeneral.org", contactPhone: "(212) 555-0100", region: "North-East", institutionType: "Hospital", created: "2023-11-20", status: "active" },
    { id: "INST-D8E2F7", institutionName: "Valley Imaging Clinic", loginId: "valleyimaging", contactEmail: "reports@valleyimaging.net", contactPhone: "(415) 555-0123", region: "West Coast", institutionType: "Imaging Center", created: "2023-10-15", status: "active" },
    { id: "INST-G5H3I1", institutionName: "Southside Medical Group", loginId: "southsidemed", contactEmail: "contact@southsidemed.com", contactPhone: "(305) 555-0155", region: "South-East", institutionType: "Private Clinic", created: "2023-09-01", status: "inactive" },
  ]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRegion, setFilterRegion] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  
  function generateUniqueID() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `INST-${result}`;
  }

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.institutionName.trim()) newErrors.institutionName = "Institution name is required";
    if (!formData.loginId.trim()) newErrors.loginId = "Login ID is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (!formData.contactEmail.trim()) newErrors.contactEmail = "Contact email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) newErrors.contactEmail = "Email is invalid";
    if (!formData.contactPhone.trim()) newErrors.contactPhone = "Phone number is required";
    if (!formData.region) newErrors.region = "Region is required";
    if (!formData.institutionType) newErrors.institutionType = "Institution type is required";

    const chargesErrors: FormErrors['charges'] = {};
    Object.keys(formData.charges).forEach(scanTypeKey => {
        const chargeCategory = formData.charges[scanTypeKey];
        if (chargeCategory.enabled) {
            const scanTypeErrors = {};
            Object.keys(chargeCategory.prices).forEach(itemKey => {
                const price = chargeCategory.prices[itemKey];
                const itemErrors = {};
                if (price.base.trim() === '') {
                    itemErrors.base = "Required";
                } else if (isNaN(parseFloat(price.base)) || parseFloat(price.base) < 0) {
                    itemErrors.base = "Invalid price";
                }
                if (price.withCommunication.trim() === '') {
                    itemErrors.withCommunication = "Required";
                } else if (isNaN(parseFloat(price.withCommunication)) || parseFloat(price.withCommunication) < 0) {
                    itemErrors.withCommunication = "Invalid price";
                }

                if (Object.keys(itemErrors).length > 0) {
                    scanTypeErrors[itemKey] = itemErrors;
                }
            });
            if (Object.keys(scanTypeErrors).length > 0) {
                chargesErrors[scanTypeKey] = scanTypeErrors;
            }
        }
    });

    if (Object.keys(chargesErrors).length > 0) {
        newErrors.charges = chargesErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    const files = (e.target as HTMLInputElement).files;

    if (type === "file" && files) {
        setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleChargeCheckboxChange = (scanTypeKey, isChecked) => {
    setFormData(prev => ({
        ...prev,
        charges: {
            ...prev.charges,
            [scanTypeKey]: { ...prev.charges[scanTypeKey], enabled: !!isChecked }
        }
    }));
  };
    
  const handleChargeChange = (e) => {
    const { name, value } = e.target;
    const [scanType, field, subTypeKey, priceType] = name.split('.'); // e.g., "ct.prices.brain.base"
    setFormData(prev => ({
        ...prev,
        charges: { ...prev.charges, [scanType]: { ...prev.charges[scanType],
            prices: { ...prev.charges[scanType].prices, [subTypeKey]: { ...prev.charges[scanType].prices[subTypeKey], [priceType]: value }
            }
        }}
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Form Submitted:", formData); 

    const newInstitution = { id: generateUniqueID(), created: new Date().toISOString().split('T')[0], status: "active", ...formData };
    setInstitutions([newInstitution, ...institutions]);
    setSubmitted(true);
    setIsSubmitting(false);

    setFormData({
        institutionName: "", scanType: "", address: "", city: "", state: "", country: "", pincode: "",
        person: "", contactPhone: "", contactEmail: "", loginId: "", password: "", logo: null,
        region: "", institutionType: "", charges: initializeChargesState(),
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
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-screen-2xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">New Institution</h1>
                  <p className="text-blue-100 mt-2">Create a new institution profile and login credentials</p>
                </div>
                <div className="hidden md:flex items-center justify-center w-12 h-12 bg-white/20 rounded-full"><Building className="h-6 w-6" /></div>
              </div>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/3 xl:w-2/5 border-r border-gray-200 p-6">
              {submitted && (
                <div className="bg-green-50 text-green-800 p-4 rounded-lg flex items-start mb-6">
                  <BadgeCheck className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Institution created successfully!</p>
                    <p className="text-sm mt-1">The new institution profile is now active.</p>
                  </div>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Institution Details</h3>
                    <div>
                        <Label htmlFor="institutionName" className="flex items-center"><Building className="w-4 h-4 mr-2" />Name <span className="text-red-500 ml-1">*</span></Label>
                        <Input id="institutionName" name="institutionName" value={formData.institutionName} onChange={handleChange} placeholder="Enter institution name" className="mt-1"/>
                        {errors.institutionName && <p className="text-red-500 text-sm mt-1">{errors.institutionName}</p>}
                    </div>
                    <div>
                        <Label htmlFor="scanType" className="flex items-center"><Scan className="w-4 h-4 mr-2" />Scan Type</Label>
                        <Input id="scanType" name="scanType" value={formData.scanType} onChange={handleChange} placeholder="eg: CT,MRI,USG" className="mt-1"/>
                        <p className="text-xs text-gray-500 mt-1">Enter type scan you have with comma</p>
                    </div>
                    <div>
                        <Label htmlFor="address" className="flex items-center"><MapPin className="w-4 h-4 mr-2" />Address</Label>
                        <Textarea id="address" name="address" rows="3" value={formData.address} onChange={handleChange} placeholder="Enter full address" className="mt-1"/>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><Label htmlFor="city">City</Label><Input id="city" name="city" value={formData.city} onChange={handleChange} placeholder="Enter city" className="mt-1"/></div>
                        <div><Label htmlFor="state">State</Label><Input id="state" name="state" value={formData.state} onChange={handleChange} placeholder="Enter state" className="mt-1"/></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><Label htmlFor="country">Country</Label><Input id="country" name="country" value={formData.country} onChange={handleChange} placeholder="Enter country" className="mt-1"/></div>
                        <div><Label htmlFor="pincode">Pincode</Label><Input id="pincode" name="pincode" type="number" value={formData.pincode} onChange={handleChange} placeholder="Enter pincode" className="mt-1"/></div>
                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Contact Details</h3>
                    <div>
                        <Label htmlFor="person" className="flex items-center"><UserCircle className="w-4 h-4 mr-2" />Person</Label>
                        <Input id="person" name="person" value={formData.person} onChange={handleChange} placeholder="Enter contact person's name" className="mt-1"/>
                    </div>
                    <div>
                        <Label htmlFor="contactPhone" className="flex items-center"><Phone className="w-4 h-4 mr-2" />Phone <span className="text-red-500 ml-1">*</span></Label>
                        <Input id="contactPhone" name="contactPhone" value={formData.contactPhone} onChange={handleChange} placeholder="eg: 911234567890" className="mt-1"/>
                        {errors.contactPhone && <p className="text-red-500 text-sm mt-1">{errors.contactPhone}</p>}
                    </div>
                    <div>
                        <Label htmlFor="contactEmail" className="flex items-center"><Mail className="w-4 h-4 mr-2" />Email Id <span className="text-red-500 ml-1">*</span></Label>
                        <Input id="contactEmail" name="contactEmail" type="email" value={formData.contactEmail} onChange={handleChange} placeholder="Enter contact email" className="mt-1"/>
                        {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>}
                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Login Details</h3>
                    <div>
                        <Label htmlFor="loginId" className="flex items-center"><User className="w-4 h-4 mr-2" />Login User Id <span className="text-red-500 ml-1">*</span></Label>
                        <Input id="loginId" name="loginId" value={formData.loginId} onChange={handleChange} placeholder="e.g., citygeneral" className="mt-1"/>
                        {errors.loginId && <p className="text-red-500 text-sm mt-1">{errors.loginId}</p>}
                    </div>
                    <div>
                        <Label htmlFor="password" className="flex items-center"><Key className="w-4 h-4 mr-2" />Password <span className="text-red-500 ml-1">*</span></Label>
                        <div className="relative">
                            <Input id="password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} placeholder="Minimum 8 characters" className="mt-1 pr-10"/>
                            <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500" aria-label={showPassword ? "Hide" : "Show"}>{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    <div>
                        <Label htmlFor="logo" className="flex items-center"><Upload className="w-4 h-4 mr-2" />Upload Logo</Label>
                        <Input id="logo" name="logo" type="file" onChange={handleChange} className="mt-1"/>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="region" className="flex items-center"><Globe className="w-4 h-4 mr-2" />Region <span className="text-red-500 ml-1">*</span></Label>
                            <Select id="region" name="region" value={formData.region} onChange={handleChange} className="mt-2">
                                <option value="" disabled>Select a region</option>
                                {regions.filter(r => r !== "all").map(r => <option key={r} value={r}>{r}</option>)}
                            </Select>
                            {errors.region && <p className="text-red-500 text-sm mt-1">{errors.region}</p>}
                        </div>
                        <div>
                            <Label htmlFor="institutionType" className="flex items-center"><Hospital className="w-4 h-4 mr-2" />Type <span className="text-red-500 ml-1">*</span></Label>
                            <Select id="institutionType" name="institutionType" value={formData.institutionType} onChange={handleChange} className="mt-2">
                                <option value="" disabled>Select a type</option>
                                {institutionTypes.map(type => <option key={type} value={type}>{type}</option>)}
                            </Select>
                            {errors.institutionType && <p className="text-red-500 text-sm mt-1">{errors.institutionType}</p>}
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Charges Details</h3>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
                        {Object.keys(SCAN_CATEGORIES).map(key => (
                            <div key={key} className="flex items-center space-x-2">
                                <Checkbox id={`checkbox-${key}`} checked={formData.charges[key].enabled} onCheckedChange={(checked) => handleChargeCheckboxChange(key, checked)}/>
                                <Label htmlFor={`checkbox-${key}`} className="font-medium cursor-pointer">{SCAN_CATEGORIES[key].label}</Label>
                            </div>
                        ))}
                    </div>
                    {Object.keys(SCAN_CATEGORIES).map(key => formData.charges[key].enabled && (
                        <PricingAccordion 
                            key={key} 
                            title={`Set up a ${SCAN_CATEGORIES[key].label} Scan Reporting Price Chart`} 
                            scanTypeKey={key} 
                            items={SCAN_CATEGORIES[key].items} 
                            chargesData={formData.charges[key]} 
                            onChargeChange={handleChargeChange}
                            errors={errors.charges?.[key]}
                        />
                    ))}
                </div>
                <div>
                    <Button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white" disabled={isSubmitting}>
                      {isSubmitting ? "Creating Institution..." : "Submit"}
                    </Button>
                </div>
              </form>
            </div>
            <div className="w-full lg:w-2/3 xl:w-3/5 p-6 bg-gray-50">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-xl font-semibold text-gray-800">Manage Institutions</h2>
                <Button variant="outline" size="sm" className="flex items-center self-start sm:self-center"><Download className="w-4 h-4 mr-2" />Export List</Button>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Search by name, ID, or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10"/>
                </div>
                <div className="grid grid-cols-2 sm:flex gap-2">
                  <Select value={filterRegion} onChange={(e) => setFilterRegion(e.target.value)}>
                    <option value="all">All Regions</option>
                    {regions.filter(r => r !== "all").map(r => <option key={r} value={r}>{r}</option>)}
                  </Select>
                  <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Select>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {filteredInstitutions.length === 0 ? (
                  <div className="text-center py-12">
                    <Building className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No institutions found</h3>
                    <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {filteredInstitutions.map((inst) => (
                      <div key={inst.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="sm:col-span-2">
                            <div className="flex items-center gap-3 flex-wrap">
                                <h3 className="font-semibold text-gray-900 text-base">{inst.institutionName}</h3>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${inst.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{inst.status}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">ID: <span className="font-mono">{inst.id}</span> | Login: <span className="font-medium text-gray-600">{inst.loginId}</span></p>
                            <p className="text-sm text-gray-500 mt-1">{inst.contactEmail} | {inst.contactPhone}</p>
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{inst.region}</span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800">{inst.institutionType}</span>
                                <span className="text-xs text-gray-500">Created: {inst.created}</span>
                            </div>
                          </div>
                          <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-start gap-2">
                            <div className="flex items-center space-x-3">
                                <button className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100" title="Edit"><Edit className="w-4 h-4" /></button>
                                <button className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100" title="Delete" onClick={() => handleDelete(inst.id)}><Trash2 className="w-4 h-4" /></button>
                            </div>
                            <Button size="sm" variant="outline" onClick={() => handleToggleStatus(inst.id)}>{inst.status === 'active' ? 'Deactivate' : 'Activate'}</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="mt-4 text-sm text-gray-500"><p>Showing {filteredInstitutions.length} of {institutions.length} institutions</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionLoginForm;
