import React from 'react';
import { useAuth } from '../contexts/auth-context';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from '../components/react/admin-dashboard';
import Sidebar from '../components/layout/sidebar';

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="flex">
      <Sidebar />
      <div className="md:ml-64 flex-1">
        <AdminDashboard />
      </div>
    </div>
  );
};

export default Admin;
