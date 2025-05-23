import React from 'react';
import Layout from '../layouts/Layout';
import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';
import { signOutSuccess } from '@/redux/reducers/userslice';

const CompanyAdminProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignOut = () => {
    dispatch(signOutSuccess());
  };

  return (
    <Layout>
      <div className="container  " style={{paddingTop: '120px',paddingBottom:"120px"}}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body text-center p-5">
                <h2 className="mb-4">Company Admin Profile</h2>
                <p className="text-muted mb-4">Manage your company settings here</p>
                
                <button 
                  onClick={handleSignOut}
                  className="btn btn-danger px-4 py-2"
                >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CompanyAdminProfile;