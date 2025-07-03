import { createSlice } from '@reduxjs/toolkit';
import  type { PayloadAction } from '@reduxjs/toolkit';
interface Resume {
  personalInfo?: Record<string, any>;
  summary?: string;
  experience?: any[];
  education?: any[];
  skills?: string[];
  projects?: any[];
  [key: string]: any; // to allow for extra fields
}

const resumeSlice = createSlice({
  name: 'resume',
  initialState: {
    data: null as Resume | null,
  },
  reducers: {
    setResume: (state, action: PayloadAction<Resume>) => {
      state.data = action.payload;
    },
    setPersonalInfo: (state, action: PayloadAction<Record<string, any>>) => {
      if (state.data) {
        state.data.personalInfo = action.payload;
      } else {
        state.data = { personalInfo: action.payload };
      }
    },
    setSummary: (state, action: PayloadAction<string>) => {
      if (state.data) {
        state.data.summary = action.payload;
      } else {
        state.data = { summary: action.payload };
      }
    },
    setExperience: (state, action: PayloadAction<any[]>) => {
      if (state.data) {
        state.data.experience = action.payload;
      } else {
        state.data = { experience: action.payload };
      }
    },
    setEducation: (state, action: PayloadAction<any[]>) => {
      if (state.data) {
        state.data.education = action.payload;
      } else {
        state.data = { education: action.payload };
      }
    },
    setSkills: (state, action: PayloadAction<string[]>) => {
      if (state.data) {
        state.data.skills = action.payload;
      } else {
        state.data = { skills: action.payload };
      }
    },
    setProjects: (state, action: PayloadAction<any[]>) => {
      if (state.data) {
        state.data.projects = action.payload;
      } else {
        state.data = { projects: action.payload };
      }
    },
    clearResume: (state) => {
      state.data = null;
    },
  },
});

export const { setResume, setPersonalInfo, setSummary, setExperience, setEducation, setSkills, setProjects, clearResume } = resumeSlice.actions;
export default resumeSlice.reducer;
