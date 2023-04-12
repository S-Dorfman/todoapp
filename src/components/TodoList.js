import ToDo from "./ToDo"

function TodoList(props) {
//destructure 
const { todos, addTodo, completeTodo, editTodoText, deleteTodo } = props;
console.log(todos);
    return(
        <>

        <h1>Create Todo </h1>
        <input placeholder="Enter To Do" type="text" onKeyDown={ (e) => e.key === "Enter" && addTodo(e)} />


        {todos.length ? (
                <>
                <h1>Todo Items</h1>
                <ul className="todolist">
                    {todos
                    .filter(i => !i.completed)
                    .map(todo => {
                            return <ToDo key={todo.id}  
                            todo={todo} 
                            completeTodo={completeTodo} 
                            editTodoText={editTodoText}
                            deleteTodo={deleteTodo}
                            />;
                        })}
                </ul>

                <h1>Completed Items</h1>
                <ul className="todolist">
            {todos
              .filter((i) => i.completed)
              .map((todo) => {
                return <ToDo key={todo.id}  
                todo={todo}
                completeTodo={completeTodo} 
                editTodoText={editTodoText}
                deleteTodo={deleteTodo}
                />;
              })}
                </ul>
                </>
            ):(
            <h1>No Todos added yet.</h1>
            )}
        </>
    )
}

export default TodoList;