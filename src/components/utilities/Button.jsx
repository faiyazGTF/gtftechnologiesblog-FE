import Link from 'next/link'
import React from 'react'

const Button = ({children,className="",href='',button=false,onOpen,animation='' }) => {
  return (
    <>
    {button 
    ?
    <button data-aos={animation} onClick={onOpen} className={`text-[#000] leading-[10px] w-fit block  mx-auto md:mx-0 text-[10px] 2xl:text-[12px] tracking-[1px] 2xl:font-[600] h-fit rounded bg-[#FBF6E5] hover:bg-[var(--text-primary)] hover:text-white transition-colors duration-300 uppercase border border-[var(--text-primary)] py-[14px] 2xl:py-[15px] px-[30px] 2xl:px-[40px] ${className}`}>
      {children}
    </button>
    :
    <Link data-aos={animation} href={href} className={`text-[#000] leading-[10px] w-fit block  mx-auto md:mx-0 text-[10px] 2xl:text-[12px] tracking-[1px] 2xl:font-[600] h-fit rounded bg-[#FBF6E5] hover:bg-[var(--text-primary)] hover:text-white transition-colors duration-300 uppercase border border-[var(--text-primary)] py-[14px] 2xl:py-[15px] px-[30px] 2xl:px-[40px] ${className}`}>
      {children}
    </Link>
    }
    </>
  )
}

export default Button
