import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { signOutSuccess } from '@/redux/reducers/userslice';
import axios from 'axios';
import { config } from '@/data/axiosData';
import Layout from '../layouts/Layout';

const CustomerProfile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    address: '',
    photoUrl: '',
    role: '',
    createdAt: '',
    orders: []
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    photoUrl: ''
  });
  const [tempPhoto, setTempPhoto] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get('http://localhost:4000/api/customer/me', config);
        console.log(res.data.customer)
        setCustomerData(res.data.customer);
        setFormData({
          name: res.data.customer.name,
          email: res.data.customer.email,
          address: res.data.customer.address,
          photoUrl: res.data.customer.photoUrl
        });
        setIsLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch customer data');
        setIsLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTempPhoto(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.put(
        'http://localhost:5000/api/customer/me',
        formData,
        config
      );
      setCustomerData(res.data.customer);
      setIsEditing(false);
      setTempPhoto(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    router.push('/signin');
    dispatch(signOutSuccess());
    
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="text-center">
            <div className="spinner-border text-warning mb-3" style={{width: '3rem', height: '3rem'}} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted fs-5">Loading your profile...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="alert alert-danger border-0 shadow-sm rounded-4">
                <div className="d-flex align-items-center">
                  <i className="bi bi-exclamation-triangle-fill fs-4 me-3"></i>
                  <div>
                    <h6 className="alert-heading mb-1">Something went wrong</h6>
                    <p className="mb-0">{error}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-light min-vh-100" style={{paddingTop: '120px'}}>
        {/* Header Section */}
        <div className="bg-warning bg-gradient position-relative overflow-hidden">
          <div className="position-absolute top-0 end-0 w-50 h-100 opacity-10">
            <svg viewBox="0 0 200 200" className="w-100 h-100">
              <circle cx="150" cy="50" r="80" fill="white" opacity="0.1"/>
              <circle cx="50" cy="150" r="60" fill="white" opacity="0.15"/>
            </svg>
          </div>
          <div className="container py-5 position-relative">
            <div className="row align-items-center">
              <div className="col-auto">
                <div className="position-relative">
                  <img 
                    src={ "https://plus.unsplash.com/premium_photo-1678197937465-bdbc4ed95815?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww"} 
                    alt="Profile" 
                    className="rounded-circle border border-4 border-white shadow-lg"
                    width="120"
                    height="120"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="position-absolute bottom-0 end-0 bg-success rounded-circle p-2 border border-3 border-white">
                    <i className="bi bi-check-lg text-white"></i>
                  </div>
                </div>
              </div>
              <div className="col">
                <h1 className="text-white mb-2 fw-bold">{customerData.name}</h1>
                <p className="text-white-50 mb-2 fs-5">
                  <i className="bi bi-envelope me-2"></i>
                  {customerData.email}
                </p>
                <p className="text-white-50 mb-3">
                  <i className="bi bi-geo-alt me-2"></i>
                  {customerData.address}
                </p>
                <div className="d-flex gap-2 flex-wrap">
                  <span className="badge bg-white text-warning fs-6 px-3 py-2 rounded-pill">
                    <i className="bi bi-person-badge me-1"></i>
                    {customerData.role}
                  </span>
                  <span className="badge bg-success bg-opacity-25 text-white fs-6 px-3 py-2 rounded-pill">
                    <i className="bi bi-calendar-check me-1"></i>
                    Member since {new Date(customerData.createdAt).getFullYear()}
                  </span>
                </div>
              </div>
              <div className="col-auto">
                <div className="d-flex gap-2 flex-column flex-sm-row">
                  {!isEditing ? (
                    <>
                      <button 
                        className="btn btn-dark rounded-pill px-4 fw-semibold shadow-sm"
                        onClick={() => setIsEditing(true)}
                        disabled={isLoading}
                      >
                        <i className="bi bi-pencil me-2"></i>
                        Edit Profile
                      </button>
                      <button 
                        className="btn btn-outline-light rounded-pill px-4 fw-semibold"
                        onClick={handleSignOut}
                        disabled={isLoading}
                      >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        className="btn btn-success rounded-pill px-4 fw-semibold shadow-sm"
                        onClick={handleSubmit}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="spinner-border spinner-border-sm me-2"></span>
                        ) : (
                          <i className="bi bi-check-lg me-2"></i>
                        )}
                        Save Changes
                      </button>
                      <button 
                        className="btn btn-outline-light rounded-pill px-4 fw-semibold"
                        onClick={() => {
                          setIsEditing(false);
                          setTempPhoto(null);
                        }}
                        disabled={isLoading}
                      >
                        <i className="bi bi-x-lg me-2"></i>
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-5">
          <div className="row g-4">
            {/* Profile Information Card */}
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="card-header bg-white border-0 pb-0">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h4 className="mb-1 fw-bold text-warning">Profile Information</h4>
                      <p className="text-muted mb-0">Manage your personal details and preferences</p>
                    </div>
                    <div className="bg-warning bg-opacity-10 rounded-circle p-3">
                      <i className="bi bi-person-lines-fill text-warning fs-4"></i>
                    </div>
                  </div>
                </div>
                <div className="card-body pt-4">
                  {isEditing ? (
                    <form onSubmit={handleSubmit}>
                      <div className="row g-4">
                        {/* Photo Upload */}
                        <div className="col-12">
                          <label className="form-label fw-semibold text-dark">Profile Photo</label>
                          <div className="d-flex align-items-center gap-3">
                            <img 
                              src={tempPhoto || customerData.photoUrl || "https://plus.unsplash.com/premium_photo-1678197937465-bdbc4ed95815?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww"} 
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
                            <i className="bi bi-geo-alt me-2 text-warning"></i>
                            Address
                          </label>
                          <textarea
                            className="form-control rounded-4 border-0 shadow-sm bg-light px-4 py-3"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            rows="3"
                            required
                            disabled={isLoading}
                            placeholder="Enter your complete address"
                          ></textarea>
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
                          <p className="mb-0 fs-5 fw-semibold text-dark">{customerData.name}</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="p-4 bg-light rounded-4">
                          <div className="d-flex align-items-center mb-2">
                            <i className="bi bi-envelope text-warning me-2"></i>
                            <h6 className="text-muted mb-0 fw-semibold">Email</h6>
                          </div>
                          <p className="mb-0 fs-5 fw-semibold text-dark">{customerData.email}</p>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="p-4 bg-light rounded-4">
                          <div className="d-flex align-items-center mb-2">
                            <i className="bi bi-geo-alt text-warning me-2"></i>
                            <h6 className="text-muted mb-0 fw-semibold">Address</h6>
                          </div>
                          <p className="mb-0 fs-5 fw-semibold text-dark">{customerData.address}</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="p-4 bg-light rounded-4">
                          <div className="d-flex align-items-center mb-2">
                            <i className="bi bi-calendar-check text-warning me-2"></i>
                            <h6 className="text-muted mb-0 fw-semibold">Member Since</h6>
                          </div>
                          <p className="mb-0 fs-5 fw-semibold text-dark">
                            {new Date(customerData.createdAt).toLocaleDateString('en-US', { 
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
                            {customerData.role}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Stats Sidebar */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
                <div className="card-header bg-gradient bg-warning text-dark border-0">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-graph-up fs-4 me-3"></i>
                    <div>
                      <h5 className="mb-0 fw-bold">Account Overview</h5>
                      <small className="opacity-75">Your activity summary</small>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-6">
                      <div className="text-center p-3 bg-success bg-opacity-10 rounded-4">
                        <i className="bi bi-bag-check text-success fs-2 mb-2"></i>
                        <h4 className="mb-1 fw-bold text-success">{customerData.orders?.length || 0}</h4>
                        <small className="text-muted fw-semibold">Total Orders</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="text-center p-3 bg-info bg-opacity-10 rounded-4">
                        <i className="bi bi-star-fill text-info fs-2 mb-2"></i>
                        <h4 className="mb-1 fw-bold text-info">Premium</h4>
                        <small className="text-muted fw-semibold">Member Status</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Orders Section */}
            <div className="col-12">
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="card-header bg-white border-0 pb-0">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h4 className="mb-1 fw-bold text-warning">Order History</h4>
                      <p className="text-muted mb-0">Track your recent purchases and order status</p>
                    </div>
                    <div className="bg-warning bg-opacity-10 rounded-circle p-3">
                      <i className="bi bi-bag-check-fill text-warning fs-4"></i>
                    </div>
                  </div>
                </div>
                <div className="card-body pt-4">
                  {customerData.orders?.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-hover align-middle">
                        <thead className="table-light">
                          <tr>
                            <th className="border-0 fw-bold text-warning">Order ID</th>
                            <th className="border-0 fw-bold text-warning">Date</th>
                            <th className="border-0 fw-bold text-warning">Amount</th>
                            <th className="border-0 fw-bold text-warning">Status</th>
                            <th className="border-0 fw-bold text-warning">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {customerData.orders.map(order => (
                            <tr key={order.id} className="border-bottom">
                              <td className="fw-semibold">
                                <i className="bi bi-hash text-muted me-1"></i>
                                {order.id}
                              </td>
                              <td className="text-muted">
                                {new Date(order.createdAt).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric', 
                                  year: 'numeric' 
                                })}
                              </td>
                              <td className="fw-bold fs-5 text-success">
                                ${order.totalAmount.toFixed(2)}
                              </td>
                              <td>
                                <span className={`badge fs-6 px-3 py-2 rounded-pill fw-semibold ${
                                  order.status === 'CONFIRMED' ? 'bg-success' : 
                                  order.status === 'PENDING' ? 'bg-warning text-dark' : 
                                  'bg-secondary'
                                }`}>
                                  <i className={`bi ${
                                    order.status === 'CONFIRMED' ? 'bi-check-circle' : 
                                    order.status === 'PENDING' ? 'bi-clock' : 
                                    'bi-x-circle'
                                  } me-1`}></i>
                                  {order.status}
                                </span>
                              </td>
                              <td>
                                <button className="btn btn-outline-warning btn-sm rounded-pill px-3">
                                  <i className="bi bi-eye me-1"></i>
                                  View
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-5">
                      <div className="bg-light rounded-circle d-inline-flex p-4 mb-3">
                        <i className="bi bi-bag-x text-muted" style={{fontSize: '3rem'}}></i>
                      </div>
                      <h5 className="text-muted mb-2">No orders yet</h5>
                      <p className="text-muted mb-4">Start shopping to see your order history here</p>
                      <button className="btn btn-warning rounded-pill px-4 fw-semibold">
                        <i className="bi bi-shop me-2"></i>
                        Start Shopping
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerProfile;