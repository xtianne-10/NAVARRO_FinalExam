import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");
  const [submittedStudent, setSubmittedStudent] = useState(null);


  const getStudents = () => {
    axios
      .get("http://localhost:5000/students")
      .then((response) => {
        setStudents(response.data);
      });
  };

  useEffect(() => {
    getStudents();
  });

  const handleSubmit = () => {
    
    // e.preventDefault();

    const studentData = {
      name: name,
      course: course,
      age: age
    };

    if (submittedStudent) {
      axios
        .put(`http://localhost:5000/students/${submittedStudent}`, studentData)
        .then(() => {
          getStudents();
          setName("");
          setCourse("");
          setAge("");
          setSubmittedStudent(null);
        });
    } else {
      axios
        .post("http://localhost:5000/students", studentData)
        .then(() => {
          getStudents();
          setName("");
          setCourse("");
          setAge("");
        });
    }
  };

  const handleEdit = (student) => {
    setName(student.name);
    setCourse(student.course);
    setAge(student.age);
    setSubmittedStudent(student._id);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/students/${id}`)
      .then(() => {
        getStudents();
      });
  };

  return (
    <>
      <div>
        <h1>Student Management System</h1>
        
        <h2>Add Student</h2>
      
        <form>
          <div>
            <label>Name: </label>
            <input
              value={name}
              name="name"
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label>Course: </label>
            <input
              value={course}
              name="course"
              type="text"
              placeholder="Enter your course"
              onChange={(e) => setCourse(e.target.value)}
            />
          </div>

          <div>
            <label>Age: </label>
            <input
              value={age}
              name="age"
              placeholder="Enter your age"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <button
            onClick={handleSubmit}
          >
            {submittedStudent ? "Update Student" : "Add Student"}
          </button>
        </form>

        <br/>
        <div>
          <h2>List of Students:</h2>

          {students.map((student) => (
            <div key={student._id}>
              <hr/>
              <p>Name: {student.name}</p>
              <p>Course: {student.course}</p>
              <p>Age: {student.age}</p>

              <div>
                <button
                  style={{marginRight: 10}}
                  onClick={() => handleEdit(student)}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(student._id)}
                >
                  Delete
                </button>
              </div>
              <hr/>
            </div>
          ))}
        </div>
        
      </div>
    </>
  );
}

export default App;