import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    content: "The predictive analytics capabilities have completely transformed how we approach our market strategy. We've seen a 40% increase in customer engagement since implementation.",
    author: "Sarah Johnson",
    role: "CTO, Quantum Innovations",
    rating: 5,
    color: "cyan"
  },
  {
    id: 2,
    content: "The security features are unparalleled. As a financial institution, data protection is our top priority, and this platform has exceeded our expectations in every security audit.",
    author: "Michael Chen",
    role: "CISO, Global Financial Group",
    rating: 5,
    color: "magenta"
  },
  {
    id: 3,
    content: "We've automated a striking 70% of our customer support processes with the smart automation features. The AI assistant is incredibly intuitive and has helped us scale our operations without increasing headcount.",
    author: "Elena Rodriguez",
    role: "VP of Customer Experience, TechVision",
    rating: 5,
    color: "violet"
  }
];

export default function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
      className="py-20 relative" 
      id="testimonials"
      ref={ref}
    >
      <div className="container mx-auto px-4">
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
            Trusted by <span className="text-[hsl(var(--neon-violet))]">Innovators</span>
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            See how leading organizations are transforming their operations with our AI platform.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {testimonials.map((testimonial) => (
            <motion.div 
              key={testimonial.id}
              className="bg-gradient-dark rounded-xl p-6 border border-[hsl(var(--dark-100))] hover:border-[hsl(var(--neon-${testimonial.color})_/_0.3)] transition-all duration-300"
              variants={itemVariants}
            >
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 text-[hsl(var(--neon-${testimonial.color}))]`}
                      fill="currentColor"
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mb-6">{testimonial.content}</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[hsl(var(--neon-${testimonial.color})_/_0.3)] flex items-center justify-center mr-3">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-medium">{testimonial.author}</h4>
                  <p className="text-xs text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
