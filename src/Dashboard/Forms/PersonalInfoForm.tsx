import { useState } from 'react';
import { Button, TextField, Typography, Box, Paper } from '@mui/material';
import { Sparkles } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../Redux/store';
import { setPersonalInfo } from '../../Redux/slices/resumeSlice';
import './Styles/PersonalInfoForm.scss';

const PersonalInfoForm = () => {
  const dispatch = useDispatch();
  const personalInfo = useSelector((state: RootState) => state.resume.data?.personalInfo) || {};
  const [formData, setFormData] = useState(personalInfo);
  const [isAIEnhancing, setIsAIEnhancing] = useState(false);

  const handleChange = (field: string, value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    dispatch(setPersonalInfo(newFormData));
  };

  const handleAIEnhance = async () => {
    setIsAIEnhancing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock AI suggestions
    const suggestions = {
      portfolio: formData.portfolio || 'yourname.dev',
      linkedIn: formData.linkedIn || 'linkedin.com/in/yourname'
    };
    
    const enhancedData = { ...formData, ...suggestions };
    setFormData(enhancedData);
    dispatch(setPersonalInfo(enhancedData));
    
    setIsAIEnhancing(false);
    // Replace toast with your preferred notification method
    console.log('AI Enhancement Complete! Your professional links have been optimized.');
  };

  return (
    <Box className="personal-info-form">
      <Box className="form-header">
        <Box className="header-content">
          <Typography variant="h5" className="form-title">
            Personal Information
          </Typography>
          <Typography variant="body2" className="form-description">
            Let's start with your basic contact information
          </Typography>
        </Box>
        <Button
          onClick={handleAIEnhance}
          disabled={isAIEnhancing}
          variant="outlined"
          className="ai-enhance-button"
          startIcon={<Sparkles className={isAIEnhancing ? 'spinning' : ''} />}
        >
          {isAIEnhancing ? 'Enhancing...' : 'AI Enhance'}
        </Button>
      </Box>

      <Box className="form-grid">
        <TextField
          label="Full Name"
          value={formData.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          placeholder="John Doe"
          required
          fullWidth
          variant="outlined"
        />

        <TextField
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="john.doe@email.com"
          required
          fullWidth
          variant="outlined"
        />

        <TextField
          label="Phone Number"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="(555) 123-4567"
          required
          fullWidth
          variant="outlined"
        />

        <TextField
          label="Location"
          value={formData.location}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="San Francisco, CA"
          required
          fullWidth
          variant="outlined"
        />

        <TextField
          label="LinkedIn Profile"
          value={formData.linkedIn}
          onChange={(e) => handleChange('linkedIn', e.target.value)}
          placeholder="linkedin.com/in/johndoe"
          fullWidth
          variant="outlined"
        />

        <TextField
          label="Portfolio/Website"
          value={formData.portfolio}
          onChange={(e) => handleChange('portfolio', e.target.value)}
          placeholder="johndoe.dev"
          fullWidth
          variant="outlined"
        />
      </Box>

      <Paper className="pro-tip">
        <Typography variant="h6" className="tip-title">
          💡 Pro Tip
        </Typography>
        <Typography variant="body2" className="tip-content">
          Make sure your email address is professional and your LinkedIn profile is up to date. 
          These are often the first things recruiters check!
        </Typography>
      </Paper>
    </Box>
  );
};

export default PersonalInfoForm;