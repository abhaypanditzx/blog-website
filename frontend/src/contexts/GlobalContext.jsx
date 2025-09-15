import {  createContext,useState,useContext } from "react";
const  API = "https://blog-website-ktc5.onrender.com";
// const API = "http://localhost:5000";

//create context
const Context = createContext()
//proide context
export const ContextProvider =  ({children}) => {
    const [posts, setPosts] =  useState([]);
    const [post , setPost] = useState('');
    const [toggleComment,setToggleComment] = useState(false)
    const [userName, setUserName] = useState(null);
    return(
        <Context.Provider value={{ posts,setPosts,post,setPost,toggleComment,setToggleComment , API , userName,setUserName
            
            }}>
           {children}
        </Context.Provider>
    );
};

//custom hook
export  const useCustomHook =  ()=> useContext(Context)