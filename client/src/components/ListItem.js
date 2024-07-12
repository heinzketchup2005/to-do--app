import ProgressBar from "./ProgressBar"
import TickIcon from "./TickIcon"
import {useState} from "react"
import Modal from "./Modal"

const ListItem = ({task, getData}) => {
  const [showModal, setShowModal] = useState(false)

  const deleteItem =async () => {
    try{
      const response = await fetch(`http://localhost:8000/todos/${task.id}`, {
        method: "DELETE"
      })
      if(response.status===200){
        console.log('WORKED')
        getData()
      }
    }catch(err){
      console.error(err)
    }

    
  }

  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon />
        <p className="task-title">{task.title}</p>
        <ProgressBar progress={task.progress}/>
      </div>

      <div className="button-container">
        <button className="edit" onClick={() => setShowModal(true)}>EDIT</button>
        <button className="delete" onClick={deleteItem} >DELETE</button>
      </div>

      {/* Render Modal conditionally based on showModal state */}
      {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} task={task} />}
    </li>
  );

}
export default ListItem;
