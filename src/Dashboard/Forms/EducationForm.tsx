import { useState } from 'react';
import { Button } from '@mui/material';
import { Plus, Trash2, GraduationCap } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../Redux/store';
import { setEducation as setReduxEducation } from '../../Redux/slices/resumeSlice';
import './Styles/EducationForm.scss';

const EducationForm = () => {
  const dispatch = useDispatch();
  const reduxEducation = useSelector((state: RootState) => state.resume.data?.education) || [];
  const [education, setEducation] = useState(reduxEducation);

  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      degree: '',
      school: '',
      location: '',
      graduationDate: '',
      gpa: ''
    };
    const newEducationList = [...education, newEducation];
    setEducation(newEducationList);
    dispatch(setReduxEducation(newEducationList));
  };

  const removeEducation = (id: string) => {
    const newEducationList = education.filter(edu => edu.id !== id);
    setEducation(newEducationList);
    dispatch(setReduxEducation(newEducationList));
  };

  const updateEducationField = (id: string, field: string, value: string) => {
    const newEducationList = education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    setEducation(newEducationList);
    dispatch(setReduxEducation(newEducationList));
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
                <label htmlFor={`institution-${edu.id}`} className="field-label">
                  School/University *
                </label>
                <input
                  id={`institution-${edu.id}`}
                  className="field-input"
                  value={edu.institution}
                  onChange={(e) => updateEducationField(edu.id, 'institution', e.target.value)}
                  placeholder="University of California, Berkeley"
                  required
                />
              </div>
              
              <div className="form-field">
                <label htmlFor={`field-${edu.id}`} className="field-label">
                  Field of Study *
                </label>
                <input
                  id={`field-${edu.id}`}
                  className="field-input"
                  value={edu.field}
                  onChange={(e) => updateEducationField(edu.id, 'field', e.target.value)}
                  placeholder="Computer Science"
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
                <label htmlFor={`startDate-${edu.id}`} className="field-label">
                  Start Date *
                </label>
                <input
                  id={`startDate-${edu.id}`}
                  className="field-input"
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => updateEducationField(edu.id, 'startDate', e.target.value)}
                  required
                />
              </div>
              
              <div className="form-field">
                <label htmlFor={`endDate-${edu.id}`} className="field-label">
                  End Date (Optional)
                </label>
                <input
                  id={`endDate-${edu.id}`}
                  className="field-input"
                  type="month"
                  value={edu.endDate}
                  onChange={(e) => updateEducationField(edu.id, 'endDate', e.target.value)}
                />
              </div>
              
              <div className="form-field">
                <label htmlFor={`endDate-${edu.id}`} className="field-label">
                  End Date (Optional)
                </label>
                <input
                  id={`endDate-${edu.id}`}
                  className="field-input"
                  type="month"
                  value={edu.endDate}
                  onChange={(e) => updateEducationField(edu.id, 'endDate', e.target.value)}
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