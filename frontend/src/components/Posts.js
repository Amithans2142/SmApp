import React, { useContext, useEffect } from 'react'
import { AppContext } from './context/AppContext'
import Spinner from './Spinner';
import Card from './Card';
const Posts = () => {
    const {loading,posts,fetchPosts} = useContext(AppContext);
    
    useEffect(()=>{
        fetchPosts();
    },[]);
    console.log("printing posts" ,posts);


  return (

    
    <div>
        <h1>Posts</h1>
        {
            loading ? (<Spinner/>) : (
                posts?.length === 0 ? (
                    <p>No Post Found</p>
                ) : (
                   
                    posts?.map((post)=>
                    (
                       <div key={post.id}>
                        
                        <p>
                            {post.caption}
                            
                        </p>
                        <div>
                        <img src={post.image} alt={`Post ${post._id}`} />
                            </div>
                        </div>


                    ))

                )
            )
        }
      
    </div>
  )
}

export default Posts
