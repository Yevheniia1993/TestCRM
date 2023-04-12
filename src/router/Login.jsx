
import {useNavigate, Link} from "react-router-dom";
import {useState} from "react";
import { Form, Button } from 'bootstrap-4-react';
import {signInUser} from "../firebase";
import {startSession} from "../session";
import { signInWithGoogle } from "../firebase";
import {
    getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    signInWithPopup,FacebookAuthProvider
  } from "firebase/auth";
// import {  verifyCode,OnPhoneSubmit } from "../firebase";
export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[phone, setPhone]=useState("")
  const[verifyButton, setVerBut]=useState(false)
  const[verifyOtp, setVerOtp]=useState(false)
  const[Otp, setOtp]=useState("")
  const auth = getAuth();
  
  const signWithFacebook=()=>{
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
        console.log(result.user.email)
        // The signed-in user info.
        const user = result.user.email;
        sessionStorage.setItem("email", user);
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        // IdP data available using getAdditionalUserInfo(result)
    // ...
        if(user.length!==0){
            navigate("/User");
        }
      })
      .catch((error) => {

        // Handle Errors here.
        console.log(error.message)
        const credential = FacebookAuthProvider.credentialFromError(error);
        // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
      });
  }

  const onSubmit = async (event) => {
        event.preventDefault();
        if (!email || !password ) {
          setError("Please enter your username and password.");
          return;
        }
        setError("");
        console.log("Logging in...");
        try {
            let loginResponse = await signInUser(email, password);
            startSession(loginResponse.user);
            navigate("/User");
            
          } catch (error) {
            console.error(error.message);
            setError(error.message);
          }    
          
        
  } 
  const onCaptchaVerify = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          OnPhoneSubmit();
          
        },
      },
      auth
    );
  };
  
  const OnPhoneSubmit = (event) => {
    event.preventDefault()
    
    onCaptchaVerify();
    const phoneNumber = "+38" + phone;
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        alert("otp sended");
        setVerOtp(true);
      })
      .catch((error) => {
      });
  };
  const verifyCode = (Otp) => {
    window.confirmationResult
      .confirm(Otp)
      .then((result) => {
        const userPhone = result.user;
        
        alert("Verifycation Done");
        navigate("/User")
        sessionStorage.setItem("phone", userPhone);
      })
      .catch((error) => {
        alert("Invalid OTP");
      });
  };
  const ChangeMobile=(e)=>{
    setPhone(e.target.value)
    if (phone.length===9){
        setVerBut(true)
    }
  }
  

  const handleNav = () => navigate("/User")

  return (
    <>
        <h1 className="class-h1">Вхід в систему через</h1>
        <div className="div-button">
        <img onClick={()=>signInWithGoogle(handleNav)} className="login-with-btn" src="image/Google1.png" alt=""/>
        <img onClick={signWithFacebook} className="login-with-btn" src="image/FB.png" alt=""/>
        </div>
       <p>або</p>
       <Form className="form-boot">
       <Form.Group>
      <div id="recaptcha-container"></div>
      <label>Ваш номер телефону</label>
        <Form.Input  onChange={(e) =>ChangeMobile(e) } placeholder="0*********"/>
        {verifyButton? <Button className="button-phone" type="button" onClick={OnPhoneSubmit} value="Verify">Відправити SMS з кодом</Button>:null}
        
      {verifyOtp? (<div>
       <Form.Input  onChange={(e) => setOtp(e.target.value)} placeholder="Введіть SMS код"/>
        <Button type="button" className="button-phone" value="OTP" onClick={()=>verifyCode(Otp)}>Відправити</Button>
      </div>) : null}
      </Form.Group>
      </Form>
      <p>або</p>
        <Form className="form-boot" onSubmit={onSubmit}>
        <Form.Group>
        <label htmlFor="exampleInputEmail1">Email address</label>
        <Form.Input 
            onChange={(e) => setEmail(e.target.value)} type="email" id="exampleInputEmail1" placeholder="Enter email" />
        </Form.Group>
        <Form.Group>
        <label htmlFor="exampleInputPassword1">Password</label>
        <Form.Input  onChange={(e) => setPassword(e.target.value)} type="password" id="exampleInputPassword1" placeholder="Password" />
        </Form.Group>
        <Button primary type="submit">Submit</Button>
        <div>
          Don't have an account yet? <Link to="/Register">Register</Link>
        </div>
        </Form>
    </>
  )
}