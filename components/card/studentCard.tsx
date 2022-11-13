type Props = {
  name: String;
  teacher: String;
  grade: String;
};

const StudentCard = (props: Props) => {
  return (
    <div className="card w-96 bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title">Teacher: {props.name}</h2>
        <p>{props.teacher}</p>
        <div className="card-actions justify-end">
          <button className="btn">Grade: {props.grade}/100</button>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
