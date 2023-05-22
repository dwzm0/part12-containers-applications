import React from 'react'
import SingleTodo from './SingleTodo'


const TodoList = ({todos, deleteTodo, completeTodo}) => {
  

  return (
    <>
      {todos.map(todo => (
        <SingleTodo key={todo._id} todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo}/>
      )) 
        .reduce((acc, cur) => [...acc, <hr />, cur], [])}
    </>
  )
}

export default TodoList
