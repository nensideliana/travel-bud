import Header from '@component/components/Header';
import { Grid } from '@mui/material';
import { useLoadScript, GoogleMap } from '@react-google-maps/api'
import Head from 'next/head';
import { useMemo } from 'react';

export default function EditItinerary() {
    const mapCenter = useMemo(
        () => ({ lat: 27.672932021393862, lng: 85.31184012689732 }),
        []
    );

    const mapOptions = useMemo<google.maps.MapOptions>(
        () => ({
            disableDefaultUI: false,
            clickableIcons: true,
            scrollwheel: false,
        }),
        []
    );

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_APP_GOOGLE_KEY as string,
        libraries: ["places"]
    })

    if (!isLoaded) return <p>Loading...</p>

    return (
        <>
            <Head>
                <title>Edit Itinerary</title>
                <link rel="icon" href="" />
            </Head>
            <Header />
            <Grid container>
                <Grid item xs={6}>
                </Grid>
                <Grid item xs={6}>
                    <GoogleMap
                        options={mapOptions}
                        zoom={10}
                        center={mapCenter}
                        mapTypeId={google.maps.MapTypeId.ROADMAP}
                        mapContainerStyle={{ width: '800px', height: '800px' }}
                        onLoad={() => console.log('Map Component Loaded...')}
                    />
                </Grid>
            </Grid>
        </>
    )
}