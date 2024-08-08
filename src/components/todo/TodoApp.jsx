import { useState } from "react"
import TodoData from "./TodoData"
import TodoNew from "./TodoNew"
import reactLogo from '../../assets/react.svg'
const TodoApp = () => {
    const [data, setData] = useState([
   
    ])
  
    const randomNumber = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const name = "";
    const age = 10;
    const addNewTodo = (name) => {
      const newTodo = {
        id: randomNumber(1, 100), 
        name: name
      }
      setData([...data, newTodo]);
    }
  
    const deleteData = (id) => {
      console.log("check id: ", {id})
      const newTodo = data.filter(item => item.id !== id)
      setData(newTodo);
    }
    return (
        <div className="todo-container">
      <div className="todo-title">To do list</div>
      <TodoNew
      data={data}
      setData={setData}
      addNewTodo={addNewTodo}
      />

      {data.length > 0 ? 
      <TodoData
      data={data}
      deleteData={deleteData}
      />
      :
      <div className="todo-image">
      <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
          }
    </div>
    )
}

export default TodoApp;