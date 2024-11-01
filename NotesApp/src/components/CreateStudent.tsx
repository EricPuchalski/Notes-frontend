import React, { useState } from "react";
import {
  User,
  AlertCircle,
  ChevronDown,
  Search,
  Menu,
  Bell,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
import Footer from "./Footer";

interface Student {
  nombre: string;
  apellido: string;
  dni: string;
  numero: string
  email: string
}

export default function CreateStudent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Student>({
    nombre: "",
    apellido: "",
    dni: "",
    numero: "",
    email: ""
  });

  const [error, setError] = useState<string | null>(null);

  const handleCancel = () => {
    navigate("/managment");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dniRegex = /^\d{7,8}$/;
    if (!dniRegex.test(formData.dni)) {
      setError("El DNI debe contener entre 7 y 8 dígitos numéricos.");
      return;
    }
    if (!formData.nombre || !formData.apellido || !formData.dni) {
      setError("Por favor, complete todos los campos.");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al crear el estudiante");
      }

      const data = await response.json();
      console.log("Estudiante creado:", data);

      // Resetear el formulario y el error
      setFormData({ nombre: "", apellido: "", dni: "", numero: "", email: "" });
      setError(null);
      alert("Estudiante creado con éxito!");
    } catch (error) {
      setError("Error al crear el estudiante. Intente nuevamente.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white rounded-lg shadow max-w-full mx-auto"     style={{
      backgroundImage: `url("/books.jpg")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "400px",
      borderRadius: "0.5rem", // Esta línea es opcional si usas la clase de Tailwind
    }}>
      <NavBar></NavBar>

      {/* Contenedor del contenido */}
      <div className="flex-grow max-w-md mx-auto bg-[#FFFFFF] px-10 rounded-xl my-5" >
        <h2 className="text-2xl font-semibold mb-6 flex items-center mt-5 ">
          <User className="mr-2" />
          Crear Nuevo Estudiante
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 my-10">
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nombre
            </label>
            <input
  type="text"
  id="nombre"
  name="nombre"
  value={formData.nombre}
  onChange={handleInputChange}
  className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500"
  required
/>

          </div>
          <div>
            <label
              htmlFor="apellido"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Apellido
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border-b border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="dni"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              DNI
            </label>
            <input
              type="text"
              id="dni"
              name="dni"
              value={formData.dni}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border-b border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="dni"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Numero
            </label>
            <input
              type="text"
              id="numero"
              name="numero"
              value={formData.numero}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border-b border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="dni"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border-b border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          {error && (
            <div className="text-red-600 flex items-center">
              <AlertCircle className="mr-2" size={16} />
              {error}
            </div>
          )}
          <div className="flex space-x-4 justify-center">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Crear Estudiante
            </button>

            <button
              onClick={handleCancel}
              className="w-full bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>

      {/* Footer al final de la pantalla */}
          <Footer></Footer>
    </div>
  );
}
