import React, {useState, useEffect} from 'react';
import {Box, Avatar} from '@mui/material';
import Profile from '../images/user-icon.png';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { publicRequest, userRequest } from '../requestMethods';
import {useSelector} from 'react-redux';
import '../spinner.css';




function Comments({videoId}) {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [activeComment, setActiveComment] = useState([]);
  const [replyResponse, setReplyResponse] = useState({});
  const [refresh, setRefresh] = useState({});
  const user = useSelector((state) => state.user.currentUser)
  

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      const res = await publicRequest.get(`/comments/${videoId}`); 
      setComments(res.data);
      setLoading(false);
    }

    fetchComments()
  }, [videoId, refresh]);


  // Add Root Comment
  const addRootComment =  async(input) => {
  // console.log('Root Comment fun =>' , input)
  const res = await userRequest.post(`/comments/add/${videoId}`, {desc:input})
  setComments([...comments, res.data])
  setRefresh(res.data)
  }

  // Add Reply
    const addReply =  async(text, replyId) => {
    // console.log('Calling add reply')
    const res = await userRequest.post(`/comments/reply/${replyId}`, {desc:text})
    setReplyResponse(res.data)
  }

  // Add Comment
  const addComment = async(input, replyId) => {
    // Input coming from comment form and replyId comming from reply comment

    if (replyId && input) {
      setActiveComment(null)
      addReply(input, replyId)

    } else if (input) {
        setActiveComment(null)
        addRootComment(input)   
    }
  }

  // Update Comment
  const updateComment = async (text, commentId) => {
    // console.log('Update function =>', text, commentId)
    setActiveComment(null)
    const res = await userRequest.put(`/comments/${commentId}`, {desc:text})
    setRefresh([res.data])
    setActiveComment(null)
}


  // Delete Comment
  const handleDelete = async (commentId) => {
    // console.log('Deleting =>', commentId)
    await userRequest.delete(`/comments/${commentId}`);
    setComments((comments) => comments.filter((comment) => comment._id !== commentId))
     setReplyResponse('deleted')
     setRefresh('deleted')
  }


  return (
    <div>
      
      <Box sx={{ display:'flex', p:1 }}>
        <Box sx={{ width:'10%', mr:{md:0, sm:0, xs:3}}}>
          <Avatar  sx={{ width: 40, height: 40 }} src={user.length !== 0 ? `${user.user.img}` : Profile} />
        </Box>
        <Box sx={{ mr:2, width:'90%' }}>
          <CommentForm submitLabel='Comment' handleSubmit={addComment}/>
        </Box>
      </Box>

      {loading ? <div className="loader">Loading...</div> : <Box>
        {comments.map((comment) => (
          <Comment 
            comment={comment} 
            commentId={comment._id} 
            key={comment._id} 
            handleDelete={handleDelete} 
            replyResponse={replyResponse} 
            activeComment={activeComment} 
            setActiveComment={setActiveComment}
            addComment={addComment}
            updateComment={updateComment} 
          />
        ))}
      </Box>}
    </div>
  )
}

export default Comments
