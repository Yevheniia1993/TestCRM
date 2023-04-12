import { Button} from 'bootstrap-4-react';
import {useNavigate, Link} from "react-router-dom";
import React, { useEffect, useState } from "react";
import {endSession} from "../session";

export default function User() {

  let navigate = useNavigate();
  const [classAdmin, setClassAd]=useState("dropdown-item_adminNone")
  useEffect(()=>{
    fetch(`https://passanger-test-default-rtdb.firebaseio.com/users.json`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      getUsers(data)
    });

  },[])
  const getUsers=(user)=>{
    const usersKey=Object.keys(user)
    return usersKey.map((item, index)=>{
        if(user[item].email===sessionStorage.getItem("email")){
            if(user[item].function==="Менеджер"){
            setClassAd("dropdown-item_admin")
            }else{
                setClassAd("dropdown-item_adminNone")
            }
        }
  
    })
    }
    
  const onLogout = () => {
    endSession();
    navigate("/Login");
  }
const Trips=()=>{
    navigate("/Trips");
}
const AdminData=()=>{
    navigate("/AdminData");
}
  return (
    <div>
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Menu button
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <Link className="dropdown-item" to="/Future">Редагування акаунту</Link>
                <Button className="dropdown-item" onClick={Trips}>Створення поїздки</Button>
                <Button className="dropdown-item" onClick={onLogout}>Вихід</Button>
                <Button className={classAdmin} onClick={AdminData}>Редагування користувачів</Button>
            </div>
        </div>
        <div className='user-form'>
        <img className='img-user' src="image/user.png" alt=""/>
        <div className='text-user'>{sessionStorage.getItem("email")}</div>
        
      <div className='button-user'>
      <Button primary onClick={onLogout}>
        Log out
      </Button>
       <Button primary onClick={Trips}>Створити поїздку</Button>
       </div>
       </div>
    </div>

  )
}
