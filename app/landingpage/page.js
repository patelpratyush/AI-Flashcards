'use client';

import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { AppBar, Box, Button, Grid, Toolbar, Typography } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';

const LandingPage = () => {

    const handleSubmit = async () => {
        const checkoutSession = await fetch('/api/checkout_sessions', {
          method: 'POST',
          headers: { origin: 'http://localhost:3000' },
        })
        const checkoutSessionJson = await checkoutSession.json()
      
        const stripe = await loadStripe()
        const {error} = await stripe.redirectToCheckout({
          sessionId: checkoutSessionJson.id,
        })
      
        if (error) {
          console.warn(error.message)
        }
      }

    return (
		<Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            color: '#333'
        }}>
            <AppBar position="static" sx={{ background: '#1a237e', color: '#fff' }}>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 700 }}>
                        Flashcard SaaS
                    </Typography>
                    <SignedOut>
                        <Button color="inherit" href="/sign-in">Login</Button>
                        <Button color="inherit" href="/sign-up">Sign Up</Button>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </Toolbar>
            </AppBar>

            <Box sx={{ textAlign: 'center', my: 4 }}>
                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#1a237e' }}>
                    Welcome to Flashcard SaaS
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#3949ab', marginBottom: '1.5rem' }}>
                    The easiest way to create flashcards from your text.
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2, mr: 2, padding: '10px 20px', borderRadius: '8px', background: '#3949ab' }} href="/generate">
                    Get Started
                </Button>
                <Button variant="outlined" color="primary" sx={{ mt: 2, padding: '10px 20px', borderRadius: '8px', borderColor: '#3949ab', color: '#3949ab' }}>
                    Learn More
                </Button>
            </Box>

            <Box sx={{ my: 6, textAlign: 'center' }}>
                <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700, color: '#1a237e' }}>
                    Features
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight={600} sx={{ color: '#3949ab' }}>
                            Easy to Use
                        </Typography>
                        <Typography sx={{ color: '#757575' }}>Add your text and we do the rest!</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight={600} sx={{ color: '#3949ab' }}>
                            Accessible
                        </Typography>
                        <Typography sx={{ color: '#757575' }}>
                            Access your flashcards from anywhere! Make learning on the go easy
                            and efficient.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight={600} sx={{ color: '#3949ab' }}>
                            Organization
                        </Typography>
                        <Typography sx={{ color: '#757575' }}>
                            Our flashcards enable users to manage multiple flashcard decks
                            effortlessly.
                        </Typography>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ my: 6, textAlign: "center" }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ textDecoration: "underline", color: '#1a237e', fontWeight: 700 }}
                >
                    Pricing
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight={600} sx={{ color: '#3949ab' }}>
                            Free
                        </Typography>
                        <Typography sx={{ color: '#757575' }}>$ 0</Typography>
                        <Typography sx={{ color: '#757575' }}>100 flashcards</Typography>
                        <Typography sx={{ color: '#757575' }}>
                            No access to advanced customization or analytics
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight={600} sx={{ color: '#3949ab' }}>
                            Basic
                        </Typography>
                        <Typography sx={{ color: '#757575' }}>$ 5 / month</Typography>
                        <Typography sx={{ color: '#757575' }}>500 flashcards</Typography>
                        <Typography sx={{ color: '#757575' }}>Basic customization and analytics</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight={600} sx={{ color: '#3949ab' }}>
                            Pro
                        </Typography>
                        <Typography sx={{ color: '#757575' }}>$ 10 / month</Typography>
                        <Typography sx={{ color: '#757575' }}>Unlimited Flashcards</Typography>
                        <Typography sx={{ color: '#757575' }}>
                            Advanced customization and detailed analytics
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default LandingPage;
