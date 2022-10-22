import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
//Home Page for Grade App

const Home: NextPage = () => {
  return (
    <>
      <div>
        <Head>
          <title>Grade App</title>
          <meta name="description" content="Grade App" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>

      <main className='antialiased'>
        <button onClick={()=>{signIn()}}>Login</button>
      </main>

      <footer>
      </footer>
    </>
  )
}

export default Home
