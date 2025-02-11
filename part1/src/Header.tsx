
interface iCourse {
  title: string;
}

const Header = ({title}:iCourse) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default Header