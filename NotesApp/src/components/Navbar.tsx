import React from 'react';

const NavBar = () => {
  return (
    <>
      <nav className="bg-[#020a1e] z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img
                src="/itec-logo.jpg"
                alt=""
                className="w-[100px] h-[40px]"
              />
            </div>
            <div className="hidden md:flex items-center">
              <div className="flex space-x-0">
        <a
  href="/"
  className="relative text-white border-[#b4babd] rounded-md px-3 py-2 transition-transform transform flex items-center h-full hover:text-[#020a1e] before:absolute before:inset-0 before:bg-[#a7b1ce] before:scale-x-0 before:origin-center hover:before:scale-x-100 before:transition-transform before:duration-300 before:ease-out before:z-[-1] before:rounded-xl"
>
  Inicio
</a>

                
<a
  href="/managment"
  className="relative text-white border-[#b4babd] rounded-md px-3 py-2 transition-transform transform flex items-center h-full hover:text-[#020a1e] before:absolute before:inset-0 before:bg-[#a7b1ce] before:scale-x-0 before:origin-center hover:before:scale-x-100 before:transition-transform before:duration-300 before:ease-out before:z-[-1] before:rounded-xl"
>
  Alumno
</a>
<a
  href="/notes"
  className="relative text-white border-[#b4babd] rounded-md px-3 py-2 transition-transform transform flex items-center h-full hover:text-[#020a1e] before:absolute before:inset-0 before:bg-[#a7b1ce] before:scale-x-0 before:origin-center hover:before:scale-x-100 before:transition-transform before:duration-300 before:ease-out before:z-[-1] before:rounded-xl"
>
  Nota
</a>
<a
  href="#"
  className="relative text-white border-[#b4babd] rounded-md px-3 py-2 transition-transform transform flex items-center h-full hover:text-[#020a1e] before:absolute before:inset-0 before:bg-[#a7b1ce] before:scale-x-0 before:origin-center hover:before:scale-x-100 before:transition-transform before:duration-300 before:ease-out before:z-[-1] before:rounded-xl"
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
