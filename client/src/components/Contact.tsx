import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { AtSign, Phone, MapPin, Twitter, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { mutate: submitForm, isPending } = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
        variant: "default",
      });
      setFormData({
        name: "",
        email: "",
        company: "",
        message: ""
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitForm(formData);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section 
      className="py-20 bg-[hsl(var(--dark-500)_/_0.5)] relative" 
      id="contact"
      ref={ref}
    >
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[hsl(var(--background))] to-transparent opacity-60 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-16"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-display font-light mb-5"
            variants={itemVariants}
          >
            Ready to <span className="text-[hsl(var(--neon-magenta))]">Transform</span> Your Business?
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Get in touch with our team to schedule a personalized demo and see how our AI platform can revolutionize your operations.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="max-w-4xl mx-auto bg-[hsl(var(--dark-400)_/_0.8)] rounded-xl overflow-hidden border border-[hsl(var(--neon-magenta)_/_0.2)]"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 flex flex-col justify-center">
              <h3 className="text-xl font-display font-medium mb-6 text-white">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[hsl(var(--neon-magenta)_/_0.1)] flex items-center justify-center mr-4">
                    <AtSign className="h-5 w-5 text-[hsl(var(--neon-magenta))]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <a href="mailto:info@futurelabsai.com" className="text-white hover:text-[hsl(var(--neon-magenta))] transition-colors duration-300">info@futurelabsai.com</a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[hsl(var(--neon-magenta)_/_0.1)] flex items-center justify-center mr-4">
                    <Phone className="h-5 w-5 text-[hsl(var(--neon-magenta))]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <a href="tel:+18005551234" className="text-white hover:text-[hsl(var(--neon-magenta))] transition-colors duration-300">+1 (800) 555-1234</a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[hsl(var(--neon-magenta)_/_0.1)] flex items-center justify-center mr-4">
                    <MapPin className="h-5 w-5 text-[hsl(var(--neon-magenta))]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Office</p>
                    <p className="text-white">101 Innovation Drive, San Francisco, CA 94107</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <p className="text-sm text-gray-400 mb-3">Connect with us</p>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-[hsl(var(--dark-300))] flex items-center justify-center hover:bg-[hsl(var(--neon-cyan)_/_0.2)] transition-colors duration-300 group"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5 text-gray-400 group-hover:text-[hsl(var(--neon-cyan))] transition-colors duration-300" />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-[hsl(var(--dark-300))] flex items-center justify-center hover:bg-[hsl(var(--neon-magenta)_/_0.2)] transition-colors duration-300 group"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5 text-gray-400 group-hover:text-[hsl(var(--neon-magenta))] transition-colors duration-300" />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-[hsl(var(--dark-300))] flex items-center justify-center hover:bg-[hsl(var(--neon-violet)_/_0.2)] transition-colors duration-300 group"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5 text-gray-400 group-hover:text-[hsl(var(--neon-violet))] transition-colors duration-300" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="p-8 bg-[hsl(var(--dark-300))]">
              <h3 className="text-xl font-display font-medium mb-6 text-white">Get in Touch</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm text-gray-400 mb-1">Full Name</label>
                  <Input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[hsl(var(--dark-400))] border border-[hsl(var(--dark-100))] rounded-md py-2 px-3 text-white focus:outline-none focus:border-[hsl(var(--neon-magenta)_/_0.5)]" 
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm text-gray-400 mb-1">Email Address</label>
                  <Input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[hsl(var(--dark-400))] border border-[hsl(var(--dark-100))] rounded-md py-2 px-3 text-white focus:outline-none focus:border-[hsl(var(--neon-magenta)_/_0.5)]" 
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="company" className="block text-sm text-gray-400 mb-1">Company</label>
                  <Input 
                    type="text" 
                    id="company" 
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-[hsl(var(--dark-400))] border border-[hsl(var(--dark-100))] rounded-md py-2 px-3 text-white focus:outline-none focus:border-[hsl(var(--neon-magenta)_/_0.5)]" 
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm text-gray-400 mb-1">Message</label>
                  <Textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4} 
                    className="w-full bg-[hsl(var(--dark-400))] border border-[hsl(var(--dark-100))] rounded-md py-2 px-3 text-white focus:outline-none focus:border-[hsl(var(--neon-magenta)_/_0.5)]" 
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full py-3 bg-[hsl(var(--neon-magenta)_/_0.1)] text-white rounded-md border border-[hsl(var(--neon-magenta))] hover:bg-[hsl(var(--neon-magenta)_/_0.2)] transition-all duration-300 flex items-center justify-center"
                  disabled={isPending}
                >
                  <span>{isPending ? "Sending..." : "Send Message"}</span>
                  {!isPending && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
