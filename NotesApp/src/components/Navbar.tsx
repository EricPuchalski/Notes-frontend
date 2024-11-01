import React from 'react';

const NavBar = () => {
  return (
    <>
             <nav className="bg-[#110e58] z-50 border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <img
                    src="/itec-logo.jpg"
                    alt=""
                    className="w-[100px] h-[40px]" // Redondeo agregado
                  />
                </div>
                <div className="hidden md:flex items-center">
                  <div className="flex space-x-0">
                    <a
                      href="/"
                      className="text-white border-r border-[#b4babd] px-3 py-2 transition-colors hover:bg-[#b4babd] hover:text-[#2d039c] flex items-center h-full"
                    >
                      Inicio
                    </a>
                    <a
                      href="/managment"
                      className="text-white border-r border-[#b4babd] px-3 py-2 transition-colors hover:bg-[#b4babd] hover:text-[#2d039c] flex items-center h-full"
                    >
                      Alumno
                    </a>
                    <a
                      href="/notes"
                      className="text-white border-r border-[#b4babd] px-3 py-2 transition-colors hover:bg-[#b4babd] hover:text-[#2d039c] flex items-center h-full"
                    >
                      Nota
                    </a>
                    <a
                      href="#"
                      className="text-white border-[#b4babd] px-3 py-2 transition-colors hover:bg-[#b4babd] hover:text-[#2d039c] flex items-center h-full"
                    >
                      Contacto
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
    </>
  );
};

export default NavBar;