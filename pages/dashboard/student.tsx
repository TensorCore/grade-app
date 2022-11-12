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


            <div className='antialiased'>
                <nav className='navbar bg-primary'>
                    <div className='navbar-start'>

                    </div>


                </nav>

                <main>
                </main>

                <footer>

                </footer>
            </div>
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

    if(session.role !== 'STUDENT'){
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

    let Classes = await prisma?.classes.findMany({
        where: {
            students: {
                some: {
                    userId: session.id
                }
            }
        },
    })

    const DBData = JSON.stringify(Classes)

    return {
        props: {
            Data,
            DBData
        },
    }
}
