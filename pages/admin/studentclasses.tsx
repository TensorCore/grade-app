import type { NextPage } from "next";
import Head from "next/head";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import AdminNavbar from "../../components/navbar/adminNav";
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

async function deleteRegister(e: any, adminId: any, userId: any, classId: any ) {
  const res = await axios.post("/api/admin/deleteregister", {
    adminId: adminId,
    userId: userId,
    classId: classId,
  });

  location.reload();
}

async function addRegister(e: any, adminId: any) {
  const res = await axios.post("/api/admin/forceregister", {
    adminId: adminId,
    grade: e.target.name.grade,
    studentId: e.target.teacherId.studentId,
    classId: e.target.maxEnroll.classId,
  });
}

async function changeGrade(e: any, userId: any, adminId: any, classId: any) {
  const res = await axios.post("/api/admin/changegrade", {
    userId: userId,
    classId: classId,
    grade: e.target.value,
    adminId: adminId,
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
        <AdminNavbar
          role={Data.role}
          name={Data.name}
          username={Data.username}
        />

        <main>
          {/* DaisyUI Add User Modal */}
          {/* Centered button */}

          <div className="flex justify-center">
            <label className="btn btn-primary" htmlFor="my-modal">
              Add Student In Class
            </label>
          </div>

          <input type="checkbox" id="my-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative">
              <label
                htmlFor="my-modal"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <h3 className="text-lg font-bold">Add user to the Grade App</h3>
              <div className="mt-4">
                <form onSubmit={(e) => addRegister(e, Data.id)}>
                  <label className="block text-sm font-medium text-gray-700">
                    Grade
                  </label>
                  <input
                    type="text"
                    name="grade"
                    id="grade"
                    className="block w-full px-3 py-2 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />

                  <label className="block text-sm font-medium text-gray-700">
                    studentId
                  </label>
                  <input
                    type="text"
                    name="studentId"
                    id="studentId"
                    className="block w-full px-3 py-2 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />

                  <label className="block text-sm font-medium text-gray-700">
                    classId
                  </label>

                  <input
                    type="text"
                    name="classId"
                    id="classId"
                    className="block w-full px-3 py-2 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />

                  <button
                    type="submit"
                    // button end of line
                    className="inline-flex justify-end px-4 py-2 mt-4 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                  >
                    Add User
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* DaisyUI table with delete id: true,
      grade: true,
      studentId: true,
      classId: true,*/}
          <div className="flex flex-col mt-10">
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
                          grade
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          studentId
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          classId
                        </th>
                        <th
                          scope="col"
                          className="relative px-6 py-3"
                          // button end of line
                        >
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {DBData.map((item: any) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              <input
                                type="text"
                                name="grade"
                                id="grade"
                                className="block w-full px-3 py-2 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={(e) =>
                                  changeGrade(
                                    e,
                                    item.studentId,
                                    item.classId,
                                    item.id
                                  )
                                }
                                value={item.grade}
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {item.userId}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {item.classId}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={(e) => deleteRegister(e, Data.id,item.userId, item.classId)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Delete
                            </button>
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
  };

  const studentGrades = await prisma?.userInClasses.findMany({
    select: {
      grade: true,
      userId: true,
      classId: true,
    },
  });
  console.log(studentGrades)

  const DBData = JSON.stringify(studentGrades);

  return {
    props: {
      Data,
      DBData,
    },
  };
}