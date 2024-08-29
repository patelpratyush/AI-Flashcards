'use client'
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import Head from "next/head";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Box, AppBar, Button, Container, Toolbar, Typography, Grid, Dialog, DialogActions, createTheme, ThemeProvider, Card, CardActions, CardContent, DialogContent, DialogContentText, DialogTitle, Slide, Fade } from "@mui/material";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#1E88E5', // Modern blue color
    },
    background: {
      default: '#FAFAFA', // Light grey background
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif", // Modern and clean font
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
});

// Features data.
const features = [
  {
    title: "Smart Flashcards",
    description: "Create flashcards from any text in seconds. Creating flashcards has never been easier. Simply paste your text and let us do the rest."
  },
  {
    title: "AI powered generator",
    description: "Our AI-powered flashcard generator will create flashcards from any text in seconds, perfect for studying and memorizing information."
  },
  {
    title: "Accessible Anywhere",
    description: "Access your flashcards from anywhere, on any device. Our cloud-based platform ensures that your flashcards are always available when you need them."
  }
];

// Features section component.
function FeaturesSection({ featuresRef }) {
  return (
    <Box ref={featuresRef}
      sx={{
        my: 8,
        py: 8,
        px: { xs: 2, md: 6 },
        backgroundColor: 'background.default',
        textAlign: 'center',
      }}>
      <Fade in timeout={1000}>
        <Typography variant="h4" mb={6} sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          Features
        </Typography>
      </Fade>
      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Slide in direction="up" timeout={1000 + index * 300} key={index}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', borderRadius: 4, boxShadow: 3, backgroundColor: '#FFF' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>{feature.title}</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{feature.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Slide>
        ))}
      </Grid>
    </Box>
  );
}

