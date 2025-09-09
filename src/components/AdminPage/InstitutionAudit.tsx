import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, User, Mail, Building, Phone, Key, BadgeCheck, Search, Globe, Hospital, Download, Edit, Trash2 } from "lucide-react";

// A simple Select component for demonstration. You can replace this with a component from your UI library.
const Select = ({ children, ...props }) => (
  <select className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full bg-white" {...props}>
    {children}
  </select>
);

const InstitutionLoginForm = () => {
  const [formData, setFormData] = useState({
    institutionName: "",
    loginId: "",
    password: "",
    contactEmail: "",
    contactPhone: "",
    region: "",
    institutionType: "",
  });

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
    {
      id: "INST-D8E2F7",
      institutionName: "Valley Imaging Clinic",
      loginId: "valleyimaging",
      contactEmail: "reports@valleyimaging.net",
      contactPhone: "(415) 555-0123",
      region: "West Coast",
      institutionType: "Imaging Center",
      created: "2023-10-15",
      status: "active",
    },
    {
      id: "INST-G5H3I1",
      institutionName: "Southside Medical Group",
      loginId: "southsidemed",
      contactEmail: "contact@southsidemed.com",
      contactPhone: "(305) 555-0155",
      region: "South-East",
      institutionType: "Private Clinic",
      created: "2023-09-01",
      status: "inactive",
    },
  ]);

  const [errors, setErrors] = useState({});
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
    const newErrors = {};
    
    if (!formData.institutionName.trim()) newErrors.institutionName = "Institution name is required";
    if (!formData.loginId.trim()) newErrors.loginId = "Login ID is required";
    else if (formData.loginId.length < 4) newErrors.loginId = "Login ID must be at least 4 characters";
    
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    
    if (!formData.contactEmail.trim()) newErrors.contactEmail = "Contact email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) newErrors.contactEmail = "Email is invalid";
    
    if (!formData.region) newErrors.region = "Region is required";
    if (!formData.institutionType) newErrors.institutionType = "Institution type is required";
    
    if (!formData.contactPhone.trim()) newErrors.contactPhone = "Phone number is required";
    else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(formData.contactPhone)) {
      newErrors.contactPhone = "Please enter a valid phone number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newInstitution = {
      id: generateUniqueID(),
      institutionName: formData.institutionName,
      loginId: formData.loginId,
      contactEmail: formData.contactEmail,
      contactPhone: formData.contactPhone,
      region: formData.region,
      institutionType: formData.institutionType,
      created: new Date().toISOString().split('T')[0],
      status: "active",
    };
    
    setInstitutions([newInstitution, ...institutions]);
    setSubmitted(true);
    setIsSubmitting(false);
    
    setFormData({
      institutionName: "",
      loginId: "",
      password: "",
      contactEmail: "",
      contactPhone: "",
      region: "",
      institutionType: "",
    });
    
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleDelete = (id) => {
    setInstitutions(institutions.filter(inst => inst.id !== id));
  };

  const handleToggleStatus = (id) => {
    setInstitutions(institutions.map(inst => 
      inst.id === id ? {...inst, status: inst.status === "active" ? "inactive" : "active"} : inst
    ));
  };

  const filteredInstitutions = institutions.filter(inst => {
    const matchesSearch = 
      inst.institutionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inst.loginId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inst.contactEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = filterRegion === "all" || inst.region === filterRegion;
    const matchesStatus = filterStatus === "all" || inst.status === filterStatus;
    return matchesSearch && matchesRegion && matchesStatus;
  });

  const regions = ["all", "North-East", "South-East", "Midwest", "West Coast"];
  const institutionTypes = ["Hospital", "Private Clinic", "Imaging Center", "Research Facility"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Institution Login Management</h1>
                <p className="text-blue-100 mt-2">Manage portal access for partner medical centers and clinics</p>
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
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Create New Institution Login</h2>

              {submitted && (
                <div className="bg-green-50 text-green-800 p-4 rounded-lg flex items-start mb-6">
                  <BadgeCheck className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Institution login created successfully!</p>
                    <p className="text-sm mt-1">An email with portal details has been sent to the contact address.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {/* Institution Name */}
                  <div>
                    <Label htmlFor="institutionName" className="flex items-center"><Building className="w-4 h-4 mr-2" />Institution Name <span className="text-red-500 ml-1">*</span></Label>
                    <Input id="institutionName" name="institutionName" value={formData.institutionName} onChange={handleChange} placeholder="e.g., City General Hospital" className="mt-2"/>
                    {errors.institutionName && <p className="text-red-500 text-sm mt-1">{errors.institutionName}</p>}
                  </div>

                  {/* Login ID */}
                  <div>
                    <Label htmlFor="loginId" className="flex items-center"><User className="w-4 h-4 mr-2" />Login ID <span className="text-red-500 ml-1">*</span></Label>
                    <Input id="loginId" name="loginId" value={formData.loginId} onChange={handleChange} placeholder="e.g., citygeneral" className="mt-2"/>
                    {errors.loginId && <p className="text-red-500 text-sm mt-1">{errors.loginId}</p>}
                  </div>

                  {/* Password */}
                  <div>
                    <Label htmlFor="password" className="flex items-center"><Key className="w-4 h-4 mr-2" />Password <span className="text-red-500 ml-1">*</span></Label>
                    <div className="relative">
                      <Input id="password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} placeholder="Minimum 8 characters" className="mt-2 pr-10"/>
                      <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" aria-label={showPassword ? "Hide" : "Show"}>
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>

                  {/* Contact Email */}
                  <div>
                    <Label htmlFor="contactEmail" className="flex items-center"><Mail className="w-4 h-4 mr-2" />Contact Email <span className="text-red-500 ml-1">*</span></Label>
                    <Input id="contactEmail" name="contactEmail" type="email" value={formData.contactEmail} onChange={handleChange} placeholder="e.g., admin@citygeneral.org" className="mt-2"/>
                    {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>}
                  </div>
                  
                  {/* Contact Phone */}
                  <div>
                    <Label htmlFor="contactPhone" className="flex items-center"><Phone className="w-4 h-4 mr-2" />Contact Phone <span className="text-red-500 ml-1">*</span></Label>
                    <Input id="contactPhone" name="contactPhone" value={formData.contactPhone} onChange={handleChange} placeholder="e.g., (212) 555-0100" className="mt-2"/>
                    {errors.contactPhone && <p className="text-red-500 text-sm mt-1">{errors.contactPhone}</p>}
                  </div>

                  {/* Region and Type */}
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

                <Button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg shadow-md transition-all duration-300" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>Creating Login...</>
                  ) : "Create Login"}
                </Button>
              </form>
              <div className="mt-6 text-sm text-gray-500"><p>Fields marked with <span className="text-red-500">*</span> are required</p></div>
            </div>

            {/* Right Panel - Institutions List */}
            <div className="w-full lg:w-3/5 p-6 bg-gray-50">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">Manage Institution Logins</h2>
                <Button variant="outline" size="sm" className="flex items-center"><Download className="w-4 h-4 mr-2" />Export List</Button>
              </div>

              {/* Filters and Search */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Search by name, ID, or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10"/>
                </div>
                <div className="flex gap-2">
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

              {/* Institutions List */}
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
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-medium text-gray-900">{inst.institutionName}</h3>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${inst.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{inst.status}</span>
                            </div>
                            <p className="text-sm text-gray-500">ID: {inst.id} | Login: {inst.loginId}</p>
                            <p className="text-sm text-gray-500 mt-1">{inst.contactEmail} | {inst.contactPhone}</p>
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{inst.region}</span>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800">{inst.institutionType}</span>
                              <span className="text-xs text-gray-500">Created: {inst.created}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button className="text-blue-600 hover:text-blue-800" title="Edit"><Edit className="w-4 h-4" /></button>
                            <button className="text-red-600 hover:text-red-800" title="Delete" onClick={() => handleDelete(inst.id)}><Trash2 className="w-4 h-4" /></button>
                            <Button size="sm" variant="outline" onClick={() => handleToggleStatus(inst.id)}>
                              {inst.status === 'active' ? 'Deactivate' : 'Activate'}
                            </Button>
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