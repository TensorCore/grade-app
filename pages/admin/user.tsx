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

async function deleteUser(e: any, userId: any, adminId: any) {
  const res = await axios.post("/api/admin/deleteuser", {
    userId: userId,
    adminId: adminId,
  });

  location.reload();
}

async function addUser(e: any, adminId: any) {
  const res = await axios.post("/api/admin/newuser", {
    username: e.target.username.value,
    password: e.target.password.value,
    role: e.target.role.value,
    name: e.target.name.value,
    adminId: adminId,
  });
}

async function changeUsername(e: any, userId: any, adminId: any) {
  const res = await axios.post("/api/admin/changeusername", {
    userId: userId,
    username: e.target.value,
    adminId: adminId,
  });
}

async function changePassword(e: any, userId: any, adminId: any) {
  const res = await axios.post("/api/admin/changepassword", {
    userId: userId,
    password: e.target.value,
    adminId: adminId,
  });
}

async function changeRole(e: any, userId: any, adminId: any) {
  const res = await axios.post("/api/admin/changerole", {
    userId: userId,
    role: e.target.value,
    adminId: adminId,
  });

  location.reload();
}

async function changeName(e: any, userId: any, adminId: any) {
  const res = await axios.post("/api/admin/changename", {
    userId: userId,
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
          {/* DaisyUI Add User Modal */}
          {/* Centered button */}

          <div className="flex justify-center">
            <label className="btn btn-primary" htmlFor="my-modal">
              Add User
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
                <form onSubmit={(e) => addUser(e, Data.id)}>
                  <label className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="block w-full px-3 py-2 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />

                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="text"
                    name="password"
                    id="password"
                    className="block w-full px-3 py-2 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />

                  <label className="block text-sm font-medium text-gray-700">
                    Role
                  </label>

                  <select
                    id="role"
                    name="role"
                    className="block w-full px-3 py-2 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="ADMIN">Admin</option>
                    <option value="TEACHER">Teacher</option>
                    <option value="STUDENT">Student</option>
                  </select>

                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
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

          {/* DaisyUI table with delete*/}
          <div className="flex justify-center mt-20">
            <div className="w-full max-w-6xl">
              <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-max w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">ID</th>
                      <th className="py-3 px-6 text-left">Username</th>
                      <th className="py-3 px-4 text-left">Password</th>
                      <th className="py-3 px-6 text-center">Role</th>
                      <th className="py-3 px-6 text-center">Name</th>
                      <th className="py-3 px-6 text-center">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {DBData.map((user: any) => (
                      <tr
                        className="border-b border-gray-200 hover:bg-gray-100"
                        key="user.id"
                      >
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <span>{user.id}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          <div className="flex items-center">
                            <input
                              type="text"
                              placeholder={user.username}
                              className="input"
                              onChange={(e) =>
                                changeUsername(e, user.id, Data.id)
                              }
                            />
                          </div>
                        </td>

                        <td className="py-3 px-6 text-left">
                          <div className="flex items-center">
                            <input
                              type="text"
                              placeholder={user.password}
                              className="input"
                              onChange={(e) =>
                                changePassword(e, user.id, Data.id)
                              }
                            />
                          </div>
                        </td>

                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center">
                            <select
                              id="role"
                              name="role"
                              className="block w-full py-2 px-7 mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              value={user.role}
                              onChange={(e) => changeRole(e, user.id, Data.id)}
                            >
                              <option value="ADMIN">Admin</option>
                              <option value="TEACHER">Teacher</option>
                              <option value="STUDENT">Student</option>
                            </select>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center">
                          <input
                              type="text"
                              placeholder={user.name}
                              className="input"
                              onChange={(e) =>
                                changeName(e, user.id, Data.id)
                              }
                            />
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex item-center justify-center">
                            <div
                              className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                              onClick={(e) => {
                                deleteUser(e, user.id, Data.id);
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

  const Students = await prisma?.user.findMany({
    select: {
      id: true,
      name: true,
      username: true,
      password: true,
      role: true,
    },
  });

  const DBData = JSON.stringify(Students);

  return {
    props: {
      Data,
      DBData,
    },
  };
}
