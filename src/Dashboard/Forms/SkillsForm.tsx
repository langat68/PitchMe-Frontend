import { useState } from 'react';
import { 
  Button, 
  TextField, 
  Typography, 
  Box, 
  Paper, 
  Chip, 
  Grid as Grid,
 
} from '@mui/material';
import { Plus, X, Sparkles, Code, Lightbulb } from 'lucide-react';
import { useResume } from './ResumeContext';
import './Styles/SkillsForm.scss';

const SkillsForm = () => {
  const { resumeData, updateSkills } = useResume();
  const [skills, setSkills] = useState<string[]>(resumeData.skills);
  const [newSkill, setNewSkill] = useState('');
  const [isAIEnhancing, setIsAIEnhancing] = useState(false);

  const popularSkills = {
    'Frontend': ['React', 'Vue.js', 'Angular', 'TypeScript', 'HTML/CSS', 'Tailwind CSS', 'Next.js'],
    'Backend': ['Node.js', 'Python', 'Java', 'Express.js', 'Django', 'Spring Boot', 'GraphQL'],
    'Database': ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase', 'Supabase'],
    'Cloud/DevOps': ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Jenkins'],
    'Tools': ['Git', 'Figma', 'Jira', 'Postman', 'VS Code', 'Linux'],
    'Soft Skills': ['Leadership', 'Communication', 'Problem Solving', 'Team Collaboration', 'Project Management']
  };

  const addSkill = (skill: string) => {
    if (skill.trim() && !skills.includes(skill.trim())) {
      const newSkills = [...skills, skill.trim()];
      setSkills(newSkills);
      updateSkills(newSkills);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const newSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(newSkills);
    updateSkills(newSkills);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(newSkill);
    }
  };

  const analyzeSkillGaps = async () => {
    setIsAIEnhancing(true);
    
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const suggestedSkills = [
      'Docker', 'Kubernetes', 'GraphQL', 'TypeScript', 'AWS Lambda',
      'Jest', 'Cypress', 'Redux', 'Webpack', 'API Design'
    ];
    
    const missingSkills = suggestedSkills.filter(skill => !skills.includes(skill));
    const recommendations = missingSkills.slice(0, 3);
    
    setIsAIEnhancing(false);
    
    if (recommendations.length > 0) {
      // You can replace this with your toast implementation
      console.log(`Consider adding: ${recommendations.join(', ')} to strengthen your profile.`);
    } else {
      console.log("Your skills are well-rounded for your field.");
    }
  };

  return (
    <Box className="skills-form" sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" component="h3" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
            Skills
          </Typography>
          <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
            Add your technical and soft skills to showcase your expertise
          </Typography>
        </Box>
        <Button
          onClick={analyzeSkillGaps}
          disabled={isAIEnhancing}
          variant="contained"
          startIcon={<Sparkles size={16} />}
          sx={{ 
            bgcolor: '#1976d2',
            '&:hover': { bgcolor: '#1565c0' },
            textTransform: 'none'
          }}
        >
          {isAIEnhancing ? 'Analyzing...' : 'Analyze Skills'}
        </Button>
      </Box>

      {/* Add New Skill */}
      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
          <TextField
            label="Add a skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., React, Python, Leadership..."
            variant="outlined"
            size="small"
            sx={{ flex: 1 }}
          />
          <Button
            onClick={() => addSkill(newSkill)}
            disabled={!newSkill.trim()}
            variant="contained"
            sx={{ 
              bgcolor: '#1976d2',
              '&:hover': { bgcolor: '#1565c0' },
              minWidth: 'auto',
              px: 2
            }}
          >
            <Plus size={16} />
          </Button>
        </Box>
      </Paper>

      {/* Current Skills */}
      {skills.length > 0 && (
        <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Code size={20} />
            <Typography variant="h6" component="h4">
              Your Skills ({skills.length})
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                onDelete={() => removeSkill(skill)}
                deleteIcon={<X size={14} />}
                variant="outlined"
                sx={{
                  bgcolor: '#e3f2fd',
                  color: '#1976d2',
                  borderColor: '#bbdefb',
                  '& .MuiChip-deleteIcon': {
                    color: '#1976d2',
                    '&:hover': {
                      color: '#1565c0'
                    }
                  }
                }}
              />
            ))}
          </Box>
        </Paper>
      )}

      {/* Skill Suggestions */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {Object.entries(popularSkills).map(([category, categorySkills]) => (
          <Grid size={{ xs: 12, md: 6 }} key={category}>
            <Paper elevation={1} sx={{ p: 3, height: '100%', '&:hover': { boxShadow: 3 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Lightbulb size={16} color="#f57c00" />
                <Typography variant="h6" component="h4" sx={{ fontSize: '1rem' }}>
                  {category} Skills
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {categorySkills.map((skill) => (
                  <Chip
                    key={skill}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {skill}
                        {skills.includes(skill) && <span>✓</span>}
                      </Box>
                    }
                    onClick={() => {
                      if (!skills.includes(skill)) {
                        addSkill(skill);
                      }
                    }}
                    variant={skills.includes(skill) ? "filled" : "outlined"}
                    sx={{
                      cursor: 'pointer',
                      ...(skills.includes(skill) 
                        ? {
                            bgcolor: '#c8e6c9',
                            color: '#2e7d32',
                            borderColor: '#81c784'
                          }
                        : {
                            '&:hover': {
                              bgcolor: '#e3f2fd',
                              borderColor: '#bbdefb'
                            }
                          }
                      )
                    }}
                  />
                ))}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Tips Section */}
      <Paper 
        elevation={1} 
        sx={{ 
          p: 3, 
          bgcolor: '#fff3e0', 
          borderLeft: '4px solid #ff9800' 
        }}
      >
        <Typography variant="h6" component="h4" sx={{ color: '#e65100', mb: 2 }}>
          🎯 Skills Tips
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box component="ul" sx={{ m: 0, pl: 2, color: '#bf360c', fontSize: '0.875rem' }}>
              <li>Include both technical and soft skills</li>
              <li>List skills relevant to your target job</li>
              <li>Be honest about your proficiency level</li>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box component="ul" sx={{ m: 0, pl: 2, color: '#bf360c', fontSize: '0.875rem' }}>
              <li>Add emerging technologies you've learned</li>
              <li>Include industry-specific tools and frameworks</li>
              <li>Consider adding certifications as skills</li>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default SkillsForm;