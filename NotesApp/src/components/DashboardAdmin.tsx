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

    const handleManagment = () => {
      navigate("/managment");
    };
    const handleNote = () => {
      navigate("/managment");
    };
    const handleContact = () => {
      navigate("/contact");
    };

export default function DashboardAdmin() {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);

  const handleManagment = () => {
    navigate("/managment");
  };
  const handleNote = () => {
    navigate("/managment");
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
      <div className="min-h-screen bg-[#fcf3cb] p-0">
        <NavBar></NavBar>
        <div
          key={currentImage}
          className="relative w-full"
          style={{
            backgroundImage: `url("${carouselImages[currentImage]}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "400px",
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
                href="#"
                className="flex items-center justify-center gap-3 p-4 bg-[#a7b1ce] rounded-xl shadow-lg hover:shadow-md transition-shadow duration-300 transform hover:scale-105 hover:bg-[#b8c6d8] hover:translate-y-0.5"
              >
                <MessageCircle className="w-6 h-6 text-[#51bb11] transition-transform duration-300 hover:animate-bounce" />
                <span className="text-gray-700">WhatsApp</span>
              </a>
              <a
                href="#"
                className="flex items-center justify-center gap-3 p-4 bg-[#a7b1ce] rounded-xl shadow-lg hover:shadow-md transition-shadow duration-300 transform hover:scale-105 hover:bg-[#b8c6d8] hover:translate-y-0.5"
              >
                <Instagram className="w-6 h-6 text-[#c0220c] transition-transform duration-300 hover:animate-spin" />
                <span className="text-gray-700">Instagram</span>
              </a>
              <a
                href="#"
                className="flex items-center justify-center gap-3 p-4 bg-[#a7b1ce] rounded-xl shadow-lg hover:shadow-md transition-shadow duration-300 transform hover:scale-105 hover:bg-[#b8c6d8] hover:translate-y-0.5"
              >
                <Facebook className="w-6 h-6 text-[#2d039c] transition-transform duration-300 hover:animate-ping" />
                <span className="text-gray-700">Facebook</span>
              </a>
              <div className="flex items-center justify-center gap-3 p-4 bg-[#a7b1ce] rounded-xl shadow-lg hover:shadow-md transition-shadow duration-300 transform hover:scale-105 hover:bg-[#b8c6d8] hover:translate-y-0.5 text-center">
                <MapPin className="w-6 h-6 text-[#e7c509] transition-transform duration-300 hover:animate-bounce" />
                <span className="text-gray-700">
                  Barrio Cocomarola Este y Fanggio
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
}
