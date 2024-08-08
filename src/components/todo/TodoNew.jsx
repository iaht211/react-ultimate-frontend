import { useState } from "react"

const TodoNew = (props) => {
  const [name, setName] = useState("");
  const handleChange = (event) => {
    setName(event.target.value)
  }
  const handleClick = (name) => {
    const newTodo = props.addNewTodo(name);
    setName("");
  }
    return(
        <div className="todo-new">
        <input type="text" onChange={(event) => {handleChange(event)}}
        value={name}/>
        <button onClick={() => {handleClick(name)}}>Add</button>
      </div>
    )
}
export default TodoNew;