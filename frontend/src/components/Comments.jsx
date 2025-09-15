import React,{useState} from 'react'
import axios from "axios";
const Comments = ({post}) => {
  // const username = JSON.parse(localStorage.getItem('user'))?.user?.username;
  const token = localStorage.getItem("token")
  const [comment,setComment] = useState("");
  const [showAll,setShowAll] = useState(false)
  const [allComments,setAllComments] = useState(post.comments || []);
  const visibleComments = showAll ? allComments : allComments.slice(-2); 
  console.log(visibleComments)
  const handleAddComment =async ()=>{
    if(!comment.trim()) return;
    try{
      const res =  await axios.post(`https://blog-website-ktc5.onrender.com/posts/${post._id}/comment`,
        {text:comment},
         {headers: { Authorization: `Bearer ${token}` }
});
      setAllComments(res.data.post.comments); // UI update
      setComment("") //clear input
    }catch(err){
      console.log(err)
    } 
  }
  return (
    <div className='comments'>
      <h3>comments</h3>
            {visibleComments.length === 0 ? (<h5>no comments yet</h5>):
          
        visibleComments.map((c,i)=>(
          
          <div key={i}>
             <strong>{c.username}:</strong>{c.text}
             
          </div>
        ))}
        {
          allComments.length > 2 && (
        <button
          onClick={() => setShowAll(!showAll)}
          style={{
            background: "none",
            border: "none",
            color: "blue",
            cursor: "pointer",
            marginTop: "5px"
          }}
        >
          {showAll ? "Hide comments" : "View more"}
        </button>
      )}
        
        <input type="text" 
        value={comment}
        placeholder='add a comment...'
        onChange={(e)=>setComment(e.target.value)} />
        <button onClick={handleAddComment}>post comment</button>
    </div>
  )
}

export default Comments