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

// Mock data for notes
const mockNotas = [
  {
    id: 1,
    nota: 8.5,
    año: 2023,
    materia: "Matemáticas",
    dni: "12345678",
    fecha: "2023-05-15",
  },
  {
    id: 2,
    nota: 7.0,
    año: 2023,
    materia: "Lengua",
    dni: "23456789",
    fecha: "2023-05-20",
  },
  {
    id: 3,
    nota: 9.0,
    año: 2023,
    materia: "Historia",
    dni: "34567890",
    fecha: "2023-05-25",
  },
  {
    id: 4,
    nota: 6.5,
    año: 2023,
    materia: "Geografía",
    dni: "45678901",
    fecha: "2023-06-01",
  },
  {
    id: 5,
    nota: 8.0,
    año: 2023,
    materia: "Física",
    dni: "56789012",
    fecha: "2023-06-05",
  },
];

// Define un tipo para las claves de los objetos que estás usando
type NotaKey = "id" | "nota" | "año" | "materia" | "dni" | "fecha";

// Define el tipo de sortConfig
interface SortConfig {
  key: NotaKey | null; // Permitir null
  direction: "ascending" | "descending";
}

export const NotesManag = () => {
  const [notas, setNotas] = useState(mockNotas);
  const [filteredNotas, setFilteredNotas] = useState(mockNotas);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "ascending",
  }); // Solo aquí
  const [filterMateria, setFilterMateria] = useState("");
  const [filterAño, setFilterAño] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/notes/create");
  };

  useEffect(() => {
    let result = notas;
    if (searchTerm) {
      result = result.filter(
        (nota) =>
          nota.dni.includes(searchTerm) ||
          nota.materia.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterMateria) {
      result = result.filter((nota) => nota.materia === filterMateria);
    }
    if (filterAño) {
      result = result.filter((nota) => nota.año.toString() === filterAño);
    }
    setFilteredNotas(result);
  }, [searchTerm, filterMateria, filterAño, notas]);

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

  const materias = [...new Set(notas.map((nota) => nota.materia))];
  const años = [...new Set(notas.map((nota) => nota.año))];

  const getNotaBadgeColor = (nota: number) => {
    if (nota >= 9) return "bg-green-500";
    if (nota >= 7) return "bg-blue-500";
    if (nota >= 5) return "bg-yellow-500";
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
                    onClick={() => handleSort("año")}
                    className="font-semibold"
                  >
                    Año{" "}
                    {sortConfig.key === "año" && (
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("materia")}
                    className="font-semibold"
                  >
                    Materia{" "}
                    {sortConfig.key === "materia" && (
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("dni")}
                    className="font-semibold"
                  >
                    DNI{" "}
                    {sortConfig.key === "dni" && (
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("fecha")}
                    className="font-semibold"
                  >
                    Fecha{" "}
                    {sortConfig.key === "fecha" && (
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNotas.map((nota) => (
                <TableRow key={nota.id} className="hover:bg-gray-50">
                  <TableCell>
                    <Badge
                      className={`${getNotaBadgeColor(nota.nota)} text-white`}
                    >
                      {nota.nota.toFixed(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{nota.año}</TableCell>
                  <TableCell>{nota.materia}</TableCell>
                  <TableCell>{nota.dni}</TableCell>
                  <TableCell>{nota.fecha}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4 text-blue-500" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Editar nota</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Eliminar nota</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Info className="h-4 w-4 text-gray-500" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Ver detalles</p>
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

      {/* <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Añadir Nueva Nota</DialogTitle>
            <DialogDescription>
              Complete los detalles para agregar una nueva nota.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddNota}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nota" className="text-right">
                  Nota
                </Label>
                <Input
                  id="nota"
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="materia" className="text-right">
                  Materia
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccionar materia" />
                  </SelectTrigger>
                  <SelectContent>
                    {materias.map((materia) => (
                      <SelectItem key={materia} value={materia}>
                        {materia}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dni" className="text-right">
                  DNI
                </Label>
                <Input id="dni" type="text" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fecha" className="text-right">
                  Fecha
                </Label>
                <Input
                  id="fecha"
                  type="date"
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <Dialog>
              <Button type="submit">Guardar</Button>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancelar
              </Button>
            </Dialog>
          </form>
        </DialogContent>
      </Dialog> */}
    </div>

        <Footer></Footer>
  </div>
  
  );
};
