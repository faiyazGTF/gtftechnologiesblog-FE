import React from 'react'
import Section from './utilities/Section'
import Container from './utilities/Container'
import Heading from './utilities/Heading'
import Pera from './utilities/Pera'
import Button from './utilities/Button'

const ContactSection = ({className,onOpen}) => {
  return (
    <Section id='letsTalk' className={`overflow-hidden bg-[var(--background-secondary)] mt-[40px] md:mt-[80px] ${className}`}>
        <Container>
            <Heading animation='fade-right' className='uppercase !text-center'>Looking to elevate the aesthetic of your space?</Heading>
            <Pera animation='fade-left' className='!text-center mt-[10px] md:!text-[16px]'>Have a question for us? Let’s talk.</Pera>
            <Button animation='fade-up' button={true} onOpen={onOpen}  className='bg-white uppercase block w-fit !mx-auto mt-[30px] text-[var(--text-primary)] !text-[14px]'>contact us</Button>
        </Container>
    </Section>
  )
}

export default ContactSection
