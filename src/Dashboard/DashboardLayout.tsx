import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './DashboardLayout.module.css';

const DashboardLayout: React.FC = () => {
  return (
    <div className={styles.dashboardLayout}>
      <aside className={styles.sidebar}>
        <h2>Dashboard</h2>
        <ul>
          <li><a href="/dashboard/resumes">My Resumes</a></li>
        </ul>
      </aside>
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;