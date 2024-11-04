import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import NavBar from "./Navbar";
import { useNavigate } from "react-router-dom";

// Define el tipo para formData que contiene todos los campos
type FormData = {
  nota: string;
  año: string;
  materia: string;
  dni: string;
};

// Define el tipo para errores, coincidiendo con las propiedades de formData
type Errors = {
  [key in keyof FormData]?: string;
};
interface Subject {
  id: number;
  name: string;
  tacher: string;
  careerName: string;
}

export default function Nota() {
  const navigate = useNavigate();
  const [materias, setMaterias] = useState<Subject[]>([]);
  const [formData, setFormData] = useState<FormData>({
    nota: "",
    año: "",
    materia: "",
    dni: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetch("http://localhost:8080/subjects")
      .then((response) => response.json())
      .then((data) => setMaterias(data))
      .catch((error) => console.error("Error al obtener materias:", error));
  }, []);

  const checkStudentExists = async (dni: string) => {
    try {
      const response = await fetch(`http://localhost:8080/students/${dni}`);
      if (response.ok) {
        const student = await response.json();
        return student;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error al verificar estudiante:", error);
      return null;
    }
  };

  const validateForm = async () => {
    let newErrors: Errors = {};
    if (
      !formData.nota ||
      isNaN(Number(formData.nota)) ||
      Number(formData.nota) < 0 ||
      Number(formData.nota) > 10
    ) {
      newErrors.nota = "La nota debe ser un número entre 0 y 10";
    }
    if (!formData.año || isNaN(Number(formData.año))) {
      newErrors.año = "El año debe ser un número válido";
    } else {
      const currentYear = new Date().getFullYear();
      if (Number(formData.año) < 2004 || Number(formData.año) > currentYear) {
        newErrors.año = `El año debe estar entre 2004 y ${currentYear}`;
      }
    }
    if (!formData.materia) {
      newErrors.materia = "Debe seleccionar una materia";
    }
    if (!formData.dni || !/^\d{8}$/.test(formData.dni)) {
      newErrors.dni = "El DNI debe tener 8 dígitos";
    } else {
      const student = await checkStudentExists(formData.dni);
      if (!student) {
        newErrors.dni = "No existe un estudiante con el DNI ingresado";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
    


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await validateForm()) {
      // Enviar los datos del formulario a http://localhost:8080/final-notes usando POST
      try {
        const response = await fetch("http://localhost:8080/final-notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nota: Number(formData.nota),
            year: Number(formData.año),
            subjectName: formData.materia,
            dniStudent: formData.dni,
          }),
        });
        if (response.ok) {
          alert("Nota registrada con éxito!");
          setFormData({
            nota: "",
            año: "",
            materia: "",
            dni: "",
          });
        } else {
          alert("Error al registrar la nota. Por favor, inténtelo de nuevo.");
        }
      } catch (error) {
        console.error("Error al registrar la nota:", error);
        alert("Error al registrar la nota. Por favor, inténtelo de nuevo.");
      }
    }
  };
  const handleCancel = () => {
    navigate("/notes");
  };
  return (
    <>
      <NavBar></NavBar>
      <div
        className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: "url('/notes.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* El contenido del formulario va aquí */}

        <div className="max-w-md w-full space-y-8">
          <form
            className="mt-8 space-y-6 bg-[#1b3906] p-8 shadow-md rounded-lg"
            onSubmit={handleSubmit}
            style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
          >
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-[#9cff53]">
                Registro de Nota
              </h2>
            </div>
            <div className="rounded-md space-y-4">
              <div>
                <label htmlFor="nota" className="sr-only">
                  Nota
                </label>
                <input
                  id="nota"
                  name="nota"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2 pb-1 border-b border-gray-300 bg-[#1b3906] text-white focus:outline-none focus:ring-[#2d039c] focus:border-[#f7c554] sm:text-sm"
                  placeholder="Nota (0-10)"
                  value={formData.nota}
                  onChange={handleChange}
                />
                {errors.nota && (
                  <p className="text-red-500 text-xs italic">{errors.nota}</p>
                )}
              </div>

              <div>
                <label htmlFor="año" className="sr-only">
                  Año
                </label>
                <input
                  id="año"
                  name="año"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2 pb-1 border-b border-gray-300 bg-[#1b3906] text-white focus:outline-none focus:ring-[#2d039c] focus:border-[#f7c554] sm:text-sm"
                  placeholder="Año"
                  value={formData.año}
                  onChange={handleChange}
                />
                {errors.año && (
                  <p className="text-red-500 text-xs italic">{errors.año}</p>
                )}
              </div>

              <div>
                <label htmlFor="materia" className="sr-only">
                  Materia
                </label>
                <select
                  id="materia"
                  name="materia"
                  required
                  className="appearance-none relative block w-full px-3 py-2 pb-1 border-b border-gray-300 bg-[#1b3906] text-white focus:outline-none focus:ring-[#2d039c] focus:border-[#f7c554] sm:text-sm"
                  value={formData.materia}
                  onChange={handleChange}
                >
                  <option value="">Seleccione una materia</option>
                  {materias.map((materia) => (
                    <option key={materia.id} value={materia.name}>
                      {materia.name}
                    </option>
                  ))}
                </select>
                {errors.materia && (
                  <p className="text-red-500 text-xs italic">
                    {errors.materia}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="dni" className="sr-only">
                  DNI
                </label>
                <input
                  id="dni"
                  name="dni"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2 pb-1 border-b border-gray-300 bg-[#1b3906] text-white focus:outline-none focus:ring-[#2d039c] focus:border-[#f7c554] sm:text-sm"
                  placeholder="DNI"
                  value={formData.dni}
                  onChange={handleChange}
                />
                {errors.dni && (
                  <p className="text-red-500 text-xs italic">{errors.dni}</p>
                )}
              </div>
            </div>

            <div className="flex justify-around gap-4">
              {" "}
              {/* Agregar gap-4 */}
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#110e58] hover:bg-[#20027a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2d039c]"
              >
                Registrar Nota
              </button>
              <button
                onClick={handleCancel}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#851306] hover:bg-[#5f0c03] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2d039c]"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
