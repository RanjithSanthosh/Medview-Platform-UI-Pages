import React, { useState, useRef } from 'react';
import { User, Mail, Phone, MapPin, Edit, Save, X, Camera, Clock } from 'lucide-react';

const DoctorProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [profile, setProfile] = useState({
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@hospital.com',
    phone: '+1 (555) 123-4567',
    specialization: 'Radiology',
    department: 'Radiology Department',
    hospital: 'General Hospital',
    shiftTiming: '8:00 AM - 5:00 PM',
    address: '123 Medical Center Dr, City, State 12345',
    experience: '8 years',
    education: 'MD - Medical School, 2015\nResidency - Radiology, 2019',
    bio: 'Experienced radiologist specializing in diagnostic imaging and interventional procedures. Committed to providing accurate and timely diagnostic services.',
    profilePicture: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80'
  });

  const [tempProfile, setTempProfile] = useState(profile);

  const handleEdit = () => {
    setTempProfile(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(tempProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setTempProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setUploading(true);
      const file = files[0];
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setTempProfile(prev => ({
          ...prev,
          profilePicture: e.target.result
        }));
        setUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const stats = [
    { label: 'Total Cases', value: '1,234' },
    { label: 'Completed Cases', value: '1,156' },
    { label: 'Success Rate', value: '93.7%' },
    { label: 'Experience', value: profile.experience }
  ];

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Doctor Profile</h1>
          {!isEditing ? (
            <button 
              onClick={handleEdit} 
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="flex space-x-2">
              <button 
                onClick={handleSave} 
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button 
                onClick={handleCancel} 
                className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <img 
                  src={isEditing ? tempProfile.profilePicture : profile.profilePicture} 
                  alt="Profile" 
                  className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-blue-100 shadow-md"
                />
                {isEditing && (
                  <>
                    <button
                      onClick={triggerFileInput}
                      className="absolute bottom-3 right-3 bg-blue-600 text-white p-2.5 rounded-full hover:bg-blue-700 transition-colors shadow-lg"
                    >
                      {uploading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <Camera className="w-4 h-4" />
                      )}
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </>
                )}
              </div>
              <h2 className="text-xl font-bold text-gray-800">{profile.name}</h2>
              <p className="text-blue-600 font-medium">{profile.specialization}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50">
                <Mail className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-700">{profile.email}</span>
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50">
                <Phone className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-700">{profile.phone}</span>
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50">
                <MapPin className="w-4 h-4 text-red-500" />
                <span className="text-sm text-gray-700">{profile.hospital}</span>
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-lg bg-blue-50">
                <Clock className="w-4 h-4 text-purple-500" />
                <span className="text-sm text-gray-700 font-medium">{profile.shiftTiming}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Performance Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
                  <p className="text-xs text-gray-600 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <h3 className="text-lg font-bold text-gray-800">Profile Information</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={tempProfile.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{profile.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  {isEditing ? (
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={tempProfile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{profile.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                  {isEditing ? (
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={tempProfile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{profile.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Specialization</label>
                  {isEditing ? (
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={tempProfile.specialization}
                      onChange={(e) => handleInputChange('specialization', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{profile.specialization}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                  {isEditing ? (
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={tempProfile.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{profile.department}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Hospital</label>
                  {isEditing ? (
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={tempProfile.hospital}
                      onChange={(e) => handleInputChange('hospital', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{profile.hospital}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Experience</label>
                  {isEditing ? (
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={tempProfile.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{profile.experience}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Clock className="inline w-4 h-4 mr-1" />
                    Shift Timing
                  </label>
                  {isEditing ? (
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={tempProfile.shiftTiming}
                      onChange={(e) => handleInputChange('shiftTiming', e.target.value)}
                      placeholder="e.g., 8:00 AM - 5:00 PM"
                    />
                  ) : (
                    <p className="text-gray-900 bg-purple-50 p-3 rounded-lg font-medium border border-purple-200">{profile.shiftTiming}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                {isEditing ? (
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={tempProfile.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                ) : (
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{profile.address}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Education</label>
                {isEditing ? (
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={tempProfile.education}
                    onChange={(e) => handleInputChange('education', e.target.value)}
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-900 whitespace-pre-line bg-gray-50 p-3 rounded-lg">{profile.education}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                {isEditing ? (
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={tempProfile.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={4}
                  />
                ) : (
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{profile.bio}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;