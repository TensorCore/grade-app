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

async function deleteClass(e: any, classId: any, adminId: any) {
  const res = await axios.post("/api/admin/deleteclass", {
    classId: classId,
    adminId: adminId,
  });

  location.reload();
}

async function addClass(e: any, adminId: any) {
  const res = await axios.post("/api/admin/newclass", {
    adminId: adminId,
    name: e.target.name.value,
    teacherId: e.target.teacherId.value,
    maxEnroll: e.target.maxEnroll.value,
    classTime: e.target.classTime.value,
  });
}

async function changeTime(e: any, classId: any, adminId: any) {
  const res = await axios.post("/api/admin/changetime", {
    classId: classId,
    classTime: e.target.value,
    adminId: adminId,
  });
}

async function changeEnroll(e: any, classId: any, adminId: any) {
  const res = await axios.post("/api/admin/changeenroll", {
    classId: classId,
    adminId: adminId,
  });

  location.reload();
}

async function changeName(e: any, classId: any, adminId: any) {
  const res = await axios.post("/api/admin/changenameclass", {
    classId: classId,
    name: e.target.value,
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
          <div className="flex justify-center">
            <label className="btn btn-primary" htmlFor="my-modal">
              Add Class
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
              <h3 className="text-lg font-bold">Add class to the Grade App</h3>
              <div className="mt-4">
                <form onSubmit={(e) => addClass(e, Data.id)}>
                  <label className="block text-sm font-medium text-gray-700">
                    name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full px-3 py-2 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />

                  <label className="block text-sm font-medium text-gray-700">
                    classTime
                  </label>
                  <input
                    type="text"
                    name="classTime"
                    id="classTime"
                    className="block w-full px-3 py-2 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />

                  <label className="block text-sm font-medium text-gray-700">
                    maxEnroll
                  </label>

                  <input
                    type="text"
                    name="maxEnroll"
                    id="maxEnroll"
                    className="block w-full px-3 py-2 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />

                  <label className="block text-sm font-medium text-gray-700">
                    teacherId
                  </label>
                  <input
                    type="text"
                    name="teacherId"
                    id="teacherId"
                    className="block w-full px-3 py-2 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />

                  <button
                    type="submit"
                    // button end of line
                    className="inline-flex justify-end px-4 py-2 mt-4 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                  >
                    Add Class
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* DaisyUI table with delete id: true,
      name: true,
      teacherId: true,
      enrolled: true,
      maxenroll: true,
      classtime: true,*/}
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
                          id
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          teacherId
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          enrolled
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          maxenroll
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          classtime
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {DBData.map((item: any) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {item.id}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                            <input 
                              type="text"
                              name="name"
                              id="name"
                              placeholder={item.name}
                              className="block w-full px-3 py-2 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              onChange={(e) => changeName(e, item.id, Data.id)}
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {item.teacherId}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {item.enrolled}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              <input 
                              type="text"
                              name="maxEnroll"
                              id="maxEnroll"
                              placeholder={item.maxenroll}
                              className="block w-16 px-3 py-2 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              onChange={(e) => changeEnroll(e, item.id, Data.id)}
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                            <input 
                              type="text"
                              name="classTime"
                              id="classTime"
                              placeholder={item.classtime}
                              className="block w-full px-3 py-2 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              onChange={(e) => changeTime(e, item.id, Data.id)}
                              />
                            </div>
                          </td>
                          <td className="py-3 px-6 text-center">
                          <div className="flex item-center justify-center">
                            <div
                              className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                              onClick={(e) => {
                                deleteClass(e, item.id, Data.id);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </div>
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

  const Classes = await prisma?.classes.findMany({
    select: {
      id: true,
      name: true,
      teacherId: true,
      enrolled: true,
      maxenroll: true,
      classtime: true,
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