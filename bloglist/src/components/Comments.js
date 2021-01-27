import React from 'react'

const Comments = ({comments}) => {

  const emptyMessage = <div>no comments yet</div>

  if(!comments){
    return emptyMessage
  }

  if(!comments.length > 0){
    return emptyMessage
  }

  return (
    <ul>
      { comments.map(c => <li key={c.id}>{c.content}</li>) }
    </ul>
  )
}

export default Comments
