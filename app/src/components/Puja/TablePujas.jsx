import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PujaService from "@/services/PujaService";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { ArrowLeft, Crown, Sparkles } from "lucide-react";

export default function TablePujas() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pujas, setPujas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PujaService.getPujasbySubasta(id);
        const result = response.data;

        if (result.success) {
          const sorted = [...result.data].sort(
            (a, b) => b.montoOfertado - a.montoOfertado
          );
          setPujas(sorted);
        }
      } catch {
        setPujas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        Cargando Arena Pokémon...
      </div>
    );

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] p-8">

      {/* PARTICULAS FLOTANTES */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl top-10 left-10 animate-float" />
        <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl bottom-20 right-10 animate-float" />
      </div>

      <div className="relative max-w-4xl mx-auto space-y-10">

        {/* HEADER */}
        <div className="text-center space-y-4 animate-fadeUp">
          <h1 className="text-4xl font-extrabold text-yellow-400 flex items-center justify-center gap-3">
            <Sparkles className="w-7 h-7 animate-float" />
            Arena de Pujas
          </h1>

          {/* CONTADOR ANIMADO */}
          <div className="flex justify-center">
            <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-black text-lg px-6 py-2 shadow-xl animate-glow">
              Total de Pujas: {pujas.length}
            </Badge>
          </div>
        </div>

        {/* LISTA */}
        {pujas.length === 0 ? (
          <Card className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-10 text-center text-white animate-fadeUp">
            No hay entrenadores aún ⚡
          </Card>
        ) : (
          <div className="space-y-6">
            {pujas.map((puja, index) => {
              const isChampion = index === 0;

              return (
                <Card
                  key={puja.idPuja}
                  className={`relative overflow-hidden rounded-3xl p-6 border backdrop-blur-xl transition-all duration-500 animate-fadeUp
                  ${
                    isChampion
                      ? "bg-gradient-to-br from-yellow-400/20 via-yellow-300/10 to-transparent border-yellow-400 animate-glow"
                      : "bg-white/10 border-white/10 hover:scale-[1.03]"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Shimmer campeón */}
                  {isChampion && (
                    <div className="absolute inset-0 animate-shimmer pointer-events-none" />
                  )}

                  <div className="flex justify-between items-center relative z-10">

                    {/* IZQUIERDA */}
                    <div className="flex items-center gap-4">

                      <div
                        className={`w-14 h-14 flex items-center justify-center rounded-full font-bold text-xl shadow-lg
                        ${
                          isChampion
                            ? "bg-yellow-400 text-black"
                            : "bg-purple-600 text-white"
                        }`}
                      >
                        {index + 1}
                      </div>

                      <div>
                        <h2 className="text-xl font-bold text-white">
                          {puja.usuario.nombre}
                        </h2>
                        <p className="text-sm text-gray-400">
                          {puja.fechaPuja}
                        </p>
                      </div>
                    </div>

                    {/* DERECHA */}
                    <div className="text-right space-y-2">
                      <Badge
                        className={`text-lg px-5 py-2
                        ${
                          isChampion
                            ? "bg-yellow-400 text-black"
                            : "bg-green-500 text-white"
                        }`}
                      >
                        ${Number(puja.montoOfertado).toLocaleString()}
                      </Badge>

                      {isChampion && (
                        <div className="flex items-center justify-end gap-2 text-yellow-400 font-semibold">
                          <Crown className="w-5 h-5 animate-float" />
                          Campeón Pokémon
                        </div>
                      )}
                    </div>

                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* BOTON */}
        <Button
          onClick={() => navigate(-1)}
          className="bg-blue-700 hover:bg-blue-800 shadow-lg transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a la Subasta
        </Button>

      </div>
    </div>
  );
}