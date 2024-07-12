import { useState } from "react";
import Modal from "./Modal"
import { useCookies } from 'react-cookie'

const LisHeader = ({listName, getData}) => {
  const [cookies, setCookies, removeCookie] = useCookies(null)
  const [showModal, setShowModal] = useState(false)
    const signOut = () => {
        console.log("signout");
        removeCookie('Email', { path: '/' });
        removeCookie('authToken', { path: '/' });
        window.location.reload() 
    }

    return (
      <div className="list-header">
        <h1>{listName}</h1>
        <div className="button-container">
            <button className="create" onClick={() => setShowModal(true)}>ADD NEW</button>
            <button className="signout" onClick={signOut} >SIGN OUT</button>
        </div>
        {showModal && <Modal mode={'Create'} setShowModal={setShowModal} getData={getData}/>}
      </div>
    );
  }
  
  export default LisHeader;
  