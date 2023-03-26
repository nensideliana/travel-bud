import Head from 'next/head'
import styles from '@component/styles/Home.module.css'
import { useUser } from '@auth0/nextjs-auth0/client'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { Box, Button, CardContent, CardHeader, Container, Grid, IconButton, Menu, MenuItem, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { Delete } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import Header from '@component/components/Header';

export default function Home() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <>...Loading</>
  if (error) return <>Error!</>
  if (user) {

    const [anchorElItinerary, setAnchorElItinerary] = useState<null | HTMLElement>(null);

    const handleOpenItineraryMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElItinerary(event.currentTarget);
    };

    const handleCloseItineraryMenu = () => {
      setAnchorElItinerary(null);
    };

    return (
      <Container maxWidth="lg">
        <Head>
          <title>Travel Bud</title>
          <link rel="icon" href="" />
        </Head>
        <Header />
        <main className={styles.main}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Your itineraries</Typography>
          <Grid
            container
            spacing={2}
            direction="column">
            <Grid item xs={6} >
              <Box
                sx={{
                  p: 2,
                  display: 'grid',
                  gridTemplateColumns: { md: '1fr 1fr' },
                  gap: 2,
                }}
              >
                <Paper elevation={3}>
                  <CardHeader
                    action={
                      <IconButton aria-label="settings" onClick={handleOpenItineraryMenu}>
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title="Itinerary 1"
                    subheader="March 24, 2023"
                  />
                  <CardContent></CardContent>
                </Paper>
                <Menu
                  anchorEl={anchorElItinerary}
                  open={Boolean(anchorElItinerary)}
                  onClose={handleCloseItineraryMenu}>
                  <MenuItem><ShareIcon />Share</MenuItem>
                  <MenuItem><Delete />Delete</MenuItem>
                </Menu>
                <Paper elevation={3}>
                  <CardHeader
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title="Itinerary 2"
                    subheader="March 24, 2023"
                  />
                  <CardContent></CardContent>
                </Paper>
              </Box>
            </Grid>
          </Grid>
          <Button variant="contained" href="/createItinerary">Plan New Itinerary</Button>
        </main>
      </Container>
    )
  }
}

export const getServerSideProps = withPageAuthRequired();