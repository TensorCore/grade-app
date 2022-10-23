import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";

const Login: NextPage = () => {
    const [passwordInput, setPassword] = useState("");
    const [usernameInput, setUsername] = useState("");
    const [error, setError] = useState(false);
    function loginHandler(event: any) {
        event.preventDefault();
        signIn('credentials', { redirect: false, username: usernameInput, password: passwordInput })
        .then((res: any) => {
            if(res.error) {
                setPassword("");
                setUsername("");
                setError(true)
                setTimeout(() => {
                    setError(false)
                }, 5000)
            }
        })
    }

    const router = useRouter();
    const { status, data: session }: any = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            router.push(`/dashboard/${session.role.toLowerCase()}`);
        }
    }, [status, router, session]);

    return (
        <>
            <Head>
                <title>Grade App</title>
                <meta name="description" content="Grade App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="antialiased min-h-screen w-full flex justify-center items-center bg-primary">
                <div className="container px-6 py-12 h-full">

                    <div className="flex flex-col justify-center items-center flex-wrap h-full g-6 text-gray-800">
                        <div className="w-full flex justify-center items-center pb-5">
                            <Link href='/' className="">
                                <h1 className="hover:cursor-pointer text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-content hover:bg-amber-400 transition-colors duration-1000">
                                    Grade App
                                </h1>
                            </Link>
                        </div>
                        {error === true && (
                            <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                                <span className="font-medium">Danger alert!</span> Change a few things up and try submitting again.
                            </div>
                        )}
                        <div className="md:w-4/12 lg:w-4/12">
                            <form id="#login" onSubmit={loginHandler}
                            >
                                <div className="mb-6">
                                    <input
                                        type="text"
                                        className="input input-bordered input-xl w-full max-w-xl bg-slate-800 text-white"
                                        placeholder="Username"
                                        onChange={event => setUsername(event.target.value)}
                                        value={usernameInput}
                                    />
                                </div>
                                <div className="mb-6">
                                    <input
                                        type="password"
                                        className="input input-bordered input-xl w-full max-w-xl bg-slate-800 text-white"
                                        placeholder="Password"
                                        onChange={event => setPassword(event.target.value)}
                                        value={passwordInput}
                                    />
                                </div>


                                <button
                                    type="submit"
                                    className="inline-block px-7 py-3 bg-slate-800 text-white font-semibold text-md leading-snug uppercase rounded shadow-md hover:bg-slate-600 hover:shadow-lg focus:bg-slate-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                >
                                    Sign in
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Login;
