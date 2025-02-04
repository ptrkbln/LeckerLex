import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import HintergrundVideo from "../../assets/videos/FallingTomatos.mp4";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  exit: {
    opacity: 0,
    y: -50,
    scale: 0.8,
    transition: { duration: 1, ease: "easeInOut" },
  },
};

const AnimatedLetters = ({ text, className }) => {
  const controls = useAnimation();

  useEffect(() => {
    // Wait 2 seconds before starting the visible animation.
    const timer = setTimeout(() => {
      controls.start("visible").then(() => {});
    }, 4000);

    return () => clearTimeout(timer);
  }, [controls]);

  const letters = text.split("");
  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={letterVariants}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function LandingPage() {
  const [videoLoaded, setVideoLoaded] = useState(true);
  const videoRef = useRef(null);
  const { inView } = useInView({
    triggerOnce: true,
    rootMargin: "0px",
  });

  useEffect(() => {
    if (inView && !videoLoaded) {
      setVideoLoaded(true);
    }
  }, [inView, videoLoaded]);

  useEffect(() => {
    if (videoLoaded && videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, [videoLoaded]);

  return (
    <motion.div
      className="relative w-full h-screen overflow-hidden font-sans flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {videoLoaded && (
        <motion.video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={HintergrundVideo}
          autoPlay
          loop
          muted
          playsInline
          aria-label="Background video of falling tomatos into water"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      )}

      {/* Responsive Heading */}
      <motion.div
        className="absolute top-20 md:top-40 lg:right-3/4 transform -translate-x-1/2 z-20 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <h1 className="text-orange-200 text-5xl font-bold">
          <span className="font-charmonman md:text-6xl font-bold text-green-400">
            Lecker
          </span>
          <span className="font-semibold text-4xl">Lex</span>
        </h1>
      </motion.div>

      {/* Responsive Animated Text Container */}
      <motion.div
        className="z-10 w-11/12 md:w-1/2 bg-black bg-opacity-0 p-4 rounded text-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.p className="text-orange-200 text-2xl md:text-4xl font-medium text-center mb-8">
          <AnimatedLetters text="Discover culinary delights" />
        </motion.p>
        <motion.p className="text-orange-200 text-2xl md:text-4xl font-medium text-center">
          <AnimatedLetters text="with ingredients you already have." />
        </motion.p>
      </motion.div>

      {/* Get Inspired Button */}
      <motion.div
        className="absolute bottom-16 w-full text-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <Link to="/home">
          <button
            className="button px-6 py-3 text-md md:text-lg bg-green-700 text-orange-50 rounded-full hover:bg-green-800 hover:scale-105"
            aria-label="Get inspired button"
          >
            Get Inspired
          </button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
