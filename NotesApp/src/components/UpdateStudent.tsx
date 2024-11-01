import React, { useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User, ChevronDown, Search, Menu, Bell } from "lucide-react";

interface Student {
  nombre: string;
  id: number;
  apellido: string;
  dni: string;
}

export default function UpdateStudent() {
  const navigate = useNavigate();
  const location = useLocation();
  const studentToEdit = location.state as Student | undefined; // Obtener el estudiante a editar
  const [formData, setFormData] = useState<Student>({
    nombre: studentToEdit ? studentToEdit.nombre : "",
    id: studentToEdit ? studentToEdit.id : 0,
    apellido: studentToEdit ? studentToEdit.apellido : "",
    dni: studentToEdit ? studentToEdit.dni : "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleCancel = () => {
    navigate("/");
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
    
    const url = studentToEdit
      ? `http://localhost:8080/students/${formData.id}` // URL para actualizar
      : "http://localhost:8080/students"; // URL para crear

    const method = studentToEdit ? "PUT" : "POST"; // Método HTTP

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al editar el estudiante");
      }

      alert("Estudiante editado con éxito!");
      navigate("/"); // Redirigir a la lista de estudiantes
    } catch (error) {
      setError("Error al editar el estudiante. Intente nuevamente.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white rounded-lg shadow max-w-full mx-auto">
      <header className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Menu className="mr-4" />
          <h1 className="text-xl font-bold">Gestión Educativa</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Search />
          <Bell />
          <User />
          <ChevronDown />
        </div>
      </header>

      <div className="flex-grow max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-6 flex items-center mt-5 ">
          <User className="mr-2" />
          Editar Estudiante
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              className="w-full px-3 py-2 border rounded"
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
              className="w-full px-3 py-2 border rounded"
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
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex space-x-4 justify-center">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Editar Estudiante
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
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>
          &copy; 2024 ITEC 3° año Analista y Programador de Sistemas. Todos los
          derechos reservados.
        </p>
      </footer>
    </div>
  );
}
