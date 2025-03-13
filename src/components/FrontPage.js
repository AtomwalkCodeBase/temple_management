import React from 'react'
import Herosection from './Herosection'
import ServicesSection from './ServicesSection'
import AboutSection from './AboutSection'
import ContactPage from './ContactPage'
import TestimonialAndCustomersPage from './TestimonialAndCustomersPage'

const FrontPage = () => {
  return (
    <div>
      <Herosection></Herosection>
      <AboutSection></AboutSection>
      <ServicesSection></ServicesSection>
      <TestimonialAndCustomersPage></TestimonialAndCustomersPage>
      <ContactPage></ContactPage>
    </div>
  )
}

export default FrontPage
