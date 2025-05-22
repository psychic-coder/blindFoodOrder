// components/ProfileInfoSection.jsx
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { config } from '@/data/axiosData';

const ProfileInfoSection = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tempPhoto, setTempPhoto] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoUrl: ''
  });



  useEffect(() => {
    if (currentUser?.user) {
      setFormData({
        name: currentUser.user.name || '',
        email: currentUser.user.email || '',
        photoUrl: currentUser.user.photoUrl || ''
      });
    }
  }, [currentUser]);

  if (!currentUser?.user) return <div>Loading profile data...</div>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTempPhoto(URL.createObjectURL(file));
      // If you want to upload the file immediately:
      // handleFileUpload(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      
      const res = await axios.put(
        'http://localhost:5000/api/customer/me',
        formData,
        config
      );
      
      // Update the local state with the new data
      setFormData({
        name: res.data.customer.name,
        email: res.data.customer.email,
        photoUrl: res.data.customer.photoUrl
      });
      
      setIsEditing(false);
      setTempPhoto(null);
      
      // Here you would typically dispatch an action to update the Redux store
      // dispatch(updateUserProfile(res.data.customer));
      
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  // Optional: Handle file upload separately
  const handleFileUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('profilePhoto', file);
      
      const res = await axios.post(
        'http://localhost:5000/api/customer/upload-photo',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      setFormData(prev => ({ ...prev, photoUrl: res.data.photoUrl }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload photo');
    }
  };

  return (
    <div className="col-lg-8">
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="card-header bg-white border-0 pb-0">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h4 className="mb-1 fw-bold text-warning">Profile Information</h4>
              <p className="text-muted mb-0">Manage your personal details and preferences</p>
            </div>
            <div className="d-flex gap-2">
              {!isEditing ? (
                <button 
                  className="btn btn-warning rounded-pill px-4"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button 
                    className="btn btn-outline-secondary rounded-pill px-4"
                    onClick={() => setIsEditing(false)}
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn btn-warning rounded-pill px-4"
                    type="submit"
                    form="profileForm"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              )}
              <div className="bg-warning bg-opacity-10 rounded-circle p-3">
                <i className="bi bi-person-lines-fill text-warning fs-4"></i>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card-body pt-4">
          {error && (
            <div className="alert alert-danger mb-4">
              {error}
            </div>
          )}
          
          {isEditing ? (
            <form id="profileForm" onSubmit={handleSubmit}>
              <div className="row g-4">
                {/* Photo Upload */}
                <div className="col-12">
                  <label className="form-label fw-semibold text-dark">Profile Photo</label>
                  <div className="d-flex align-items-center gap-3">
                    <img 
                      src={tempPhoto || formData.photoUrl || "https://plus.unsplash.com/premium_photo-1678197937465-bdbc4ed95815?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww"} 
                      alt="Preview" 
                      className="rounded-circle border"
                      width="80"
                      height="80"
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="flex-grow-1">
                      <input 
                        type="file" 
                        className="form-control rounded-pill border-0 shadow-sm" 
                        onChange={handlePhotoChange}
                        accept="image/*"
                        disabled={isLoading}
                      />
                      <small className="text-muted">Upload a new profile picture</small>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold text-dark">
                    <i className="bi bi-person me-2 text-warning"></i>
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill border-0 shadow-sm bg-light px-4 py-3"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold text-dark">
                    <i className="bi bi-envelope me-2 text-warning"></i>
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control rounded-pill border-0 shadow-sm bg-light px-4 py-3"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold text-dark">
                    <i className="bi bi-image me-2 text-warning"></i>
                    Profile Photo URL
                  </label>
                  <input
                    type="url"
                    className="form-control rounded-pill border-0 shadow-sm bg-light px-4 py-3"
                    name="photoUrl"
                    value={formData.photoUrl}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    placeholder="Enter photo URL (optional)"
                  />
                </div>
              </div>
            </form>
          ) : (
            <div className="row g-4">
              <div className="col-md-6">
                <div className="p-4 bg-light rounded-4">
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-person text-warning me-2"></i>
                    <h6 className="text-muted mb-0 fw-semibold">Full Name</h6>
                  </div>
                  <p className="mb-0 fs-5 fw-semibold text-dark">{currentUser.user.name}</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-4 bg-light rounded-4">
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-envelope text-warning me-2"></i>
                    <h6 className="text-muted mb-0 fw-semibold">Email</h6>
                  </div>
                  <p className="mb-0 fs-5 fw-semibold text-dark">{currentUser.user.email}</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-4 bg-light rounded-4">
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-calendar-check text-warning me-2"></i>
                    <h6 className="text-muted mb-0 fw-semibold">Member Since</h6>
                  </div>
                  <p className="mb-0 fs-5 fw-semibold text-dark">
                    {new Date(currentUser.user.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-4 bg-light rounded-4">
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-person-badge text-warning me-2"></i>
                    <h6 className="text-muted mb-0 fw-semibold">Role</h6>
                  </div>
                  <span className="badge bg-warning text-dark fs-6 px-3 py-2 rounded-pill fw-semibold">
                    {currentUser.user.role}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoSection;