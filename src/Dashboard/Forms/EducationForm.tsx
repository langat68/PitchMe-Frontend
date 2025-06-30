import { useState } from 'react';
import { Button } from '@mui/material';
import { Plus, Trash2, GraduationCap } from 'lucide-react';
import { useResume } from './ResumeContext';
import type { Education } from './ResumeContext';
import './EducationForm.scss';

const EducationForm = () => {
  const { resumeData, updateEducation } = useResume();
  const [education, setEducation] = useState<Education[]>(resumeData.education);

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: '',
      school: '',
      location: '',
      graduationDate: '',
      gpa: ''
    };
    const newEducationList = [...education, newEducation];
    setEducation(newEducationList);
    updateEducation(newEducationList);
  };

  const removeEducation = (id: string) => {
    const newEducationList = education.filter(edu => edu.id !== id);
    setEducation(newEducationList);
    updateEducation(newEducationList);
  };

  const updateEducationField = (id: string, field: string, value: string) => {
    const newEducationList = education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    setEducation(newEducationList);
    updateEducation(newEducationList);
  };

  return (
    <div className="education-form">
      <div className="education-header">
        <div className="header-content">
          <h3 className="title">Education</h3>
          <p className="subtitle">
            Add your educational background, starting with the most recent
          </p>
        </div>
        <Button
          onClick={addEducation}
          variant="contained"
          className="add-button"
          startIcon={<Plus size={18} />}
        >
          Add Education
        </Button>
      </div>

      {education.length === 0 && (
        <div className="empty-state">
          <div className="empty-content">
            <GraduationCap className="empty-icon" size={48} />
            <h3 className="empty-title">No education added</h3>
            <p className="empty-description">Add your educational background to complete your profile</p>
            <Button 
              onClick={addEducation} 
              variant="contained"
              className="empty-button"
            >
              Add Education
            </Button>
          </div>
        </div>
      )}

      {education.map((edu, index) => (
        <div key={edu.id} className="education-card">
          <div className="card-header">
            <div className="header-left">
              <span className="badge">
                Education {index + 1}
              </span>
              <h4 className="card-title">
                {edu.degree || 'New Education'}
              </h4>
            </div>
            <Button
              onClick={() => removeEducation(edu.id)}
              variant="text"
              className="delete-button"
              size="small"
            >
              <Trash2 size={16} />
            </Button>
          </div>
          
          <div className="card-content">
            <div className="form-grid">
              <div className="form-field full-width">
                <label htmlFor={`degree-${edu.id}`} className="field-label">
                  Degree *
                </label>
                <input
                  id={`degree-${edu.id}`}
                  className="field-input"
                  value={edu.degree}
                  onChange={(e) => updateEducationField(edu.id, 'degree', e.target.value)}
                  placeholder="Bachelor of Science in Computer Science"
                  required
                />
              </div>
              
              <div className="form-field">
                <label htmlFor={`school-${edu.id}`} className="field-label">
                  School/University *
                </label>
                <input
                  id={`school-${edu.id}`}
                  className="field-input"
                  value={edu.school}
                  onChange={(e) => updateEducationField(edu.id, 'school', e.target.value)}
                  placeholder="University of California, Berkeley"
                  required
                />
              </div>
              
              <div className="form-field">
                <label htmlFor={`location-${edu.id}`} className="field-label">
                  Location
                </label>
                <input
                  id={`location-${edu.id}`}
                  className="field-input"
                  value={edu.location}
                  onChange={(e) => updateEducationField(edu.id, 'location', e.target.value)}
                  placeholder="Berkeley, CA"
                />
              </div>
              
              <div className="form-field">
                <label htmlFor={`graduationDate-${edu.id}`} className="field-label">
                  Graduation Date *
                </label>
                <input
                  id={`graduationDate-${edu.id}`}
                  className="field-input"
                  type="month"
                  value={edu.graduationDate}
                  onChange={(e) => updateEducationField(edu.id, 'graduationDate', e.target.value)}
                  required
                />
              </div>
              
              <div className="form-field">
                <label htmlFor={`gpa-${edu.id}`} className="field-label">
                  GPA (Optional)
                </label>
                <input
                  id={`gpa-${edu.id}`}
                  className="field-input"
                  value={edu.gpa || ''}
                  onChange={(e) => updateEducationField(edu.id, 'gpa', e.target.value)}
                  placeholder="3.8"
                  maxLength={4}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {education.length > 0 && (
        <div className="tips-card">
          <div className="tips-content">
            <h4 className="tips-title">📚 Education Tips</h4>
            <div className="tips-grid">
              <ul className="tips-list">
                <li>• List your most recent education first</li>
                <li>• Include relevant coursework if you're a recent graduate</li>
                <li>• Mention honors, awards, or significant achievements</li>
              </ul>
              <ul className="tips-list">
                <li>• Only include GPA if it's 3.5 or higher</li>
                <li>• Add certifications in a separate section if you have many</li>
                <li>• Include study abroad or exchange programs</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationForm;