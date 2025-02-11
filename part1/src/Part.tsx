
export interface iCourse {
  course: {
    part: string;
    exercises: number;
  }
}

const Part = ({course}:iCourse) => {
  return (
    <div>
      <p>{course.part} {course.exercises}</p>
    </div>
  );
};

export default Part