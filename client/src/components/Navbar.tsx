import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[hsl(var(--dark-500)_/_0.9)] backdrop-blur-md shadow-lg" : "bg-opacity-0"
      }`}
    >
      <nav className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-display font-semibold text-white mr-2">
            <span className="text-[hsl(var(--neon-cyan))]">Future</span>Labs<span className="text-[hsl(var(--neon-magenta))]">AI</span>
          </Link>
        </div>
        
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="text-sm font-medium text-gray-300 hover:text-[hsl(var(--neon-cyan))] transition-colors duration-300">
            Features
          </a>
          <a href="#ai-demo" className="text-sm font-medium text-gray-300 hover:text-[hsl(var(--neon-magenta))] transition-colors duration-300">
            AI Demo
          </a>
          <a href="#testimonials" className="text-sm font-medium text-gray-300 hover:text-[hsl(var(--neon-violet))] transition-colors duration-300">
            Testimonials
          </a>
          <a href="#contact" className="text-sm font-medium text-gray-300 hover:text-[hsl(var(--neon-cyan))] transition-colors duration-300">
            Contact
          </a>
        </div>
        
        <div className="flex items-center">
          <Button className="glow-button px-5 py-2 rounded-md bg-[hsl(var(--dark-400))] text-[hsl(var(--neon-cyan))] border border-[hsl(var(--neon-cyan)_/_0.3)] hover:border-[hsl(var(--neon-cyan)_/_0.8)] transition-all duration-300">
            Sign Up
          </Button>
          
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden ml-2">
                <Menu className="h-6 w-6 text-gray-300" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-[hsl(var(--dark-400))]">
              <div className="flex flex-col space-y-4 mt-8">
                <a href="#features" className="text-lg font-medium text-gray-300 hover:text-[hsl(var(--neon-cyan))] transition-colors duration-300">
                  Features
                </a>
                <a href="#ai-demo" className="text-lg font-medium text-gray-300 hover:text-[hsl(var(--neon-magenta))] transition-colors duration-300">
                  AI Demo
                </a>
                <a href="#testimonials" className="text-lg font-medium text-gray-300 hover:text-[hsl(var(--neon-violet))] transition-colors duration-300">
                  Testimonials
                </a>
                <a href="#contact" className="text-lg font-medium text-gray-300 hover:text-[hsl(var(--neon-cyan))] transition-colors duration-300">
                  Contact
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
