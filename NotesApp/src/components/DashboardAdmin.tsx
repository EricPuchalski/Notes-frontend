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
    "/itec-programacion.png",
    "/itec-gastronomia.png",
    "/itec-establecimiento.jpg",
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
          <div className="pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex flex-col md:flex-row items-center justify-between py-3 relative bg-[#fcf3cb] p-0">
                <div className="w-1/2 flex flex-col items-center justify-center pr-6 ">
                  <h1 className="text-5xl font-bold text-gray-900 mb-6 text-center mx-0">
                    Forma Tu Futuro
                  </h1>
                  <p className="text-xl text-gray-600 mb-8 max-w-lg text-center mx-0">
                    Descubre una educación de calidad con nuestro sistema de
                    gestión académica. Accede a tus notas, materias y más en un
                    solo lugar.
                  </p>
                </div>
  
                <div className="w-1/2 relative">
                  <div
                    key={currentImage}
                    className="w-full rounded-lg" // Añadido el redondeo aquí
                    style={{
                      backgroundImage: `url("${carouselImages[currentImage]}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      minHeight: "400px",
                      borderRadius: "0.5rem", // Esta línea es opcional si usas la clase de Tailwind
                    }}
                  ></div>
  
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-800" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-800" />
                  </button>
                </div>
              </div>
            </div>
          </div>
  
          {/* Social Links */}
          <div className="bg-[#85cd49] py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <a
                  href="#"
                  className="flex items-center justify-center gap-3 p-4 bg-[#fcf3cb] rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <MessageCircle className="w-6 h-6 text-[#51bb11]" />
                  <span className="text-gray-700">WhatsApp</span>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center gap-3 p-4 bg-[#fcf3cb] rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Instagram className="w-6 h-6 text-[#c0220c]" />
                  <span className="text-gray-700">Instagram</span>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center gap-3 p-4 bg-[#fcf3cb] rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Facebook className="w-6 h-6 text-[#2d039c]" />
                  <span className="text-gray-700">Facebook</span>
                </a>
                <div className="flex items-center justify-center gap-3 p-4 bg-[#fcf3cb] rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
                  <MapPin className="w-6 h-6 text-[#e7c509]" />
                  <span className="text-gray-700">
                    Barrio Cocomarola Este y Fanggio
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Footer></Footer>
        </div>
      </>
    );
  }
  