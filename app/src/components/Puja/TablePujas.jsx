import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import PujaService from "@/services/PujaService";
import { LoadingGrid } from "../ui/custom/LoadingGrid";
import { ErrorAlert } from "../ui/custom/ErrorAlert";
import { EmptyState } from "../ui/custom/EmptyState";

const pujaColumns = [
  { key: "usuario", label: "Usuario" },
  { key: "montoOfertado", label: "Monto Ofertado" },
  { key: "fechaPuja", label: "Fecha Puja" },
];

export default function TablePujas() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pujas, setPujas] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PujaService.getPujasbySubasta(id);
        const result = response.data;

        // Si el backend responde correctamente
        if (result.success) {
          setPujas(result.data);
        } else {
          setError(result.message || "Error al obtener las pujas");
        }

      } catch (err) {

        // 🔥 Si el backend devuelve 404 (no hay pujas o no existe)
        if (err.response && err.response.status === 404) {
          setPujas([]); // Lo tratamos como subasta sin pujas
        } else {
          setError("Error al conectar con el servidor");
        }

      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <LoadingGrid type="grid" />;

  if (error)
    return (
      <ErrorAlert
        title="Error al cargar pujas"
        message={error}
      />
    );

  return (
    <div className="container mx-auto py-8">
      
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Historial de Pujas
        </h1>
      </div>

      {pujas.length === 0 ? (
        <EmptyState message="Esta subasta aún no tiene pujas registradas." />
      ) : (
        <div className="rounded-md border border-white/10">
          <Table>
            <TableHeader className="bg-primary/50">
              <TableRow>
                {pujaColumns.map((col) => (
                  <TableHead
                    key={col.key}
                    className="text-left font-semibold"
                  >
                    {col.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {pujas.map((puja) => (
                <TableRow key={puja.idPuja}>
                  <TableCell className="font-medium">
                    {puja.usuario.nombre}
                  </TableCell>

                  <TableCell>
                    ${Number(puja.montoOfertado).toLocaleString()}
                  </TableCell>

                  <TableCell>
                    {puja.fechaPuja}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Button
        type="button"
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 bg-accent text-white hover:bg-accent/90 mt-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Regresar
      </Button>

    </div>
  );
}