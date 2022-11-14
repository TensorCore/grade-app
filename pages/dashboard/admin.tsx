import type { NextPage } from "next";
import Head from "next/head";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import AdminNavbar from "../../components/navbar/adminNav";
import AdminCard from "../../components/card/adminCard";

//Dashboard Page for Grade App
interface Props {
  Data: {
    id: String;
    username: String;
    role: String;
    name: String;
  };
  DBData: any;
}
const Dashboard: NextPage<Props> = ({ Data, DBData }) => {
  DBData = JSON.parse(DBData);

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Grade App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="antialiased">
        <AdminNavbar
          role={Data.role}
          name={Data.name}
          username={Data.username}
        />

        <main>
          {/* Center Cards Horizontally Spaced Evenly*/}
          <div className="flex justify-evenly mt-20">
            <AdminCard name="Users" length={DBData.UserCount} path="user" />

            <AdminCard name="Classes" length={DBData.ClassCount} path="class" />
            <AdminCard
              name="StudentsInClass"
              length={DBData.StudentInClassCount}
              path="studentclasses"
            />
          </div>
          {/* Centered In page button */}
          <div className="flex justify-center mt-20">
            {/* New Tab A */}
            <a
              href="http://localhost:5555/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="btn btn-ghost text-2xl btn-outline">
                True Admin Pannel
              </div>
            </a>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;

export async function getServerSideProps(context: any) {
  const session: any = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (session.role !== "ADMIN") {
    return {
      redirect: {
        destination: "/dashboard/" + session.role.toLowerCase(),
        permanent: false,
      },
    };
  }

  const Data = {
    id: session.id,
    role: session.role,
    username: session.username,
    name: session.name,
  };

  // Prisma Count Number of Users

  const UserCount = await prisma?.user.count();

  const ClassCount = await prisma?.classes.count();

  const StudentInClassCount = await prisma?.userInClasses.count();

  const DBData = JSON.stringify({ UserCount, ClassCount, StudentInClassCount });

  return {
    props: {
      Data,
      DBData,
    },
  };
}
