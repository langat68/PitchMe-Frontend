// Stepper.tsx
import React, { useState, useMemo } from 'react';
import './Stepper.scss'; // Import the SCSS file

// Import your actual form components
import PersonalInfoForm from './PersonalInfoForm'; // Adjust path as needed
import SummaryForm from './SummaryForm';           // Adjust path as needed
import ExperienceForm from './ExperienceForm';     // Adjust path as needed
import EducationForm from './EducationForm';       // Adjust path as needed
import SkillsForm from './SkillsForm';             // Adjust path as needed
import ProjectsForm from './ProjectsForm';         // Adjust path as needed

// Define the structure for each step
interface Step {
  id: number;
  name: string;
  component: React.ReactNode;
}

const Stepper: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  // Define steps in an array to make the component more dynamic
  const steps: Step[] = [
    { id: 1, name: 'Personal Info', component: <PersonalInfoForm /> },
    { id: 2, name: 'Summary', component: <SummaryForm /> },
    { id: 3, name: 'Experience', component: <ExperienceForm /> },    
    { id: 4, name: 'Education', component: <EducationForm /> },
    { id: 5, name: 'Skills', component: <SkillsForm /> },
    { id: 6, name: 'Projects', component: <ProjectsForm /> },
  ];

  const handleStepClick = (stepId: number) => {
    setActiveStep(stepId);
  };

  // Calculate progress bar width dynamically
  const progressWidth = useMemo(() => {
    return `${((activeStep - 1) / (steps.length - 1)) * 100}%`;
  }, [activeStep, steps.length]);

  // Get the current active step component
  const currentStepComponent = useMemo(() => {
    const currentStep = steps.find(step => step.id === activeStep);
    return currentStep?.component || null;
  }, [activeStep, steps]);

  return (
    <div>
      <div className="stepper-wrapper">
        <div className="stepper-header">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`step-container ${activeStep === step.id ? 'active' : ''}`}
            >
              <button className="step-button" onClick={() => handleStepClick(step.id)}>
                {step.name}
              </button>
            </div>
          ))}
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: progressWidth }}></div>
        </div>
      </div>

      <div className="form-content">
        {currentStepComponent}
      </div>
    </div>
  );
};

export default Stepper;