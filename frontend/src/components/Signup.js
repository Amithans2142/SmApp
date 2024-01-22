import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AppContext } from "./context/AppContext";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const url = "http://localhost:5000";

function SignUp() {
  let navigate = useNavigate();
  const { loading, setLoading } = useContext(AppContext);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    imageFile: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", credentials.name);
      formData.append("email", credentials.email);
      formData.append("contact", credentials.contact);
      formData.append("password", credentials.password);
      formData.append("imageFile", credentials.imageFile);
      console.log(formData);
      const response = await fetch(`${url}/register`, {
        method: "POST",

        body: formData,
      });
      const data = await response.json();
      console.log(data);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const onChange = (e) => {
    if (e.target.name === "imageFile") {
      setCredentials({ ...credentials, [e.target.name]: e.target.files[0] });
    } else {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="container">
      <h1>Signup</h1>
      {loading? (<Spinner/>):(
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Name"
            id="name"
            name="name"
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            id="email"
            name="email"
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Contact</Form.Label>
          <Form.Control
            type="text"
            placeholder="Contact Number"
            id="contact"
            name="contact"
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            type="file"
            id="imageFile"
            name="imageFile"
            onChange={onChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" id="signup" name="signup">
          Signup
        </Button>
      </Form>

      )}
      
    </div>
  );
}

export default SignUp;
