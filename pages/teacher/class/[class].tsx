import type { NextPage } from "next";
import Head from "next/head";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import TeacherNavbar from "../../../components/navbar/teacherNav";

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

  // Get route param
  const { class: param } = context.query;
  // convert class to integer
  const classId = parseInt(param);

  const Classes = await prisma?.classes.findUnique({
    where: {
      id: classId,
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
