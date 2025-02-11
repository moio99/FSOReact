import Part, { iCourse } from "./Part";

interface iContent {
  content: iCourse[]
}

const Content = ({content}: iContent) => {
  return (
    <>
      <Part course={content[0].course } />
      <Part course={content[1].course } />
      <Part course={content[2].course } />
    </>
  );
};

export default Content