import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";

const Home: NextPage = () => {
  const router = useRouter();
  const { status, data: session }: any = useSession();
  if (status === "authenticated") {
    router.push(`/dashboard/${session.role.toLowerCase()}`);
  }

  return (
    <>
      <Head>
        <title>Grade App</title>
        <meta name="description" content="Grade App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="antialiased min-h-screen w-full bg-gradient-to-br from-primary to-secondary">
        <a
          href="https://github.com/TensorCore/grade-app"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-0 right-0 m-4"
        >
          <Image
            src="/github-logo.png"
            alt="Github Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
        </a>

        <div className="flex flex-col items-center justify-center min-h-screen py-2 text-center">
          {/* Gradient Text */}
          <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-content hover:bg-cyan-400 transition-colors duration-1000">Grade App</h1>
          <p className="mt-3 text-2xl text-secondary-content font-semibold">
            A simple app to help you keep track of your grades
          </p>
          {status === "unauthenticated" && (
            <div className="mt-6">
              <Link href="/api/auth/signin">
                <a className="px-4 py-2 text-lg font-bold text-primary-content bg-primary rounded-lg hover:bg-slate-400 transition-colors duration-500 z-10">
                  Sign In
                </a>
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
