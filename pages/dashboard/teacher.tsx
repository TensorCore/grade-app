import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';

//Dashboard Page for Grade App
interface Props {
    Data:{
        id: String,
        username: String,
        role: String,
        name: String,
    },
    DBData: any
}
const Dashboard: NextPage<Props> = ({Data, DBData}) => {
    return (
        <>
            <Head>
                <title>Dashboard</title>
                <meta name="description" content="Grade App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <nav className='nav'></nav>
                <div className="antialiased min-h-screen w-full bg-gradient-to-br from-primary to-secondary">
                    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-center">
                        <h1 className="text-6xl font-bold text-primary-content">Dashboard</h1>
                        <p className="mt-3 text-2xl text-secondary-content">
                            {'Hello, ' + Data.username}
                        </p>
                        <div className="mt-6">
                            <Link href="/api/auth/signout">
                                <a className="px-4 py-2 text-lg font-semibold text-primary-content bg-primary rounded-lg hover:bg-primary-focus transition-colors duration-500">
                                    Sign Out
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>

            </main>

            <footer>

            </footer>
        </>
    );
};

export default Dashboard;

export async function getServerSideProps(context: any) {
    const session:any = await unstable_getServerSession(context.req, context.res, authOptions)
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    if(session.role !== 'TEACHER'){
        return {
            redirect: {
                destination: '/dashboard/' + session.role.toLowerCase(),
                permanent: false,
            },
        }
    }

    const Data = {
        id: session.id,
        role: session.role,
        username: session.username,
    }

    return {
        props: {
            Data,
        },
    }
}
