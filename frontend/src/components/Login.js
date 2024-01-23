import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

let url = "http://localhost:5000";

function Login() {
    const [loading,setLoading]= useState();
    const [credentials, setCredentials] = useState({email:"",password:""})
    let navigate = useNavigate();
  const handleSubmit = async (e)=>{
    try{

        e.preventDefault();
        setLoading(true);
        const response = await fetch(`${url}/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email:credentials.email, password:credentials.password})
        })
        const data = await response.json();
        console.log(data);
        if(data.success){
            localStorage.setItem("token",data.token);
            navigate('/');
        }
    }catch(error){
        console.log(error)

    }
    setLoading(false)

  }
  const onChange = async (e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  useEffect(()=>{
    const token =localStorage.getItem("token");
    if(token){
        navigate('/');
    }
  },[navigate])
  return (
      <div className='container'>
        <h1>Login</h1>
         {loading? (<Spinner/>):(

    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"  id='email' name='email' onChange={onChange}/>
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" id='password' name='password' onChange={onChange}/>
      </Form.Group>
     
      <Button variant="primary" type="submit">
            Login
      </Button>
    </Form>
         )}
    </div>
  );
}

export default Login;