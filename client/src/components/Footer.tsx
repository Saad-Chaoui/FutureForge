import { Link } from "wouter";
import { Twitter, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-[hsl(var(--dark-500))] py-12 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="text-2xl font-display font-semibold text-white mb-4 inline-block">
              <span className="text-[hsl(var(--neon-cyan))]">Future</span>Labs<span className="text-[hsl(var(--neon-magenta))]">AI</span>
            </Link>
            <p className="text-gray-400 mb-4">Empowering businesses with next-generation AI solutions that drive growth and innovation.</p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-[hsl(var(--neon-cyan))] transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-[hsl(var(--neon-magenta))] transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-[hsl(var(--neon-violet))] transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-[hsl(var(--neon-cyan))] transition-colors duration-300">Features</a></li>
              <li><a href="#ai-demo" className="text-gray-400 hover:text-[hsl(var(--neon-cyan))] transition-colors duration-300">AI Demo</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-[hsl(var(--neon-cyan))] transition-colors duration-300">Testimonials</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-[hsl(var(--neon-cyan))] transition-colors duration-300">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[hsl(var(--neon-cyan))] transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[hsl(var(--neon-cyan))] transition-colors duration-300">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-[hsl(var(--neon-cyan))] transition-colors duration-300">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[hsl(var(--neon-cyan))] transition-colors duration-300">API Reference</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[hsl(var(--neon-cyan))] transition-colors duration-300">Developer Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[hsl(var(--neon-cyan))] transition-colors duration-300">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[hsl(var(--neon-cyan))] transition-colors duration-300">Tutorials</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[hsl(var(--neon-cyan))] transition-colors duration-300">Community Forum</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Subscribe</h4>
            <p className="text-gray-400 mb-4">Stay updated with the latest news and announcements from our team.</p>
            <form className="flex mb-4">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 bg-[hsl(var(--dark-400))] border border-[hsl(var(--dark-100))] rounded-l-md py-2 px-3 text-white focus:outline-none focus:border-[hsl(var(--neon-cyan)_/_0.5)]"
                required
              />
              <Button 
                type="submit" 
                className="bg-[hsl(var(--neon-cyan))] text-black rounded-r-md px-3 hover:bg-[hsl(var(--neon-cyan)_/_0.8)] transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Button>
            </form>
            <p className="text-xs text-gray-500">By subscribing, you agree to our Privacy Policy and provide consent to receive updates from our company.</p>
          </div>
        </div>
        
        <div className="border-t border-[hsl(var(--dark-100))] pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} FutureLabs AI. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
