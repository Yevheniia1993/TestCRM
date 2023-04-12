import { Form, Button } from 'bootstrap-4-react';
import { Alert } from 'bootstrap-4-react';
import {useNavigate, Link} from "react-router-dom";
import {useState} from "react";
import {createUser} from "../firebase";
import {startSession} from "../session";


export default function Register() {

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName]=useState("")
  
  const onSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password || !repeatPassword) {
      setError("Please fill out all the fields.");
      return;
    }
    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    console.log("Registering...");
    try {
        let registerResponse = await createUser(email, password);
        startSession(registerResponse.user);
        navigate("/User");
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      }
      const user={email: email, name: name, function:"user"}
      fetch('https://passanger-test-default-rtdb.firebaseio.com/users.json',
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
        },
            body: JSON.stringify(user)
        })
            .then((response) => {
            return response.json();
        })
            .then((data) => {
                console.log(data);
                navigate("/User");
        })
  
  }

  return (
    <div>
      <div>
        Register
      </div>
      {error && <Alert>{error}</Alert>}
      
      <Form onSubmit={onSubmit}>
      <Form.Group>
        <label htmlFor="exampleInputName">Ваше ім'я</label>
        <Form.Input 
            onChange={(e) => setName(e.target.value)} type="text" id="exampleInputEmail1" placeholder="Введіть Ваше ім'я " />
        </Form.Group>
      <Form.Group>
        <label htmlFor="exampleInputEmail1">Email address</label>
        <Form.Input 
            onChange={(e) => setEmail(e.target.value)} type="email" id="exampleInputEmail1" placeholder="Введіть вашу пошту" />
        </Form.Group>
        <Form.Group>
        <label htmlFor="exampleInputPassword1">Password</label>
        <Form.Input  onChange={(e) => setPassword(e.target.value)} type="password" id="exampleInputPassword1" placeholder="Придумайте пароль" />
        </Form.Group>


        <Form.Group>
        <label htmlFor="Repeat password">Password</label>
        <Form.Input  onChange={(e) => setRepeatPassword(e.target.value)} type="password" id="exampleInputPassword1" placeholder="Повторіть Ваш пароль" />
        </Form.Group>
        <Button type="submit">Register</Button>
        <Form.Group>
          Already have an account? <Link to="/Login">Login</Link>
        </Form.Group>
    </Form>
    </div>
  )
}