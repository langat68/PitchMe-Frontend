import React, { useEffect, useState } from 'react';
import {
  FileText,
  ArrowLeft,
  ArrowRight,
  Eye,
  Download,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../Redux/store';
import { setResume } from '../../Redux/slices/resumeSlice';
import { fetchResume, saveResume } from '../../Redux/resumeApi';

import PersonalInfoForm from './PersonalInfoForm';
import SummaryForm from './SummaryForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import ProjectsForm from './ProjectsForm';
import TemplateSelector from './TemplateSelector';
import ResumePreview from './ResumePreview';
import AIChat from '../Forms/AIChat';
import './Styles/ResumeBuilderPage.scss';

interface ResumeBuilderProps {
  onBackToHome?: () => void;
}

const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ onBackToHome }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  const resume = useSelector((state: RootState) => state.resume.data);

  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  const steps = [
    { title: 'Personal Info', component: PersonalInfoForm },
    { title: 'Summary', component: SummaryForm },
    { title: 'Experience', component: ExperienceForm },
    { title: 'Education', component: EducationForm },
    { title: 'Skills', component: SkillsForm },
    { title: 'Projects', component: ProjectsForm },
  ];

  const CurrentStepComponent = steps[currentStep].component;
  const progress = ((currentStep + 1) / steps.length) * 100;

  useEffect(() => {
    if (token && !resume) {
      fetchResume(token)
        .then((data) => {
          dispatch(setResume(data));
        })
        .catch((err) => console.error('Failed to load resume:', err));
    }
  }, [token, resume, dispatch]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    if (token && resume) {
      saveResume(token, resume)
        .then(() => alert('✅ Resume saved to backend!'))
        .catch((err) => console.error('Failed to save resume:', err));
    }
  };

  const handleExport = () => {
    window.print();
  };

  if (showTemplates) {
    return (
      <TemplateSelector
        onBack={() => setShowTemplates(false)}
        onBackToHome={onBackToHome ?? (() => {})}
      />
    );
  }

  if (showPreview) {
    return (
      <div className="resume-builder-preview">
        <div className="preview-header">
          <div className="preview-header-container">
            <div className="preview-header-content">
              <div className="preview-header-left">
                <button
                  className="btn btn-ghost"
                  onClick={() => setShowPreview(false)}
                >
                  <ArrowLeft className="icon" />
                  <span>Back to Editor</span>
                </button>
                <div className="brand">
                  <div className="brand-icon">
                    <FileText className="icon" />
                  </div>
                  <span className="brand-text">Resumly</span>
                </div>
              </div>
              <div className="preview-header-right">
                <button
                  className="btn btn-outline"
                  onClick={() => setShowTemplates(true)}
                >
                  <FileText className="icon" />
                  <span>Templates</span>
                </button>
                <button onClick={handleExport} className="btn btn-primary">
                  <Download className="icon" />
                  <span>Download PDF</span>
                </button>
                <button onClick={handleSave} className="btn btn-success">
                  <span>Save to Backend</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="preview-content">
          <ResumePreview />
        </div>
      </div>
    );
  }

  return (
    <div className="resume-builder">
      <div className="resume-header">
        <div className="resume-header__container">
          <div className="resume-header__left">
            <button
              className="resume-header__back"
              onClick={() => onBackToHome?.()}
            >
              <ArrowLeft className="icon" />
              <span>Home</span>
            </button>
          </div>
          <div className="resume-header__brand">
            <FileText className="resume-header__icon" />
            <span className="resume-header__title">Resumly</span>
          </div>
          <div className="resume-header__right">
            <button
              className="resume-header__btn"
              onClick={() => setShowPreview(true)}
            >
              <Eye className="icon" />
              <span>Preview</span>
            </button>
            <button
              className="resume-header__btn"
              onClick={() => setShowTemplates(true)}
            >
              <FileText className="icon" />
              <span>Templates</span>
            </button>
            <button
              className="resume-header__btn btn-success"
              onClick={handleSave}
            >
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>

      <div className="resume-builder-main">
        <div className="builder-grid">
          <div className="form-section">
            <div className="progress-card">
              <div className="progress-card-content">
                <div className="progress-header">
                  <h2 className="progress-title">
                    Step {currentStep + 1} of {steps.length}:{' '}
                    {steps[currentStep].title}
                  </h2>
                  <div className="progress-badge">
                    {Math.round(progress)}% Complete
                  </div>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="step-buttons">
                  {steps.map((step, index) => (
                    <button
                      key={index}
                      className={`step-btn ${
                        index === currentStep
                          ? 'active'
                          : index < currentStep
                          ? 'completed'
                          : 'inactive'
                      }`}
                      onClick={() => setCurrentStep(index)}
                    >
                      {step.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-card">
              <div className="form-card-content">
                <CurrentStepComponent />
              </div>
            </div>

            <div className="navigation">
              <button
                className="btn btn-outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="icon" />
                <span>Previous</span>
              </button>
              <button
                onClick={handleNext}
                disabled={currentStep === steps.length - 1}
                className="btn btn-primary"
              >
                <span>Next</span>
                <ArrowRight className="icon" />
              </button>
            </div>
          </div>

          <div className="preview-section">
            <div className="preview-card">
              <div className="preview-card-content">
                <div className="preview-card-header">
                  <h3 className="preview-title">Live Preview</h3>
                  <button
                    className="btn btn-small"
                    onClick={() => setShowPreview(true)}
                  >
                    <Eye className="icon" />
                    <span>Full View</span>
                  </button>
                </div>
                <div className="preview-container">
                  <div className="preview-scaled">
                    <ResumePreview />
                  </div>
                  <div className="chat-under-preview">
                    <AIChat />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default ResumeBuilder;
