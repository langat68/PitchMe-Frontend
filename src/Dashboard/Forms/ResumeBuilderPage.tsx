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

// Temporary debug component
const AuthDebugger = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const localToken = localStorage.getItem('token');
  const localAccessToken = localStorage.getItem('accessToken'); // Check both
  const localUser = localStorage.getItem('user');
  
  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: '#f0f0f0', 
      padding: '10px', 
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px'
    }}>
      <h4>Auth Debug:</h4>
      <p><strong>Redux Token:</strong> {authState.token ? '✅' : '❌'}</p>
      <p><strong>Redux User:</strong> {authState.user ? '✅' : '❌'}</p>
      <p><strong>Local 'token':</strong> {localToken ? '✅' : '❌'}</p>
      <p><strong>Local 'accessToken':</strong> {localAccessToken ? '✅' : '❌'}</p>
      <p><strong>Local User:</strong> {localUser ? '✅' : '❌'}</p>
    </div>
  );
};

interface ResumeBuilderProps {
  onBackToHome?: () => void;
}

const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ onBackToHome }) => {
  const dispatch = useDispatch();
  const { token: reduxToken, user } = useSelector((state: RootState) => state.auth);
  const resume = useSelector((state: RootState) => state.resume.data);
  const resumeState = useSelector((state: RootState) => state.resume);

  // Check localStorage for token if Redux doesn't have it
  const [localToken, setLocalToken] = useState<string | null>(null);
  
  useEffect(() => {
    if (!reduxToken) {
      const tokenFromStorage = localStorage.getItem('token') || localStorage.getItem('accessToken'); // Check both keys
      setLocalToken(tokenFromStorage);
      console.log('🔄 Retrieved token from localStorage:', tokenFromStorage ? 'Present' : 'Missing');
    }
  }, [reduxToken]);

  // Use Redux token or fallback to localStorage token
  const token = reduxToken || localToken;

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

  // Add authentication check
  useEffect(() => {
    console.log('🔍 Component mounted - checking auth state');
    console.log('🔐 Auth token:', token ? 'Present' : 'Missing');
    console.log('📄 Resume data:', resume ? 'Present' : 'Missing');
    console.log('🗂️ Full auth state:', { token: reduxToken, user });
  }, [reduxToken, user, token, resume]);

  useEffect(() => {
    console.log('🔄 useEffect triggered - Auth Check');
    console.log('🔐 Token:', token);
    console.log('📄 Resume:', resume);
    
    if (token && !resume) {
      console.log('📥 Fetching resume from backend...');
      fetchResume(token)
        .then((data) => {
          console.log('✅ Resume fetched successfully:', data);
          dispatch(setResume(data));
        })
        .catch((err) => {
          console.error('❌ Failed to load resume:', err);
        });
    } else if (!token) {
      console.warn('⚠️ No token available - user not authenticated');
    } else if (resume) {
      console.log('✅ Resume already loaded');
    }
  }, [token, resume, dispatch]);

  const handleNext = async () => {
    console.log('🚀 handleNext called');
    console.log('📊 Current step:', currentStep);
    console.log('📋 Total steps:', steps.length);
    console.log('🎯 Is last step?', currentStep === steps.length - 1);
    
    if (currentStep < steps.length - 1) {
      console.log('➡️ Moving to next step');
      setCurrentStep(currentStep + 1);
    } else {
      console.log('✅ Completing resume - calling handleComplete');
      await handleComplete();
    }
  };

  const handleComplete = async () => {
    console.log('🔄 handleComplete started');
    console.log('🔐 Token available:', !!token);
    console.log('📄 Resume data:', resume);
    console.log('🗂️ Full resume state:', resumeState);

    if (!token) {
      console.error('❌ No token available');
      alert('❌ Please log in to save your resume');
      return;
    }

    try {
      console.log('📤 Attempting to save resume to backend...');
      console.log('📤 Token:', token);
      
      // Get the actual form data from Redux store
      let resumePayload;
      
      if (resume && resume.data && Array.isArray(resume.data) && resume.data.length > 0) {
        // If resume.data contains actual resume data
        resumePayload = resume.data[0];
        console.log('📤 Using existing resume data:', resumePayload);
      } else {
        // If no existing resume data, create from form inputs
        resumePayload = {
          personalInfo: resumeState.data?.personalInfo || {},
summary: resumeState.data?.summary || '',
experience: resumeState.data?.experience || [],
education: resumeState.data?.education || [],
skills: resumeState.data?.skills || [],
projects: resumeState.data?.projects || [],

        };
        console.log('📤 Creating new resume from form data:', resumePayload);
      }
      
      // Validate that we have some data
      if (!resumePayload.personalInfo && !resumePayload.summary && 
          (!resumePayload.experience || resumePayload.experience.length === 0)) {
        console.warn('⚠️ No resume data to save');
        alert('⚠️ Please fill in at least your personal information and summary before saving.');
        return;
      }
      
      console.log('📤 Final resume payload:', JSON.stringify(resumePayload, null, 2));
      
      // Fix: Change parameter order - saveResume expects (resumeData, token)
      const response = await saveResume( token ,resumePayload );
      console.log('✅ Resume saved successfully:', response);
      
      alert('✅ Resume completed and saved successfully!');
      console.log('👁️ Redirecting to preview...');
      setShowPreview(true);
      
    } catch (error) {
      console.error('❌ Failed to save resume:', error);
      console.error('❌ Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        response: (error as any)?.response?.data,
        status: (error as any)?.response?.status
      });
      
      // More specific error message
      let errorMessage = '❌ Failed to save resume. ';
      if ((error as any)?.response?.status === 400) {
        errorMessage += 'Please check that all required fields are filled correctly.';
      } else if ((error as any)?.response?.status === 401) {
        errorMessage += 'Please log in again.';
      } else {
        errorMessage += 'Please try again.';
      }
      
      alert(errorMessage);
    }
  };

  const handlePrevious = () => {
    console.log('⬅️ handlePrevious called, current step:', currentStep);
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = async () => {
    console.log('💾 handleSave called');
    console.log('💾 Token:', !!token);
    console.log('💾 Resume:', !!resume);
    console.log('💾 Resume state:', resumeState);
    
    if (!token) {
      console.error('❌ No token available for saving');
      alert('❌ Please log in to save your resume');
      return;
    }

    try {
      // Get the actual form data from Redux store
      let resumePayload;
      
      if (resume && resume.data && Array.isArray(resume.data) && resume.data.length > 0) {
        resumePayload = resume.data[0];
      } else {
        resumePayload = {
          personalInfo: resumeState.data?.personalInfo || {},
summary: resumeState.data?.summary || '',
experience: resumeState.data?.experience || [],
education: resumeState.data?.education || [],
skills: resumeState.data?.skills || [],
projects: resumeState.data?.projects || [],

        };
      }
      
      // Validate that we have some data
      if (!resumePayload.personalInfo && !resumePayload.summary && 
          (!resumePayload.experience || resumePayload.experience.length === 0)) {
        console.warn('⚠️ No resume data to save');
        alert('⚠️ Please fill in at least your personal information and summary before saving.');
        return;
      }
      
      console.log('💾 Saving resume payload:', resumePayload);
      
      // Fix: Change parameter order - saveResume expects (resumeData, token)
      const result = await saveResume(token ,resumePayload );
      console.log('✅ Resume saved via handleSave:', result);
      alert('✅ Resume saved successfully!');
      
    } catch (error) {
      console.error('❌ Failed to save resume via handleSave:', error);
      
      // More specific error message
      let errorMessage = '❌ Failed to save resume. ';
      if ((error as any)?.response?.status === 400) {
        errorMessage += 'Please check that all required fields are filled correctly.';
      } else if ((error as any)?.response?.status === 401) {
        errorMessage += 'Please log in again.';
      } else {
        errorMessage += 'Please try again.';
      }
      
      alert(errorMessage);
    }
  };

  const handleExport = () => {
    console.log('📥 handleExport called - triggering print');
    window.print();
  };

  // Show warning if not authenticated
  if (!token) {
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
          </div>
        </div>
        <div className="resume-builder-main">
          <div className="builder-grid">
            <div className="form-section">
              <div className="progress-card">
                <div className="progress-card-content">
                  <div className="progress-header">
                    <h2 className="progress-title">Authentication Required</h2>
                  </div>
                  <div style={{ padding: '20px', textAlign: 'center' }}>
                    <p>⚠️ You need to be logged in to use the resume builder.</p>
                    <p>Please log in and try again.</p>
                    <button 
                      className="btn btn-primary" 
                      onClick={() => onBackToHome?.()}
                      style={{ marginTop: '10px' }}
                    >
                      Go to Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
      <AuthDebugger />
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
                disabled={false}
                className="btn btn-primary"
              >
                <span>{currentStep === steps.length - 1 ? 'Complete Resume' : 'Next'}</span>
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