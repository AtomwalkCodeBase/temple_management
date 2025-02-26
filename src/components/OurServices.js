import  React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const ServicesContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
`

const ServiceCard = styled(motion.div)`
  background-color:rgb(72, 238, 127);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const ServiceTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`

const ServiceDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
`

const OurServices = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  const services = [
    {
      title: "Web Development",
      description: "We create responsive, user-friendly websites tailored to your specific needs and goals.",
    },
    {
      title: "Mobile App Development",
      description: "Our team builds innovative mobile applications for iOS and Android platforms.",
    },
    {
      title: "UI/UX Design",
      description: "We design intuitive and visually appealing interfaces to enhance user experience and engagement.",
    },
    {
      title: "Digital Marketing",
      description: "Our marketing experts help you reach your target audience and grow your online presence.",
    },
  ]

  return (
    <ServicesContainer
      ref={ref}
      as={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <Title variants={cardVariants}>Our Services</Title>
      {services.map((service, index) => (
        <ServiceCard key={index} variants={cardVariants}>
          <ServiceTitle>{service.title}</ServiceTitle>
          <ServiceDescription>{service.description}</ServiceDescription>
        </ServiceCard>
      ))}
    </ServicesContainer>
  )
}

export default OurServices

