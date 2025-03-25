import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/system';
import { FaCalendarAlt, FaMagic, FaChalkboardTeacher, FaUsers, FaCogs } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(8, 0),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(4),
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const naviage = useNavigate();

  const features = [
    {
      icon: <FaMagic style={{ color: theme.palette.primary.main, fontSize: '60px' }} />,
      title: "Smart Scheduling",
      description: "Our AI-powered algorithm creates optimal timetables considering all constraints."
    },
    {
      icon: <FaChalkboardTeacher style={{ color: theme.palette.primary.main, fontSize: '60px' }} />,
      title: "Faculty Management",
      description: "Easily assign faculty to courses and manage their availability."
    },
    {
      icon: <FaUsers style={{ color: theme.palette.primary.main, fontSize: '60px' }} />,
      title: "Student-Centric",
      description: "Generate timetables that minimize gaps and conflicts for students."
    },
    {
      icon: <FaCogs style={{ color: theme.palette.primary.main, fontSize: '60px' }} />,
      title: "Customizable",
      description: "Tailor the timetable to your college's specific needs and rules."
    }
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant={isMobile ? "h4" : "h3"} 
                component="h1" 
                gutterBottom
                sx={{ fontWeight: 700 }}
              >
                DSCL College Timetable Generator
              </Typography>
              <Typography variant="h6" component="p" gutterBottom sx={{ mb: 3 }}>
                Create perfect academic schedules in minutes, not hours
              </Typography>
              <Button 
                variant="contained" 
                color="secondary" 
                size="large"
                onClick={()=>{
                  naviage("/timetable/timetable")
                }}
                startIcon={<FaCalendarAlt />}
                sx={{ 
                  borderRadius: '50px',
                  padding: '12px 24px',
                  fontWeight: 'bold'
                }}
              >
                Generate Timetable
              </Button>
            </Grid>
          
          </Grid>
        </Container>
      </HeroSection>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ fontWeight: 600, mb: 6 }}>
          Why Choose Our Timetable Generator?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <FeatureCard>
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography gutterBottom variant="h5" component="h3" sx={{ fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                  <Button size="small" color="primary">Learn more</Button>
                </CardActions>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ 
        bgcolor: 'background.paper', 
        py: 8,
        borderTop: `1px solid ${theme.palette.divider}`,
        borderBottom: `1px solid ${theme.palette.divider}`
      }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            Ready to Transform Your Scheduling Process?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: '1.1rem' }}>
            Join hundreds of educational institutions that trust our timetable generator to save time and reduce conflicts.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            startIcon={<FaCalendarAlt />}
            sx={{ 
              borderRadius: '50px',
              padding: '12px 32px',
              fontWeight: 'bold',
              fontSize: '1.1rem'
            }}
          >
            Get Started Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;