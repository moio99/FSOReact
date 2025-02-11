import Part from "./Part";

interface iContent {
  course: {
    name: string,
    parts: {
      name: string;
      exercises: number;
    }[];
  }
}

const Content = ({course}: iContent) => {
  return (
    <>
      <Part part={course.parts[0] } />
      <Part part={course.parts[1] } />
      <Part part={course.parts[2] } />
    </>
  );
};

export default Content