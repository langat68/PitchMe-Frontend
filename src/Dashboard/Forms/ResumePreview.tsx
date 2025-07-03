import React from 'react';
import { Box, Typography, Chip, Link, Paper } from '@mui/material';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';
import { useResume } from './ResumeContext';
import './Styles/ResumePreview.scss';

const ResumePreview: React.FC = () => {
  const { resumeData, selectedTemplate } = useResume();

  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const ModernTemplate: React.FC = () => (
    <Paper className="resume-modern" elevation={3}>
      {/* Header */}
      <Box className="resume-header">
        <Typography variant="h3" className="resume-name">
          {resumeData.personalInfo.fullName}
        </Typography>
        <Box className="contact-info">
          <Box className="contact-item">
            <Mail className="contact-icon" />
            <Typography variant="body2">{resumeData.personalInfo.email}</Typography>
          </Box>
          <Box className="contact-item">
            <Phone className="contact-icon" />
            <Typography variant="body2">{resumeData.personalInfo.phone}</Typography>
          </Box>
          <Box className="contact-item">
            <MapPin className="contact-icon" />
            <Typography variant="body2">{resumeData.personalInfo.location}</Typography>
          </Box>
          {resumeData.personalInfo.linkedIn && (
            <Box className="contact-item">
              <Linkedin className="contact-icon" />
              <Typography variant="body2">{resumeData.personalInfo.linkedIn}</Typography>
            </Box>
          )}
          {resumeData.personalInfo.portfolio && (
            <Box className="contact-item">
              <Globe className="contact-icon" />
              <Typography variant="body2">{resumeData.personalInfo.portfolio}</Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Summary */}
      {resumeData.summary && (
        <Box className="resume-section">
          <Typography variant="h5" className="section-title">
            Professional Summary
          </Typography>
          <Typography variant="body1" className="summary-text">
            {resumeData.summary}
          </Typography>
        </Box>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <Box className="resume-section">
          <Typography variant="h5" className="section-title">
            Professional Experience
          </Typography>
          <Box className="experience-list">
            {resumeData.experience.map((exp) => (
              <Box key={exp.id} className="experience-item">
                <Box className="experience-header">
                  <Box className="experience-title-group">
                    <Typography variant="h6" className="job-title">
                      {exp.title}
                    </Typography>
                    <Typography variant="body1" className="company-name">
                      {exp.company}
                    </Typography>
                    {exp.location && (
                      <Typography variant="body2" className="job-location">
                        {exp.location}
                      </Typography>
                    )}
                  </Box>
                  <Typography variant="body2" className="job-dates">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </Typography>
                </Box>
                {exp.description && (
                  <Typography variant="body1" className="job-description">
                    {exp.description}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <Box className="resume-section">
          <Typography variant="h5" className="section-title">
            Education
          </Typography>
          <Box className="education-list">
            {resumeData.education.map((edu) => (
              <Box key={edu.id} className="education-item">
                <Box className="education-header">
                  <Box className="education-title-group">
                    <Typography variant="h6" className="degree">
                      {edu.degree}
                    </Typography>
                    <Typography variant="body1" className="school-name">
                      {edu.school}
                    </Typography>
                    {edu.location && (
                      <Typography variant="body2" className="school-location">
                        {edu.location}
                      </Typography>
                    )}
                    {edu.gpa && (
                      <Typography variant="body2" className="gpa">
                        GPA: {edu.gpa}
                      </Typography>
                    )}
                  </Box>
                  <Typography variant="body2" className="graduation-date">
                    {formatDate(edu.graduationDate)}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <Box className="resume-section">
          <Typography variant="h5" className="section-title">
            Technical Skills
          </Typography>
          <Box className="skills-container">
            {resumeData.skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                className="skill-chip"
                variant="outlined"
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Projects */}
      {resumeData.projects.length > 0 && (
        <Box className="resume-section">
          <Typography variant="h5" className="section-title">
            Projects
          </Typography>
          <Box className="projects-list">
            {resumeData.projects.map((project) => (
              <Box key={project.id} className="project-item">
                <Box className="project-header">
                  <Typography variant="h6" className="project-title">
                    {project.title}
                  </Typography>
                  {project.link && (
                    <Link href={project.link} className="project-link">
                      View Project
                    </Link>
                  )}
                </Box>
                <Typography variant="body1" className="project-description">
                  {project.description}
                </Typography>
                {project.technologies.length > 0 && (
                  <Box className="project-technologies">
                    {project.technologies.map((tech, index) => (
                      <Chip
                        key={index}
                        label={tech}
                        size="small"
                        variant="outlined"
                        className="tech-chip"
                      />
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Paper>
  );

  const ClassicTemplate: React.FC = () => (
    <Paper className="resume-classic" elevation={3}>
      {/* Header */}
      <Box className="resume-header-classic">
        <Typography variant="h4" className="resume-name-classic">
          {resumeData.personalInfo.fullName}
        </Typography>
        <Box className="contact-info-classic">
          <Typography variant="body2">
            {resumeData.personalInfo.email} | {resumeData.personalInfo.phone}
          </Typography>
          <Typography variant="body2">{resumeData.personalInfo.location}</Typography>
          {resumeData.personalInfo.linkedIn && (
            <Typography variant="body2">{resumeData.personalInfo.linkedIn}</Typography>
          )}
          {resumeData.personalInfo.portfolio && (
            <Typography variant="body2">{resumeData.personalInfo.portfolio}</Typography>
          )}
        </Box>
      </Box>

      {/* Summary */}
      {resumeData.summary && (
        <Box className="resume-section-classic">
          <Typography variant="h6" className="section-title-classic">
            PROFESSIONAL SUMMARY
          </Typography>
          <Typography variant="body2" className="summary-text-classic">
            {resumeData.summary}
          </Typography>
        </Box>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <Box className="resume-section-classic">
          <Typography variant="h6" className="section-title-classic">
            PROFESSIONAL EXPERIENCE
          </Typography>
          <Box className="experience-list-classic">
            {resumeData.experience.map((exp) => (
              <Box key={exp.id} className="experience-item-classic">
                <Box className="experience-header-classic">
                  <Box className="experience-title-group-classic">
                    <Typography variant="subtitle1" className="job-title-classic">
                      {exp.title}
                    </Typography>
                    <Typography variant="body2" className="company-name-classic">
                      {exp.company}, {exp.location}
                    </Typography>
                  </Box>
                  <Typography variant="body2" className="job-dates-classic">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </Typography>
                </Box>
                {exp.description && (
                  <Typography variant="body2" className="job-description-classic">
                    {exp.description}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <Box className="resume-section-classic">
          <Typography variant="h6" className="section-title-classic">
            EDUCATION
          </Typography>
          <Box className="education-list-classic">
            {resumeData.education.map((edu) => (
              <Box key={edu.id} className="education-item-classic">
                <Box className="education-header-classic">
                  <Box className="education-title-group-classic">
                    <Typography variant="subtitle1" className="degree-classic">
                      {edu.degree}
                    </Typography>
                    <Typography variant="body2" className="school-name-classic">
                      {edu.school}, {edu.location}
                    </Typography>
                    {edu.gpa && (
                      <Typography variant="body2" className="gpa-classic">
                        GPA: {edu.gpa}
                      </Typography>
                    )}
                  </Box>
                  <Typography variant="body2" className="graduation-date-classic">
                    {formatDate(edu.graduationDate)}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <Box className="resume-section-classic">
          <Typography variant="h6" className="section-title-classic">
            TECHNICAL SKILLS
          </Typography>
          <Typography variant="body2" className="skills-text-classic">
            {resumeData.skills.join(' • ')}
          </Typography>
        </Box>
      )}

      {/* Projects */}
      {resumeData.projects.length > 0 && (
        <Box className="resume-section-classic">
          <Typography variant="h6" className="section-title-classic">
            PROJECTS
          </Typography>
          <Box className="projects-list-classic">
            {resumeData.projects.map((project) => (
              <Box key={project.id} className="project-item-classic">
                <Box className="project-header-classic">
                  <Typography variant="subtitle1" className="project-title-classic">
                    {project.title}
                  </Typography>
                  {project.link && (
                    <Typography variant="body2" className="project-link-classic">
                      {project.link}
                    </Typography>
                  )}
                </Box>
                <Typography variant="body2" className="project-description-classic">
                  {project.description}
                </Typography>
                {project.technologies.length > 0 && (
                  <Typography variant="caption" className="project-technologies-classic">
                    <strong>Technologies:</strong> {project.technologies.join(', ')}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Paper>
  );

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'classic':
        return <ClassicTemplate />;
      case 'creative':
        return <ModernTemplate />; // Would be creative styling in real app
      case 'minimal':
        return <ClassicTemplate />; // Would be minimal styling in real app
      default:
        return <ModernTemplate />;
    }
  };

  return (
    <Box className="resume-preview-container">
      {renderTemplate()}
    </Box>
  );
};

export default ResumePreview;