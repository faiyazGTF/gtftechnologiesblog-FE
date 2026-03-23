import React from 'react'

const Pera = ({ children, className = '',animation='' }) => {
  return (
    <p data-aos={animation} className={`text-[13px] 2xl:text-[13px] text-center md:text-left tracking-[1px] font-montserrat text-[#000] leading-[22px]  ${className}`}>
      {children}
    </p>
  )
}

export default Pera
