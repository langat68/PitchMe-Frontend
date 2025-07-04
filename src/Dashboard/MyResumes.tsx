import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './MyResumes.module.css';

interface Resume {
  id: string;
  title: string;
}

const MyResumes: React.FC = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/resumes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResumes(response.data.data);
      } catch (error) {
        console.error('Error fetching resumes:', error);
      }
    };

    fetchResumes();
  }, []);

  const handleDownload = async (id: string, title: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3000/resumes/${id}/download`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${title}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading resume:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>My Resumes</h1>
      </div>
      <ul className={styles.resumeList}>
        {resumes.map((resume) => (
          <li key={resume.id} className={styles.resumeItem}>
            <span className={styles.resumeTitle}>{resume.title}</span>
            <div className={styles.buttonGroup}>
              <button onClick={() => navigate(`/dashboard/resumes/${resume.id}`)}>View/Edit</button>
              <button onClick={() => handleDownload(resume.id, resume.title)}>Download</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyResumes;