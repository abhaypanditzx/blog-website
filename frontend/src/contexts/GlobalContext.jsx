import {  createContext,useState,useContext } from "react";
//create context
const Context = createContext()
//proide context
export const ContextProvider =  ({children}) => {
    const [posts, setPosts] =  useState([]);
     const [post , setPost] = useState('');
         const [toggleComment,setToggleComment] = useState(false)

    return(
        <Context.Provider value={{posts,setPosts,post,setPost,toggleComment,setToggleComment}}>
           {children}
        </Context.Provider>
    );
};

//custom hook
export  const useCustomHook =  ()=> useContext(Context)