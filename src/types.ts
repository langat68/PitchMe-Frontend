// src/types/resume.ts

export interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  graduationDate: string;
  gpa?: string; // GPA is optional
}

// A plausible structure for the main resume data
export interface ResumeData {
  // ... other properties like personalInfo, experience, etc.
  education: Education[];
}