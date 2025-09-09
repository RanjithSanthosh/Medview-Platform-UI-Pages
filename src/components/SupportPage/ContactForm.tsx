// import React, { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";
// import { AlertCircle, CheckCircle2, Upload, X } from "lucide-react";

// interface FormData {
//   name: string;
//   email: string;
//   phone: string;
//   complaint: string;
//   category: string;
//   priority: string;
//   agreeToTerms: boolean;
//   files: File[];
// }

// interface FormErrors {
//   name?: string;
//   email?: string;
//   phone?: string;
//   complaint?: string;
//   category?: string;
//   priority?: string;
//   agreeToTerms?: boolean;
// }

// const ComplaintForm = () => {
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     email: "",
//     phone: "",
//     complaint: "",
//     category: "",
//     priority: "medium",
//     agreeToTerms: false,
//     files: [],
//   });

//   const [errors, setErrors] = useState<FormErrors>({});
//   const [submitted, setSubmitted] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

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
//         [name]: undefined,
//       }));
//     }
//   };

//   const handleFileUpload = (e) => {
//     const files = e.target.files;
//     if (!files) return;
    
//     const newFiles = Array.from(files);
//     setFormData((prev) => ({
//       ...prev,
//       files: [...prev.files, ...newFiles],
//     }));
//   };

//   const removeFile = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       files: prev.files.filter((_, i) => i !== index),
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.name.trim()) newErrors.name = "Name is required";
//     if (!formData.email.trim()) newErrors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
//     if (!formData.complaint.trim()) newErrors.complaint = "Complaint description is required";
//     if (!formData.category) newErrors.category = "Category is required";
//     if (!formData.agreeToTerms) newErrors.agreeToTerms = true;
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;
    
//     setIsSubmitting(true);
    
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 2000));
    
//     console.log("Complaint Submitted:", formData);
//     setSubmitted(true);
//     setIsSubmitting(false);
    
//     setTimeout(() => setSubmitted(false), 5000);
//   };

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold text-gray-900">File a Complaint</h2>
//         <p className="text-gray-600 mt-2">
//           We take all complaints seriously. Please provide detailed information to help us resolve your issue quickly.
//         </p>
//       </div>

//       {submitted && (
//         <div className="bg-green-50 text-green-800 p-4 rounded-lg flex items-start mb-6 animate-fadeIn">
//           <CheckCircle2 className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
//           <div>
//             <p className="font-medium">Your complaint has been successfully submitted!</p>
//             <p className="text-sm mt-1">We've sent a confirmation email to your inbox. Reference ID: #COMP-283746</p>
//           </div>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <Label htmlFor="name" className="text-gray-700">
//               Full Name <span className="text-red-500">*</span>
//             </Label>
//             <Input
//               id="name"
//               name="name"
//               placeholder="John Doe"
//               value={formData.name}
//               onChange={handleChange}
//               className="mt-2"
//               aria-invalid={!!errors.name}
//             />
//             {errors.name && <p className="text-red-500 text-sm mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" /> {errors.name}</p>}
//           </div>

//           <div>
//             <Label htmlFor="email" className="text-gray-700">
//               Email Address <span className="text-red-500">*</span>
//             </Label>
//             <Input
//               id="email"
//               name="email"
//               type="email"
//               placeholder="john.doe@example.com"
//               value={formData.email}
//               onChange={handleChange}
//               className="mt-2"
//               aria-invalid={!!errors.email}
//             />
//             {errors.email && <p className="text-red-500 text-sm mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" /> {errors.email}</p>}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <Label htmlFor="phone" className="text-gray-700">
//               Phone Number
//             </Label>
//             <Input
//               id="phone"
//               name="phone"
//               type="tel"
//               placeholder="+1 (555) 123-4567"
//               value={formData.phone}
//               onChange={handleChange}
//               className="mt-2"
//             />
//           </div>

//           <div>
//             <Label htmlFor="category" className="text-gray-700">
//               Category <span className="text-red-500">*</span>
//             </Label>
//             <Select 
//               onValueChange={(value) => setFormData({...formData, category: value})}
//               value={formData.category}
//             >
//               <SelectTrigger className="mt-2" aria-invalid={!!errors.category}>
//                 <SelectValue placeholder="Select a category" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="billing">Billing Issue</SelectItem>
//                 <SelectItem value="service">Service Quality</SelectItem>
//                 <SelectItem value="product">Product Defect</SelectItem>
//                 <SelectItem value="delivery">Delivery Problem</SelectItem>
//                 <SelectItem value="other">Other</SelectItem>
//               </SelectContent>
//             </Select>
//             {errors.category && <p className="text-red-500 text-sm mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" /> Category is required</p>}
//           </div>
//         </div>

//         <div>
//           <Label htmlFor="complaint" className="text-gray-700">
//             Describe Your Complaint <span className="text-red-500">*</span>
//           </Label>
//           <Textarea
//             id="complaint"
//             name="complaint"
//             placeholder="Please provide a detailed description of your complaint..."
//             value={formData.complaint}
//             onChange={handleChange}
//             rows={6}
//             className="mt-2"
//             aria-invalid={!!errors.complaint}
//           />
//           {errors.complaint && <p className="text-red-500 text-sm mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" /> {errors.complaint}</p>}
//           <p className="text-gray-500 text-sm mt-2">Character count: {formData.complaint.length}/2000</p>
//         </div>

