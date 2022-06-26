import "./App.css";

function App() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const taskName = e.target.taskName.value;
    console.log(taskName);
  };
  return (
    <div className="App">
      <h1 className="text-3xl my-5">CRUD operation with node and SQL</h1>
      <div className="flex justify-between">
        <div className="border rounded-lg p-2 w-1/4 mr-3">
          <div className="text-center mb-3">Input Field</div>
          <form onSubmit={handleSubmit}>
            <div className="mb-2 flex justify-between">
              <label htmlFor="taskName">Task Name :</label>
              <input
                id="taskName"
                name="taskName"
                type="text"
                className="border border-black ml-2 rounded"
              />
            </div>
            <div className="mb-2 flex justify-between">
              <label htmlFor="taskPriroity">Task Priroity :</label>
              <input
                id="taskPriroity"
                name="taskPriroity"
                type="text"
                className="border border-black ml-2 rounded"
              />
            </div>
            <input
              className="btn mx-auto btn-primary"
              type="submit"
              value="Add Task"
            />
          </form>
        </div>
        <div className="border rounded-lg p-2 w-3/4 text-start">
          <div className=" text-center">Output Field</div>
        </div>
      </div>
    </div>
  );
}

export default App;
