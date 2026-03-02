import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SubastaService from "@/services/SubastaService";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Clock, Zap, Globe, Gavel } from "lucide-react";

export function SubastaDetail() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [pujas, setPujas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = import.meta.env.VITE_BASE_URL + "uploads";

  useEffect(() => {
    const fetchData = async () => {
      try {
        //  Traer subasta
        const response = await SubastaService.getSubastaById(id);
        setData(response.data.data || response.data);

        //  Traer historial de pujas
        const responsePujas = await SubastaService.getPujasBySubasta(id);

        const pujasData =
          responsePujas.data?.data || responsePujas.data || [];

        setPujas(Array.isArray(pujasData) ? pujasData : []);

      } catch (err) {
        console.error(err);
        setError("Error al cargar la subasta");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formatFecha = (fecha) => {
    if (!fecha || fecha.startsWith("0000")) return "No definida";
    return new Date(fecha).toLocaleString();
  };

  const getEstado = () => {
    if (!data?.fechaInicio || !data?.fechaCierre) return "No definido";

    const ahora = new Date();
    const inicio = new Date(data.fechaInicio);
    const cierre = new Date(data.fechaCierre);

    if (ahora < inicio) return "Pendiente";
    if (ahora >= inicio && ahora <= cierre) return "Activa";
    if (ahora > cierre) return "Finalizada";

    return "Desconocido";
  };

  const estado = getEstado();

  const colorEstado =
    estado === "Activa"
      ? "text-green-400"
      : estado === "Finalizada"
      ? "text-red-400"
      : estado === "Pendiente"
      ? "text-yellow-400"
      : "text-gray-400";

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        Cargando detalle...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-red-500">
        {error}
      </div>
    );

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        No se encontró la subasta
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] p-8">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* CARD PRINCIPAL */}
        <Card className="relative overflow-hidden border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl">

          <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-yellow-400/20 via-purple-500/10 to-transparent pointer-events-none" />

          <CardHeader className="text-center relative z-10 pb-4">
            <CardTitle className="text-3xl font-bold text-yellow-400 flex items-center justify-center gap-3">
              <Sparkles className="w-6 h-6" />
              Subasta #{data.idSubasta}
            </CardTitle>

            <div className="flex justify-center gap-4 mt-4 flex-wrap">
              <Badge className="bg-yellow-400 text-black px-4 py-1 text-sm shadow-md">
                Precio: ${data.precio}
              </Badge>

              <Badge className="bg-purple-500 text-white px-4 py-1 text-sm shadow-md">
                Incremento: ${data.incrementoMin}
              </Badge>

              <Badge className="bg-green-500 text-white px-4 py-1 text-sm shadow-md">
                Pujas: {pujas.length}
              </Badge>
            </div>
          </CardHeader>

          {/* IMAGEN */}
          <div className="relative w-full h-[500px] bg-gradient-to-br from-black via-[#0f172a] to-black flex items-center justify-center overflow-hidden">
            {data.carta?.imagenes?.length > 0 ? (
              <img
                src={`${BASE_URL}/${data.carta.imagenes[0].imagen}`}
                alt={data.carta?.nombre}
                className="max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-105"
              />
            ) : (
              <div className="text-white/40 text-lg">
                Sin imagen disponible
              </div>
            )}
          </div>

          {/* INFO */}
          <CardContent className="p-8 space-y-4 text-white relative z-10">

            <p className="flex items-center gap-2 text-lg">
              <Zap className="w-5 h-5 text-blue-400" />
              Carta: {data.carta?.nombre}
            </p>

            <p className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-400" />
              Fecha inicio: {formatFecha(data.fechaInicio)}
            </p>

            <p className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-green-400" />
              Fecha cierre: {formatFecha(data.fechaCierre)}
            </p>

            <p className={`flex items-center gap-2 font-semibold ${colorEstado}`}>
              <Gavel className="w-5 h-5" />
              Estado: {estado}
            </p>

          </CardContent>
        </Card>

        {/* HISTORIAL */}
        <Card className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-400">
              🏆 Historial de Pujas
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">

            {pujas.length === 0 ? (
              <p className="text-white/40">
                Aún no hay pujas registradas.
              </p>
            ) : (
              [...pujas]   
                .sort((a, b) => new Date(b.fechaPuja) - new Date(a.fechaPuja))
                .map((puja) => (
                  <div
                    key={puja.idPuja}
                    className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-[#0f172a] to-[#1e293b] border border-white/5 hover:scale-[1.02] transition"
                  >
                    <div>
                      <p className="text-white font-semibold">
                        Usuario: {puja.usuario?.nombre || "Usuario"}
                      </p>
                      <p className="text-xs text-white/50">
                        {formatFecha(puja.fechaPuja)}
                      </p>
                    </div>

                    <div className="text-green-400 font-bold text-lg">
                      ${puja.monto}
                    </div>
                  </div>
                ))
            )}

          </CardContent>
        </Card>

      </div>
    </div>
  );
}