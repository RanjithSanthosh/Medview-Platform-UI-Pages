


// // import React, { useState } from "react";
// // import { Input } from "@/components/ui/input";
// // import { Button } from "@/components/ui/button";
// // import { Label } from "@/components/ui/label";
// // import { Eye, EyeOff, User, Mail, Building, Phone, Key, BadgeCheck } from "lucide-react";

// // const CredentialForm = () => {
// //   const [formData, setFormData] = useState({
// //     username: "",
// //     password: "",
// //     fullName: "",
// //     email: "",
// //     department: "",
// //     phone: "",
// //   });

// //   const [errors, setErrors] = useState({});
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [submitted, setSubmitted] = useState(false);
// //   const [uniqueID] = useState(generateUniqueID());

// //   function generateUniqueID() {
// //     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
// //     let result = '';
// //     for (let i = 0; i < 10; i++) {
// //       result += chars.charAt(Math.floor(Math.random() * chars.length));
// //       if (i === 4) result += '-';
// //     }
// //     return result;
// //   }

// //   const validateForm = () => {
// //     const newErrors = {};
    
// //     if (!formData.username.trim()) newErrors.username = "Username is required";
// //     else if (formData.username.length < 4) newErrors.username = "Username must be at least 4 characters";
    
// //     if (!formData.password) newErrors.password = "Password is required";
// //     else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    
// //     if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    
// //     if (!formData.email.trim()) newErrors.email = "Email is required";
// //     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    
// //     if (!formData.department.trim()) newErrors.department = "Department is required";
    
// //     if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
// //     else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(formData.phone)) {
// //       newErrors.phone = "Please enter a valid phone number";
// //     }
    
// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
    
// //     // Clear error when user types
// //     if (errors[name]) {
// //       setErrors((prev) => ({
// //         ...prev,
// //         [name]: "",
// //       }));
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     if (!validateForm()) return;
    
// //     setIsSubmitting(true);
    
// //     // Simulate API call
// //     await new Promise(resolve => setTimeout(resolve, 1500));
    
// //     console.log("Credential Created:", { ...formData, uniqueID });
// //     setSubmitted(true);
// //     setIsSubmitting(false);
    
// //     // Reset form after successful submission
// //     setFormData({
// //       username: "",
// //       password: "",
// //       fullName: "",
// //       email: "",
// //       department: "",
// //       phone: "",
// //     });
    
// //     setTimeout(() => setSubmitted(false), 5000);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center px-4 py-8">
// //       <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl overflow-hidden">
// //         {/* Header Section */}
// //         <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
// //           <div className="flex items-center justify-between">
// //             <div>
// //               <h1 className="text-2xl md:text-3xl font-bold">Create Technician Credentials</h1>
// //               <p className="text-blue-100 mt-2">Generate secure login credentials for medical imaging technicians</p>
// //             </div>
// //             <div className="hidden md:flex items-center justify-center w-12 h-12 bg-white/20 rounded-full">
// //               <Key className="h-6 w-6" />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Form Content */}
// //         <div className="p-6 md:p-8">
// //           {submitted && (
// //             <div className="bg-green-50 text-green-800 p-4 rounded-lg flex items-start mb-6">
// //               <BadgeCheck className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
// //               <div>
// //                 <p className="font-medium">Credentials created successfully!</p>
// //                 <p className="text-sm mt-1">An email with login details has been sent to the technician.</p>
// //               </div>
// //             </div>
// //           )}

// //           <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-start">
// //             <div className="bg-blue-100 p-2 rounded-full mr-3">
// //               <BadgeCheck className="h-5 w-5 text-blue-600" />
// //             </div>
// //             <p className="text-blue-700 text-sm">
// //               <span className="font-semibold">Technician ID: {uniqueID}</span> - This ID will be associated with all imaging procedures.
// //             </p>
// //           </div>

// //           <form onSubmit={handleSubmit} className="space-y-6">
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               {/* Username Field */}
// //               <div>
// //                 <Label htmlFor="username" className="text-gray-700 flex items-center">
// //                   <User className="w-4 h-4 mr-2" />
// //                   Username <span className="text-red-500 ml-1">*</span>
// //                 </Label>
// //                 <Input
// //                   id="username"
// //                   name="username"
// //                   value={formData.username}
// //                   onChange={handleChange}
// //                   placeholder="e.g., jsmith"
// //                   className="mt-2"
// //                   aria-invalid={!!errors.username}
// //                 />
// //                 {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
// //               </div>

