
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Medal, Trophy, Users, Award, Star } from "lucide-react";

const Achievements = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const achievementsPerPage = 6;
  
  const achievements = [
    {
      id: 1,
      year: 2023,
      title: "AFS Basketball League",
      description: "We proudly organized the biggest basketball league in Lucknow, bringing together 110 teams from all over Uttar Pradesh. The league featured many national and international players, making it a grand success. This is just the beginning—many more milestones to come! ",
      image: "/media/afs_league.jpg",
      category: "Championship"
    },
    {
      id: 2,
      year: 2022,
      title: "Competitive Exposure for Our Players!",
      description: "We regularly organize district-level and inter-academy tournaments, providing our players with valuable game experience and competition exposure. These events help in skill development and prepare them for higher-level championships.",
      image: "/media/district_level.jpg",
      category: "Player Development"
    },
    {
      id: 3,
      year: 2022,
      title: "Proud Sponsors of Senior State Championship 2024",
      description: "We are honored to have sponsored official T-shirts for the Senior State Basketball Championship 2024 held in Kanpur. Contributing to the growth of basketball in Uttar Pradesh is a proud achievement for us.",
      image: "/media/sponsers1.jpg",
      category: "Sponserships"
    },
    {
      id: 4,
      year: 2021,
      title: "Decathlon as Our Sports Partner",
      description: "We are proud to have *Decathlon* as our official *sports partner*, providing high-quality equipment and support to enhance the training experience for our players. Together, we are taking the game to the next level!",
      image: "/media/decathalon.jpg",
      category: "Sponserships"
    },
    {
      id: 5,
      year: 2021,
      title: "Rising Stars of AFS Academy",
      description: "We are proud to announce that 15-20 players from our academy are representing state and national championships. Their hard work and dedication are taking them to new heights in the basketball world!",
      image: "/media/alumni.jpg",
      category: "Alumni Success"
    },
    {
      id: 6,
      year: 2020,
      title: "Navya Singh's Journey!",
      description: "Navya Singh has been consistently representing the *U.P. team* and even secured a spot in the *Under-17 Indian team tryouts*. A true inspiration for all young athletes!",
      image: "/media/navya_02.jpg",
      category: "Success Stories"
    },
    {
      id: 7,
      year: 2020,
      title: "Winners's Indian National Basketball League",
      description: "AFS Academy team took 1st place in the Indian National Basketball League",
      image: "/media/inbl.jpg",
      category: "Competition"
    },
    {
      id: 8,
      year: 2019,
      title: "Head Coach Lucknow Team",
      description: "The head coach of the Lucknow team from 2021 up to the present day.",
      image: "/media/lucknow_team.jpg",
      category: "Mentorship"
    },
    
  ];
  
  // Pagination logic
  const indexOfLastAchievement = currentPage * achievementsPerPage;
  const indexOfFirstAchievement = indexOfLastAchievement - achievementsPerPage;
  const currentAchievements = achievements.slice(indexOfFirstAchievement, indexOfLastAchievement);
  const totalPages = Math.ceil(achievements.length / achievementsPerPage);
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Team Championship":
        return <Trophy className="text-afs-orange" />;
      case "Player Development":
      case "Player Recognition":
        return <Users className="text-afs-orange" />;
      case "Coaching Excellence":
        return <Award className="text-afs-orange" />;
      case "Alumni Success":
      case "International Competition":
        return <Medal className="text-afs-orange" />;
      default:
        return <Star className="text-afs-orange" />;
    }
  };
  
  return (
    <div className="min-h-screen bg-afs-dark text-white flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full text-xs uppercase tracking-wider mb-3 bg-afs-orange/20 text-afs-orange border border-afs-orange/10">
              Our Success
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 afs-heading">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-afs-orange to-afs-red">
                Academy
              </span>{" "}
              Achievements
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              A timeline of AFS Academy's milestones, championships, and player development successes 
              that demonstrate our commitment to basketball excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentAchievements.map((achievement) => (
              <div key={achievement.id} className="card-hover glass-card rounded-xl overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={achievement.image} 
                    alt={achievement.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  
                  <div className="absolute top-3 right-3 p-2 rounded-full bg-afs-dark/80 backdrop-blur-sm">
                    {getCategoryIcon(achievement.category)}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold">{achievement.title}</h3>
                  </div>
                  <p className="text-white/70 mb-3">{achievement.description}</p>
                  <span className="text-xs py-1 px-2 rounded-full bg-white/10 text-white/80">
                    {achievement.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <Pagination className="mt-12">
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(currentPage - 1)} 
                    className="cursor-pointer" 
                  />
                </PaginationItem>
              )}
              
              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={currentPage === index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className="cursor-pointer"
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(currentPage + 1)} 
                    className="cursor-pointer" 
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Achievements;
