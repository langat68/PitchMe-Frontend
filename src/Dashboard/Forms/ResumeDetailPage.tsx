import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  isCurrentRole: boolean;
  description: string;
  achievements: string[];
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  gpa?: string;
  achievements?: string[];
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
  startDate: string;
  endDate?: string;
}

interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone?: string;
    location?: string;
    website?: string;
    linkedin?: string;
    github?: string;
  };
  professionalSummary?: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  title: string;
  targetRole?: string;
  industry?: string;
  isPublic: boolean;
}

const ResumeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const response = await axios.get(`http://localhost:3000/resumes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResume(response.data.data);
      } catch (err) {
        console.error('Error fetching resume:', err);
        setError('Failed to load resume.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchResume();
    }
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResume(prev => {
      if (!prev) return null;

      const [section, indexStr, field, subIndexStr] = name.split('.');

      if (section === 'personalInfo') {
        return {
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            [field]: value,
          },
        };
      } else if (section === 'experience' || section === 'education' || section === 'projects') {
        const index = parseInt(indexStr);
        const updatedArray = [...(prev as any)[section]];
        if (field === 'achievements') {
          const subIndex = parseInt(subIndexStr);
          updatedArray[index][field][subIndex] = value;
        } else {
          updatedArray[index] = {
            ...updatedArray[index],
            [field]: value,
          };
        }
        return {
          ...prev,
          [section]: updatedArray,
        };
      } else if (section === 'skills') {
        // Assuming skills is a simple array of strings, handled differently
        // This part might need more specific logic depending on how you want to edit skills
        return {
          ...prev,
          skills: value.split(',').map(s => s.trim()),
        };
      } else {
        return {
          ...prev,
          [name]: value,
        };
      }
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, section: string, index: number, field: string) => {
    const { checked } = e.target;
    setResume(prev => {
      if (!prev) return null;
      const updatedArray = [...(prev as any)[section]];
      updatedArray[index] = {
        ...updatedArray[index],
        [field]: checked,
      };
      return {
        ...prev,
        [section]: updatedArray,
      };
    });
  };

  const handleAddExperience = () => {
    setResume(prev => {
      if (!prev) return null;
      return {
        ...prev,
        experience: [
          ...prev.experience,
          {
            id: Date.now().toString(), // Simple unique ID
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            isCurrentRole: false,
            description: '',
            achievements: [],
          },
        ],
      };
    });
  };

  const handleRemoveExperience = (index: number) => {
    setResume(prev => {
      if (!prev) return null;
      const updatedExperience = prev.experience.filter((_, i) => i !== index);
      return {
        ...prev,
        experience: updatedExperience,
      };
    });
  };

  const handleAddEducation = () => {
    setResume(prev => {
      if (!prev) return null;
      return {
        ...prev,
        education: [
          ...prev.education,
          {
            id: Date.now().toString(),
            institution: '',
            degree: '',
            field: '',
            startDate: '',
            endDate: '',
            gpa: '',
            achievements: [],
          },
        ],
      };
    });
  };

  const handleRemoveEducation = (index: number) => {
    setResume(prev => {
      if (!prev) return null;
      const updatedEducation = prev.education.filter((_, i) => i !== index);
      return {
        ...prev,
        education: updatedEducation,
      };
    });
  };

  const handleAddProject = () => {
    setResume(prev => {
      if (!prev) return null;
      return {
        ...prev,
        projects: [
          ...prev.projects,
          {
            id: Date.now().toString(),
            name: '',
            description: '',
            technologies: [],
            url: '',
            github: '',
            startDate: '',
            endDate: '',
          },
        ],
      };
    });
  };

  const handleRemoveProject = (index: number) => {
    setResume(prev => {
      if (!prev) return null;
      const updatedProjects = prev.projects.filter((_, i) => i !== index);
      return {
        ...prev,
        projects: updatedProjects,
      };
    });
  };

  const handleAddArrayItem = (section: string, index: number, field: string, newItem: string) => {
    setResume(prev => {
      if (!prev) return null;
      const updatedSection = [...(prev as any)[section]];
      updatedSection[index] = {
        ...updatedSection[index],
        [field]: [...updatedSection[index][field], newItem],
      };
      return {
        ...prev,
        [section]: updatedSection,
      };
    });
  };

  const handleRemoveArrayItem = (section: string, index: number, field: string, itemIndex: number) => {
    setResume(prev => {
      if (!prev) return null;
      const updatedSection = [...(prev as any)[section]];
      updatedSection[index] = {
        ...updatedSection[index],
        [field]: updatedSection[index][field].filter((_: string, i: number) => i !== itemIndex),
      };
      return {
        ...prev,
        [section]: updatedSection,
      };
    });
  };

  const handleArrayFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, section: string, index: number, field: string) => {
    const { value } = e.target;
    setResume(prev => {
      if (!prev) return null;
      const updatedSection = [...(prev as any)[section]];
      updatedSection[index] = {
        ...updatedSection[index],
        [field]: value.split(',').map(s => s.trim()),
      };
      return {
        ...prev,
        [section]: updatedSection,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token || !resume) return;

      await axios.put(`http://localhost:3000/resumes/${id}`, resume, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Resume updated successfully!');
    } catch (err) {
      console.error('Error updating resume:', err);
      alert('Failed to update resume.');
    }
  };

  if (loading) return <div>Loading resume...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!resume) return <div>Resume not found.</div>;

  return (
    <div>
      <h1>Edit Resume: {resume.title}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={resume.title} onChange={handleChange} />
        </label>
        <br />
        <label>
          Professional Summary:
          <textarea name="professionalSummary" value={resume.professionalSummary || ''} onChange={handleChange} />
        </label>
        <br />
        <label>
          Target Role:
          <input type="text" name="targetRole" value={resume.targetRole || ''} onChange={handleChange} />
        </label>
        <br />
        <label>
          Industry:
          <input type="text" name="industry" value={resume.industry || ''} onChange={handleChange} />
        </label>
        <br />
        {/* Add more fields for personalInfo, experience, education, skills, projects */}
        <h2>Personal Information</h2>
        <label>
          Full Name:
          <input type="text" name="personalInfo.fullName" value={resume.personalInfo.fullName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="personalInfo.email" value={resume.personalInfo.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Phone:
          <input type="text" name="personalInfo.phone" value={resume.personalInfo.phone || ''} onChange={handleChange} />
        </label>
        <br />
        <label>
          Location:
          <input type="text" name="personalInfo.location" value={resume.personalInfo.location || ''} onChange={handleChange} />
        </label>
        <br />
        <label>
          Website:
          <input type="text" name="personalInfo.website" value={resume.personalInfo.website || ''} onChange={handleChange} />
        </label>
        <br />
        <label>
          LinkedIn:
          <input type="text" name="personalInfo.linkedin" value={resume.personalInfo.linkedin || ''} onChange={handleChange} />
        </label>
        <br />
        <label>
          GitHub:
          <input type="text" name="personalInfo.github" value={resume.personalInfo.github || ''} onChange={handleChange} />
        </label>
        <br />

        <h2>Experience</h2>
        {resume.experience.map((exp, index) => (
          <div key={exp.id || index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <h3>Experience #{index + 1}</h3>
            <label>
              Company:
              <input type="text" name={`experience.${index}.company`} value={exp.company} onChange={handleChange} />
            </label>
            <br />
            <label>
              Position:
              <input type="text" name={`experience.${index}.position`} value={exp.position} onChange={handleChange} />
            </label>
            <br />
            <label>
              Start Date:
              <input type="text" name={`experience.${index}.startDate`} value={exp.startDate} onChange={handleChange} />
            </label>
            <br />
            <label>
              End Date:
              <input type="text" name={`experience.${index}.endDate`} value={exp.endDate || ''} onChange={handleChange} />
            </label>
            <br />
            <label>
              Is Current Role:
              <input
                type="checkbox"
                name={`experience.${index}.isCurrentRole`}
                checked={exp.isCurrentRole}
                onChange={(e) => handleCheckboxChange(e, 'experience', index, 'isCurrentRole')}
              />
            </label>
            <br />
            <label>
              Description:
              <textarea name={`experience.${index}.description`} value={exp.description} onChange={handleChange} />
            </label>
            <br />
            <h4>Achievements:</h4>
            {exp.achievements.map((achievement, achIndex) => (
              <div key={achIndex}>
                <input
                  type="text"
                  name={`experience.${index}.achievements.${achIndex}`}
                  value={achievement}
                  onChange={(e) => handleArrayChange(e, 'experience', index, 'achievements', achIndex)}
                />
                <button type="button" onClick={() => handleRemoveArrayItem('experience', index, 'achievements', achIndex)}>
                  Remove Achievement
                </button>
              </div>
            ))}
            <button type="button" onClick={() => handleAddArrayItem('experience', index, 'achievements', '')}>
              Add Achievement
            </button>
            <br />
            <button type="button" onClick={() => handleRemoveExperience(index)}>Remove Experience</button>
          </div>
        ))}
        <button type="button" onClick={handleAddExperience}>Add Experience</button>
        <br />

        <h2>Education</h2>
        {resume.education.map((edu, index) => (
          <div key={edu.id || index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <h3>Education #{index + 1}</h3>
            <label>
              Institution:
              <input type="text" name={`education.${index}.institution`} value={edu.institution} onChange={handleChange} />
            </label>
            <br />
            <label>
              Degree:
              <input type="text" name={`education.${index}.degree`} value={edu.degree} onChange={handleChange} />
            </label>
            <br />
            <label>
              Field:
              <input type="text" name={`education.${index}.field`} value={edu.field} onChange={handleChange} />
            </label>
            <br />
            <label>
              Start Date:
              <input type="text" name={`education.${index}.startDate`} value={edu.startDate} onChange={handleChange} />
            </label>
            <br />
            <label>
              End Date:
              <input type="text" name={`education.${index}.endDate`} value={edu.endDate || ''} onChange={handleChange} />
            </label>
            <br />
            <label>
              GPA:
              <input type="text" name={`education.${index}.gpa`} value={edu.gpa || ''} onChange={handleChange} />
            </label>
            <br />
            <h4>Achievements:</h4>
            {edu.achievements?.map((achievement, achIndex) => (
              <div key={achIndex}>
                <input
                  type="text"
                  name={`education.${index}.achievements.${achIndex}`}
                  value={achievement}
                  onChange={(e) => handleArrayChange(e, 'education', index, 'achievements', achIndex)}
                />
                <button type="button" onClick={() => handleRemoveArrayItem('education', index, 'achievements', achIndex)}>
                  Remove Achievement
                </button>
              </div>
            ))}
            <button type="button" onClick={() => handleAddArrayItem('education', index, 'achievements', '')}>
              Add Achievement
            </button>
            <br />
            <button type="button" onClick={() => handleRemoveEducation(index)}>Remove Education</button>
          </div>
        ))}
        <button type="button" onClick={handleAddEducation}>Add Education</button>
        <br />

        <h2>Skills</h2>
        <label>
          Skills (comma-separated):
          <textarea
            name="skills"
            value={Array.isArray(resume.skills) ? resume.skills.join(', ') : ''}
            onChange={handleChange}
          />
        </label>
        <br />

        <h2>Projects</h2>
        {resume.projects.map((project, index) => (
          <div key={project.id || index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <h3>Project #{index + 1}</h3>
            <label>
              Name:
              <input type="text" name={`projects.${index}.name`} value={project.name} onChange={handleChange} />
            </label>
            <br />
            <label>
              Description:
              <textarea name={`projects.${index}.description`} value={project.description} onChange={handleChange} />
            </label>
            <br />
            <label>
              Technologies (comma-separated):
              <input
                type="text"
                name={`projects.${index}.technologies`}
                value={project.technologies.join(', ')}
                onChange={(e) => handleArrayFieldChange(e, 'projects', index, 'technologies')}
              />
            </label>
            <br />
            <label>
              URL:
              <input type="text" name={`projects.${index}.url`} value={project.url || ''} onChange={handleChange} />
            </label>
            <br />
            <label>
              GitHub:
              <input type="text" name={`projects.${index}.github`} value={project.github || ''} onChange={handleChange} />
            </label>
            <br />
            <label>
              Start Date:
              <input type="text" name={`projects.${index}.startDate`} value={project.startDate} onChange={handleChange} />
            </label>
            <br />
            <label>
              End Date:
              <input type="text" name={`projects.${index}.endDate`} value={project.endDate || ''} onChange={handleChange} />
            </label>
            <br />
            <button type="button" onClick={() => handleRemoveProject(index)}>Remove Project</button>
          </div>
        ))}
        <button type="button" onClick={handleAddProject}>Add Project</button>
        <br />

        <label>
          Public:
          <input
            type="checkbox"
            name="isPublic"
            checked={resume.isPublic}
            onChange={(e) => handleCheckboxChange(e, 'resume', 0, 'isPublic')}
          />
        </label>
        <br />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default ResumeDetailPage;