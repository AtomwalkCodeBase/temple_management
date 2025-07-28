"use client";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const TrailDot = styled(motion.div)`
  position: fixed;
  width: 8px;
  height: 8px;
  background: ${(props) => props.theme.colors.gradient.primary};
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  box-shadow: 0 0 10px rgba(255, 153, 51, 0.6);
`;

const CursorTrail = () => {
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setTrail((prevTrail) => [
        { x: e.clientX, y: e.clientY, id: Date.now() },
        ...prevTrail.slice(0, 15),
      ]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <AnimatePresence>
      {trail.map((dot, index) => (
        <TrailDot
          key={dot.id}
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 0, opacity: 0 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            left: dot.x - 4,
            top: dot.y - 4,
            opacity: 1 - index * 0.1,
          }}
        />
      ))}
    </AnimatePresence>
  );
};

export default CursorTrail;
