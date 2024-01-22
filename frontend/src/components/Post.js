import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AppContext } from './context/AppContext';

function Post() {
    const {loading,setLoading,post,setPost,addPost} = useContext(AppContext);
    const [upload , setUpload] = useState({caption:"",imageFile:""})

    const handleSubmit = async (e)=> {
        try{
            e.preventDefault();
            setLoading(true);
            await addPost(upload);
            

        }catch(error){
            console.log(error)

        }
        setLoading(false)
    }

    const onClick = async (e)=>{
        setUpload({...upload , [e.target.name]:e.target.value})
    }

    useEffect(()=>{
        
        addPost();

    },[])

  return (
    <div className='container'>
        <h1>Upload Post</h1>

    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Caption</Form.Label>
        <Form.Control type="text" placeholder="write something" id='caption' name='caption' onClick={onClick} />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Upload Picture</Form.Label>
        <Form.Control type="file" id='imageFile' name='imageFile' onClick={onClick} />
       
      </Form.Group>

     
      
      <Button variant="primary" type="submit">
        Post
      </Button>
    </Form>
    </div>
  );
}

export default Post;
