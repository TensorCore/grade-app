import { signOut } from "next-auth/react";
import Link from "next/link";

type Props = {
  name: String;
  role: String;
  username: String;
};

const StudentNavbar = (props: Props) => {
  return (
    <nav className="navbar">
      <div className="navbar-start">
        <Link href="/dashboard/student">
          <div className="btn btn-ghost normal-case text-xl">{props.role}-
          {props.name != null ? (
          <div className="text-xl">{props.name}</div>
        ) : (
          <div className="text-xl">{props.username}</div>
        )}
          </div>
        </Link>
      </div>

      <div className="navbar-center">
        <Link href="/dashboard/student"><div className="btn btn-ghost text-xl">Dashboard</div></Link>
        <Link href="/student/register"><div className="btn btn-ghost text-xl">Register</div></Link>
      </div>
      <div className="navbar-end">
        {/* logout button */}
        <button onClick={() => signOut()} className="btn btn-outline">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default StudentNavbar;
