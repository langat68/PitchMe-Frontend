import { useState } from 'react';
import { 
  Button, 
  TextField, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  CardHeader, 
  Chip, 
  IconButton 
} from '@mui/material';
import { Plus, Trash2, ExternalLink, FolderOpen, Sparkles } from 'lucide-react';
import { useResume, type Project } from './ResumeContext';
import './ProjectsForm.scss';

const ProjectsForm = () => {
  const { resumeData, updateProjects } = useResume();
  const [projects, setProjects] = useState<Project[]>(resumeData.projects);
  const [enhancingId, setEnhancingId] = useState<string | null>(null);

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: '',
      description: '',
      technologies: [],
      link: ''
    };
    const newProjects = [...projects, newProject];
    setProjects(newProjects);
    updateProjects(newProjects);
  };

  const removeProject = (id: string) => {
    const newProjects = projects.filter(project => project.id !== id);
    setProjects(newProjects);
    updateProjects(newProjects);
  };

  const updateProjectField = (id: string, field: string, value: string | string[]) => {
    const newProjects = projects.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    );
    setProjects(newProjects);
    updateProjects(newProjects);
  };

  const handleTechChange = (id: string, techString: string) => {
    const technologies = techString.split(',').map(tech => tech.trim()).filter(tech => tech.length > 0);
    updateProjectField(id, 'technologies', technologies);
  };

  const enhanceProject = async (id: string) => {
    setEnhancingId(id);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const project = projects.find(p => p.id === id);
    if (project) {
      const enhancements = [
        'Built with modern best practices and responsive design',
        'Implemented user authentication and secure data handling',
        'Optimized for performance with 90+ Lighthouse score',
        'Deployed with CI/CD pipeline and automated testing',
        'Includes comprehensive documentation and test coverage'
      ];
      
      const randomEnhancement = enhancements[Math.floor(Math.random() * enhancements.length)];
      const enhancedDescription = project.description 
        ? `${project.description} ${randomEnhancement}.`
        : randomEnhancement;
        
      updateProjectField(id, 'description', enhancedDescription);
    }
    
    setEnhancingId(null);
    // Replace with your notification system
    console.log('Project Enhanced! 🚀 Added technical details and impact metrics.');
  };

  const suggestedTechnologies = [
    'React', 'Node.js', 'TypeScript', 'MongoDB', 'Express.js', 'Next.js',
    'Python', 'Django', 'PostgreSQL', 'AWS', 'Docker', 'Git'
  ];

  return (
    <Box className="projects-form">
      <Box className="form-header">
        <Box className="header-content">
          <Typography variant="h5" className="form-title">
            Projects
          </Typography>
          <Typography variant="body2" className="form-description">
            Showcase your personal projects, side projects, or significant work
          </Typography>
        </Box>
        <Button
          onClick={addProject}
          variant="contained"
          color="primary"
          className="add-project-button"
          startIcon={<Plus />}
        >
          Add Project
        </Button>
      </Box>

      {projects.length === 0 && (
        <Card className="empty-state">
          <CardContent className="empty-content">
            <FolderOpen className="empty-icon" />
            <Typography variant="h6" className="empty-title">
              No projects added
            </Typography>
            <Typography variant="body2" className="empty-description">
              Projects help demonstrate your practical skills and experience
            </Typography>
            <Button 
              onClick={addProject} 
              variant="contained" 
              color="primary"
            >
              Add Your First Project
            </Button>
          </CardContent>
        </Card>
      )}

      {projects.map((project, index) => (
        <Card key={project.id} className="project-card">
          <CardHeader className="project-header">
            <Box className="project-header-content">
              <Box className="project-header-left">
                <Chip 
                  label={`Project ${index + 1}`} 
                  variant="outlined"
                  size="small"
                  className="project-badge"
                />
                <Typography variant="h6" className="project-title">
                  {project.title || 'New Project'}
                </Typography>
              </Box>
              <Box className="project-actions">
                <Button
                  onClick={() => enhanceProject(project.id)}
                  disabled={enhancingId === project.id}
                  variant="outlined"
                  size="small"
                  className="enhance-button"
                  startIcon={<Sparkles className={enhancingId === project.id ? 'spinning' : ''} />}
                >
                  {enhancingId === project.id ? 'Enhancing...' : 'AI Enhance'}
                </Button>
                <IconButton
                  onClick={() => removeProject(project.id)}
                  className="delete-button"
                  size="small"
                >
                  <Trash2 />
                </IconButton>
              </Box>
            </Box>
          </CardHeader>
          
          <CardContent className="project-content">
            <Box className="project-fields">
              <TextField
                label="Project Title"
                value={project.title}
                onChange={(e) => updateProjectField(project.id, 'title', e.target.value)}
                placeholder="E-commerce Dashboard"
                required
                fullWidth
                variant="outlined"
              />
              
              <Box className="link-field">
                <TextField
                  label="Project Link (Optional)"
                  value={project.link || ''}
                  onChange={(e) => updateProjectField(project.id, 'link', e.target.value)}
                  placeholder="github.com/username/project"
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    endAdornment: project.link && <ExternalLink className="link-icon" />
                  }}
                />
              </Box>
            </Box>

            <TextField
              label="Project Description"
              value={project.description}
              onChange={(e) => updateProjectField(project.id, 'description', e.target.value)}
              placeholder="Describe what the project does, your role, and the impact it had..."
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              inputProps={{ maxLength: 500 }}
              helperText={`Focus on the problem you solved and technologies used • ${project.description.length}/500`}
            />

            <Box className="technologies-section">
              <TextField
                label="Technologies Used"
                value={project.technologies.join(', ')}
                onChange={(e) => handleTechChange(project.id, e.target.value)}
                placeholder="React, Node.js, MongoDB, AWS"
                fullWidth
                variant="outlined"
              />
              
              <Box className="suggested-technologies">
                {suggestedTechnologies.map((tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    variant={project.technologies.includes(tech) ? "filled" : "outlined"}
                    className={`tech-chip ${project.technologies.includes(tech) ? 'selected' : ''}`}
                    onClick={() => {
                      if (!project.technologies.includes(tech)) {
                        updateProjectField(project.id, 'technologies', [...project.technologies, tech]);
                      }
                    }}
                  />
                ))}
              </Box>

              {project.technologies.length > 0 && (
                <Box className="selected-technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <Chip 
                      key={techIndex} 
                      label={tech} 
                      className="selected-tech-chip"
                      variant="filled"
                      color="success"
                    />
                  ))}
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      ))}

      {projects.length > 0 && (
        <Card className="tips-card">
          <CardContent className="tips-content">
            <Typography variant="h6" className="tips-title">
              💡 Project Tips
            </Typography>
            <Box className="tips-grid">
              <Box className="tips-column">
                <Typography variant="body2" component="ul" className="tips-list">
                  <li>• Describe the problem your project solves</li>
                  <li>• Mention specific technologies and frameworks</li>
                  <li>• Include metrics (users, performance improvements)</li>
                </Typography>
              </Box>
              <Box className="tips-column">
                <Typography variant="body2" component="ul" className="tips-list">
                  <li>• Provide working links to demos or repositories</li>
                  <li>• Highlight your specific contributions in team projects</li>
                  <li>• Show the impact or results of your work</li>
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ProjectsForm;