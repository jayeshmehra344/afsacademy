import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Calendar, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';
import ReCAPTCHA from "react-google-recaptcha";

interface Location {
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  address: string;
}

const Contact = () => {
  const { toast } = useToast();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const locations: Location[] = [
    {
      position: { lat: 26.9003, lng: 80.9847 },
      title: "AFS Basketball Training Academy",
      address: "Loyola International School, Mahanagar, Lucknow"
    },
    {
      position: { lat: 26.8543, lng: 81.0078 },
      title: "AFS Training Academy - Parsvnath Planet",
      address: "Parsvnath Planet, Lucknow"
    },
    {
      position: { lat: 26.8556, lng: 81.0102 },
      title: "AFS Training Academy - Eldeco Elegance",
      address: "Eldeco Elegance, Gomti Nagar, Lucknow"
    },
    {
      position: { lat: 26.8386, lng: 80.9973 },
      title: "AFS Basketball Academy - Behind Lulu Mall",
      address: "Behind Lulu Mall, Lucknow"
    },
    {
      position: { lat: 26.7829, lng: 80.9876 },
      title: "AFS Basketball Academy - Skyline Plaza",
      address: "1st Floor Terrace Area, Skyline Plaza 1, Sushant Golf City"
    },
    {
      position: { lat: 26.8621, lng: 81.0254 },
      title: "AFS Basketball Academy - Jeewan Sunshine School",
      address: "Jeewan Sunshine School, Gomti Nagar Extension"
    },
    {
      position: { lat: 26.8575, lng: 81.0108 },
      title: "Shalimar One World Vista",
      address: "Viraj Khand, Gomti Nagar, Lucknow"
    },
    {
      position: { lat: 26.8468, lng: 81.0026 },
      title: "MI Rustle Court",
      address: "Near Sahara Hospital, Gomti Nagar, Lucknow"
    }
  ];

  useEffect(() => {
    if (mapLoaded) return;

    const existingScript = document.querySelector(`script[src^="https://maps.googleapis.com/maps/api/js"]`);

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = () => setMapLoaded(true);
      document.head.appendChild(script);
    } else if (window.google) {
      setMapLoaded(true);
    }

    return () => {
      const scripts = document.querySelectorAll(`script[src^="https://maps.googleapis.com/maps/api/js"]`);
      scripts.forEach(script => document.head.removeChild(script));
    };
  }, [mapLoaded]);

  useEffect(() => {
    if (!mapLoaded) return;

    const initMap = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 26.8467, lng: 80.9462 },
        zoom: 12,
        styles: [{ featureType: "poi", stylers: [{ visibility: "off" }] }]
      });

      locations.forEach((location) => {
        const marker = new window.google.maps.Marker({
          position: location.position,
          map,
          title: location.title,
          icon: { url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" }
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="color: black; padding: 8px;">
              <h3 style="margin: 0 0 6px 0; font-size: 16px; font-weight: bold;">${location.title}</h3>
              <p style="margin: 0; font-size: 14px;">${location.address}</p>
            </div>
          `
        });

        marker.addListener("click", () => infoWindow.open(map, marker));
      });
    };

    initMap();
  }, [mapLoaded]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.subject) newErrors.subject = "Subject is required";
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
          phone_number: formData.phone,
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
        phone: "",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLiveChat = () => {
    toast({ title: "Live Chat", description: "Our chat service will open shortly..." });
  };

  const handleBookAppointment = () => {
    window.open('/book-appointment', '_blank');
  };

  return (
    <div className="min-h-screen bg-afs-dark text-white flex flex-col">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full text-xs uppercase tracking-wider mb-3 bg-afs-orange/20 text-afs-orange border border-afs-orange/10">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 afs-heading">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-afs-orange to-afs-red">Contact</span> Us
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              Have questions about our programs or ready to start your basketball journey? 
              Our team is here to help you take the next step.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="glass-card rounded-xl p-8 order-2 lg:order-1">
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-white/70 mb-2">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white`}
                      placeholder="Your name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white/70 mb-2">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white`}
                      placeholder="Your email"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-white/70 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
                      placeholder="Your phone"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-white/70 mb-2">Subject *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full bg-white/5 border ${errors.subject ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white`}
                    >
                      <option value="" disabled>Select a subject</option>
                      <option value="Program Inquiry">Program Inquiry</option>
                      <option value="Schedule Training">Schedule Training</option>
                      <option value="Facility Rental">Facility Rental</option>
                      <option value="Coaching Opportunity">Coaching Opportunity</option>
                      <option value="General Question">General Question</option>
                    </select>
                    {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-white/70 mb-2">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full bg-white/5 border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white`}
                    placeholder="How can we help you?"
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>
                <div className="mb-6">
                  <ReCAPTCHA
                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                    onChange={(value) => setRecaptchaValue(value)}
                  />
                  {errors.recaptcha && <p className="text-red-500 text-sm mt-1">{errors.recaptcha}</p>}
                </div>
                <button type="submit" className="btn-primary w-full md:w-auto" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="animate-spin mr-2" size={18} />
                  ) : (
                    <Send size={18} className="mr-2" />
                  )}
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                </button>
              </form>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-afs-orange/20 p-3 rounded-lg mr-4">
                    <MapPin className="text-afs-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Our Locations</h3>
                    <div className="text-white/70 space-y-3 mt-2">
                      {locations.map((location, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-2 h-2 rounded-full bg-afs-orange mt-2 mr-2"></div>
                          <div>
                            <p className="font-medium">{location.title}</p>
                            <p className="text-sm">{location.address}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-afs-orange/20 p-3 rounded-lg mr-4">
                    <Phone className="text-afs-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Phone Number</h3>
                    <p className="text-white/70">+91 72755 46210</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-afs-orange/20 p-3 rounded-lg mr-4">
                    <Mail className="text-afs-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email Address</h3>
                    <p className="text-white/70">contact@afsacademy.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-afs-orange/20 p-3 rounded-lg mr-4">
                    <Clock className="text-afs-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Working Hours</h3>
                    <p className="text-white/70">Monday - Friday: 6:00 AM - 9:00 PM</p>
                    <p className="text-white/70">Saturday - Sunday: 8:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
              <div className="mt-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <button 
                    onClick={handleLiveChat}
                    className="flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-4 transition-colors"
                  >
                    <MessageSquare size={20} className="mr-2 text-afs-orange" />
                    <span>Live Chat</span>
                  </button>
                  <button 
                    onClick={handleBookAppointment}
                    className="flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-4 transition-colors"
                  >
                    <Calendar size={20} className="mr-2 text-afs-orange" />
                    <span>Book Appointment</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 rounded-xl overflow-hidden h-[600px] w-full bg-gray-800/50 border border-white/10">
            <div id="map" className="w-full h-full"></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;