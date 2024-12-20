import axios from "axios"
import { useEffect, useState } from "react";

function App() {

  const [error, seterror] = useState("")
  const [showData, setShowData] = useState(false);
  const [todoList, setTodoList] = useState([]);

  const userLocalId = localStorage.getItem("userId");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      getTaskList();
    }
  }, []);

  const addUser = async (event) => {
    try {
      event.preventDefault();
      const res = await axios.post("http://localhost:3001/addUser", {
        "name": event.target[0].value,
      });
      if (res.status === 200) {
        localStorage.setItem("userId", res.data.data._id);
        setShowData(true);
        await getTaskList();
        seterror("")
      } else {
        seterror(res.message);
      }
    } catch (e) {
      console.log(e)
      seterror(e.message);
    }
  };

  const addData = async (event) => {
    try {
      event.preventDefault();
      const userId = localStorage.getItem("userId")
      const res = await axios.post("http://localhost:3001/addData", {
        "name": event.target[0].value,
        "task": event.target[1].value,
        "userId": userId,
      });
      if (res.status === 200) {
        setShowData(true);
        await getTaskList();
        seterror("")
      } else {
        seterror(res.message);
      }
    } catch (e) {
      console.log(e)
      seterror(e.message);
    }
  };

  const getTaskList = async () => {
    try {
      const userId = localStorage.getItem("userId")
      const res = await axios.post("http://localhost:3001/todoList", {
        "userId": userId,
      });
      if (res.status === 200) {
        setTodoList(res.data.data);
        seterror("")
      } else {
        seterror(res.message);
      }
    } catch (e) {
      seterror(e.message);
    }
  }

  return (
    <div className="container">
      <div>
        {
          error && error !== "" && error
        }
      </div>
      {
        !userLocalId &&
        <form onSubmit={addUser}>
          <div className="mb-3 border p-4 m-4">
            <label for="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" placeholder="Enter Name" />
            <br/>
            <button type="submit" className="btn btn-primary">Add User</button>
          </div>
        </form>
      }

      {
        (showData || userLocalId) && <div>
          <form onSubmit={addData}>
            <div className="mb-3 border p-4 m-4">
              <label for="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" name="name" placeholder="Enter Task Name" />
              <label for="task" className="form-label">Task</label>
              <input type="text" className="form-control" id="task" name="task" placeholder="Enter Task Description" />
              <br />
              <button type="submit" className="btn btn-primary">Add Task</button>
            </div>
          </form>
        </div>
      }
      {
        todoList && todoList.length !== 0 &&
        todoList.map((item, index) => (
          <div key={index}>
            Task Name: {item.name}
            <br/>
            Task Description: {item.task}
            <hr/>
          </div>
        ))
      }
    </div>
  );
}

export default App;
