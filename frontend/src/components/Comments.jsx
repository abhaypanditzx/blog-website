import React,{useState} from 'react'
import axios from "axios";
const Comments = ({post}) => {
  console.log(post)
  const username = JSON.parse(localStorage.getItem('user')).user.username;
  const [comment,setComment] = useState("");
  const [allComments,setAllComments] = useState(post.comments || []);
  const handleAddComment =async ()=>{
    if(!comment.trim()) return;
    try{
      const res =  await axios.post(`https://blog-website-zkvz.onrender.com/posts/${post._id}/comment`,{username:username,text:comment,});
      setAllComments(res.data.post.comments); // UI update
      setComment("") //clear input
    }catch(err){
      console.log(err)
    } 
  }
  return (
    <div>
      <h3>comments</h3>
      {
        allComments.map((c,i)=>(
          <div key={i}>
             <strong>{c.username}:</strong>{c.text}
          </div>
        ))}
        <input type="text" 
        value={comment}
        placeholder='add a comment...'
        onChange={(e)=>setComment(e.target.value)} />
        <button onClick={handleAddComment}>post comment</button>
    </div>
  )
}

export default Comments