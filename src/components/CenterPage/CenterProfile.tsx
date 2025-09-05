import React, { useState, useRef } from 'react';
import { Home, Mail, Phone, MapPin, Edit, Save, X, Camera, Clock, Users } from 'lucide-react';

const CenterProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState({
    name: 'General Hospital',
    email: 'info@generalhospital.com',
    phone: '+1 (555) 987-6543',
    address: '456 Health Ave, City, State 67890',
    operatingHours: '24/7',
    totalBeds: '300',
    availableBeds: '37',
    specialties: 'Cardiology, Radiology, Oncology, Surgery',
    description: 'General Hospital is committed to excellence in healthcare, providing top-tier medical services with state-of-the-art facilities and a dedicated team of professionals.',
    centerPicture: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=100&q=80'
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
      const file = files;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setTempProfile(prev => ({
          ...prev,
          centerPicture: e.target.result
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
    { label: 'Total Beds', value: profile.totalBeds },
    { label: 'Available Beds', value: profile.availableBeds },
    { label: 'Operating Hours', value: profile.operatingHours },
    { label: 'Departments', value: profile.specialties.split(',').length }
  ];

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Hospital Center Profile</h1>
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
                  src={isEditing ? tempProfile.centerPicture : profile.centerPicture}
                  alt="Center"
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
              <p className="text-blue-600 font-medium">{profile.specialties}</p>
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
                <span className="text-sm text-gray-700">{profile.address}</span>
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-lg bg-blue-50">
                <Clock className="w-4 h-4 text-purple-500" />
                <span className="text-sm text-gray-700 font-medium">{profile.operatingHours}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Facility Statistics</h3>
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
              <h3 className="text-lg font-bold text-gray-800">Center Information</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Hospital Name</label>
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Clock className="inline w-4 h-4 mr-1" />
                    Operating Hours
                  </label>
                  {isEditing ? (
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={tempProfile.operatingHours}
                      onChange={(e) => handleInputChange('operatingHours', e.target.value)}
                      placeholder="e.g., 24/7 or 8:00 AM - 6:00 PM"
                    />
                  ) : (
                    <p className="text-gray-900 bg-purple-50 p-3 rounded-lg font-medium border border-purple-200">{profile.operatingHours}</p>
                  )}
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Specialties</label>
                  {isEditing ? (
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={tempProfile.specialties}
                      onChange={(e) => handleInputChange('specialties', e.target.value)}
                      placeholder="e.g., Cardiology, Radiology"
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{profile.specialties}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Total Beds</label>
                  {isEditing ? (
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={tempProfile.totalBeds}
                      onChange={(e) => handleInputChange('totalBeds', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{profile.totalBeds}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Available Beds</label>
                  {isEditing ? (
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={tempProfile.availableBeds}
                      onChange={(e) => handleInputChange('availableBeds', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{profile.availableBeds}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                {isEditing ? (
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={tempProfile.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                  />
                ) : (
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{profile.description}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterProfile;
