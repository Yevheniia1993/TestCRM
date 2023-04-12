import {useNavigate, Link} from "react-router-dom";
import { Form, Button } from 'bootstrap-4-react';
import { useState } from "react";


export default function Trips() {
  let navigate = useNavigate();
  const [role, setYouRole]=useState("")
  const[namberCar, setNumberCar]=useState("")
  const[oneCity, setOneCity]=useState("")
  const[twoCity, setTwoCity]=useState("")
  const[number, setNumberPeople]=useState("")
  const[ModalClassDriver, setClassDr] =useState("NoneClass")
  const[ModalClassPassanger, setClassPas] =useState("NoneClass")
  
  const CheckRole=(event)=>{
    setYouRole(event.target.value)
    if(event.target.value==="Пасажир"){
        setClassPas("BlockClass")
        setClassDr("NoneClass")
       
      }if(event.target.value==="Водій"){
        setClassDr("BlockClass")
        setClassPas("NoneClass")
      }
      if(event.target.value==="Обрати"){
        setClassDr("NoneClass")
        setClassPas("NoneClass")
      }
  }
  
    
   const onSubmit = async (event) => {
      event.preventDefault();
      let trips={}
      let url=""
      if(role.length && namberCar.length && oneCity.length && twoCity.length && number.length){
        if(role==="Пасажир"){
          url='https://passanger-test-default-rtdb.firebaseio.com/tripspassanger.json'
          trips={role:role, numberPeople:number, departure: oneCity, arrival:twoCity}
      }
      if(role==="Водій"){
          url='https://passanger-test-default-rtdb.firebaseio.com/tripsdriver.json'
          trips={role:role, numberPeople:number, numberCar:namberCar, departure: oneCity, arrival:twoCity}
      }
      fetch(url,
      {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
      },
          body: JSON.stringify(trips)
      })
          .then((response) => {
          return response.json();
      })
          .then((data) => {
              console.log(data);
              navigate("/User");   
      })
      } else{
        alert("Введіть данні")
      }
      
   }

  return (
    <>
    <h1 className="classHead">Створення поїздки</h1>
    <Form className="form-boot" onSubmit={onSubmit}>
    <Form.Group>
    <Form.Select aria-label="Default select example" onChange={(e)=>CheckRole(e)}>
      <option value="Обрати">Оберіть свою роль</option>
      <option value="Пасажир"  >Пасажир</option>
      <option value="Водій">Водій</option>
    </Form.Select>
    </Form.Group>
    <Form.Group className={ModalClassDriver}>
    <Form.Input 
            onChange={(e) => setNumberCar(e.target.value)} type="text" className="input-form" placeholder="Введіть номер машини..." />
     <Form.Input 
            onChange={(e) => setNumberPeople(e.target.value)} type="text" className="input-form" placeholder="Кількість пасажирів..." />
    <Form.Input 
            onChange={(e) => setOneCity(e.target.value)} type="text" className="input-form" placeholder="Місто відправлення..." />
    <Form.Input 
            onChange={(e) => setTwoCity(e.target.value)} type="text" className="input-form" placeholder="Куди мандруєте..." />
    </Form.Group>
    <Form.Group className={ModalClassPassanger}>
    <Form.Input 
            onChange={(e) => setOneCity(e.target.value)} type="text" className="input-form" placeholder="Місто відправлення..." />
    <Form.Input 
            onChange={(e) => setTwoCity(e.target.value)} type="text" className="input-form" placeholder="Куди мандруєте..." />
    <Form.Input 
            onChange={(e) => setNumberPeople(e.target.value)} type="text" className="input-form" placeholder="Вкажіть кількість пасажирів" />
    </Form.Group>
    <Link to="/User" className="Button-back" ><Button >Назад</Button></Link>
    <Button primary type="submit">Submit</Button>
    </Form>
</>
  )
}