// //               {/* Full Name Field */}
// //               <div>
// //                 <Label htmlFor="fullName" className="text-gray-700 flex items-center">
// //                   <User className="w-4 h-4 mr-2" />
// //                   Full Name <span className="text-red-500 ml-1">*</span>
// //                 </Label>
// //                 <Input
// //                   id="fullName"
// //                   name="fullName"
// //                   value={formData.fullName}
// //                   onChange={handleChange}
// //                   placeholder="e.g., John Smith"
// //                   className="mt-2"
// //                   aria-invalid={!!errors.fullName}
// //                 />
// //                 {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
// //               </div>

// //               {/* Email Field */}
// //               <div>
// //                 <Label htmlFor="email" className="text-gray-700 flex items-center">
// //                   <Mail className="w-4 h-4 mr-2" />
// //                   Email Address <span className="text-red-500 ml-1">*</span>
// //                 </Label>
// //                 <Input
// //                   id="email"
// //                   name="email"
// //                   type="email"
// //                   value={formData.email}
// //                   onChange={handleChange}
// //                   placeholder="e.g., jsmith@medicalimaging.com"
// //                   className="mt-2"
// //                   aria-invalid={!!errors.email}
// //                 />
// //                 {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
// //               </div>

// //               {/* Department Field */}
// //               <div>
// //                 <Label htmlFor="department" className="text-gray-700 flex items-center">
// //                   <Building className="w-4 h-4 mr-2" />
// //                   Department <span className="text-red-500 ml-1">*</span>
// //                 </Label>
// //                 <Input
// //                   id="department"
// //                   name="department"
// //                   value={formData.department}
// //                   onChange={handleChange}
// //                   placeholder="e.g., Radiology"
// //                   className="mt-2"
// //                   aria-invalid={!!errors.department}
// //                 />
// //                 {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
// //               </div>

// //               {/* Phone Field */}
// //               <div>
// //                 <Label htmlFor="phone" className="text-gray-700 flex items-center">
// //                   <Phone className="w-4 h-4 mr-2" />
// //                   Phone Number <span className="text-red-500 ml-1">*</span>
// //                 </Label>
// //                 <Input
// //                   id="phone"
// //                   name="phone"
// //                   value={formData.phone}
// //                   onChange={handleChange}
// //                   placeholder="e.g., (555) 123-4567"
// //                   className="mt-2"
// //                   aria-invalid={!!errors.phone}
// //                 />
// //                 {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
// //               </div>

// //               {/* Password Field */}
// //               <div>
// //                 <Label htmlFor="password" className="text-gray-700 flex items-center">
// //                   <Key className="w-4 h-4 mr-2" />
// //                   Password <span className="text-red-500 ml-1">*</span>
// //                 </Label>
// //                 <div className="relative">
// //                   <Input
// //                     id="password"
// //                     name="password"
// //                     type={showPassword ? "text" : "password"}
// //                     value={formData.password}
// //                     onChange={handleChange}
// //                     placeholder="Minimum 8 characters"
// //                     className="mt-2 pr-10"
// //                     aria-invalid={!!errors.password}
// //                   />
// //                   <button
// //                     type="button"
// //                     onClick={() => setShowPassword((prev) => !prev)}
// //                     className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
// //                     aria-label={showPassword ? "Hide password" : "Show password"}
// //                   >
// //                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
// //                   </button>
// //                 </div>
// //                 {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
// //                 <p className="text-gray-500 text-xs mt-2">Use a strong password with letters, numbers, and symbols</p>
// //               </div>
// //             </div>

// //             <div className="flex flex-col md:flex-row justify-between items-center pt-4 gap-4">
// //               <div className="text-sm text-gray-500">
// //                 <p>Fields marked with <span className="text-red-500">*</span> are required</p>
// //               </div>
// //               <Button 
// //                 type="submit" 
// //                 className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg shadow-md transition-all duration-300 w-full md:w-auto"
// //                 disabled={isSubmitting}
// //               >
// //                 {isSubmitting ? (
// //                   <>
// //                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
// //                     Creating...
// //                   </>
// //                 ) : (
// //                   "Create Credentials"
// //                 )}
// //               </Button>
// //             </div>
// //           </form>
// //         </div>

