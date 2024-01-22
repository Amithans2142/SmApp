import { createContext, useState } from "react";

export const AppContext = createContext();
const url = "http://localhost:5000";

export default function AppContextProvider({children}){
    const [loading ,setLoading] = useState(false);
    const [posts , setPosts] = useState([]);

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

    const value = {
        loading,
        setLoading,
        posts,
        setPosts,
        fetchPosts
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}
