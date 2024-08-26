import { useState ,useEffect} from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"
function App() {
//   let todos = [
   

// ]
 
const [todos,setTodos]=useState([ "Eat",
  "Sleep",
  "Code",])

  const [todoValue,setTodoValue]=useState('');

  function persistData(newList){
    localStorage.setItem('todos',JSON.stringify({todos:newList}))
  }
   
  function handleAddTodos(newTodo){
    const newTodoList = [...todos,newTodo];
    persistData(newTodoList);
    setTodos(newTodoList);

  }

  function handleDeleteTodo(index){
 const newTodoList = todos.filter((todo,todoIndex)=>{
    return todoIndex !== index;
 })
 setTodos(newTodoList);
  }

  function handleEditTodo(index){
    const valueToBeEdited = todos[index];
    setTodoValue(valueToBeEdited);
    handleDeleteTodo(index);
  }

  useEffect(()=>{
   // console.log('todos',todos);
   if(!localStorage){
      return;
   }

   let localTodos = localStorage.getItem('todos')
    if(!localTodos){
    //  setTodos(JSON.parse(localTodos));
    return;
  }

  localTodos=JSON.parse(localTodos).todos;;
  setTodos(localTodos);
  },[])


  return (
    <>
      <TodoInput handleAddTodos={handleAddTodos} todoValue={todoValue} setTodoValue={setTodoValue}/>
      <TodoList handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} todos={todos}/>

    </>
  )
}

export default App
