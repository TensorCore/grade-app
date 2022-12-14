import type { NextPage } from "next";
import Head from "next/head";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import TeacherNavbar from "../../components/navbar/teacherNav";
import TeacherCard from "../../components/card/teacherCard";

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
        <TeacherNavbar
          role={Data.role}
          name={Data.name}
          username={Data.username}
        />

        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 p-10 content-center	">
            {DBData.map((teacher: any) => (
              <TeacherCard
                key={teacher.id}
                name={teacher.name}
                enrolled={teacher.enrolled}
                maxenroll={teacher.maxenroll}
                classId={teacher.id}
                classtime={teacher.classtime}
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

  if (session.role !== "TEACHER") {
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

  const Classes = await prisma?.classes.findMany({
    where: {
      teacherId: session.id,
    },
    include: {
      students: true,
      teacher: true,
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
