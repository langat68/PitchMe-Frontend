import React from 'react';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Chip,
  Container,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material';
import Grid from '@mui/material/Grid';

import { ArrowBack, Description, CheckCircle, Star } from '@mui/icons-material';
import { useResume } from './ResumeContext';
import type { TemplateId } from './ResumeContext';
import './Styles/TemplateSelector.scss';

interface TemplateSelectorProps {
  onBack: () => void;
  onBackToHome: () => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onBack, onBackToHome }) => {
  const { selectedTemplate, setSelectedTemplate } = useResume();

  const templates: Array<{
    id: TemplateId;
    name: string;
    description: string;
    preview: string;
    features: string[];
    recommended: boolean;
    colors: string[];
  }> = [
    {
      id: 'modern',
      name: 'Modern Professional',
      description: 'Clean, contemporary design with subtle colors and elegant typography',
      preview: 'modern-preview',
      features: ['ATS-Friendly', 'Clean Layout', 'Professional'],
      recommended: true,
      colors: ['#1976d2', '#bbdefb', '#f5f5f5']
    },
    {
      id: 'classic',
      name: 'Classic Traditional',
      description: 'Timeless design perfect for conservative industries',
      preview: 'classic-preview',
      features: ['Traditional', 'Conservative', 'Minimal'],
      recommended: false,
      colors: ['#424242', '#e0e0e0', '#ffffff']
    },
    {
      id: 'creative',
      name: 'Creative Bold',
      description: 'Eye-catching design for creative professionals',
      preview: 'creative-preview',
      features: ['Creative', 'Colorful', 'Standout'],
      recommended: false,
      colors: ['#7b1fa2', '#f8bbd9', '#e1bee7']
    },
    {
      id: 'minimal',
      name: 'Minimal Clean',
      description: 'Ultra-clean design focusing on content over decoration',
      preview: 'minimal-preview',
      features: ['Minimal', 'Content-First', 'Simple'],
      recommended: false,
      colors: ['#000000', '#f5f5f5', '#ffffff']
    }
  ];

  const handleSelectTemplate = (templateId: TemplateId) => {
    setSelectedTemplate(templateId);
    onBack();
  };

  return (
    <Box className="template-selector">
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Box className="header-left">
            <IconButton onClick={onBack} className="back-button">
              <ArrowBack />
            </IconButton>
            <Typography variant="body1" className="back-text">
              Back to Editor
            </Typography>
            <Box className="logo-section">
              <Paper className="logo-icon" elevation={0}>
                <Description className="logo-icon-svg" />
              </Paper>
              <Typography variant="h6" className="logo-text">
                Resumly
              </Typography>
            </Box>
          </Box>
          <Button variant="outlined" onClick={onBackToHome}>
            Home
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" className="main-content">
        <Box className="header-section">
          <Typography variant="h3" className="main-title">
            Choose Your Resume Template
          </Typography>
          <Typography variant="h6" className="main-subtitle">
            Select a professional template that matches your industry and personal style.
            All templates are ATS-friendly and mobile responsive.
          </Typography>
        </Box>

        <Grid container spacing={3} className="templates-grid">
          {templates.map((template) => (
            <Grid item xs={12} sm={6} lg={3} key={template.id as string}>
              <Card
                className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
                onClick={() => handleSelectTemplate(template.id)}
              >
                {template.recommended && (
                  <Chip
                    icon={<Star />}
                    label="Recommended"
                    className="recommended-badge"
                    color="warning"
                  />
                )}

                {selectedTemplate === template.id && (
                  <CheckCircle className="selected-icon" />
                )}

                <CardContent className="card-content">
                  <Box className={`template-preview ${template.preview}`}>
                    <Box className="mock-content">
                      <Box className="mock-title" />
                      <Box className="mock-subtitle" />
                      <Box className="mock-line-full" />
                      <Box className="mock-line-partial" />
                      <Box className="color-indicators">
                        {template.colors.map((color, index) => (
                          <Box
                            key={index}
                            className="color-dot"
                            sx={{ backgroundColor: color }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Box>

                  <Typography variant="h6" className="template-name">
                    {template.name}
                  </Typography>

                  <Typography variant="body2" className="template-description">
                    {template.description}
                  </Typography>

                  <Box className="features-section">
                    {template.features.map((feature, index) => (
                      <Chip
                        key={index}
                        label={feature}
                        size="small"
                        variant="outlined"
                        className="feature-chip"
                      />
                    ))}
                  </Box>

                  <Button
                    fullWidth
                    variant="contained"
                    className={`select-button ${
                      selectedTemplate === template.id ? 'selected-button' : ''
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectTemplate(template.id);
                    }}
                  >
                    {selectedTemplate === template.id ? 'Selected' : 'Select Template'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box className="tips-section">
          <Paper className="tips-card" elevation={2}>
            <Typography variant="h6" className="tips-title">
              🎯 Template Selection Tips
            </Typography>
            <Box className="tips-content">
              <Typography variant="body2">
                • <strong>Conservative industries</strong> (Finance, Law): Choose Classic Traditional
              </Typography>
              <Typography variant="body2">
                • <strong>Tech & Startups</strong>: Modern Professional works best
              </Typography>
              <Typography variant="body2">
                • <strong>Creative fields</strong> (Design, Marketing): Try Creative Bold
              </Typography>
              <Typography variant="body2">
                • <strong>Academic/Research</strong>: Minimal Clean is perfect
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default TemplateSelector;