// //         {/* Footer Note */}
// //         <div className="bg-gray-50 p-4 border-t border-gray-200">
// //           <p className="text-center text-gray-500 text-sm">
// //             Technician credentials will provide access to the medical imaging portal with appropriate permissions based on department.
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CredentialForm;




// import React, { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Eye, EyeOff, User, Mail, Building, Phone, Key, BadgeCheck, Search, Filter, Edit, Trash2, Copy, Download } from "lucide-react";

// const CredentialForm = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     fullName: "",
//     email: "",
//     department: "",
//     phone: "",
//   });

//   const [credentials, setCredentials] = useState([
//     {
//       id: "TECH-8A3B9C",
//       username: "jsmith",
//       fullName: "John Smith",
//       email: "jsmith@medicalimaging.com",
//       department: "Radiology",
//       phone: "(555) 123-4567",
//       created: "2023-10-15",
//       status: "active"
//     },
//     {
//       id: "TECH-7D2E4F",
//       username: "mjones",
//       fullName: "Mary Jones",
//       email: "mjones@medicalimaging.com",
//       department: "Cardiology",
//       phone: "(555) 987-6543",
//       created: "2023-10-10",
//       status: "active"
//     },
//     {
//       id: "TECH-5G6H1I",
//       username: "rwilliams",
//       fullName: "Robert Williams",
//       email: "rwilliams@medicalimaging.com",
//       department: "Neurology",
//       phone: "(555) 456-7890",
//       created: "2023-10-05",
//       status: "inactive"
//     }
//   ]);

//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterDepartment, setFilterDepartment] = useState("all");
//   const [filterStatus, setFilterStatus] = useState("all");

//   function generateUniqueID() {
//     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//     let result = '';
//     for (let i = 0; i < 10; i++) {
//       result += chars.charAt(Math.floor(Math.random() * chars.length));
//       if (i === 4) result += '-';
//     }
//     return `TECH-${result}`;
//   }

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.username.trim()) newErrors.username = "Username is required";
//     else if (formData.username.length < 4) newErrors.username = "Username must be at least 4 characters";
    
//     if (!formData.password) newErrors.password = "Password is required";
//     else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    
//     if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    
//     if (!formData.email.trim()) newErrors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    
//     if (!formData.department.trim()) newErrors.department = "Department is required";
    
//     if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
//     else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(formData.phone)) {
//       newErrors.phone = "Please enter a valid phone number";
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
    
//     // Clear error when user types
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;
    
//     setIsSubmitting(true);
    
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1500));
    
//     const newCredential = {
//       id: generateUniqueID(),
//       username: formData.username,
//       fullName: formData.fullName,
//       email: formData.email,
//       department: formData.department,
//       phone: formData.phone,
//       created: new Date().toISOString().split('T')[0],
//       status: "active"
//     };
    
//     setCredentials([newCredential, ...credentials]);
//     setSubmitted(true);
//     setIsSubmitting(false);
    
//     // Reset form after successful submission
//     setFormData({
//       username: "",
//       password: "",
//       fullName: "",
//       email: "",
//       department: "",
//       phone: "",
//     });
    
//     setTimeout(() => setSubmitted(false), 5000);
//   };

//   const handleDelete = (id) => {
//     setCredentials(credentials.filter(cred => cred.id !== id));
//   };

//   const handleToggleStatus = (id) => {
//     setCredentials(credentials.map(cred => 
//       cred.id === id ? {...cred, status: cred.status === "active" ? "inactive" : "active"} : cred
//     ));
//   };

//   const handleCopyPassword = () => {
//     // In a real app, this would copy the password to clipboard
//     alert("Password copied to clipboard");
//   };

//   const filteredCredentials = credentials.filter(cred => {
//     const matchesSearch = cred.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                           cred.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           cred.email.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesDepartment = filterDepartment === "all" || cred.department === filterDepartment;
//     const matchesStatus = filterStatus === "all" || cred.status === filterStatus;
//     return matchesSearch && matchesDepartment && matchesStatus;
//   });

