import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
`

const Content = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`

const AboutUs = () => {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <AboutContainer
      ref={ref}
      as={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <Title variants={itemVariants}>About Us</Title>
      <Content variants={itemVariants}>
        We are a passionate team dedicated to delivering exceptional products and services to our clients. With years of
        experience and a commitment to innovation, we strive to exceed expectations and make a positive impact in
        everything we do.
      </Content>
      <Content variants={itemVariants}>
        Our mission is to empower businesses and individuals with cutting-edge solutions that drive growth and success.
        We believe in fostering long-lasting relationships with our clients, built on trust, transparency, and mutual
        respect.
      </Content>
      <Content variants={itemVariants}>
        At our core, we value creativity, collaboration, and continuous improvement. We're always pushing the boundaries
        of what's possible, embracing new technologies and methodologies to stay ahead of the curve and deliver the best
        results for our clients.
      </Content>
    </AboutContainer>
  )
}

export default AboutUs

