import React from 'react'

const Container = ({ children, className = '' }) => {
  return (
    <div className={`container-wrapper ${className}`}>
      {children}
    </div>
  )
}

export default Container
