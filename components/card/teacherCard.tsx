import { type NextRouter, useRouter } from 'next/router';

type Props = {
    name: String;
    enrolled: String;
    maxenroll: String;
    classId: String;
    classtime: String;
  };
  
  function routeClass(e: any, classId: any, router: NextRouter) {
    router.push(`/teacher/class/${classId}`);
  }
  
  const TeacherCard = (props: Props) => {
    const router = useRouter();
    return (
      <div className="card w-96 bg-primary text-primary-content">
        <div className="card-body">
          <h2 className="card-title">Class: {props.name}</h2>
          <p>Enrolled: {`${props.enrolled}/${props.maxenroll}`}</p>
          <p>{props.classtime}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-ghost hover:text-blue-600" onClick={(e)=>routeClass(e, props.classId, router)}>View</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default TeacherCard;
  