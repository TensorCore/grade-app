import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { signIn, signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
//Home Page for Grade App

const Home: NextPage = () => {
  const { status } = useSession()
  const router = useRouter()

  if (status === 'authenticated') {
    router.push('/dashboard')
  }
  
  return (
    <>
      <Head>
        <title>Grade App</title>
        <meta name="description" content="Grade App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='antialiased min-h-screen w-full bg-gradient-to-br from-blue-400 to-green-300'>
        <div className='flex flex-col items-center justify-center min-h-screen py-2 text-center'>
          <h1 className='text-6xl font-bold'>Grade App</h1>
          <p className='mt-3 text-2xl'>
            A simple app to help you keep track of your grades
          </p>
          {status === "unauthenticated" && (
            <button
              onClick={() => signIn()}
              className='px-4 py-2 mt-6 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-500'
            >
              Sign In
            </button>
          )}
        </div>

      </div>
    </>
  )
}

export default Home
