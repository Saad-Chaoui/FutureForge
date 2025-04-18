import { useState, useEffect } from "react";
import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface Recommendation {
  id: string;
  type: "new" | "popular" | "trending";
  title: string; 
  description: string;
}

export default function AiRecommendation() {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      // Calculate how far the user has scrolled
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
      
      setScrollPercentage(Math.min(Math.max(scrollPercentage, 0), 100));
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Fetch recommendations
  const { data: recommendations, isLoading, refetch } = useQuery({
    queryKey: ['/api/recommendations'],
    enabled: true,
  });
  
  const getTypeColor = (type: string) => {
    switch(type) {
      case 'new': return 'neon-cyan';
      case 'popular': return 'neon-magenta';
      case 'trending': return 'neon-violet';
      default: return 'neon-cyan';
    }
  };

  const getTypeName = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="max-w-6xl mx-auto bg-[hsl(var(--dark-400)_/_0.8)] rounded-xl p-6 border border-[hsl(var(--neon-cyan)_/_0.2)]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-display font-medium mb-2 flex items-center">
            <HelpCircle className="h-5 w-5 mr-2 text-[hsl(var(--neon-cyan))]" />
            Recommended for You
          </h3>
          <p className="text-gray-400 text-sm">Based on your interests and browsing behavior</p>
        </div>
        <Button 
          variant="link" 
          className="text-sm text-[hsl(var(--neon-cyan))] mt-2 md:mt-0"
          onClick={() => refetch()}
        >
          Refresh Recommendations
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {isLoading ? (
          // Loading skeleton
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="bg-[hsl(var(--dark-300))] rounded-lg p-4 animate-pulse">
              <div className="h-6 w-16 bg-gray-700 rounded-full mb-2"></div>
              <div className="h-5 bg-gray-700 rounded w-3/4 mb-1"></div>
              <div className="h-4 bg-gray-700 rounded w-full mt-2"></div>
            </div>
          ))
        ) : (
          recommendations?.map((item: Recommendation) => (
            <div 
              key={item.id} 
              className="bg-[hsl(var(--dark-300))] rounded-lg p-4 hover:bg-[hsl(var(--dark-200))] transition-colors duration-300"
            >
              <span className={`text-xs text-[hsl(var(--${getTypeColor(item.type)}))] bg-[hsl(var(--${getTypeColor(item.type)})_/_0.1)] px-2 py-1 rounded-full`}>
                {getTypeName(item.type)}
              </span>
              <h4 className="text-md font-medium mt-2">{item.title}</h4>
              <p className="text-sm text-gray-400 mt-1">{item.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
