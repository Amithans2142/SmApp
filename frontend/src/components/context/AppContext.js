import { createContext, useState } from "react";

export const AppContext = createContext();
const url = "http://localhost:5000";

export default function AppContextProvider({children}){
    const [loading ,setLoading] = useState(false);
    const [posts , setPosts] = useState([]);
    const [post, setPost] = useState([]);
    //fetch all posts
    async function fetchPosts (){
        setLoading(true);
        try{
            const token = localStorage.getItem("token");
            const response = await fetch(`${url}/posts`,{
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log(data);
            setPosts(data.posts);

        }catch(error){
            console.log(error)
            console.log("error in fetching data")

        }
        setLoading(false);
    }
    //add post
    const addPost = async (caption,imageFile)=> {
        setLoading(true)
        try{
            const token = localStorage.getItem('token');
            const response = await fetch(`${url}/create`,{
                method:'POST',
                headers:{
                    Authorization:`Bearer ${token}`,
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({caption,imageFile})
            })
            const data = await response.json();
            setPost(data);

        }catch(error){
            console.log(error)

        }
    }

    const value = {
        loading,
        setLoading,
        posts,
        setPosts,
        fetchPosts,
        addPost,
        setPost,
        post
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}
