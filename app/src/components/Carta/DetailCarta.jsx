import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CartaService from '../../services/CartaService';
import { ErrorAlert } from "../ui/custom/ErrorAlert";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  ArrowLeft,
  History,
  ShieldCheck,
  CheckCircle,
  Calendar,
  User,
  Tag
} from "lucide-react";

import { LoadingGrid } from '../ui/custom/LoadingGrid';
import { EmptyState } from '../ui/custom/EmptyState';

export function DetailCarta() {

  const navigate = useNavigate();
  const { id } = useParams();

  const BASE_URL = import.meta.env.VITE_BASE_URL + 'uploads';

  const [carta, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const response = await CartaService.getCartaById(id);
        setData(response.data);

        if (!response.data.success) {
          setError(response.data.message);
        }

      } catch (err) {

        if (err.name !== "AbortError")
          setError(err.message);

      } finally {

        setLoading(false);

      }

    };

    fetchData();

  }, [id]);


  /*
  ========================================
  COLOR DINAMICO SEGUN CATEGORIA
  ========================================
  */

  let glowColor = "rgba(59,130,246,0.6)";

  if (carta?.data?.categorias?.length) {

    const categoria = carta.data.categorias[0].descripcion.toLowerCase();

    if (categoria.includes("electrico"))
      glowColor = "rgba(255,221,0,0.9)";
    else if (categoria.includes("fuego"))
      glowColor = "rgba(255,60,60,0.9)";
    else if (categoria.includes("agua"))
      glowColor = "rgba(0,140,255,0.9)";
    else if (categoria.includes("planta"))
      glowColor = "rgba(0,255,140,0.9)";
    else if (categoria.includes("psiquico"))
      glowColor = "rgba(255,0,255,0.9)";
  }


  /*
  ========================================
  ESTADOS
  ========================================
  */

  if (loading)
    return <LoadingGrid count={1} type="grid" />;

  if (error)
    return <ErrorAlert title="Error al cargar cartas" message={error} />;

  if (!carta || carta.data.length === 0)
    return <EmptyState message="No se encontraron cartas." />;


  return (

    <div className="max-w-5xl mx-auto py-12 px-4">

      <div
        className="relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.01]"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, ${glowColor}22, transparent 60%),
            radial-gradient(circle at 80% 70%, ${glowColor}22, transparent 60%),
            linear-gradient(145deg, #020617, #020617)
          `,
          boxShadow: `
            0 0 25px ${glowColor}44,
            inset 0 0 40px ${glowColor}22
          `
        }}
      >

        <div className="flex flex-col md:flex-row gap-8 items-start p-6">


          {/* IMAGENES */}

          <div className="w-full md:w-1/2">

            {carta?.data?.imagenes?.length > 0 ? (

              <div className="grid grid-cols-2 gap-3">

                {carta.data.imagenes.map((img) => (

                  <img
                    key={img.idImagen}
                    src={`${BASE_URL}/${img.imagen}`}
                    alt={carta.data.nombre}
                    className="w-full h-full object-contain rounded-lg bg-slate-900 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]"
                  />

                ))}

              </div>

            ) : (

              <div className="w-full aspect-square bg-slate-900 flex items-center justify-center rounded-lg text-gray-400">
                Sin imágenes
              </div>

            )}

          </div>


          {/* DETALLES */}

          <div className="flex-1 space-y-6 text-white">

            <Card className="bg-slate-950/70 backdrop-blur-xl border border-slate-800">

              <CardContent className="p-6 space-y-6">


                {/* NOMBRE */}

                <div>

                  <h1 className="text-3xl font-bold tracking-wide">
                    {carta.data.nombre}
                  </h1>

                  <p className="text-gray-400 text-sm mt-2">
                    {carta.data.descripcion}
                  </p>

                </div>


                <div className="border-t border-slate-800"></div>


                {/* GRID INFORMACION */}

                <div className="grid grid-cols-2 gap-6 text-sm">

                  {/* CONDICION */}

                  <div className="flex items-center gap-3">

                    <ShieldCheck className="w-5 h-5 text-green-400" />

                    <div className="flex flex-col">

                      <span className="text-gray-400 text-xs">
                        Condición
                      </span>

                      <span className="font-semibold text-white">
                        {carta.data.condicion.descripcion}
                      </span>

                    </div>

                  </div>


                  {/* DISPONIBILIDAD */}

                  <div className="flex items-center gap-3">

                    <CheckCircle className="w-5 h-5 text-blue-400" />

                    <div className="flex flex-col">

                      <span className="text-gray-400 text-xs">
                        Disponibilidad
                      </span>

                      <span className="font-semibold text-white">
                        {carta.data.estadoCarta.descripcion}
                      </span>

                    </div>

                  </div>


                  {/* FECHA */}

                  <div className="flex items-center gap-3">

                    <Calendar className="w-5 h-5 text-yellow-400" />

                    <div className="flex flex-col">

                      <span className="text-gray-400 text-xs">
                        Registrado
                      </span>

                      <span className="font-semibold text-white">
                        {carta.data.fechaRegistro}
                      </span>

                    </div>

                  </div>


                  {/* PROPIETARIO */}

                  <div className="flex items-center gap-3">

                    <User className="w-5 h-5 text-purple-400" />

                    <div className="flex flex-col">

                      <span className="text-gray-400 text-xs">
                        Propietario
                      </span>

                      <span className="font-semibold text-white">
                        {carta.data.propietario.nombre}
                      </span>

                    </div>

                  </div>

                </div>


                <div className="border-t border-slate-800"></div>


                {/* CATEGORIAS */}

                <div>

                  <span className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                    <Tag className="w-4 h-4" />
                    Categorías
                  </span>

                  <div className="flex flex-wrap gap-2">

                    {carta.data.categorias.map((categoria) => (

                      <span
                        key={categoria.idCategoria}
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 border border-slate-700 transition hover:scale-105"
                        style={{
                          boxShadow: `0 0 10px ${glowColor}55`
                        }}
                      >
                        {categoria.descripcion}
                      </span>

                    ))}

                  </div>

                </div>

              </CardContent>

            </Card>


            {/* BOTON HISTORIAL */}

            <Button
              onClick={() => navigate(`/carta/${id}/subastas`)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold shadow-lg hover:shadow-[0_0_25px_rgba(255,221,0,0.9)] transition-all duration-300"
            >

              <History className="w-4 h-4 mr-2" />

              Historial de Subastas

            </Button>

          </div>

        </div>

      </div>


      {/* BOTON REGRESAR */}

      <Button
        onClick={() => navigate(-1)}
        className="mt-6 bg-blue-700 hover:bg-blue-800 shadow-lg hover:shadow-[0_0_20px_rgba(0,140,255,0.7)] transition-all duration-300"
      >

        <ArrowLeft className="w-4 h-4 mr-2" />

        Regresar

      </Button>

    </div>
  );

}