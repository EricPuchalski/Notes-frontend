import {
  Facebook,
  Instagram,
  MessageCircle,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";


const carouselImages = [
  "/Codigo.jpg",
  "/comida.jpg",
  "/desarrollador.jpg",
  "/programador.jpg",
  "/programadora.jpg",
  "/ranatouille.jpg",
];



export default function DashboardAdmin() {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);

  const handleManagment = () => {
    navigate("/managment");
  };
  const handleNote = () => {
    navigate("/managment");
  };
  const handleContact = () => {
    navigate("/contact");
  };



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prevImage) =>
        (prevImage - 1 + carouselImages.length) % carouselImages.length
    );
  };

  return (
    <>
      <div className="">
        <NavBar></NavBar>
        <div
          key={currentImage}
          className="relative w-full"
          style={{
            backgroundImage: `url("${carouselImages[currentImage]}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "500px",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-55 flex items-center justify-center rounded">
            {/* Fondo negro transparente */}
            <p className="text-white text-center text-2xl font-bold max-w-2xl">
              Potencia el aprendizaje y alcanza nuevas metas: un sistema de
              calificaciones diseñado para simplificar, inspirar y hacer de cada
              logro un paso hacia el éxito.
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-[#020a1e] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <a
                href="https://wa.me/03764812200" target="_blank"
                className="flex items-center justify-center gap-3 p-4 bg-[#a7b1ce] rounded-xl shadow-lg hover:shadow-md transition-shadow duration-300 transform hover:scale-105 hover:bg-[#b8c6d8] hover:translate-y-0.5"
              >
                <MessageCircle className="w-6 h-6 text-[#51bb11] transition-transform duration-300 hover:animate-bounce" />
                <span className="text-gray-700">WhatsApp</span>
              </a>
              <a
                href="https://www.instagram.com/itec1fp/" target="_blank"
                className="flex items-center justify-center gap-3 p-4 bg-[#a7b1ce] rounded-xl shadow-lg hover:shadow-md transition-shadow duration-300 transform hover:scale-105 hover:bg-[#b8c6d8] hover:translate-y-0.5"
              >
                <Instagram className="w-6 h-6 text-[#c0220c] transition-transform duration-300 hover:animate-spin" />
                <span className="text-gray-700">Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/itec1posadas/" target="_blank"
                className="flex items-center justify-center gap-3 p-4 bg-[#a7b1ce] rounded-xl shadow-lg hover:shadow-md transition-shadow duration-300 transform hover:scale-105 hover:bg-[#b8c6d8] hover:translate-y-0.5"
              >
                <Facebook className="w-6 h-6 text-[#2d039c] transition-transform duration-300 hover:animate-ping" />
                <span className="text-gray-700">Facebook</span>
              </a>
              <a 
                href="https://www.google.com/maps/place/Instituto+Tecnol%C3%B3gico+N%C2%B01/@-27.4348037,-55.9172223,17z/data=!4m14!1m7!3m6!1s0x9457beb5931a4b7f:0x5ca6468ed2bd0cfc!2sInstituto+Tecnol%C3%B3gico+N%C2%B01!8m2!3d-27.4348037!4d-55.9146474!16s%2Fg%2F11bw3c7jc_!3m5!1s0x9457beb5931a4b7f:0x5ca6468ed2bd0cfc!8m2!3d-27.4348037!4d-55.9146474!16s%2Fg%2F11bw3c7jc_?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" 
                className="flex items-center justify-center gap-3 p-4 bg-[#a7b1ce] rounded-xl shadow-lg hover:shadow-md transition-shadow duration-300 transform hover:scale-105 hover:bg-[#b8c6d8] hover:translate-y-0.5 text-center">
                <MapPin className="w-6 h-6 text-[#e7c509] transition-transform duration-300 hover:animate-bounce" />
                <span className="text-gray-700">
                  Barrio Cocomarola Este y Fanggio
                </span>
              </a>
            </div>
            
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
}
