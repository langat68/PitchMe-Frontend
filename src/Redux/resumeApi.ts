import axios from 'axios';

const API_URL = 'http://localhost:3000/api/resumes';

export const fetchResume = async (token: string) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const saveResume = async (token: string, resumeData: any) => {
  const res = await axios.post(API_URL, resumeData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
