import './Todos.scss';

const Todos = ({ todos, toggleTodo }) => {

    return (
        <div className="group">
                {
                    todos.map(
                        todo => (
                        <div key={todo.id}>
                            <label>
                                <input 
                                    type="checkbox" 
                                    onChange={() => toggleTodo(todo.id)} 
                                    checked={todo.completed}
                                />
                                {todo.name}
                            </label>
                        </div>
                        ))
                }
        </div>
    );
};

export default Todos;