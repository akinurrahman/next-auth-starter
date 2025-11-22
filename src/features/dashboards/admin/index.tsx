import React from 'react';

import BreadcrumpSetter from '@/components/utils/breadcrump-setter';

const AdminDashboard = () => {
  return (
    <div className="layout">
      <BreadcrumpSetter items={[{ title: 'Dashboard', url: '#' }]} />
      <h2>Admin Dashboard</h2>
      <p>This page is under construction</p>
    </div>
  );
};

export default AdminDashboard;
