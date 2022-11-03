const Header = (props) => {
  return (
    <div>
      <h1>{props.courseName}</h1>
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <p>
        {props.name} {props.numExercises}
      </p>
    </div>
  );
};

const Content = (props) => {
  const parts = props.parts;
  return (
    <div>
      <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
        {parts.map((part) => (
          <li key={part.id}>
            <Part name={part.name} numExercises={part.exercises} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

export default Course
