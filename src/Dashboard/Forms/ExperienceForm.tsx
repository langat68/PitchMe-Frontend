import { useState } from 'react';
import { Button } from '@mui/material';
import { Plus, Trash2, Sparkles, Briefcase } from 'lucide-react';
import { useResume } from './ResumeContext';
import type { Experience } from './ResumeContext';
import './Styles/EducationForm.scss';

const ExperienceForm = () => {
  const { resumeData, updateExperience } = useResume();
  const [experiences, setExperiences] = useState<Experience[]>(resumeData.experience);
  const [enhancingId, setEnhancingId] = useState<string | null>(null);

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    const newExperiences = [...experiences, newExperience];
    setExperiences(newExperiences);
    updateExperience(newExperiences);
  };

  const removeExperience = (id: string) => {
    const newExperiences = experiences.filter(exp => exp.id !== id);
    setExperiences(newExperiences);
    updateExperience(newExperiences);
  };

  const updateExperienceField = (id: string, field: string, value: string | boolean) => {
    const newExperiences = experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    setExperiences(newExperiences);
    updateExperience(newExperiences);
  };

  const enhanceDescription = async (id: string) => {
    setEnhancingId(id);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const actionVerbs = [
      'Architected', 'Implemented', 'Optimized', 'Led', 'Developed', 'Designed', 'Collaborated',
      'Managed', 'Streamlined', 'Enhanced', 'Delivered', 'Spearheaded', 'Coordinated'
    ];
    
    const improvements = [
      'reducing response times by 40%',
      'increasing efficiency by 25%',
      'serving 100K+ users daily',
      'improving code coverage to 85%',
      'mentoring 3+ junior developers',
      'delivering projects ahead of schedule',
      'reducing deployment time by 60%',
      'increasing user satisfaction by 30%'
    ];
    
    const randomVerb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
    const randomImprovement = improvements[Math.floor(Math.random() * improvements.length)];
    
    const experience = experiences.find(exp => exp.id === id);
    const enhancedDescription = experience?.description 
      ? `${randomVerb} ${experience.description.toLowerCase()}, ${randomImprovement}.`
      : `${randomVerb} innovative solutions and processes, ${randomImprovement}.`;
    
    updateExperienceField(id, 'description', enhancedDescription);
    
    setEnhancingId(null);
    // You can add a toast notification here if you have a toast system
    console.log("Description Enhanced! ✨");
  };

  return (
    <div className="experience-form">
      <div className="experience-header">
        <div className="header-content">
          <h3 className="title">Work Experience</h3>
          <p className="subtitle">
            Add your work history, starting with your most recent position
          </p>
        </div>
        <Button
          onClick={addExperience}
          variant="contained"
          className="add-button"
          startIcon={<Plus size={18} />}
        >
          Add Experience
        </Button>
      </div>

      {experiences.length === 0 && (
        <div className="empty-state">
          <div className="empty-content">
            <Briefcase className="empty-icon" size={48} />
            <h3 className="empty-title">No work experience added</h3>
            <p className="empty-description">Add your work history to strengthen your resume</p>
            <Button 
              onClick={addExperience} 
              variant="contained"
              className="empty-button"
            >
              Add Your First Job
            </Button>
          </div>
        </div>
      )}

      {experiences.map((experience, index) => (
        <div key={experience.id} className="experience-card">
          <div className="card-header">
            <div className="header-left">
              <span className="badge">
                Position {index + 1}
              </span>
              <h4 className="card-title">
                {experience.title || 'New Position'}
              </h4>
            </div>
            <div className="header-actions">
              <Button
                onClick={() => enhanceDescription(experience.id)}
                disabled={enhancingId === experience.id}
                variant="outlined"
                className="enhance-button"
                size="small"
                startIcon={
                  <Sparkles 
                    size={16} 
                    className={enhancingId === experience.id ? 'spinning' : ''} 
                  />
                }
              >
                {enhancingId === experience.id ? 'Enhancing...' : 'AI Enhance'}
              </Button>
              <Button
                onClick={() => removeExperience(experience.id)}
                variant="text"
                className="delete-button"
                size="small"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
          
          <div className="card-content">
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor={`title-${experience.id}`} className="field-label">
                  Job Title *
                </label>
                <input
                  id={`title-${experience.id}`}
                  className="field-input"
                  value={experience.title}
                  onChange={(e) => updateExperienceField(experience.id, 'title', e.target.value)}
                  placeholder="Senior Software Engineer"
                  required
                />
              </div>
              
              <div className="form-field">
                <label htmlFor={`company-${experience.id}`} className="field-label">
                  Company *
                </label>
                <input
                  id={`company-${experience.id}`}
                  className="field-input"
                  value={experience.company}
                  onChange={(e) => updateExperienceField(experience.id, 'company', e.target.value)}
                  placeholder="TechCorp Inc."
                  required
                />
              </div>
              
              <div className="form-field">
                <label htmlFor={`location-${experience.id}`} className="field-label">
                  Location
                </label>
                <input
                  id={`location-${experience.id}`}
                  className="field-input"
                  value={experience.location}
                  onChange={(e) => updateExperienceField(experience.id, 'location', e.target.value)}
                  placeholder="San Francisco, CA"
                />
              </div>
              
              <div className="form-field">
                <label htmlFor={`startDate-${experience.id}`} className="field-label">
                  Start Date *
                </label>
                <input
                  id={`startDate-${experience.id}`}
                  className="field-input"
                  type="month"
                  value={experience.startDate}
                  onChange={(e) => updateExperienceField(experience.id, 'startDate', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="date-section">
              <div className="checkbox-wrapper">
                <input
                  id={`current-${experience.id}`}
                  type="checkbox"
                  checked={experience.current}
                  onChange={(e) => updateExperienceField(experience.id, 'current', e.target.checked)}
                  className="checkbox-input"
                />
                <label htmlFor={`current-${experience.id}`} className="checkbox-label">
                  I currently work here
                </label>
              </div>
              {!experience.current && (
                <div className="form-field end-date">
                  <label htmlFor={`endDate-${experience.id}`} className="field-label">
                    End Date
                  </label>
                  <input
                    id={`endDate-${experience.id}`}
                    className="field-input"
                    type="month"
                    value={experience.endDate}
                    onChange={(e) => updateExperienceField(experience.id, 'endDate', e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="form-field full-width">
              <label htmlFor={`description-${experience.id}`} className="field-label">
                Job Description
              </label>
              <textarea
                id={`description-${experience.id}`}
                className="field-textarea"
                value={experience.description}
                onChange={(e) => updateExperienceField(experience.id, 'description', e.target.value)}
                placeholder="Describe your key responsibilities and achievements..."
                maxLength={1000}
                rows={4}
              />
              <div className="textarea-footer">
                <span className="textarea-hint">Use bullet points to list your achievements</span>
                <span className="character-count">{experience.description.length}/1000</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {experiences.length > 0 && (
        <div className="tips-card">
          <div className="tips-content">
            <h4 className="tips-title">💡 Experience Tips</h4>
            <div className="tips-grid">
              <ul className="tips-list">
                <li>• Start bullets with action verbs (Led, Developed, Improved)</li>
                <li>• Include specific numbers and percentages</li>
                <li>• Focus on achievements, not just responsibilities</li>
              </ul>
              <ul className="tips-list">
                <li>• Mention technologies and tools you used</li>
                <li>• Show impact on business goals</li>
                <li>• Keep descriptions concise but comprehensive</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;