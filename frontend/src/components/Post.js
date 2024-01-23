import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AppContext } from './context/AppContext';

function Post() {
    const { loading, setLoading, addPost } = useContext(AppContext);
    const [upload, setUpload] = useState({ caption: "", imageFile: null });

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            console.log("Upload State:", upload);  
            await addPost(upload);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    

    const onChange = (e) => {
        if (e.target.name === 'imageFile') {
            const selectedFile = e.target.files[0];
            setUpload((prevUpload) => ({
                ...prevUpload,
                imageFile: selectedFile,
            }));
        } else {
            setUpload((prevUpload) => ({
                ...prevUpload,
                [e.target.name]: e.target.value,
            }));
        }
    };
    
    useEffect(() => {
       
    }, []);

    return (
        <div className='container'>
            <h1>Upload Post</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Caption</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="write something"
                        id='caption'
                        name='caption'
                        onChange={onChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Upload Picture</Form.Label>
                    <Form.Control
                        type="file"
                        id='imageFile'
                        name='imageFile'
                        onChange={onChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Post
                </Button>
            </Form>
        </div>
    );
}

export default Post;
