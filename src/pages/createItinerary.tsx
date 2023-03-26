import styles from '@component/styles/Home.module.css'
import Head from 'next/head'
import { useUser } from '@auth0/nextjs-auth0/client'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { Box, Button, Container, FormGroup, Grid, IconButton, InputAdornment, TextField, Toolbar, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers'
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Header from '@component/components/Header';
import { useLoadScript } from '@react-google-maps/api'
import usePlacesAutocomplete from "use-places-autocomplete";

export default function NewItinerary() {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <>...Loading</>
    if (error) return <>Error!</>
    if (user) {
        const { isLoaded } = useLoadScript({
            googleMapsApiKey: "AIzaSyAXceB-YTgirqFAYfTyb9scGmCLuSkf9ts",
            libraries: ["places"]
        })

        if (!isLoaded) return <p>Loading...</p>

        return (
            <>
                <Container maxWidth="lg">
                    <Head>
                        <title>New Itinerary</title>
                        <link rel="icon" href="" />
                    </Head>
                    <Header />
                    <main className={styles.main}>
                        <Grid container spacing={5} alignContent="center" direction="column" justifyContent="center">
                            <Grid item xs={12} >
                                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Plan a new trip</Typography>
                            </Grid>
                            {/* <FormGroup> */}
                            <Grid item xs={12}><PlacesAutocomplete /></Grid>
                            <Grid item container columnSpacing={{ xs: 1}}>
                                <Grid item xs={6}>
                                    <DatePicker label="Start Date" components={{ OpenPickerIcon: CalendarMonthIcon }}></DatePicker>
                                </Grid>
                                <Grid item xs={6}>
                                    <DatePicker label="End Date" components={{ OpenPickerIcon: CalendarMonthIcon }}></DatePicker>
                                </Grid>
                            </Grid>
                            <Grid item><Button variant="contained" href="/editItinerary" >Start planning</Button></Grid>
                        </Grid>
                    </main>
                </Container>
            </>
        )
    }
}
const PlacesAutocomplete = ({
    onAddressSelect,
}: {
    onAddressSelect?: (address: string) => void;
}) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        debounce: 300,
        cache: 86400,
    });

    const renderSuggestions = () => {
        return data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
                description,
            } = suggestion;

            return (
                <div
                    key={place_id}
                    onClick={() => {
                        setValue(description, false);
                        clearSuggestions();
                        onAddressSelect && onAddressSelect(description);
                    }}
                >
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </div>
            );
        });
    };

    return (
        <div>
            <TextField
                fullWidth
                id="searchBox"
                label="Where to?"
                placeholder="e.g. Paris, Hawaii, Japan"
                value={value}
                onChange={(e) => setValue(e.target.value)}
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

            {status === 'OK' && (
                renderSuggestions()
            )}
        </div>
    );
};

export const getServerSideProps = withPageAuthRequired();