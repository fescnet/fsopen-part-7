import React from 'react'

const User = ({user}) => {

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      {user.blogs.length > 0?
          <ul>
            {user.blogs.map(b =>
              <li key={b.id}>{b.title}</li>
            )}
          </ul>
        :
          <div>no blogs added</div>
      }
    </div>
  )
}

export default User
