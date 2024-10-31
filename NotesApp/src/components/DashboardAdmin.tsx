import {
    Facebook,
    Instagram,
    MessageCircle,
    MapPin,
    ChevronLeft,
    ChevronRight,
  } from "lucide-react";
  import React, { useState, useEffect } from "react";
  
  const carouselImages = [
    "/itec-programacion.png",
    "/itec-gastronomia.png",
    "/itec-establecimiento.jpg",
  ];
  
  export default function Component() {
    const [currentImage, setCurrentImage] = useState(0);
  
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
          {/* Navigation */}
          <nav className="fixed top-0 left-0 right-0 bg-[#081a71] z-50 border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <img
                    src="/itec-logo.jpg"
                    alt=""
                    className="w-[100px] h-[40px] rounded-full" // Redondeo agregado
                  />
                </div>
                <div className="hidden md:flex items-center">
                  <div className="flex space-x-0">
                    <a
                      href="#"
                      className="text-white border-r border-[#b4babd] px-3 py-2 transition-colors hover:bg-[#b4babd] hover:text-[#2d039c] flex items-center h-full"
                    >
                      Inicio
                    </a>
                    <a
                      href="#"
                      className="text-white border-r border-[#b4babd] px-3 py-2 transition-colors hover:bg-[#b4babd] hover:text-[#2d039c] flex items-center h-full"
                    >
                      Alumno
                    </a>
                    <a
                      href="#"
                      className="text-white border-r border-[#b4babd] px-3 py-2 transition-colors hover:bg-[#b4babd] hover:text-[#2d039c] flex items-center h-full"
                    >
                      Nota
                    </a>
                    <a
                      href="#"
                      className="text-white border-[#b4babd] px-3 py-2 transition-colors hover:bg-[#b4babd] hover:text-[#2d039c] flex items-center h-full"
                    >
                      Materia
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
  
          {/* Hero Section with Carousel */}
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
  
          {/* Footer */}
          <footer className="bg-[#000000] text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center">
                <div className="mb-4">
                  © 2024 Instituto Tecnológico N°1. Todos los derechos reservados.
                </div>
                <p className="text-gray-300">
                  Comprometidos con la excelencia educativa y el desarrollo
                  profesional de nuestros estudiantes.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </>
    );
  }
  