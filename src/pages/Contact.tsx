import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MapPin, Phone, Mail, Clock, MessageSquare, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

          <div className="glass-card rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-8">Our Contact Details</h2>
            <div className="lg:flex lg:gap-12">
              {/* Left: Locations */}
              <div className="flex-1 space-y-8">
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
              </div>

              {/* Right: Phone, Email, Hours */}
              <div className="flex-1 space-y-8 mt-10 lg:mt-0">
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
                    <p className="text-white/70">afstrainingacademy@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-afs-orange/20 p-3 rounded-lg mr-4">
                    <Clock className="text-afs-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Working Hours</h3>
                    <p className="text-white/70">Mon–Fri: 6:00 AM – 9:00 PM</p>
                    <p className="text-white/70">Sat–Sun: 8:00 AM – 6:00 PM</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
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

          <div className="rounded-xl overflow-hidden h-[600px] w-full bg-gray-800/50 border border-white/10">
            <div id="map" className="w-full h-full"></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
