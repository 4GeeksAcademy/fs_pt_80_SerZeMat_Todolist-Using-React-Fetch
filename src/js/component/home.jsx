import React, { useState, useEffect } from "react";

const TodoList = () => {

  const url = 'https://playground.4geeks.com/todo'

  const [task, setTask] = useState('');
  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState('SergioC');

  useEffect(() => {
    createUser();
    getUserData();
  }, []);

  //We create function to get data User 
  const getUserData = async () => {
    try {
      const resp = await fetch(`${url}/users/${userName}`);
      if (!resp.ok) throw new Error('error')
      const data = await resp.json();
      setUserData(data);
    } catch {
      console.error(error)
    }
  };

  //We create function to get create User  
  const createUser = async () => {
    try {
      const resp = await fetch(`${url}/todos/${userName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({
        //   label: userName,
        //   is_done: false
        // })
      });
      if (!resp.ok) throw new Error('error')
      const data = await resp.json();
      setUserData({ ...userData, ['users']: [...userData.users, data] });
    } catch (error) {
      console.error(error)
    }
  };

  //We create function to create a new Task   
  const createTask = async () => {
    try {
      const resp = await fetch(`${url}/todos/${userName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          label: task,
          is_done: false
        })
      });
      if (!resp.ok) throw new Error('error')
      const data = await resp.json();
      setUserData({ ...userData, ['todos']: [...userData.todos, data] });
      setTask('');
    } catch (error) {
      console.error(error)
    }
  };

  //We create function to delete any Task 
  const handleDelete = async (id) => {
    try {
      const resp = await fetch(`${url}/todos/${id}`, {
        method: "DELETE",
      });
      if (!resp.ok) throw new Error("Error deleting task");
      const updatedTodos = userData.todos.filter((todo) => todo.id !== id);
      setUserData({ ...userData, todos: updatedTodos });
    } catch (error) {
      console.error(error);
    }
  };

  //We prenvet the form to reload the page when data is submitted
  const handleSubmit = e => {
    e.preventDefault();
    createTask(task);
  };


  return (
    <div className="container">
      <h4 className="title">Todo List</h4>
      <div className="bottoms">
        <button className="btn_create mb-2" onClick={createUser}>
          Create User
        </button>
        <button className="btn_create mb-2" onClick={createTask}>
          Create Task
        </button>
      </div>
      <form>
        <input
          type="text"
          className="set_user mb-2"
          placeholder="Type Username"
          value={userName} onChange={e => setUserName(e.target.value)}
        />
      </form>
      <form className="form_style" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input_style"
          placeholder="Type Task To Do"
          value={task} onChange={e => setTask(e.target.value)} required
        />
      </form>
      <ul className="list">
        {userData.todos?.map(el => (
          <li className="task" key={el.id}>
            {el.label}
            <span className="btn_delete" onClick={() => handleDelete(el.id)}> ❌ </span>
          </li>
        ))}
        <p>{userData.todos?.length || 0} Left to do</p>
      </ul>
    </div>
  );
};

export default TodoList;



