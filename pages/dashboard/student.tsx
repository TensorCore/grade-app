import type { NextPage } from "next";
import Head from "next/head";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import StudentNavbar from "../../components/navbar/studentNav";
import StudentCard from "../../components/card/studentCard";

//Dashboard Page for Grade App
interface Props {
  Data: {
    id: String;
    username: String;
    role: String;
    name: String;
  };
  DBData: any
}
const Dashboard: NextPage<Props> = ({ Data, DBData}) => {
  DBData = JSON.parse(DBData)
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Grade App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="antialiased">
        <StudentNavbar
          role={Data.role}
          name={Data.name}
          username={Data.username}
        />

        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 p-10 content-center	">
            {DBData.map((student: any) => (
                <StudentCard
                    key = {student.id}
                    name={student.name}
                    teacher={student.teacher.name}
                    grade={student.students[0].grade}
                />
            ))}
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

  if (session.role !== "STUDENT") {
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

  let Classes = await prisma?.classes.findMany({
    where: {
      students: {
        some: {
          userId: session.id,
        },
      },
    },
    include: {
      teacher: {
        select: {
          name: true,
        },
      },
      students: {
        select: {
            grade: true,
        },
      },
    },
  });

  const DBData = JSON.stringify(Classes);
  
  return {
    props: {
      Data,
      DBData,
    },
  };
}
