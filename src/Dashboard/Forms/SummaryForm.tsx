import { useState } from 'react';
import { Button, TextField, Typography, Box, Paper, Chip } from '@mui/material';
import { Sparkles, Target, TrendingUp } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../Redux/store';
import { setSummary as setReduxSummary } from '../../Redux/slices/resumeSlice';
import './Styles/SummaryForm.scss';

const SummaryForm = () => {
  const dispatch = useDispatch();
  const reduxSummary = useSelector((state: RootState) => state.resume.data?.summary) || '';
  const [summary, setSummary] = useState(reduxSummary);
  const [isAIEnhancing, setIsAIEnhancing] = useState(false);
  const [atsScore, setAtsScore] = useState(78);

  const handleChange = (value: string) => {
    setSummary(value);
    dispatch(setReduxSummary(value));
    
    // Mock ATS scoring
    const wordCount = value.split(' ').length;
    const hasKeywords = value.toLowerCase().includes('experience') || 
                       value.toLowerCase().includes('skilled') ||
                       value.toLowerCase().includes('expert');
    
    let score = Math.min(90, Math.max(50, wordCount * 2));
    if (hasKeywords) score += 10;
    setAtsScore(Math.min(100, score));
  };

  const handleAIEnhance = async () => {
    setIsAIEnhancing(true);
    
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const aiSuggestions = [
      "Results-driven software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of architecting scalable applications that serve 100K+ users daily and leading high-performing cross-functional teams. Passionate about leveraging cutting-edge technologies to solve complex business challenges and drive innovation.",
      "Accomplished software engineer with extensive experience building enterprise-grade applications using modern web technologies. Expert in React ecosystem, microservices architecture, and cloud infrastructure. Demonstrated ability to reduce system response times by 40% and increase team productivity through mentorship and technical leadership. Committed to writing clean, maintainable code and implementing best practices.",
      "Innovative full-stack developer with a strong foundation in JavaScript, React, and backend technologies. Skilled in transforming complex requirements into user-friendly applications with exceptional performance. Experience leading development teams, conducting code reviews, and implementing automated testing strategies that increased code coverage to 85%."
    ];
    
    const randomSuggestion = aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)];
    setSummary(randomSuggestion);
    dispatch(setReduxSummary(randomSuggestion));
    setAtsScore(92);
    
    setIsAIEnhancing(false);
    // You can replace this with your toast notification system
    console.log("AI Enhancement Complete! 🚀 Your summary has been optimized for ATS systems and impact.");
  };

  const suggestions = [
    "Start with your years of experience",
    "Mention 2-3 key technical skills",
    "Include quantifiable achievements",
    "End with your career goals or passion"
  ];

  const powerWords = [
    'Experienced', 'Expert', 'Skilled', 'Proven', 
    'Results-driven', 'Innovative', 'Strategic', 'Accomplished'
  ];

  return (
    <Box className="summary-form">
      <Box className="summary-form__header">
        <Box>
          <Typography variant="h5" className="summary-form__title">
            Professional Summary
          </Typography>
          <Typography variant="body2" className="summary-form__subtitle">
            Write a compelling summary that highlights your key strengths and achievements
          </Typography>
        </Box>
        <Button
          onClick={handleAIEnhance}
          disabled={isAIEnhancing}
          variant="contained"
          className="summary-form__ai-button"
          startIcon={<Sparkles className={isAIEnhancing ? 'spinning' : ''} />}
        >
          {isAIEnhancing ? 'Enhancing...' : 'AI Enhance'}
        </Button>
      </Box>

      {/* ATS Score */}
      <Paper className="summary-form__ats-card">
        <Box className="summary-form__ats-content">
          <Box className="summary-form__ats-info">
            <Box className="summary-form__ats-icon">
              <TrendingUp />
            </Box>
            <Box>
              <Typography variant="h6" className="summary-form__ats-title">
                ATS Optimization Score
              </Typography>
              <Typography variant="body2" className="summary-form__ats-description">
                How likely your resume is to pass screening
              </Typography>
            </Box>
          </Box>
          <Box className="summary-form__ats-score">
            <Typography 
              variant="h4" 
              className={`summary-form__score-number ${
                atsScore >= 80 ? 'excellent' : 
                atsScore >= 60 ? 'good' : 'needs-work'
              }`}
            >
              {atsScore}%
            </Typography>
            <Typography variant="caption" className="summary-form__score-label">
              {atsScore >= 80 ? 'Excellent' : atsScore >= 60 ? 'Good' : 'Needs Work'}
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Box className="summary-form__input-section">
        <TextField
          label="Professional Summary"
          value={summary}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Write a compelling 2-3 sentence summary that highlights your key qualifications and career goals..."
          multiline
          rows={5}
          fullWidth
          variant="outlined"
          inputProps={{ maxLength: 500 }}
          className="summary-form__textarea"
        />
        <Box className="summary-form__counter">
          <Typography variant="caption">
            Character count: {summary.length}/500
          </Typography>
          <Typography variant="caption">
            Word count: {summary.split(' ').filter(word => word.length > 0).length}
          </Typography>
        </Box>
      </Box>

      <Box className="summary-form__cards">
        <Paper className="summary-form__tips-card">
          <Box className="summary-form__card-header">
            <Target className="summary-form__card-icon" />
            <Typography variant="h6">Writing Tips</Typography>
          </Box>
          <Box className="summary-form__tips-list">
            {suggestions.map((tip, index) => (
              <Box key={index} className="summary-form__tip-item">
                <span className="summary-form__bullet">•</span>
                <Typography variant="body2">{tip}</Typography>
              </Box>
            ))}
          </Box>
        </Paper>

        <Paper className="summary-form__power-words-card">
          <Box className="summary-form__card-header">
            <Sparkles className="summary-form__card-icon" />
            <Typography variant="h6">Power Words</Typography>
          </Box>
          <Box className="summary-form__power-words">
            {powerWords.map((word, index) => (
              <Chip 
                key={index} 
                label={word} 
                variant="outlined" 
                size="small"
                className="summary-form__power-word-chip"
              />
            ))}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default SummaryForm;