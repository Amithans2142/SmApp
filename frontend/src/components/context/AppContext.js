import { createContext, useState } from "react";

export const AppContext = createContext();
const url = "http://localhost:5000";

export default function AppContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState([]);
  //fetch all posts
  async function fetchPosts() {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${url}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
      console.log("error in fetching data");
    }
    setLoading(false);
  }
  //add post
  const addPost = async (upload) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("caption", upload.caption);
      formData.append("imageFile", upload.imageFile);  
      console.log("FormData:", formData);
  
      const response = await fetch(`${url}/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,  
      });
  
      const data = await response.json();
      console.log("Data:", data);
  
      setPost(data);
    } catch (error) {
      console.error("Error adding post:", error);
    } finally {
      setLoading(false);
    }
  };
  
  
  const value = {
    loading,
    setLoading,
    posts,
    setPosts,
    fetchPosts,
    addPost,
    setPost,
    post,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
