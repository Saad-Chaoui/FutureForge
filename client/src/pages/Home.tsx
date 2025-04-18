import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import AiDemo from "@/components/AiDemo";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";
import { useState, useEffect } from "react";

export default function Home() {
  const [currentSection, setCurrentSection] = useState("hero");
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  // Track which section is visible
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "features", "ai-demo", "testimonials", "contact"];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <Hero />
        <Features />
        <AiDemo />
        <Testimonials />
        <Contact />
      </main>
      
      <Footer />
      
      {/* AI Assistant floating button */}
      <button 
        className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-[hsl(var(--neon-cyan))] text-black flex items-center justify-center shadow-lg hover:bg-[hsl(var(--neon-cyan)_/_0.8)] transition-all duration-300"
        onClick={() => setShowAIAssistant(!showAIAssistant)}
        aria-label="Toggle AI Assistant"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </button>
      
      {/* AI Assistant Widget */}
      {showAIAssistant && (
        <AIAssistant 
          section={currentSection} 
          onClose={() => setShowAIAssistant(false)} 
        />
      )}
    </div>
  );
}
