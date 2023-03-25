import styles from '@component/styles/Home.module.css'
import Head from 'next/head'
import Image from 'next/image'
import { useUser } from '@auth0/nextjs-auth0/client'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { AppBar, Button, Container, CssBaseline, FormControl, FormGroup, Grid, IconButton, InputAdornment, TextField, Toolbar, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers'
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function NewItinerary() {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <>...Loading</>
    if (error) return <>Error!</>
    if (user) {
        return (
            <>
                <Container maxWidth="lg">
                    <Head>
                        <title>New Itinerary</title>
                        <link rel="icon" href="" />
                    </Head>
                    <AppBar position="relative">
                        <Toolbar>
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>travelbud</Typography>
                        </Toolbar>
                    </AppBar>
                    <main className={styles.main}>
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            justifyContent="center"
                            >
                        <Grid item  alignContent="center">
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Plan a new trip</Typography>
                        </Grid>
                        <Grid item>
                        <FormGroup>
                            <TextField
                                required
                                autoComplete="off"
                                label="Where to?"
                                placeholder="e.g. Paris, Hawaii, Japan"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <DatePicker label="Start Date" components={{OpenPickerIcon: CalendarMonthIcon}}></DatePicker>
                            <DatePicker label="End Date" components={{OpenPickerIcon: CalendarMonthIcon}}></DatePicker>
                            <Button variant="contained">Start planning</Button>
                        </FormGroup>
                        </Grid>
                        </Grid>
                    </main>
                </Container>
            </>
        )
    }
}

export const getServerSideProps = withPageAuthRequired();