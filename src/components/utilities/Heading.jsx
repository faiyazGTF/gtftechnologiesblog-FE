import React from 'react'

const Heading = ({ children, className = '',animation="" }) => {
  return (
    <h1 data-aos={animation} className={`heading-primary ${className}`}>
      {children}
    </h1>
  )
}

export default Heading
