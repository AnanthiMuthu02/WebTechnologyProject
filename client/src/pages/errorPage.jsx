import React from 'react'
import { Link } from 'react-router-dom'

const errorPage = () => {
  return (
   <section>
      <div className='error-main'>
        <Link to="/" className='btn'>Go Back Home</Link>
        <h2>Page not Found</h2>

      </div>
   </section>
  )
}

export default errorPage