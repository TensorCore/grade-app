import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
//Home Page for Grade App

const Home: NextPage = () => {
  const router = useRouter()
  const {status, data: session }: any = useSession()
  if (status === 'authenticated') {
    router.push(`/dashboard/${session.role.toLowerCase()}`)
  }

  return (
    <>
      <Head>
        <title>Grade App</title>
        <meta name="description" content="Grade App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="antialiased min-h-screen w-full bg-gradient-to-br from-primary to-secondary">
            <div className="flex flex-col items-center justify-center min-h-screen py-2 text-center">
            <h1 className="text-6xl font-bold text-primary-content">Grade App</h1>
            <p className="mt-3 text-2xl text-secondary-content">
                A simple app to help you keep track of your grades
            </p>
            {status === 'unauthenticated' && (
                <div className="mt-6">
                    <Link href="/api/auth/signin">
                        <a className="px-4 py-2 text-lg font-semibold text-primary-content bg-primary rounded-lg hover:bg-primary-focus transition-colors duration-500">
                            Sign In
                        </a>
                    </Link>
                </div>
            )}
            </div>
        </div>
    </>
  )
}

export default Home
