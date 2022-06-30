import "./App.css";
import { useState } from "react";
import { useQuery } from "react-query";

function App() {
  const [inputEdit, setInputEdit] = useState(false);
  const [priroity, setPriroity] = useState();
  const apiURL = "http://localhost:5000";
  const {
    data: todos,
    isLoading,
    refetch,
  } = useQuery("todos", () => fetch(`${apiURL}/get`).then((res) => res.json()));

  if (isLoading) {
    return "Data loading";
  }

  // Post data
  const handleSubmit = (e) => {
    e.preventDefault();
    const taskName = e.target.taskName.value;
    const taskPriroity = e.target.taskPriroity.value;
    const todo = {
      task: taskName,
      priority: taskPriroity,
    };
    // Send to DB
    fetch(`${apiURL}/post`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertId) {
          alert(`Add todo`);
          refetch();
        } else {
          alert(`Not add`);
        }
      });

    // Clear
    e.target.taskName.value = "";
    e.target.taskPriroity.value = "";
  };

  // Delete data
  const handleDelete = (id) => {
    fetch(`${apiURL}/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.protocol41) {
          alert(`Todo is deleted.`);
          refetch();
        }
      });
  };

  // Update data
  const handleEdit = (id) => {
    const todo = {
      id: id,
      priority: priroity,
    };
    // Send to DB
    fetch(`${apiURL}/update`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertId) {
          alert(`Add todo`);
          refetch();
        } else {
          alert(`Not add`);
        }
      });

    setInputEdit(false);
  };
  return (
    <div className="App">
      <h1 className="text-3xl my-5">CRUD operation with node and SQL</h1>
      <div className="flex justify-between">
        <div className="border rounded-lg p-2 w-1/4 mr-3 text-start">
          <div className="text-center mb-3">Input Field</div>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="taskName">Task Name :</label>
              <input
                id="taskName"
                name="taskName"
                placeholder="Task Name"
                type="text"
                className="border border-gray-500 ml-2 rounded"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="taskPriroity">Task Priroity :</label>
              <input
                id="taskPriroity"
                name="taskPriroity"
                placeholder="Task Priroity"
                type="text"
                className="border border-gray-500 ml-2 rounded"
              />
            </div>
            <input
              className="btn px-4 py-1 rounded bg-cyan-500 btn-primary"
              type="submit"
              value="Add Task"
            />
          </form>
        </div>
        <div className="border rounded-lg p-2 w-3/4 text-start">
          <div className=" text-center">Output Field </div>
          <ul>
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="border-2 border-lime-400 p-2 m-2 rounded"
              >
                <div>
                  <div className="space-x-12">
                    <span>{todo.task}</span>
                    <span className="text-orange-600">
                      {todo.priority}
                    </span>{" "}
                  </div>
                  <hr className="border-t-2 border-t-lime-400 my-2" />
                  <div className="space-x-4">
                    <div
                      className={`${inputEdit ? "block" : "hidden"} space-x-4`}
                    >
                      <input
                        onChange={(e) => setPriroity(e.target.value)}
                        type="text"
                        placeholder="Update priroity "
                        className="border border-gray-500 rounded"
                        name="editPriroity"
                        id="editPriroity"
                      />
                      <button
                        onClick={() => handleEdit(todo.id)}
                        className="btn btn-primary px-4 py-1 rounded bg-green-500"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => setInputEdit(false)}
                        className="btn btn-primary px-4 py-1 rounded bg-red-600"
                      >
                        Cancel
                      </button>
                    </div>

                    <button
                      onClick={() => setInputEdit(true)}
                      className="btn btn-primary px-4 py-1 rounded bg-green-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="btn btn-primary px-4 py-1 rounded bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
