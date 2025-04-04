import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import VideoHero from "../components/VideoHero";
import Footer from "../components/Footer";
import VideoSlideshow from "../components/VideoSlideshow";
import { ArrowRight, ArrowDown, CircleDot, Award, Trophy, Star, TrendingUp, ChevronRight, Users, User, Clock, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';
import ReCAPTCHA from "react-google-recaptcha";

const Index = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const stats = [
    { value: "1,500+", label: "Players Trained", icon: <Users className="text-afs-orange" size={24} /> },
    { value: "14+", label: "Professional Coaches", icon: <User className="text-afs-orange" size={24} /> },
    { value: "100%", label: "Success Rate", icon: <TrendingUp className="text-afs-orange" size={24} /> },
    { value: "12+", label: "Years Experience", icon: <Trophy className="text-afs-orange" size={24} /> },
  ];

  const programs = [
    {
      title: "Beginner Training Program",
      description: "Foundational basketball skills and fundamentals for young players just starting their basketball journey.",
      level: "Beginner",
      duration: "Ongoing batches",
      image: "/media/junior.jpg"
    },
    {
      title: "Intermediate Training Program",
      description: "Develops core basketball skills - shooting technique, defensive stance, and team play fundamentals",
      level: "Intermediate",
      duration: "Regular sessions",
      image: "/media/sub-junior.jpg"
    },
    {
      title: "Advanced Training Program",
      description: "Comprehensive skill development program focusing on advanced techniques, strategies, competitive preparation for serious players",
      level: "Advanced",
      duration: "Year-round program",
      image: "/media/senior.jpg"
    },
  ];

  const coaches = [
    {
      name: "Ashwani Kumar Gupta",
      title: "Head Coach",
      bio: "A Senior National Player and certified fitness expert with extensive experience in sports and coaching. Passionate about training and mentoring athletes across multiple disciplines.",
      image: "/media/coach_photo.jpg",
      achievements: [
        "Senior National Player",
        "All India University, Khelo India Games Participant",
        "Certified Basketball Coach (NSNIS Bangalore)",
        "Certified Personal and Fitness Trainer",
        "B.P.Ed, M.P.Ed"
      ]
    },
    {
      name: "Abhishek Singh Bohra",
      title: "Senior Coach",
      bio: "National Medalist Basketball Player & Skilled Coach at AFS Basketball Academy, dedicated to nurturing the next generation of champions.",
      image: "/media/abhishek_bohra.jpg",
      achievements: [
        "National Medalist Player",
        "B.P.Ed, M.P.Ed",
      ]
    },
    {
      name: "Abhishek Gupta",
      title: "Head Coach",
      bio: "Certified strength and conditioning specialist who focuses on basketball-specific athletic development.",
      image: "/media/abhishek_gupta.jpg",
      achievements: [
        "National Player",
        "B.P.Ed, M.P.Ed",
      ]
    }
  ];

  useEffect(() => {
    const animateElements = () => {
      const revealElements = document.querySelectorAll('.reveal:not(.animated)');
      revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('animated');
        }
      });
    };
    animateElements();
    window.addEventListener('scroll', animateElements);
    return () => {
      window.removeEventListener('scroll', animateElements);
    };
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (!recaptchaValue) newErrors.recaptcha = "Please verify you're not a robot";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || isSubmitting) return;
    setIsSubmitting(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          'g-recaptcha-response': recaptchaValue
        },
        import.meta.env.VITE_EMAILJS_USER_ID
      );

      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setRecaptchaValue(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const ProgramCard = ({ title, description, level, duration, image }) => {
    return (
      <div className="glass-card rounded-xl overflow-hidden card-hover h-full">
        <div className="aspect-[16/9] w-full">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-russo mb-2">{title}</h3>
          <p className="text-white/70 mb-4 font-montserrat">{description}</p>
          <div className="flex justify-between mb-4 font-montserrat">
            <div className="text-sm flex items-center">
              <Star className="text-afs-orange mr-1" size={16} />
              <span className="text-white">{level}</span>
            </div>
            <div className="text-sm flex items-center">
              <Clock className="text-afs-orange mr-1" size={16} />
              <span className="text-white">{duration}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const CoachCard = ({ name, title, bio, image, achievements }) => {
    return (
      <div className="glass-card rounded-xl overflow-hidden h-full flex flex-col card-hover">
        <div className="aspect-[1/1] w-full">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 flex-grow flex flex-col">
          <h3 className="text-xl font-russo mb-1">{name}</h3>
          <p className="text-afs-orange mb-3 font-montserrat">{title}</p>
          <p className="text-white/70 text-sm mb-4 flex-grow font-montserrat">{bio}</p>
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <Trophy className="text-afs-orange mr-2" size={16} />
              <span className="font-russo">Key Achievements</span>
            </h4>
            <ul className="space-y-1 mb-4">
              {achievements.slice(0, 2).map((achievement, i) => (
                <li key={i} className="flex items-start text-xs font-montserrat">
                  <Award className="text-afs-orange mr-1 flex-shrink-0" size={14} />
                  <span className="text-white/80">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
  const TestimonialSlider = () => {
    const testimonials = [
      {
        name: "Navya Singh",
        role: "National Player",
        text: "AFS Academy's elite training refined my skills and discipline, helping me represent UP and earn a shot at the Indian U-17 national team!",
        image: "/media/navya.jpg"
      },
      {
        name: "Shubham Singh",
        role: "National Player",
        text: "Training with AFS Academy was the turning point in my career. Their elite coaching staff pushed me to levels I didn't think were possible.",
        image: "/media/Shubham_singh.jpg"
      },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    };

    const prevTestimonial = () => {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      );
    };

    const goToTestimonial = (index) => {
      setCurrentIndex(index);
    };

    return (
      <div className="glass-card rounded-xl p-8">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0 border-2 border-afs-orange">
            <img 
              src={testimonials[currentIndex].image} 
              alt={testimonials[currentIndex].name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-grow">
            <div className="mb-4 flex justify-center md:justify-start">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`h-5 w-5 mr-2 ${index === currentIndex ? 'text-afs-orange' : 'text-white/30'}`}
                >
                  <CircleDot />
                </button>
              ))}
            </div>
            <p className="text-white/80 text-lg mb-4 font-montserrat">
              {testimonials[currentIndex].text}
            </p>
            <div>
              <h4 className="font-russo text-center md:text-left">
                {testimonials[currentIndex].name}
              </h4>
              <p className="text-afs-orange text-sm font-montserrat text-center md:text-left">
                {testimonials[currentIndex].role}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-afs-dark text-white overflow-x-hidden font-montserrat">
      <Navbar />
      <VideoHero />
      <VideoSlideshow />
      
      <section className="py-16 bg-gradient-to-b from-afs-dark to-afs-darkgray basketball-pattern">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {stats.map((stat, index) => (
              <div key={index} className="text-center reveal glass-card py-6 rounded-xl">
                <div className="flex justify-center mb-3">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-russo mb-2 text-transparent bg-clip-text bg-gradient-to-r from-afs-orange to-afs-red">{stat.value}</div>
                <div className="text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-afs-dark-accent">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <div className="flex items-center mb-3">
                <CircleDot className="text-afs-orange mr-2 animate-ball-bounce" size={24} />
                <span className="inline-block py-1 px-3 rounded-full text-xs uppercase tracking-wider font-bold bg-afs-orange/20 text-afs-orange border border-afs-orange/10">
                  About AFS Academy
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-russo mb-6">
                <span className="text-white">Elevate Your Game</span> To New Heights
              </h2>
              <p className="text-white/80 mb-6">
                AFS Academy was founded by former professional players with a mission to develop elite basketball talent through personalized training and expert coaching.
              </p>
              <p className="text-white/80 mb-8">
                We focus on developing the complete player - from technical skills and basketball IQ to mental strength and physical conditioning.
              </p>
              <Link to="/achievements" className="btn-primary flex items-center">
                Learn More About Us
                <ChevronRight size={18} className="ml-1" />
              </Link>
            </div>
            <div className="relative reveal">
              <div className="rounded-xl overflow-hidden glass-card">
                <img 
                  src="media/elevate.jpg" 
                  alt="AFS Academy Training" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full flex items-center justify-center bg-afs-dark border-2 border-afs-orange">
                <CircleDot className="text-afs-orange animate-ball-bounce" size={28} />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-afs-dark">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 reveal">
            <div className="flex items-center justify-center mb-3">
              <CircleDot className="text-afs-orange mr-2 animate-ball-bounce" size={24} />
              <span className="inline-block py-1 px-3 rounded-full text-xs uppercase tracking-wider font-bold bg-afs-orange/20 text-afs-orange border border-afs-orange/10">
                Our Programs
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-russo mb-6">
              <span className="text-white">Training Programs</span> Designed For Success
            </h2>
            <p className="text-white/80">
              Choose from our specialized basketball training programs, each tailored to specific skill levels and goals.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {programs.map((program, index) => (
              <div key={index} className="reveal">
                <ProgramCard {...program} />
              </div>
            ))}
          </div>
          <div className="text-center reveal">
            <Link to="/programs" className="btn-secondary inline-flex items-center">
              <span>View All Programs</span>
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      <section className="relative py-24 bg-afs-dark-accent overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/cta-bg.jpg" 
            alt="Basketball court" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-afs-dark to-transparent"></div>
          <div className="absolute inset-0 basketball-pattern opacity-30"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="reveal">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-afs-orange to-afs-red flex items-center justify-center mr-6">
                  <CircleDot size={32} />
                </div>
                <h2 className="text-4xl md:text-5xl font-russo">
                  Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-afs-orange to-afs-red">dominate</span> the court?
                </h2>
              </div>
              <p className="text-xl text-white/80 mb-8 ml-26">
                Join AFS Academy today and start your journey to basketball excellence.
              </p>
              <div className="flex flex-wrap gap-4 ml-26">
                <Link to="/contact" className="btn-primary flex items-center">
                  <CircleDot className="mr-2" size={20} />
                  Enroll Now
                </Link> 
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-afs-dark basketball-pattern">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 reveal">
            <div className="flex items-center justify-center mb-3">
              <User className="text-afs-orange mr-2" size={24} />
              <span className="inline-block py-1 px-3 rounded-full text-xs uppercase tracking-wider font-bold bg-afs-orange/20 text-afs-orange border border-afs-orange/10">
                Our Team
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-russo mb-6">
              <span className="text-white">Expert Coaches</span> Leading The Way
            </h2>
            <p className="text-white/80">
              Our coaching staff consists of former professional players and certified trainers.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {coaches.map((coach, index) => (
              <div key={index} className="reveal">
                <CoachCard {...coach} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-gradient-to-b from-afs-dark-accent to-afs-dark">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 reveal">
            <div className="flex items-center justify-center mb-3">
              <Star className="text-afs-orange mr-2" size={24} />
              <span className="inline-block py-1 px-3 rounded-full text-xs uppercase tracking-wider font-bold bg-afs-orange/20 text-afs-orange border border-afs-orange/10">
                Testimonials
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-russo mb-6">
              <span className="text-white">Success Stories</span> From Our Players
            </h2>
            <p className="text-white/80">
              Hear what our players have to say about their experience training with AFS Academy.
            </p>
          </div>
          <div className="reveal">
            <TestimonialSlider />
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-afs-dark-accent">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="reveal">
              <div className="flex items-center mb-3">
                <CircleDot className="text-afs-orange mr-2 animate-ball-bounce" size={24} />
                <span className="inline-block py-1 px-3 rounded-full text-xs uppercase tracking-wider font-bold bg-afs-orange/20 text-afs-orange border border-afs-orange/10">
                  Get In Touch
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-russo mb-6">
                <span className="text-white">Questions?</span> Contact Us
              </h2>
              <p className="text-white/80 mb-8">
                Have questions about our programs or want to schedule a visit? Fill out the form and we'll get back to you.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-afs-orange/20 flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-afs-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-russo mb-1">Location</h5>
                    <p className="text-white/70 text-sm">1st Floor Terrace Area Sky Line Plaza-1, Sushant Golf City, Behind Lulu Mall (Gate-5), Lucknow</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-afs-orange/20 flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-afs-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-russo mb-1">Email</h5>
                    <p className="text-white/70 text-sm">afstrainingacademy@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-afs-orange/20 flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-afs-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-russo mb-1">Phone</h5>
                    <p className="text-white/70 text-sm">7275546210</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="reveal">
              <div className="glass-card rounded-xl p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-white/80 text-sm mb-2 font-russo">Full Name *</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-afs-orange/50 text-white font-montserrat`}
                        placeholder="Your name"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm mb-2 font-russo">Email Address *</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-afs-orange/50 text-white font-montserrat`}
                        placeholder="Your email"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm mb-2 font-russo">Subject *</label>
                    <input 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full bg-white/5 border ${errors.subject ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-afs-orange/50 text-white font-montserrat`}
                      placeholder="How can we help you?"
                    />
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm mb-2 font-russo">Message *</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full bg-white/5 border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-afs-orange/50 text-white font-montserrat h-32`}
                      placeholder="Tell us more about your inquiry"
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>
                  <div>
                    <ReCAPTCHA
                      sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                      onChange={(value) => setRecaptchaValue(value)}
                    />
                    {errors.recaptcha && <p className="text-red-500 text-xs mt-1">{errors.recaptcha}</p>}
                  </div>
                  <button 
                    type="submit" 
                    className="btn-primary w-full flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                        </svg>
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;