//   const departments = ["all", "Radiology", "Cardiology", "Neurology", "Oncology", "Pediatrics"];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 px-4 py-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
//           {/* Header Section */}
//           <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-2xl md:text-3xl font-bold">Technician Credentials Management</h1>
//                 <p className="text-blue-100 mt-2">Create and manage login credentials for medical imaging technicians</p>
//               </div>
//               <div className="hidden md:flex items-center justify-center w-12 h-12 bg-white/20 rounded-full">
//                 <Key className="h-6 w-6" />
//               </div>
//             </div>
//           </div>

//           {/* Main Content - Split Layout */}
//           <div className="flex flex-col lg:flex-row">
//             {/* Left Panel - Form */}
//             <div className="w-full lg:w-2/5 border-r border-gray-200 p-6">
//               <h2 className="text-xl font-semibold text-gray-800 mb-6">Create New Credentials</h2>

//               {submitted && (
//                 <div className="bg-green-50 text-green-800 p-4 rounded-lg flex items-start mb-6">
//                   <BadgeCheck className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
//                   <div>
//                     <p className="font-medium">Credentials created successfully!</p>
//                     <p className="text-sm mt-1">An email with login details has been sent to the technician.</p>
//                   </div>
//                 </div>
//               )}

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="space-y-4">
//                   {/* Username Field */}
//                   <div>
//                     <Label htmlFor="username" className="text-gray-700 flex items-center">
//                       <User className="w-4 h-4 mr-2" />
//                       Username <span className="text-red-500 ml-1">*</span>
//                     </Label>
//                     <Input
//                       id="username"
//                       name="username"
//                       value={formData.username}
//                       onChange={handleChange}
//                       placeholder="e.g., jsmith"
//                       className="mt-2"
//                       aria-invalid={!!errors.username}
//                     />
//                     {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
//                   </div>

//                   {/* Password Field */}
//                   <div>
//                     <Label htmlFor="password" className="text-gray-700 flex items-center">
//                       <Key className="w-4 h-4 mr-2" />
//                       Password <span className="text-red-500 ml-1">*</span>
//                     </Label>
//                     <div className="relative">
//                       <Input
//                         id="password"
//                         name="password"
//                         type={showPassword ? "text" : "password"}
//                         value={formData.password}
//                         onChange={handleChange}
//                         placeholder="Minimum 8 characters"
//                         className="mt-2 pr-10"
//                         aria-invalid={!!errors.password}
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword((prev) => !prev)}
//                         className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                         aria-label={showPassword ? "Hide password" : "Show password"}
//                       >
//                         {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                       </button>
//                     </div>
//                     {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//                     <p className="text-gray-500 text-xs mt-2">Use a strong password with letters, numbers, and symbols</p>
//                   </div>

//                   {/* Full Name Field */}
//                   <div>
//                     <Label htmlFor="fullName" className="text-gray-700 flex items-center">
//                       <User className="w-4 h-4 mr-2" />
//                       Full Name <span className="text-red-500 ml-1">*</span>
//                     </Label>
//                     <Input
//                       id="fullName"
//                       name="fullName"
//                       value={formData.fullName}
//                       onChange={handleChange}
//                       placeholder="e.g., John Smith"
//                       className="mt-2"
//                       aria-invalid={!!errors.fullName}
//                     />
//                     {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
//                   </div>

//                   {/* Email Field */}
//                   <div>
//                     <Label htmlFor="email" className="text-gray-700 flex items-center">
//                       <Mail className="w-4 h-4 mr-2" />
//                       Email Address <span className="text-red-500 ml-1">*</span>
//                     </Label>
//                     <Input
//                       id="email"
//                       name="email"
//                       type="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       placeholder="e.g., jsmith@medicalimaging.com"
//                       className="mt-2"
//                       aria-invalid={!!errors.email}
//                     />
//                     {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//                   </div>

//                   {/* Department Field */}
//                   <div>
//                     <Label htmlFor="department" className="text-gray-700 flex items-center">
//                       <Building className="w-4 h-4 mr-2" />
//                       Department <span className="text-red-500 ml-1">*</span>
//                     </Label>
//                     <Input
//                       id="department"
//                       name="department"
//                       value={formData.department}
//                       onChange={handleChange}
//                       placeholder="e.g., Radiology"
//                       className="mt-2"
//                       aria-invalid={!!errors.department}
//                     />
//                     {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
//                   </div>

