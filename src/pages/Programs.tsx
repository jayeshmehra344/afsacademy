import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProgramCardProps {
  title: string;
  description: string;
  level: string;
  duration: string;
  image: string;
}

const ProgramCard = ({ title, description, level, duration, image }: ProgramCardProps) => {
  return (
    <div className="overflow-hidden rounded-xl relative group glass-card animate-fade-in h-full flex flex-col transition-all duration-300 hover:-translate-y-2">
      <div className="aspect-[4/3] w-full overflow-hidden flex-shrink-0">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-afs-dark/90 via-transparent to-transparent"></div>
      </div>
      
      <div className="p-6 relative z-10 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-3 gap-2">
          <h3 className="text-white text-lg font-medium">{title}</h3>
          <span className="text-xs py-1 px-3 rounded-full uppercase tracking-wider bg-afs-orange/30 text-white border border-afs-orange/20 flex-shrink-0">
            {level}
          </span>
        </div>
        
        <p className="text-white/80 mb-4 text-sm flex-grow">
          {description}
        </p>
        
        <div className="flex justify-between items-center mt-auto">
          <span className="text-white/60 text-xs sm:text-sm">
            {duration}
          </span>
          <Link 
            to="/contact" 
            className="flex items-center text-afs-orange hover:text-white transition-colors group/btn text-sm sm:text-base"
          >
            <span>Enroll Now</span>
            <ArrowRight size={16} className="ml-1 sm:ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const Programs = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    document.querySelectorAll('.reveal').forEach((element) => {
      observer.observe(element);
    });
    
    return () => {
      document.querySelectorAll('.reveal').forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);
  
  const programs = [
    {
      id: 1,
      title: "Beginner Training Program",
      description: "Foundational basketball skills and fundamentals for young players just starting their basketball journey.",
      level: "Beginner",
      duration: "Ongoing batches",
      image: "/media/junior.jpg"
    },
    {
      id: 2,
      title: "Intermediate Training Program ",
      description: "Develops core basketball skills - shooting technique, defensive stance, and team play fundamentals",
      level: "Intermediate",
      duration: "Regular sessions",
      image: "/media/sub-junior.jpg"
    },
    {
      id: 3,
      title: "Advanced Training Program ",
      description: "Comprehensive skill development program focusing on advanced techniques, strategies, competitive preparation for serious players",
      level: "Advanced",
      duration: "Year-round program", 
      image: "/media/senior.jpg"
    },
    {
      id: 4,
      title: "Professional Training Program",
      description: "For competitive players seeking highest-level coaching with advanced drills, game simulations and athletic conditioning",
      level: "Expert",
      duration: "Regular Sessions",
      image: "/media/expert.jpg"
    },
    {
      id: 5,
      title: "Summer Basketball Camp",
      description: "Daily skill-building activities, drills, and scrimmages for all age groups during summer vacations",
      level: "All Levels",
      duration: "June-July",
      image: "/media/camp.jpg"
    },
    {
      id: 6,
      title: "Personal Coaching",
      description: "One-on-one customized training sessions focusing on individual skill improvement",
      level: "All Levels",
      duration: "Flexible scheduling",
      image: "/media/personal1.png"
    }
  ];

  const filteredPrograms = selectedLevel === "all" 
    ? programs 
    : programs.filter(program => program.level.toLowerCase() === selectedLevel.toLowerCase());

  return (
    <div className="min-h-screen bg-afs-dark text-white flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className={`text-center mb-12 sm:mb-16 reveal ${isVisible ? 'animated' : ''}`}>
            <span className="inline-block py-1 px-3 rounded-full text-xs uppercase tracking-wider mb-3 bg-afs-orange/20 text-afs-orange border border-afs-orange/10">
              Training Programs
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 afs-heading">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-afs-orange to-afs-red">
                Elevate
              </span>{" "}
              Your Game
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-sm sm:text-base">
              Choose from our comprehensive selection of basketball training programs, 
              each designed to target specific skills and tailored for different experience levels.
            </p>
          </div>
          
          <Tabs defaultValue="all" className={`mb-8 sm:mb-12 reveal ${isVisible ? 'animated' : ''}`}>
            <div className="flex justify-center overflow-x-auto pb-2">
              <TabsList className="bg-white/5 border border-white/10 w-max">
                <TabsTrigger 
                  value="all" 
                  onClick={() => setSelectedLevel("all")}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-afs-orange data-[state=active]:to-afs-red text-xs sm:text-sm"
                >
                  All Programs
                </TabsTrigger>
                <TabsTrigger 
                  value="beginner" 
                  onClick={() => setSelectedLevel("beginner")}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-afs-orange data-[state=active]:to-afs-red text-xs sm:text-sm"
                >
                  Beginner
                </TabsTrigger>
                <TabsTrigger 
                  value="intermediate" 
                  onClick={() => setSelectedLevel("intermediate")}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-afs-orange data-[state=active]:to-afs-red text-xs sm:text-sm"
                >
                  Intermediate
                </TabsTrigger>
                <TabsTrigger 
                  value="advanced" 
                  onClick={() => setSelectedLevel("advanced")}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-afs-orange data-[state=active]:to-afs-red text-xs sm:text-sm"
                >
                  Advanced
                </TabsTrigger>
                <TabsTrigger 
                  value="expert" 
                  onClick={() => setSelectedLevel("expert")}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-afs-orange data-[state=active]:to-afs-red text-xs sm:text-sm"
                >
                  Expert
                </TabsTrigger>
              </TabsList>
            </div>
            
            {["all", "beginner", "intermediate", "advanced", "expert"].map((level) => (
              <TabsContent key={level} value={level} className="mt-6 sm:mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredPrograms.map((program) => (
                    <ProgramCard 
                      key={program.id}
                      title={program.title}
                      description={program.description}
                      level={program.level}
                      duration={program.duration}
                      image={program.image}
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className={`mt-12 sm:mt-16 text-center reveal ${isVisible ? 'animated' : ''}`}>
            <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Not sure which program is right for you?</h3>
              <p className="text-white/70 mb-4 sm:mb-6 text-sm sm:text-base">
                Our expert coaches can help assess your current skill level and recommend 
                the perfect training program to match your goals and abilities.
              </p>
              <Link to="/contact" className="btn-primary inline-flex">
                Schedule a Free Assessment
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Programs;