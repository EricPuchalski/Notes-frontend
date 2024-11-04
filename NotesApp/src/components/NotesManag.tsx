import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import {
  Search,
  Plus,
  ArrowUpDown,
  Calendar,
  Book,
  UserSquare,
  Award,
  Edit,
  Trash2,
  Info,
  Filter,
} from "lucide-react";
import Footer from "./Footer";
import NavBar from "./Navbar";

interface Note {
  id: number;
  nota: number;
  year: number;
  subjectName: string;
  dniStudent: string;
  date: string;
}

type NotaKey = keyof Note;

interface SortConfig {
  key: NotaKey | null; // Permitir null
  direction: "ascending" | "descending";
}

export const NotesManag = () => {
  const [notas, setNotas] = useState<Note[]>([]);
  const [filteredNotas, setFilteredNotas] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "ascending",
  });
  const [filterMateria, setFilterMateria] = useState("");
  const [filterAño, setFilterAño] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const navigate = useNavigate();

  const fetchNotas = async () => {
    try {
      const response = await fetch("http://localhost:8080/final-notes");
      const data: Note[] = await response.json();
      setNotas(data);
      setFilteredNotas(data);
    } catch (error) {
      console.error("Error fetching notas:", error);
    }
  };

  useEffect(() => {
    fetchNotas();
  }, []);

  useEffect(() => {
    let result = notas;
    if (searchTerm) {
      result = result.filter(
        (nota) =>
          nota.dniStudent.includes(searchTerm) ||
          nota.subjectName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterMateria) {
      result = result.filter((nota) => nota.subjectName === filterMateria);
    }
    if (filterAño) {
      result = result.filter((nota) => nota.year.toString() === filterAño);
    }
    setFilteredNotas(result);
  }, [searchTerm, filterMateria, filterAño, notas]);

  const handleCreate = () => {
    navigate("/notes/create");
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/final-notes/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Nota eliminada con éxito!");
        // Actualizar la lista de notas después de eliminar una nota
        fetchNotas();
      } else {
        alert("Error al eliminar la nota. Por favor, inténtelo de nuevo.");
      }
    } catch (error) {
      console.error("Error al eliminar la nota:", error);
      alert("Error al eliminar la nota. Por favor, inténtelo de nuevo.");
    }
  };

  const handleSort = (key: NotaKey) => {
    let direction: "ascending" | "descending" = "ascending";

    // Verifica si el key actual es el mismo que el que se está pasando
    if (sortConfig.key === key) {
      direction =
        sortConfig.direction === "ascending" ? "descending" : "ascending";
    }

    setSortConfig({ key, direction });
    // Ordena las notas
    setFilteredNotas((prevNotas) => {
      const sortedNotas = [...prevNotas].sort((a, b) => {
        const aValue = a[key] as any; // cast to any for dynamic access
        const bValue = b[key] as any; // cast to any for dynamic access
        if (aValue < bValue) return direction === "ascending" ? -1 : 1;
        if (aValue > bValue) return direction === "ascending" ? 1 : -1;
        return 0;
      });
      return sortedNotas;
    });
  };

  const materias = [...new Set(notas.map((nota) => nota.subjectName))];
  const años = [...new Set(notas.map((nota) => nota.year))];

  const getNotaBadgeColor = (nota: number) => {
    if (nota >= 9) return "bg-green-500";
    if (nota >= 7) return "bg-blue-500";
    if (nota >= 6) return "bg-yellow-500";
    return "bg-red-500";
  };

  const handleAddNota = (e: any) => {
    e.preventDefault();
    // Add logic to handle new nota submission
    setIsAddDialogOpen(false);
  };
  
  return (

      
    <div className="flex flex-col min-h-screen w-full h-full"> {/* Contenedor principal */}
    <NavBar />

    <div className="flex-grow"> {/* Esta parte ocupa el espacio restante */}
      <CardHeader className="bg-[#FFFFFF]">
        <div className="flex justify-around items-center ">
          <CardTitle className="text-3xl font-bold text-black flex items-center">
            <Award className="mr-2" /> Listado de Notas
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  className="bg-[#70b000] text-[#2d039c] hover:bg-[#456807]"
                  onClick={handleCreate}
                >
                  <Plus  className="mr-2 h-4 w-4" /> Añadir Nota
                </Button>
              </TooltipTrigger>
              {/* <TooltipContent>
                <p>Agregar una nueva nota</p>
              </TooltipContent> */}
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar por DNI o materia"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={filterMateria} onValueChange={setFilterMateria}>
              <SelectTrigger className="w-[180px] bg-white border border-gray-300">
                <Book className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filtrar por materia" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300">
                <SelectItem value=" ">Todas las materias</SelectItem>
                {materias.map((materia) => (
                  <SelectItem key={materia} value={materia}>
                    {materia}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterAño} onValueChange={setFilterAño}>
              <SelectTrigger className="w-[180px] bg-white border border-gray-300">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filtrar por año" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300">
                <SelectItem value=" ">Todos los años</SelectItem>
                {años.map((año) => (
                  <SelectItem key={año} value={año.toString()}>
                    {año}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
        <Table>
  <TableHeader className="bg-gray-100">
    <TableRow>
      <TableHead className="w-[100px]">
        <Button
          variant="ghost"
          onClick={() => handleSort("nota")}
          className="font-semibold"
        >
          Nota{" "}
          {sortConfig.key === "nota" && (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      </TableHead>
      <TableHead>
        <Button
          variant="ghost"
          onClick={() => handleSort("year")}
          className="font-semibold"
        >
          Año cursada{" "}
          {sortConfig.key === "year" && (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      </TableHead>
      <TableHead>
        <Button
          variant="ghost"
          onClick={() => handleSort("subjectName")}
          className="font-semibold"
        >
          Materia{" "}
          {sortConfig.key === "subjectName" && (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      </TableHead>
      <TableHead>
        <Button
          variant="ghost"
          onClick={() => handleSort("dniStudent")}
          className="font-semibold"
        >
          DNI Estudiante{" "}
          {sortConfig.key === "dniStudent" && (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      </TableHead>
      <TableHead>
        <Button
          variant="ghost"
          onClick={() => handleSort("date")}
          className="font-semibold"
        >
          Fecha registro{" "}
          {sortConfig.key === "date" && (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      </TableHead>
      <TableHead>Acciones</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {filteredNotas.map((finalNote) => (
      <TableRow key={finalNote.id} className="hover:bg-gray-50">
        <TableCell>
          <Badge
            className={`${getNotaBadgeColor(finalNote.nota)} text-white`}
          >
            {finalNote.nota.toFixed(1)}
          </Badge>
        </TableCell>
        <TableCell>{finalNote.year}</TableCell>
        <TableCell>{finalNote.subjectName}</TableCell>
        <TableCell>{finalNote.dniStudent}</TableCell>
        <TableCell>{finalNote.date.toLocaleString()}</TableCell>
        <TableCell>
          <div className="flex space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(finalNote.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent >
                <p>Eliminar nota</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
        </div>
      </CardContent>
    </div>

        <Footer></Footer>
  </div>
  
  );
};