//                   {/* Phone Field */}
//                   <div>
//                     <Label htmlFor="phone" className="text-gray-700 flex items-center">
//                       <Phone className="w-4 h-4 mr-2" />
//                       Phone Number <span className="text-red-500 ml-1">*</span>
//                     </Label>
//                     <Input
//                       id="phone"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       placeholder="e.g., (555) 123-4567"
//                       className="mt-2"
//                       aria-invalid={!!errors.phone}
//                     />
//                     {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
//                   </div>
//                 </div>

//                 <Button 
//                   type="submit" 
//                   className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg shadow-md transition-all duration-300"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                       Creating...
//                     </>
//                   ) : (
//                     "Create Credentials"
//                   )}
//                 </Button>
//               </form>

//               <div className="mt-6 text-sm text-gray-500">
//                 <p>Fields marked with <span className="text-red-500">*</span> are required</p>
//               </div>
//             </div>

//             {/* Right Panel - Credentials List */}
//             <div className="w-full lg:w-3/5 p-6 bg-gray-50">
//               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">Manage Technician Credentials</h2>
//                 <div className="flex items-center gap-2">
//                   <Button variant="outline" size="sm" className="flex items-center">
//                     <Download className="w-4 h-4 mr-2" />
//                     Export
//                   </Button>
//                 </div>
//               </div>

//               {/* Filters and Search */}
//               <div className="flex flex-col sm:flex-row gap-4 mb-6">
//                 <div className="relative flex-1">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                   <Input
//                     placeholder="Search technicians..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10"
//                   />
//                 </div>
//                 <div className="flex gap-2">
//                   <select 
//                     value={filterDepartment}
//                     onChange={(e) => setFilterDepartment(e.target.value)}
//                     className="border border-gray-300 rounded-md px-3 py-2 text-sm"
//                   >
//                     <option value="all">All Departments</option>
//                     {departments.filter(d => d !== "all").map(dept => (
//                       <option key={dept} value={dept}>{dept}</option>
//                     ))}
//                   </select>
//                   <select 
//                     value={filterStatus}
//                     onChange={(e) => setFilterStatus(e.target.value)}
//                     className="border border-gray-300 rounded-md px-3 py-2 text-sm"
//                   >
//                     <option value="all">All Status</option>
//                     <option value="active">Active</option>
//                     <option value="inactive">Inactive</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Credentials List */}
//               <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//                 {filteredCredentials.length === 0 ? (
//                   <div className="text-center py-12">
//                     <User className="mx-auto h-12 w-12 text-gray-400" />
//                     <h3 className="mt-4 text-lg font-medium text-gray-900">No technicians found</h3>
//                     <p className="mt-2 text-gray-500">
//                       Try adjusting your search or filter to find what you're looking for.
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="divide-y divide-gray-200">
//                     {filteredCredentials.map((credential) => (
//                       <div key={credential.id} className="p-4 hover:bg-gray-50 transition-colors">
//                         <div className="flex justify-between items-start">
//                           <div className="flex-1">
//                             <div className="flex items-center">
//                               <h3 className="font-medium text-gray-900">{credential.fullName}</h3>
//                               <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${credential.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
//                                 {credential.status}
//                               </span>
//                             </div>
//                             <p className="text-sm text-gray-500">ID: {credential.id} | Username: {credential.username}</p>
//                             <p className="text-sm text-gray-500 mt-1">{credential.email} | {credential.phone}</p>
//                             <div className="flex items-center mt-2">
//                               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                                 {credential.department}
//                               </span>
//                               <span className="text-xs text-gray-500 ml-3">Created: {credential.created}</span>
//                             </div>
//                           </div>
//                           <div className="flex items-center space-x-2">
//                             <button className="text-blue-600 hover:text-blue-800">
//                               <Edit className="w-4 h-4" />
//                             </button>
//                             <button 
//                               className="text-gray-600 hover:text-gray-800"
//                               onClick={() => handleToggleStatus(credential.id)}
//                             >
//                               {credential.status === 'active' ? 'Deactivate' : 'Activate'}
//                             </button>
//                             <button 
//                               className="text-red-600 hover:text-red-800"
//                               onClick={() => handleDelete(credential.id)}
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div className="mt-4 text-sm text-gray-500">
//                 <p>Showing {filteredCredentials.length} of {credentials.length} technicians</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CredentialForm;