//         <div>
//           <Label className="text-gray-700">Attachments (Optional)</Label>
//           <p className="text-gray-500 text-sm mt-1">Upload screenshots or documents that support your complaint (max 5 files, 10MB each)</p>
          
//           <div className="mt-4">
//             <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
//               <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                 <Upload className="w-8 h-8 mb-3 text-gray-400" />
//                 <p className="mb-2 text-sm text-gray-500">Click to upload or drag and drop</p>
//                 <p className="text-xs text-gray-500">PDF, PNG, JPG, GIF (MAX. 10MB each)</p>
//               </div>
//               <input 
//                 id="dropzone-file" 
//                 type="file" 
//                 multiple 
//                 className="hidden" 
//                 onChange={handleFileUpload}
//                 accept=".pdf,.png,.jpg,.jpeg,.gif"
//               />
//             </label>
//           </div>
          
//           {formData.files.length > 0 && (
//             <div className="mt-4 space-y-2">
//               {formData.files.map((file, index) => (
//                 <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
//                   <div className="flex items-center">
//                     <div className="ml-3">
//                       <p className="text-sm font-medium text-gray-900">{file.name}</p>
//                       <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
//                     </div>
//                   </div>
//                   <button 
//                     type="button" 
//                     onClick={() => removeFile(index)}
//                     className="text-gray-400 hover:text-gray-600"
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <Label htmlFor="priority" className="text-gray-700">
//               Priority Level
//             </Label>
//             <Select 
//               onValueChange={(value) => setFormData({...formData, priority: value})}
//               value={formData.priority}
//             >
//               <SelectTrigger className="mt-2">
//                 <SelectValue placeholder="Select priority" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="low">Low</SelectItem>
//                 <SelectItem value="medium">Medium</SelectItem>
//                 <SelectItem value="high">High</SelectItem>
//                 <SelectItem value="urgent">Urgent</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         <div className="flex items-start space-x-3">
//           <Checkbox 
//             id="terms" 
//             checked={formData.agreeToTerms}
//             onCheckedChange={(checked) => setFormData({...formData, agreeToTerms: !!checked})}
//             aria-invalid={!!errors.agreeToTerms}
//           />
//           <Label htmlFor="terms" className="text-gray-700 font-normal">
//             I agree to the processing of my personal data for the purpose of handling this complaint <span className="text-red-500">*</span>
//           </Label>
//         </div>
//         {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" /> You must agree to the terms</p>}

//         <div className="flex justify-end pt-4">
//           <Button 
//             type="submit" 
//             className="px-8 py-3 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-w-[180px]"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? (
//               <>
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                 Processing...
//               </>
//             ) : (
//               "Submit Complaint"
//             )}
//           </Button>
//         </div>
//       </form>

//       <p className="mt-10 text-center text-gray-500 text-sm">
//         Our support team will review your complaint and get back to you within 48 hours.
//         For urgent matters, please call our support hotline at <span className="font-medium">+1 (800) 123-HELP</span>.
//       </p>
//     </div>
//   );
// };

// export default ComplaintForm;


import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Send, User, MessageCircle, Phone, Clock } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    department: "general",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Contact Form Submitted:", formData);
    setSubmitted(true);
    setIsSubmitting(false);
    
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
          <Mail className="h-8 w-8 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Contact Our Support Team</h2>
        <p className="text-gray-600 mt-2">
          Send us a message and we'll respond as quickly as possible
        </p>
      </div>

      {submitted && (
        <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg mb-6">
          <p className="font-medium">Thank you for your message!</p>
          <p className="mt-1">We've received your inquiry and will respond within 24 hours.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name" className="text-gray-700">
              Full Name
            </Label>
            <div className="relative mt-2">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-gray-700">
              Email Address
            </Label>
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="department" className="text-gray-700">
            Department
          </Label>
          <Select 
            onValueChange={(value) => setFormData({...formData, department: value})}
            value={formData.department}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Support</SelectItem>
              <SelectItem value="billing">Billing Department</SelectItem>
              <SelectItem value="technical">Technical Support</SelectItem>
              <SelectItem value="sales">Sales Team</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="subject" className="text-gray-700">
            Subject
          </Label>
          <Input
            id="subject"
            name="subject"
            placeholder="What is this regarding?"
            value={formData.subject}
            onChange={handleChange}
            className="mt-2"
            required
          />
        </div>

        <div>
          <Label htmlFor="message" className="text-gray-700">
            Message
          </Label>
          <div className="relative mt-2">
            <MessageCircle className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <Textarea
              id="message"
              name="message"
              placeholder="Please describe your issue or question in detail..."
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            type="submit" 
            className="px-8 py-3 rounded-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </div>
      </form>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Other ways to reach us</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Mail className="h-6 w-6 text-indigo-600 mx-auto" />
            <h4 className="font-medium mt-2">Email</h4>
            <p className="text-gray-600 text-sm">support@example.com</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Phone className="h-6 w-6 text-indigo-600 mx-auto" />
            <h4 className="font-medium mt-2">Phone</h4>
            <p className="text-gray-600 text-sm">+1 (800) 123-HELP</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Clock className="h-6 w-6 text-indigo-600 mx-auto" />
            <h4 className="font-medium mt-2">Hours</h4>
            <p className="text-gray-600 text-sm">Mon-Fri: 9AM-6PM EST</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;