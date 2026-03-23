import React from 'react'

const Pera = ({ children, className = '',animation='' }) => {
  return (
    <p data-aos={animation} className={`pera-primary ${className}`}>
      {children}
    </p>
  )
}

export default Pera