import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, User, Mail, Building, Phone, Key, BadgeCheck, Search, Download, Edit, Trash2 } from "lucide-react";

const CredentialForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
    email: "",
    department: "",
    phone: "",
  });

  const [credentials, setCredentials] = useState([
    {
      id: "TECH-8A3B9C",
      username: "jsmith",
      fullName: "John Smith",
      email: "jsmith@medicalimaging.com",
      department: "Radiology",
      phone: "(555) 123-4567",
      created: "2023-10-15",
      status: "active"
    },
    {
      id: "TECH-7D2E4F",
      username: "mjones",
      fullName: "Mary Jones",
      email: "mjones@medicalimaging.com",
      department: "Cardiology",
      phone: "(555) 987-6543",
      created: "2023-10-10",
      status: "active"
    },
    {
      id: "TECH-5G6H1I",
      username: "rwilliams",
      fullName: "Robert Williams",
      email: "rwilliams@medicalimaging.com",
      department: "Neurology",
      phone: "(555) 456-7890",
      created: "2023-10-05",
      status: "inactive"
    }
  ]);

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  
  // State for the pre-generated unique ID, from the first example
  const [uniqueID, setUniqueID] = useState(generateUniqueID());

  function generateUniqueID() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    // Shortened for brevity to match example data format
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `TECH-${result}`;
  }

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) newErrors.username = "Username is required";
    else if (formData.username.length < 4) newErrors.username = "Username must be at least 4 characters";
    
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    
    if (!formData.email.trim()) newErrors.email = "Email is invalid";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    
    if (!formData.department.trim()) newErrors.department = "Department is required";
    
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newCredential = {
      id: uniqueID, // Use the pre-generated ID from state
      username: formData.username,
      fullName: formData.fullName,
      email: formData.email,
      department: formData.department,
      phone: formData.phone,
      created: new Date().toISOString().split('T')[0],
      status: "active"
    };
    
    setCredentials([newCredential, ...credentials]);
    setSubmitted(true);
    setIsSubmitting(false);
    
    setFormData({
      username: "", password: "", fullName: "", email: "", department: "", phone: ""
    });
    
    setUniqueID(generateUniqueID()); // Generate a new ID for the next user
    
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleDelete = (id) => {
    setCredentials(credentials.filter(cred => cred.id !== id));
  };

  const handleToggleStatus = (id) => {
    setCredentials(credentials.map(cred => 
      cred.id === id ? {...cred, status: cred.status === "active" ? "inactive" : "active"} : cred
    ));
  };

  const filteredCredentials = credentials.filter(cred => {
    const matchesSearch = cred.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          cred.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cred.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === "all" || cred.department === filterDepartment;
    const matchesStatus = filterStatus === "all" || cred.status === filterStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const departments = ["all", "Radiology", "Cardiology", "Neurology", "Oncology", "Pediatrics"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Technician Credentials Management</h1>
                <p className="text-blue-100 mt-2">Create and manage login credentials for medical imaging technicians</p>
              </div>
              <div className="hidden md:flex items-center justify-center w-12 h-12 bg-white/20 rounded-full">
                <Key className="h-6 w-6" />
              </div>
            </div>
          </div>

          {/* Main Content - Split Layout */}
          <div className="flex flex-col lg:flex-row">
            {/* Left Panel - Form */}
            <div className="w-full lg:w-2/5 border-r border-gray-200 p-6 md:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Create New Credentials</h2>

              {submitted && (
                <div className="bg-green-50 text-green-800 p-4 rounded-lg flex items-start mb-6">
                  <BadgeCheck className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Credentials created successfully!</p>
                    <p className="text-sm mt-1">An email with login details has been sent to the technician.</p>
                  </div>
                </div>
              )}

              {/* Unique ID display from first example */}
              <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <BadgeCheck className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-blue-700 text-sm">
                  <span className="font-semibold">New Technician ID: {uniqueID}</span> - This ID will be assigned upon creation.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Two-column grid from first example */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="username" className="text-gray-700 flex items-center"><User className="w-4 h-4 mr-2" />Username<span className="text-red-500 ml-1">*</span></Label>
                    <Input id="username" name="username" value={formData.username} onChange={handleChange} placeholder="e.g., jsmith" className="mt-2" />
                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                  </div>
                  <div>
                    <Label htmlFor="fullName" className="text-gray-700 flex items-center"><User className="w-4 h-4 mr-2" />Full Name<span className="text-red-500 ml-1">*</span></Label>
                    <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="e.g., John Smith" className="mt-2" />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-700 flex items-center"><Mail className="w-4 h-4 mr-2" />Email Address<span className="text-red-500 ml-1">*</span></Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="jsmith@medical.com" className="mt-2" />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="department" className="text-gray-700 flex items-center"><Building className="w-4 h-4 mr-2" />Department<span className="text-red-500 ml-1">*</span></Label>
                    <Input id="department" name="department" value={formData.department} onChange={handleChange} placeholder="e.g., Radiology" className="mt-2" />
                    {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-gray-700 flex items-center"><Phone className="w-4 h-4 mr-2" />Phone Number<span className="text-red-500 ml-1">*</span></Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="(555) 123-4567" className="mt-2" />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <Label htmlFor="password" className="text-gray-700 flex items-center"><Key className="w-4 h-4 mr-2" />Password<span className="text-red-500 ml-1">*</span></Label>
                    <div className="relative">
                      <Input id="password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} placeholder="Minimum 8 characters" className="mt-2 pr-10" />
                      <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>
                </div>

                {/* Button/Footer layout from first example */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-4 gap-4">
                  <div className="text-sm text-gray-500"><p>Fields marked with <span className="text-red-500">*</span> are required</p></div>
                  <Button type="submit" className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg shadow-md transition-all duration-300 w-full md:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>Creating...</>
                    ) : "Create Credentials"}
                  </Button>
                </div>
              </form>
            </div>

            {/* Right Panel - Credentials List */}
            <div className="w-full lg:w-3/5 p-6 bg-gray-50">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">Existing Technicians</h2>
                <Button variant="outline" size="sm" className="flex items-center"><Download className="w-4 h-4 mr-2" />Export</Button>
              </div>

              {/* Filters and Search */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Search technicians..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
                </div>
                <div className="flex gap-2">
                  <select value={filterDepartment} onChange={(e) => setFilterDepartment(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white">
                    <option value="all">All Departments</option>
                    {departments.filter(d => d !== "all").map(dept => <option key={dept} value={dept}>{dept}</option>)}
                  </select>
                  <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white">
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Credentials List */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {filteredCredentials.length === 0 ? (
                  <div className="text-center py-12"><User className="mx-auto h-12 w-12 text-gray-400" /><h3 className="mt-4 text-lg font-medium text-gray-900">No technicians found</h3><p className="mt-2 text-gray-500">Try adjusting your search or filter.</p></div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {filteredCredentials.map((credential) => (
                      <div key={credential.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center">
                              <h3 className="font-medium text-gray-900">{credential.fullName}</h3>
                              <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${credential.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{credential.status}</span>
                            </div>
                            <p className="text-sm text-gray-500">ID: {credential.id} | Username: {credential.username}</p>
                            <p className="text-sm text-gray-500 mt-1">{credential.email} | {credential.phone}</p>
                            <div className="flex items-center mt-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{credential.department}</span>
                              <span className="text-xs text-gray-500 ml-3">Created: {credential.created}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-800"><Edit className="w-4 h-4" /></button>
                            <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(credential.id)}><Trash2 className="w-4 h-4" /></button>
                            <Button size="sm" variant="outline" onClick={() => handleToggleStatus(credential.id)}>
                              {credential.status === 'active' ? 'Deactivate' : 'Activate'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="mt-4 text-sm text-gray-500"><p>Showing {filteredCredentials.length} of {credentials.length} technicians</p></div>
            </div>
          </div>
          {/* Footer Note from first example */}
          <div className="bg-gray-50 p-4 border-t border-gray-200">
            <p className="text-center text-gray-500 text-sm">
              Technician credentials will provide access to the medical imaging portal with appropriate permissions based on department.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CredentialForm;