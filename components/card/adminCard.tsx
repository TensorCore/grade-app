import Link from "next/link";

type Props = {
  name: String;
  length: String;
  path: String;
};

const StudentCard = (props: Props) => {
  return (
    <div className="card w-96 bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title">{props.name}</h2>
        <p>Entries - {props.length}</p>
        <div className="card-actions justify-end">
          <a href={`/admin/${props.path}`}>
            {" "}
            <button className="hover:text-red-600">Goto {props.path}</button>{" "}
          </a>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
