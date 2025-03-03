import { useState } from "react";
import {useCookies} from 'react-cookie';

const Modal = ({mode, setShowModal, task, getData}) => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const editMode = mode === 'edit' ? true : false

  const [data, setData] = useState({
    user_email: editMode? task.user_email: cookies.Email,
    title: editMode? task.title: null,
    progress: editMode? task.progress: null,
    date: editMode ? task.date : new Date()
  })

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.SERVER_URL}/todos`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if(response.status===200){
        console.log('WORKED')
        setShowModal(false)
        getData()
      }
    } catch (err) {
      console.error(err);
    }
  };

  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.SERVER_URL}/todos/${task.id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if(response.status===200){
        console.log('WORKED')
        setShowModal(false)
        getData()
      }
    } catch (err) {
      console.error(err);
    }
  };
  

  const handleChange = (e) => {
    const { name, value} = e.target

    setData(data => ({
      ...data,
      [name] : value
    }))
    console.log(data)
  }
  
  
    return (
      <div className="overlay">
        <div className="modal">
          <div className="form-title-container">
            <h3>Lets { mode } your task!</h3>
            <button onClick={()=>setShowModal(false)}>X</button>
          </div>
          <form method="POST" action='http://localhost:8000/todos' >
            <input 
              required
              maxlength = {30}
              placeholder = "your task goes here"
              name = "title"
              value = {data.title}
              onChange = {handleChange}
            />
            <br />
            <label for="range">Drag to select your current progress</label>
            <input 
              required
              type="range"
              min="0"
              max="100"
              name="progress"
              value={data.progress}
              onChange={ handleChange }
            />
            <input className={ mode } type="submit" onClick={ editMode ? editData: postData}/>
          </form>
        </div>
        
      </div>
    );
  }
  
  export default Modal;
  