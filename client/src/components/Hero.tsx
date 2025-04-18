import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import HeroCanvas from "@/lib/three/HeroCanvas";
import { motion } from "framer-motion";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-24" 
      id="hero"
    >
      {/* 3D Canvas */}
      <div className="absolute top-0 left-0 w-full h-full">
        <HeroCanvas />
      </div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-display font-light mb-6 tracking-tight"
            variants={variants}
          >
            <span className="block">The Future of</span>
            <span className="text-[hsl(var(--neon-cyan))] glow-text">AI Experience</span>
            <span className="block">is Here</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
            variants={variants}
          >
            Discover the next generation of intelligent systems that adapt, learn, 
            and evolve with your needs. Powered by revolutionary technology.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
            variants={variants}
          >
            <Button 
              className="glow-button px-8 py-3 bg-[hsl(var(--neon-cyan)_/_0.1)] text-white rounded-md border border-[hsl(var(--neon-cyan))] hover:bg-[hsl(var(--neon-cyan)_/_0.2)] transition-all duration-300 flex items-center justify-center w-64"
            >
              <span>Get Started</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Button>
            
            <Button 
              variant="outline"
              className="px-8 py-3 bg-transparent text-white rounded-md border border-white/30 hover:border-white/60 transition-all duration-300 flex items-center justify-center w-64"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              <span>Watch Demo</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-0 right-0 flex justify-center z-10 animate-bounce"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <a 
          href="#features" 
          className="text-gray-400 hover:text-[hsl(var(--neon-cyan))] transition-colors duration-300"
          aria-label="Scroll to features"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
