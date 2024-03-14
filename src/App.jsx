import { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';




function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [setshowFinished, setsetshowFinished] = useState(true)

  useEffect(()=>{
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
   
  }, [])

  const toggleFinished = (e)=>{
      setsetshowFinished (!setshowFinished)
  }

  const saveRols = (params)=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveRols()
  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveRols()
  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, iscompleted: false }])
    setTodo("")
    saveRols()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].iscompleted = !newTodos[index].iscompleted;
    setTodos(newTodos)
    saveRols()
  }

  return (
    <>
      <Navbar />

      <div className="md:conatiner mx-3  md:mx-auto my-5 rounded-xl w-1/2 bg-gray-300 p-5 min-h-[80vh]">
        <h1 className='font-bold text-center text-3xl py-4'>TickWork. : Your everyday tasks planner</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add to your daily task</h2>
          <div className='flex'>
          <input onChange={handleChange} value={todo} type="text" className="w-3/4" />
          <button onClick={handleAdd} disabled={todo.length<=3} className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-6 hover:font-bold">Add</button>
          </div>  </div>
        <input type='checkbox' checked= {setshowFinished} onChange={toggleFinished}/> Show Finished
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h2 className="text-lg font-bold">Your Tasks</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No to dos to display </div>}
          {todos.map(item => {


            return (setshowFinished || !item.iscompleted) && <div key={item.id} className=" md:w-1/2 todo justify-between flex my-3">
              <div className='flex gap-5'>
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.iscompleted} />
              <div className={item.iscompleted ? "line-through" : ""}>{item.todo}</div> </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-6 hover:font-bold"><FaEdit/></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-6 hover:font-bold"><AiFillDelete/></button>

              </div>

            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
