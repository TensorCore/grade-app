import type { NextPage } from "next";
import Head from "next/head";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import StudentNavbar from "../../components/navbar/studentNav";
import axios from "axios";
interface Props {
  Data: {
    id: String;
    username: String;
    role: String;
    name: String;
  };
  DBData: any;
}

async function registerStudent(e: any, classId: any, studentId: any) {
  const res = await axios.post("/api/student/registerclass", {
    studentId: studentId,
    classId: classId,
  });

  location.reload();
}

async function unregisterStudent(e: any, classId: any, studentId: any) {
  const res = await axios.post("/api/student/unregisterclass", {
    studentId: studentId,
    classId: classId,
  });

  location.reload();
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
        <StudentNavbar
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
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Teacher
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Capacity
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Time
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {DBData.map((student: any) => (
                        <tr key={student.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {student.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {student.teacher.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {`${student.enrolled} / ${student.maxenroll}`}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {student.classtime}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {/* Check if Data ID in object array */}
                            {student.students.filter(
                              (x: any) => x.userId === Data.id
                            ).length > 0 ? (
                              <button
                                className="btn btn-ghost"
                                onClick={(e) => {
                                  unregisterStudent(e, student.id, Data.id);
                                }}
                              >
                                {" "}
                                UNREGISTER{" "}
                              </button>
                            ) : student.enrolled >= student.maxenroll ? (
                              <div className="btn btn-disabled">Full</div>
                            ) : (
                              <button
                                className="btn btn-ghost"
                                onClick={(e) => {
                                  registerStudent(e, student.id, Data.id);
                                }}
                              >
                                REGISTER
                              </button>
                            )}
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
  };

  let Classes = await prisma?.classes.findMany({
    include: {
      teacher: {
        select: {
          name: true,
        },
      },
      students: {
        select: {
          userId: true,
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
