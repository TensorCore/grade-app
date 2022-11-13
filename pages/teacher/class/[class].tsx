import type { NextPage } from "next";
import Head from "next/head";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import TeacherNavbar from "../../../components/navbar/teacherNav";
import axios from "axios";

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

async function submitGrade(e: any, classId: any, studentId: any, teacherId: any) {
  await axios.post("/api/teacher/submitgrade", {
    studentId: studentId,
    classId: classId,
    teacherId: teacherId,
    grade: e.target.value,
  });
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
          {/* DaisyUI table */}
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">

                  {/* Title */}
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {DBData[0].name}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      List of Students you are teaching.
                    </p>
                  </div>

                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Student Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Student Grade
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {DBData[0].students.map((item: any) => (
                        <tr key={item.user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {item.user.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {/* onChange={(e) => submitGrade(e, DBData[0].id,item.user.id,Data.id)} */}
                              {/* Grade Number Input */}
                                <input
                                  type="number"
                                  className="w-20 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                  placeholder={item.grade}
                                  onChange={(e)=>submitGrade(e,DBData[0].id,item.user.id,Data.id)}
                                />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
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

  // Get route param
  const { class: param } = context.query;
  // convert class to integer
  const classId = parseInt(param);

  const studentsInClass = await prisma?.classes.findMany({
    where: {
      id: classId,
    },
    select: {
      id: true,
      name: true,
      students: {
        select: {
          grade: true,
          user: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  const DBData = JSON.stringify(studentsInClass);

  return {
    props: {
      Data,
      DBData,
    },
  };
}
