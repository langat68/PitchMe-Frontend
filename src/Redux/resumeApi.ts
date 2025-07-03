import axios from 'axios';

const API_URL = 'http://localhost:3000/resumes';

// Define proper types for better type safety
interface ResumeData {
  personalInfo?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
    linkedin?: string;
    github?: string;
  };
  summary?: string;
  experience?: Array<{
    company?: string;
    position?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
  }>;
  education?: Array<{
    institution?: string;
    degree?: string;
    fieldOfStudy?: string;
    startDate?: string;
    endDate?: string;
    gpa?: string;
  }>;
  skills?: Array<string>;
  projects?: Array<{
    name?: string;
    description?: string;
    technologies?: Array<string>;
    url?: string;
  }>;
}

interface FetchResumeResponse {
  success: boolean;
  data: ResumeData[];
  pagination: {
    page: number;
    limit: number;
    total: string;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export const fetchResume = async (token: string): Promise<FetchResumeResponse> => {
  try {
    const res = await axios.get<FetchResumeResponse>(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error('❌ Error fetching resume:', error);
    throw error;
  }
};

export const saveResume = async (token: string, resumeData: ResumeData) => {
  try {
    console.log('📤 Sending resume data to API:', JSON.stringify(resumeData, null, 2));
    
    const res = await axios.post(API_URL, resumeData, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    
    console.log('✅ Resume saved successfully:', res.data);
    return res.data;
  } catch (error) {
    console.error('❌ Error saving resume:', error);
    
    // Log more detailed error information
    if (axios.isAxiosError(error)) {
      console.error('❌ Response status:', error.response?.status);
      console.error('❌ Response data:', error.response?.data);
      console.error('❌ Request config:', error.config);
    }
    
    throw error;
  }
};

// Helper function to extract actual resume data from API response
export const extractResumeData = (apiResponse: FetchResumeResponse): ResumeData | null => {
  if (apiResponse.success && apiResponse.data && apiResponse.data.length > 0) {
    return apiResponse.data[0]; // Return the first resume
  }
  return null;
};

// Helper function to create empty resume structure
export const createEmptyResume = (): ResumeData => ({
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    github: ''
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: []
});