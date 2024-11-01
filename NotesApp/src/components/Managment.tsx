import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  Menu,
  Pencil,
  Plus,
  Search,
  Trash2,
  User,
} from "lucide-react";
import NavBar from "./Navbar";
import Footer from "./Footer";

interface Student {
  dni: string;
  nombre: string;
  apellido: string;
}

interface Subject {
  id: number;
  nombre: string;
  anio: string;
}
interface Inscription {
  [x: string]: any;
  id: number;
  dniEstudiante: string;
  idMateria: number;
}

export default function GestionEducativa() {
  const navigate = useNavigate();
  const [currentPageStudents, setCurrentPageStudents] = useState(1); // Página actual
  const [currentPageSubjects, setCurrentPageSubjects] = useState(1); // Página actual
  // Paginacion estudiantes
  const itemsPerPage = 8;
  const indexOfLastItem = currentPageStudents * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const [isLoading, setIsLoading] = useState(false);
  const [inscriptions, setInscriptions] = useState<Inscription[]>([]);
  const [students, setAlumnos] = useState<Student[]>([]);
  const [searchDni, setSearchDni] = useState("");
  const [activeTab, setActiveTab] = useState("estudiantes");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newSubject, setNewSubject] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Estado para el mensaje de error
  const [newYear, setNewYear] = useState("");
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [newInscription, setNewInscription] = useState<Omit<Inscription, "id">>(
    {
      dniEstudiante: "",
      idMateria: 0,
    }
  );

  //paginacion de materias
  const subjectsPerPage = 8; // o el número que prefieras
  const indexOfLastSubject = currentPageSubjects * subjectsPerPage;
  const indexOfFirstSubject = indexOfLastSubject - subjectsPerPage;
  const currentSubjects = subjects.slice(
    indexOfFirstSubject,
    indexOfLastSubject
  );

  const totalSubjectPages = Math.ceil(subjects.length / subjectsPerPage);

  //Paginacion de inscripciones
  const [currentPageInscriptions, setCurrentPageInscriptions] = useState(1);
  const [inscriptionsPerPage] = useState(10); // Número de inscripciones por página
  const totalInscriptionPages = Math.ceil(
    inscriptions.length / inscriptionsPerPage
  ); // Total de páginas

  const indexOfLastInscription = currentPageInscriptions * inscriptionsPerPage;
  const indexOfFirstInscription = indexOfLastInscription - inscriptionsPerPage;
  const currentInscriptions = inscriptions.slice(
    indexOfFirstInscription,
    indexOfLastInscription
  );

  const handleNextInscriptionPage = () => {
    if (currentPageInscriptions < totalInscriptionPages) {
      setCurrentPageInscriptions(currentPageInscriptions + 1);
    }
  };

  const handlePrevInscriptionPage = () => {
    if (currentPageInscriptions > 1) {
      setCurrentPageInscriptions(currentPageInscriptions - 1);
    }
  };

  const handleNextSubjectPage = () => {
    if (currentPageSubjects < totalSubjectPages) {
      setCurrentPageSubjects(currentPageSubjects + 1);
    }
  };

  const handlePrevSubjectPage = () => {
    if (currentPageSubjects > 1) {
      setCurrentPageSubjects(currentPageSubjects - 1);
    }
  };

  const filteredStudents = students.filter((student) =>
    student.dni?.includes(searchDni)
  );

  const currentStudents = filteredStudents.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage); // Número total de páginas

  const handleNextPage = () => {
    if (currentPageStudents < totalPages) {
      setCurrentPageStudents(currentPageStudents + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageStudents > 1) {
      setCurrentPageStudents(currentPageStudents - 1);
    }
  };

  const handleNewStudent = () => {
    navigate("create-student");
  };

  const handleEditStudent = (student: Student) => {
    navigate(`/students/edit`, { state: student });
  };

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const response = await fetch("http://localhost:8080/students");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAlumnos(data);
      } catch (error) {
        console.error("Error fetching alumnos:", error);
      }
    };

    fetchAlumnos();
  }, []);

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const response = await fetch("http://localhost:8080/subjects");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchMaterias();
  }, []);

  useEffect(() => {
    const fetchInscripciones = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/inscriptions/active"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setInscriptions(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching inscriptions:", error);
      }
    };
    fetchInscripciones();
  }, []);

  const handleCreateInscription = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(""); // Limpiar el mensaje de error antes de comenzar

    try {
      // Verificar si el estudiante existe
      const studentResponse = await fetch(
        `http://localhost:8080/students/dni/${newInscription.dniEstudiante}`
      );

      if (!studentResponse.ok) {
        throw new Error("Error al verificar el estudiante");
      }

      const student = await studentResponse.json();

      // Si el estudiante no existe, mostrar mensaje de error
      if (!student) {
        setErrorMessage(
          `No existe el estudiante con el DNI ingresado: ${newInscription.dniEstudiante}`
        );
        setIsLoading(false);
        return; // Salir de la función si el estudiante no existe
      }

      // Realizar la petición a la API para crear la inscripción
      const response = await fetch("http://localhost:8080/inscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInscription),
      });

      if (!response.ok) {
        throw new Error("Error al crear la inscripción");
      }

      const result = await response.json();
      setInscriptions([...inscriptions, result]);
      setNewInscription({ dniEstudiante: "", idMateria: 0 });
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(
        `No existe el estudiante con el DNI ingresado: ${newInscription.dniEstudiante}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSubject = async () => {
    // Asegúrate de que newYear sea un número y no esté vacío
    if (!newSubject.trim() || !newYear.trim() || isNaN(parseInt(newYear)))
      return;

    console.log(newYear);

    try {
      const response = await fetch("http://localhost:8080/subjects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre: newSubject, anio: parseInt(newYear) }), // Convierte newYear a número
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(newYear);
      const createdSubject = await response.json();
      setSubjects((prev) => [...prev, createdSubject]);
      setNewSubject("");
      setNewYear(""); // Reseteamos el campo del año
      console.log(createdSubject);
    } catch (error) {
      console.error("Error creando materia:", error);
    }
  };

  const handleDeleteStudent = async (dni: string) => {
    if (
      !window.confirm("¿Estás seguro de que quieres eliminar este estudiante?")
    ) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/students/disable/${dni}`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error(`Error eliminando estudiante: ${response.status}`);
      }

      // Filtra el estudiante eliminado de la lista de estudiantes
      setAlumnos((prevStudents) =>
        prevStudents.filter((student) => student.dni !== dni)
      );
    } catch (error) {
      console.error("Error eliminando estudiante:", error);
    }
  };

  return (
    <>
    <NavBar></NavBar>
    <div className="flex flex-col min-h-screen bg-gray-100 bg-[url('/books.jpg')] bg-cover bg-center">
        <main className="flex-grow p-6 max-w-4xl mx-auto w-full">
          <div className="flex space-x-4 mb-4">
            {["estudiantes", "materias"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 font-medium rounded-md ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          {activeTab === "estudiantes" && (
            <div className="bg-white p-6 rounded-lg shadow mt-422">
              <h2 className="text-xl font-semibold mb-4">
                Lista de Estudiantes
              </h2>
              <button
                onClick={handleNewStudent}
                className="bg-[#1e8449] hover:bg-[#138d75] text-white font-bold py-2 px-4 my-5 rounded inline-flex items-center transition-colors duration-300"
              >
                <Plus className="mr-2" size={20} />
                Nuevo Alumno
              </button>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Buscar por DNI"
                  value={searchDni}
                  onChange={(e) => setSearchDni(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-2">DNI</th>
                    <th className="text-left p-2">Nombre</th>
                    <th className="text-left p-2">Apellido</th>
                    <th className="text-left p-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentStudents.map((student) => (
                    <tr key={student.dni} className="hover:bg-gray-50">
                      <td className="p-2">{student.dni}</td>
                      <td className="p-2">{student.nombre}</td>
                      <td className="p-2">{student.apellido}</td>
                      <td className="p-2">
                        <div className="flex space-x-2">
                          <button
                            className="p-2 hover:bg-green-700 rounded"
                            onClick={() => handleEditStudent(student)}
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            className="p-2 hover:bg-red-700 rounded"
                            onClick={() => handleDeleteStudent(student.dni)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Botones de paginación fuera de la tabla */}
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPageStudents === 1}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Anterior
                </button>
                <span>
                  Página {currentPageStudents} de {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPageStudents === totalPages}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {activeTab === "materias" && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Lista de Materias</h2>
              <div className="mb-4 flex space-x-2">
                <input
                  type="text"
                  placeholder="Nueva materia"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="flex-grow px-3 py-2 border rounded-l-md"
                />
                <button
                  onClick={handleCreateSubject}
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                >
                  <Plus size={20} />
                </button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-2">Nombre</th>
                    <th className="text-left p-2">Año</th>
                    <th className="text-left p-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSubjects.map((subject) => (
                    <tr key={subject.id} className="hover:bg-gray-50">
                      <td className="p-2">
                        {editingSubject?.id === subject.id ? (
                          <input
                            type="text"
                            value={editingSubject.nombre}
                            onChange={(e) =>
                              setEditingSubject({
                                ...editingSubject,
                                nombre: e.target.value,
                              })
                            }
                            className="w-full px-2 py-1 border rounded"
                          />
                        ) : (
                          subject.nombre
                        )}
                      </td>
                      <td className="p-2">
                        {editingSubject?.id === subject.id ? (
                          <input
                            type="number"
                            value={editingSubject.anio}
                            onChange={(e) =>
                              setEditingSubject({
                                ...editingSubject,
                                anio: e.target.value,
                              })
                            }
                            className="w-full px-2 py-1 border rounded"
                          />
                        ) : (
                          subject.anio
                        )}
                      </td>
                      <td className="p-2">
                        <div className="flex space-x-2">
                          {editingSubject?.id === subject.id ? (
                            <button
                              // onClick={() => handleUpdateSubject(editingSubject)}
                              className="p-1 hover:bg-green-200 rounded text-green-600"
                            >
                              Guardar
                            </button>
                          ) : (
                            <button
                              // onClick={() => handleEditSubject(subject)}
                              className="p-2 hover:bg-green-700 rounded"
                            >
                              <Pencil size={16} />
                            </button>
                          )}
                          <button
                            // onClick={() => handleDeleteSubject(subject.id)}
                            className="p-1 hover:bg-red-700 rounded"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={handlePrevSubjectPage}
                  disabled={currentPageSubjects === 1}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Anterior
                </button>
                <span>
                  Página {currentPageSubjects} de {totalPages}
                </span>
                <button
                  onClick={handleNextSubjectPage}
                  disabled={currentPageSubjects === totalPages}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}
         {/* {activeTab === "inscripciones" && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6 text-indigo-700">
                Inscripciones
              </h2>
              <form
                onSubmit={handleCreateInscription}
                className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
              >
                <div>
                  <label
                    htmlFor="studentDni"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    DNI del Estudiante
                  </label>
                  <input
                    type="text"
                    id="studentDni"
                    value={newInscription.dniEstudiante}
                    onChange={(e) =>
                      setNewInscription({
                        ...newInscription,
                        dniEstudiante: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="subjectId"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    ID de la Materia
                  </label>
                  <select
                    id="subjectId"
                    value={newInscription.idMateria}
                    onChange={(e) =>
                      setNewInscription({
                        ...newInscription,
                        idMateria: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="">Seleccione una materia</option>
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-3">
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    disabled={isLoading}
                  >
                    {isLoading ? "Inscribiendo..." : "Inscribir"}
                  </button>
                </div>
              </form>

              {errorMessage && (
                <div className="text-red-600 mb-4">{errorMessage}</div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-indigo-50">
                    <tr>
                      <th className="text-left p-3 text-indigo-700">
                        DNI del Estudiante
                      </th>
                      <th className="text-left p-3 text-indigo-700">
                        ID de la Materia
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentInscriptions.map(
                      (
                        inscription // Cambiado a currentInscriptions
                      ) => (
                        <tr
                          key={inscription.id}
                          className="border-b border-gray-200 hover:bg-indigo-50 transition duration-150 ease-in-out"
                        >
                          <td className="p-3">{inscription.estudiante.dni}</td>
                          <td className="p-3">{inscription.materia.nombre}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={handlePrevInscriptionPage}
                  disabled={currentPageInscriptions === 1}
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                >
                  Anterior
                </button>
                <span>
                  Página {currentPageInscriptions} de {totalInscriptionPages}
                </span>
                <button
                  onClick={handleNextInscriptionPage}
                  disabled={currentPageInscriptions === totalInscriptionPages}
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )} */}
        </main>
        <Footer></Footer>
      </div>
    </>
  );
}
