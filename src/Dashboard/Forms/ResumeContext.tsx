import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Types
export interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  graduationDate: string;
  gpa: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn: string;
  portfolio: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link: string;
}

export interface ResumeData {
  education: Education[];
  experience: Experience[];
  personalInfo: PersonalInfo;
  projects: Project[];
  skills: string[];
  summary: string;
}

// Template types
export type TemplateId = 'modern' | 'classic' | 'creative' | 'minimal';

interface ResumeContextType {
  resumeData: ResumeData;
  selectedTemplate: TemplateId;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  updateEducation: (education: Education[]) => void;
  updateExperience: (experience: Experience[]) => void;
  updatePersonalInfo: (personalInfo: PersonalInfo) => void;
  updateProjects: (projects: Project[]) => void;
  updateSkills: (skills: string[]) => void;
  updateSummary: (summary: string) => void;
  setSelectedTemplate: (template: TemplateId) => void;
}

// Create Context
const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

// Initial resume data
const initialResumeData: ResumeData = {
  education: [],
  experience: [],
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedIn: '',
    portfolio: ''
  },
  projects: [],
  skills: [],
  summary: '',
};

// Provider Component
interface ResumeProviderProps {
  children: ReactNode;
}

export const ResumeProvider: React.FC<ResumeProviderProps> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('modern');
  const [currentStep, setCurrentStep] = useState<number>(0); // ✅ added step state

  const updateEducation = (education: Education[]) => {
    setResumeData(prev => ({ ...prev, education }));
  };

  const updateExperience = (experience: Experience[]) => {
    setResumeData(prev => ({ ...prev, experience }));
  };

  const updatePersonalInfo = (personalInfo: PersonalInfo) => {
    setResumeData(prev => ({ ...prev, personalInfo }));
  };

  const updateProjects = (projects: Project[]) => {
    setResumeData(prev => ({ ...prev, projects }));
  };

  const updateSkills = (skills: string[]) => {
    setResumeData(prev => ({ ...prev, skills }));
  };

  const updateSummary = (summary: string) => {
    setResumeData(prev => ({ ...prev, summary }));
  };

  const value: ResumeContextType = {
    resumeData,
    selectedTemplate,
    currentStep, // ✅ exposed
    setCurrentStep, // ✅ exposed
    updateEducation,
    updateExperience,
    updatePersonalInfo,
    updateProjects,
    updateSkills,
    updateSummary,
    setSelectedTemplate,
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};

// Custom hook
export const useResume = (): ResumeContextType => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