export default function Home() {
  const featuresRef = useRef(null);
  const [openFreeDialog, setOpenFreeDialog] = useState(false);
  const router = useRouter();

  // Handle form submission.
  const handleSubmit = async (plan) => {
    try {
      const checkoutSession = await fetch("/api/checkout_session", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }) // Ensure you send the plan to the backend
      });

      if (!checkoutSession.ok) {
        const errorData = await checkoutSession.json();
        console.error('Checkout session error:', errorData.message);
        return;
      }

      const checkout_session = await checkoutSession.json();
      const stripe = await getStripe();

      const { error } = await stripe.redirectToCheckout({
        sessionId: checkout_session.id,
      });

      if (error) {
        console.warn('Stripe redirect error:', error.message);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  }

  const scrollToFeatures = () => {
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFreeClick = () => {
    setOpenFreeDialog(true);
  };

  const handleCloseFreeDialog = () => {
    setOpenFreeDialog(false);
  };

  const handleContinue = () => {
    setOpenFreeDialog(false);
    // Redirect to the generate page
    router.push('./generate');
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'background.default' }}>
        <Head>
          <title>Flashcard Creator</title>
          <meta name="description" content="Create flashcards from your text effortlessly" />
        </Head>

        <AppBar position="static" sx={{ backgroundColor: 'primary.main', boxShadow: 'none' }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>
              FlashGenie
            </Typography>
            <Box>
              <SignedOut>
                <Button sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }} color="inherit" href="/sign-in">Login</Button>
                <Button sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }} color="inherit" href='/sign-up'>Sign Up</Button>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </Box>
          </Toolbar>
        </AppBar>

        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '80vh',
          position: 'relative',
          width: '100%',
          p: { xs: 2, md: 6 },
          backgroundColor: 'primary.main',
          color: 'white',
        }}>
          <Slide in direction="right" timeout={1000}>
            <Box sx={{
              maxWidth: '600px',
              zIndex: 1,
            }}>
              <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>Welcome to FlashGenie</Typography>
              <Typography variant="h6" gutterBottom>
                FlashGenie is your AI-powered companion, turning any topic into personalized flashcards, making mastery effortless and engaging.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                <Button variant="contained" sx={{ backgroundColor: 'white', color: 'primary.main', fontWeight: 'bold' }} onClick={scrollToFeatures}>Get Started</Button>
              </Box>
            </Box>
          </Slide>

          <Slide in direction="left" timeout={1000}>
            <Box sx={{
              position: 'relative',
              width: { xs: '100%', md: '50%' },
              height: { xs: '50vh', md: '100%' },
              mt: { xs: 4, md: 0 },
            }}>
              <Image
                src="/question-mark.png"
                alt="AI-powered flashcards"
                layout="fill"
                objectFit="contain"
                quality={100}
                style={{ borderRadius: '10px', filter: 'brightness(0.9)' }}
              />
            </Box>
          </Slide>
        </Box>

        <FeaturesSection featuresRef={featuresRef} />

        {/* Pricing Section */}
        <Box sx={{ my: 8, textAlign: 'center', backgroundColor: 'white', py: 6, px: { xs: 2, md: 6 }, borderRadius: 2, boxShadow: 2 }}>
          <Fade in timeout={1000}>
            <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
              Choose Your Plan
            </Typography>
          </Fade>
          <Fade in timeout={1300}>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary', mb: 4 }}>
              Select the package that best fits your needs
            </Typography>
          </Fade>
          <Grid container spacing={4} justifyContent="center">
            {[
              {
                title: "Free",
                subtitle: "Get started for free",
                price: "$0",
                period: "/month",
                features: [
                  "Generate up to 3 flashcards",
                  "Basic AI-generated flashcards"
                ],
                buttonText: "Get Started",
                onClick: handleFreeClick,
              },
              {
                title: "Basic",
                subtitle: "Unlock more features",
                price: "$5",
                period: "/month",
                features: [
                  "Unlimited flashcards",
                  "Detailed progress tracking",
                  "High-quality AI-generated flashcards"
                ],
                buttonText: "Choose Basic",
                onClick: () => handleSubmit('price_1NcJmsFcwK0u7N7psfCkqRkV'),
              },
              {
                title: "Pro",
                subtitle: "For power users",
                price: "$15",
                period: "/month",
                features: [
                  "All Basic features",
                  "Premium AI model",
                  "Personalized study plans",
                  "Priority support"
                ],
                buttonText: "Choose Pro",
                onClick: () => handleSubmit('price_1NcJmsFcwK0u7N7pDNvfg32r'),
              }
            ].map((plan, index) => (
              <Slide in direction="up" timeout={1000 + index * 300} key={index}>
                <Grid item xs={12} md={4}>
                  <Card sx={{ height: '100%', borderRadius: 4, boxShadow: 3, backgroundColor: '#F9FAFB' }}>
                    <CardContent>
                      <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 1 }}>{plan.title}</Typography>
                      <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 2 }}>{plan.subtitle}</Typography>
                      <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 1 }}>{plan.price}<span style={{ fontSize: '0.6em' }}>{plan.period}</span></Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                        {plan.features.map((feature, index) => (
                          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <span style={{ marginRight: '8px', fontSize: '1.2em', color: 'green' }}>✓</span> {feature}
                          </Box>
                        ))}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center' }}>
                      <Button variant="contained" color="primary" sx={{ fontWeight: 'bold' }} onClick={plan.onClick}>
                        {plan.buttonText}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Slide>
            ))}
          </Grid>
        </Box>

        {/* Dialog */}
        <Dialog open={openFreeDialog} onClose={handleCloseFreeDialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">Get Started with FlashGenie</DialogTitle>
          <DialogContent>
            <DialogContentText>
            You're about to start with the Free plan. You can generate up to 3 flashcards. Ready to get started?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseFreeDialog} color="primary">Cancel</Button>
            <Button onClick={handleContinue} color="primary" autoFocus>Continue</Button>
          </DialogActions>
        </Dialog>

        <Box component="footer" sx={{ py: 4, textAlign: 'center', backgroundColor: 'primary.main', color: 'white' }}>
          <Container>
            <Typography variant="body2">© 2024 FlashGenie. All rights reserved.</Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}