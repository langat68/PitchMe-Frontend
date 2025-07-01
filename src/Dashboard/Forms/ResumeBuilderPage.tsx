import React from 'react';
import Stepper from '../Forms/Stepper'; // Adjust the import path as needed
import { ResumeProvider } from './ResumeContext'; // Adjust the import path as needed
import './ResumeBuilderPage.scss'; // Optional: styles specific to this page

const ResumeBuilderPage: React.FC = () => {
  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Resumly</h1>
        <p>Follow the steps below to create your professional resume.</p>
      </header>
      <main className="page-content">
        <ResumeProvider>
          <Stepper />
        </ResumeProvider>
      </main>
    </div>
  );
};

export default ResumeBuilderPage;