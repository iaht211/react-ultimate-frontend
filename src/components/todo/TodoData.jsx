const TodoData = (props) => {
  const {data} = props;

  const handleClick = (id) => {
    props.deleteData(id);
  }

    return (
        <div className="todo-data">
          {data.map((item, index)=> {
            return (<div className="todo-item" key={index}>
              <div>{item.name}</div>
              <button onClick={() => {handleClick(item.id)}}>delete</button>
            </div>)
          })}
          
        {JSON.stringify(props.data)}
      </div>
    )
}
export default TodoData;