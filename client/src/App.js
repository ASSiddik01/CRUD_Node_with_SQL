import "./App.css";
import { useState } from "react";
import { useQuery } from "react-query";

function App() {
  const [inputEdit, setInputEdit] = useState(false);
  const {
    data: todos,
    isLoading,
    refetch,
  } = useQuery("todos", () =>
    fetch(`http://localhost:5000/get`).then((res) => res.json())
  );

  if (isLoading) {
    return "Data loading";
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskName = e.target.taskName.value;
    const taskPriroity = e.target.taskPriroity.value;
    console.log(taskName, taskPriroity);

    e.target.taskName.value = "";
    e.target.taskPriroity.value = "";
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const editPriroity = e.target.editPriroity.value;
    console.log(editPriroity);

    e.target.editPriroity.value = "";
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
                    <form
                      onSubmit={handleEdit}
                      className={`${inputEdit ? "block" : "hidden"} space-x-4`}
                    >
                      <input
                        type="text"
                        placeholder="Update priroity "
                        className="border border-gray-500 rounded"
                        name="editPriroity"
                        id="editPriroity"
                      />
                      <input
                        type="submit"
                        value={"Update"}
                        className="btn btn-primary px-4 py-1 rounded bg-green-500"
                      ></input>
                      <button
                        onClick={() => setInputEdit(false)}
                        className="btn btn-primary px-4 py-1 rounded bg-red-600"
                      >
                        Cancel
                      </button>
                    </form>

                    <button
                      onClick={() => setInputEdit(true)}
                      className="btn btn-primary px-4 py-1 rounded bg-green-500"
                    >
                      Edit
                    </button>
                    <button className="btn btn-primary px-4 py-1 rounded bg-red-600">
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
