import { Button} from 'bootstrap-4-react';
import { useEffect } from 'react';
import { useState } from 'react';
import {useNavigate, Link} from "react-router-dom";
import {endSession} from "../session";


export default function AdminData() {
  let navigate = useNavigate();
const[user, setUser]=useState([])
const[func, setFunc]=useState([])


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
      setUser(data);
    });
    
},[func])

const RoleUser=(itemKey, role)=>{
  
  fetch(`https://passanger-test-default-rtdb.firebaseio.com/users/${itemKey}.json`,
  {
      method: "PATCH",
      headers: {
          'Content-Type': 'application/json'
  },
      body: JSON.stringify({function:role})
  })
      .then((response) => {
      return response.json();
  })
      .then((data) => {
          setFunc(data)
          
  })
}
const onLogout = () => {
  endSession();
  navigate("/Login");
}
const getUsers=()=>{
const usersKey=Object.keys(user)
const roleP="Пасажир"
const roleD="Водій"
const roleM="Менеджер"
return usersKey.map((item, index)=>{
  return(
  <tr key={index}>
      <th scope="row">{index+1}</th>
      <td>{user[item].name}</td>
      <td>{user[item].email}</td>
      <td className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  {user[item].function}
  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <div className="dropdown-item"  onClick={()=>RoleUser(item, roleP)} > Пасажир</div>
    <div className="dropdown-item" onClick={()=>RoleUser(item, roleD)}>Водій</div>
    <div className="dropdown-item" onClick={()=>RoleUser(item, roleM)}>Менеджер</div>
  </div>
</td>
    </tr>)
})
}

  return (
    <div>
       <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Function</th>
    </tr>
  </thead>
  <tbody>
  {getUsers()}
  </tbody>
</table>
<Link to="/User" className="Button-back" ><Button >Назад</Button></Link>
<Button primary onClick={onLogout}>Logout</Button>
    </div>
  )
}