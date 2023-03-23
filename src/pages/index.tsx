import Head from 'next/head'
import { useUser } from '@auth0/nextjs-auth0/client'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'

export default function Home() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <>...Loading</>
  if (error) return <>Error!</>
  if (user) {
    return (
      <>
        <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <main>
          <h1>Welcome {user.name}!</h1>
          <a href="/api/auth/logout">Logout</a>
        </main>
      </>
    )
  }
}

export const getServerSideProps = withPageAuthRequired();