import React, { useState } from 'react';
import { FiUsers, FiClock, FiSend, FiAlertCircle, FiEdit, FiUpload, FiX, FiSave, FiImage, FiUser } from 'react-icons/fi';

interface Case {
  id: string;
  patient: string;
  doctor: string;
  type: 'assigned' | 'urgent' | 'pending';
  status: 'Active' | 'Urgent' | 'Pending';
  message: string;
  time: string;
  images: string[];
  notes: string;
  priority: 'Normal' | 'High' | 'Low' | 'Critical';
}

const TechnicianDashboard: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const stats = [
    {
      title: 'Total Cases Assigned',
      value: '210',
      icon: <FiSend className="w-6 h-6" />,
      color: 'bg-blue-500',
      textColor: 'text-blue-500',
    },
    {
      title: 'Pending Assignment',
      value: '15',
      icon: <FiClock className="w-6 h-6" />,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-500',
    },
    {
      title: 'Urgent Cases',
      value: '4',
      icon: <FiAlertCircle className="w-6 h-6" />,
      color: 'bg-red-500',
      textColor: 'text-red-500',
    },
    {
      title: 'Doctors Active',
      value: '12',
      icon: <FiUsers className="w-6 h-6" />,
      color: 'bg-green-500',
      textColor: 'text-green-500',
    },
  ];

  const [cases, setCases] = useState<Case[]>([
    {
      id: 'TXN001245',
      patient: 'JOHN DOE',
      doctor: 'Dr. Smith',
      type: 'assigned',
      status: 'Active',
      message: 'Assigned case for patient JOHN DOE to Dr. Smith',
      time: '1 hour ago',
      images: ['https://via.placeholder.com/150x150/3B82F6/ffffff?text=X-Ray+1'],
      notes: 'Chest X-ray shows mild congestion. Follow-up required in 2 weeks.',
      priority: 'Normal'
    },
    {
      id: 'TXN001244',
      patient: 'SARAH LEE',
      doctor: 'Dr. Johnson',
      type: 'urgent',
      status: 'Urgent',
      message: 'Marked case for patient SARAH LEE as urgent',
      time: '2 hours ago',
      images: ['https://via.placeholder.com/150x150/EF4444/ffffff?text=MRI+1', 'https://via.placeholder.com/150x150/EF4444/ffffff?text=MRI+2'],
      notes: 'MRI shows abnormal tissue growth. Requires immediate attention.',
      priority: 'High'
    },
    {
      id: 'TXN001243',
      patient: 'MARK EVANS',
      doctor: 'Unassigned',
      type: 'pending',
      status: 'Pending',
      message: 'Received new study request for patient MARK EVANS',
      time: '5 hours ago',
      images: ['https://via.placeholder.com/150x150/F59E0B/ffffff?text=CT+Scan'],
      notes: 'CT scan requested for abdominal pain. Awaiting doctor assignment.',
      priority: 'Normal'
    },
  ]);

  const handleEditCase = (caseItem: Case) => {
    setSelectedCase({ ...caseItem });
    setEditMode(true);
  };

  const handleCloseEdit = () => {
    setSelectedCase(null);
    setEditMode(false);
    setUploadingImage(false);
  };

  const handleSaveCase = () => {
    setCases(cases.map(c => c.id === selectedCase.id ? selectedCase : c));
    setEditMode(false);
    setSelectedCase(null);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      setUploadingImage(true);

      let processedFiles = 0;
      const newImages: string[] = [];

      files.forEach((file, index) => {
        setTimeout(() => {
          const reader = new FileReader();
          reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target?.result) {
              newImages.push(e.target.result as string);
            }
            processedFiles++;

            if (processedFiles === files.length) {
              setSelectedCase((prev) => {
                if (!prev) return null;
                return {
                  ...prev,
                  images: [...prev.images, ...newImages],
                };
              });
              setUploadingImage(false);
            }
          };
          reader.readAsDataURL(file);
        }, 500 + (index * 200));
      });
    }
    event.target.value = '';
  };

  const handleRemoveImage = (index: number) => {
    setSelectedCase((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      };
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Urgent':
        return 'bg-red-100 text-red-800';
      case 'Active':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Technician Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's the overview of assignments and case statuses.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                <div className={stat.textColor}>{stat.icon}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cases */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Recent Cases</h2>
        </div>
        <div className="p-6 space-y-4">
          {cases.map((caseItem) => (
            <div key={caseItem.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-4 flex-1">
                <div className={`w-3 h-3 rounded-full ${
                  caseItem.type === 'assigned' ? 'bg-blue-500' : caseItem.type === 'urgent' ? 'bg-red-500' : 'bg-yellow-500'
                }`}></div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <p className="text-sm font-medium text-gray-800">{caseItem.message}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(caseItem.status)}`}>
                      {caseItem.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>Order ID: {caseItem.id}</span>
                    <span>Patient: {caseItem.patient}</span>
                    <span>Doctor: {caseItem.doctor}</span>
                    <span>{caseItem.time}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleEditCase(caseItem)}
                className="ml-4 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <FiEdit className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {editMode && selectedCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                Edit Case - {selectedCase.patient}
              </h2>
              <button onClick={handleCloseEdit} className="text-gray-400 hover:text-gray-600">
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Case details */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name</label>
                    <input
                      type="text"
                      value={selectedCase.patient}
                      onChange={(e) => setSelectedCase({ ...selectedCase, patient: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Doctor</label>
                    <select
                      value={selectedCase.doctor}
                      onChange={(e) => setSelectedCase({ ...selectedCase, doctor: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Unassigned">Unassigned</option>
                      <option value="Dr. Smith">Dr. Smith</option>
                      <option value="Dr. Johnson">Dr. Johnson</option>
                      <option value="Dr. Williams">Dr. Williams</option>
                      <option value="Dr. Brown">Dr. Brown</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      value={selectedCase.priority}
                      onChange={(e) => setSelectedCase({ ...selectedCase, priority: e.target.value as Case['priority'] })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Low">Low</option>
                      <option value="Normal">Normal</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <textarea
                      rows={4}
                      value={selectedCase.notes}
                      onChange={(e) => setSelectedCase({ ...selectedCase, notes: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Medical Images Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-800">Medical Images</h3>
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploadingImage}
                      />
                      <div className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        {uploadingImage ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          <FiUpload className="w-4 h-4" />
                        )}
                        <span>{uploadingImage ? 'Uploading...' : 'Upload Images'}</span>
                      </div>
                    </label>
                  </div>

                  <div className="space-y-4 max-h-96 overflow-y-auto p-1">
                    {selectedCase.images.length === 0 ? (
                      <div className="flex items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                        <div className="text-center">
                          <FiImage className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500">No medical images uploaded yet</p>
                          <p className="text-sm text-gray-400">Click "Upload Images" to add medical images</p>
                        </div>
                      </div>
                    ) : (
                      selectedCase.images.map((image: string, index: number) => (
                        <div key={index} className="relative group border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start space-x-3">
                            <img
                              src={image}
                              alt={`Medical image ${index + 1}`}
                              className="w-24 h-24 object-cover rounded-lg border"
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-800 mb-1">Medical Image {index + 1}</p>
                              <p className="text-xs text-gray-500">Uploaded {new Date().toLocaleDateString()}</p>
                            </div>
                            <button
                              onClick={() => handleRemoveImage(index)}
                              className="opacity-70 group-hover:opacity-100 p-1 text-red-500 hover:bg-red-50 rounded transition-all"
                            >
                              <FiX className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t">
                <button
                  onClick={handleCloseEdit}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCase}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"
                >
                  <FiSave className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <FiSend className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-medium text-gray-800">Assign New Case</p>
                <p className="text-sm text-gray-500">Create assignment for doctor</p>
              </div>
            </div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <FiClock className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="font-medium text-gray-800">Pending Assignments</p>
                <p className="text-sm text-gray-500">15 awaiting doctor assignment</p>
              </div>
            </div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <FiAlertCircle className="w-5 h-5 text-red-500" />
              <div>
                <p className="font-medium text-gray-800">Urgent Cases</p>
                <p className="text-sm text-gray-500">4 require immediate action</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TechnicianDashboard;
