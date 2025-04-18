import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Lightbulb, ShieldIcon, BarChart2Icon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AiRecommendation from "./AiRecommendation";

const features = [
  {
    title: "Smart Automation",
    description: "Automate repetitive tasks with intelligent workflows that learn and adapt to your processes over time.",
    icon: <Lightbulb className="h-6 w-6 text-[hsl(var(--neon-cyan))]" />,
    color: "cyan",
  },
  {
    title: "Advanced Security",
    description: "Enterprise-grade security with AI-powered threat detection and privacy-first data handling.",
    icon: <ShieldIcon className="h-6 w-6 text-[hsl(var(--neon-magenta))]" />,
    color: "magenta",
  },
  {
    title: "Predictive Analysis",
    description: "Turn your data into actionable insights with our advanced predictive analytics engine.",
    icon: <BarChart2Icon className="h-6 w-6 text-[hsl(var(--neon-violet))]" />,
    color: "violet",
  },
];

export default function Features() {
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
      id="features"
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
            Powerful <span className="text-[hsl(var(--neon-magenta))]">Features</span>
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Our platform combines cutting-edge AI technology with intuitive design 
            to deliver a seamless experience that adapts to your needs.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-gradient-dark rounded-xl p-6 neon-border transition-all duration-300 hover:translate-y-[-5px]"
              variants={itemVariants}
            >
              <div className={`w-12 h-12 rounded-lg bg-[hsl(var(--neon-${feature.color})_/_0.1)] flex items-center justify-center mb-5`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-display font-medium mb-3">{feature.title}</h3>
              <p className="text-gray-400 mb-4">{feature.description}</p>
              <a 
                href="#" 
                className={`text-[hsl(var(--neon-${feature.color}))] text-sm flex items-center group`}
              >
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </motion.div>
          ))}
        </motion.div>
        
        {/* AI Recommendation Panel */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <AiRecommendation />
        </motion.div>
      </div>
    </section>
  );
}
