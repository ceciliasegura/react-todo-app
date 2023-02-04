import './App.css';
import Form from './components/Form';
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import ToDoList from './components/ToDoList';

const KEY = "todoApp.task";


const createNewDateAndFormatt = () => new Date().toLocaleDateString("es-ES", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
});

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (nameTask, priority) => {
    const newTask = {
      id: uuidv4(),
      value: nameTask,
      completed: false,
      tags: [],
      creationDate: createNewDateAndFormatt(),
      priority: priority
    };

    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    localStorage.setItem(KEY, JSON.stringify(newTasks));
  };


  const completeTask = (id) => {
    const updatedObjects = tasks.map(obj => {
      if (obj.id === id) {
        return {
          ...obj, completed: true, finishDate: createNewDateAndFormatt()
        };
      }
      return obj;
    });
    setTasks(updatedObjects);
    localStorage.setItem(KEY, JSON.stringify(updatedObjects));
  }


  const deleteTask = (id) => {
    const updatedObjects = tasks.filter(obj => obj.id !== id);
    setTasks(updatedObjects);
    localStorage.setItem(KEY, JSON.stringify(updatedObjects));
  }

  const orderDes = (e) => {
    e.preventDefault();
    const copiedArr = [...tasks];
    const sortedTasks = copiedArr.sort((a, b) => {
      return new Date(b.creationDate) - new Date(a.creationDate);
    });

    setTasks(sortedTasks);
  }

  const orderAsc = (e) => {
    e.preventDefault();
    const copiedArr = [...tasks];
    const sortedTasks = copiedArr.sort((a, b) => {
      return new Date(a.creationDate) - new Date(b.creationDate);
    });

    setTasks(sortedTasks);
  }

  const orderDesFinish = (e) => {
    e.preventDefault();
    const copiedArr = [...tasks];
    const sortedTasks = copiedArr.sort((a, b) => {
      if (!b.finishDate) {
        return -1;
      }
      if (!a.finishDate) {
        return 0;
      }
      return new Date(b.finishDate) - new Date(a.finishDate);
    });

    setTasks(sortedTasks);
  }

  const orderAscFinish = (e) => {
    e.preventDefault();
    const copiedArr = [...tasks];
    const sortedTasks = copiedArr.sort((a, b) => {
      if (!b.finishDate) {
        return -1;
      }
      if (!a.finishDate) {
        return 0;
      }
      return new Date(a.finishDate) - new Date(b.finishDate);
    });

    setTasks(sortedTasks);
  }

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(KEY));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  return (
    <div className="App">
      <Form addTask={addTask} />
      <div className='div-orders'>
        <div className='div-order-filter-date'>
          <p>Order by creation date:</p>
          <button onClick={orderDes}>Desc</button>
          <button style={{ marginLeft: "10px" }} onClick={orderAsc}>Asc</button>
        </div>
        <div className='div-order-filter-date'>
          <p>Order by finish date:</p>
          <button onClick={orderDesFinish}>Desc</button>
          <button style={{ marginLeft: "10px" }} onClick={orderAscFinish}>Asc</button>
        </div>
      </div>
      <ToDoList tasks={tasks} deleteTask={deleteTask} completeTask={completeTask} />
    </div>
  );
}

export default App;
