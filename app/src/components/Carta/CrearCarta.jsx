import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sparkles,
  Save,
  ArrowLeft,
  X,
  BadgeCheck,
  ImagePlus
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import CartaService from "../../services/CartaService";
import CondicionService from "../../services/CondicionService";
import ImageService from "../../services/ImageService";
import CategoriasService from "@/services/CategoriasService";
import EstadoCartaService from "@/services/EstadoCartaService";
import toast from "react-hot-toast";

/* 🎨 COLORES */
const categoriaStyles = {
  Pokemon: "bg-purple-400/20 border-purple-400 text-purple-300",
  Objeto: "bg-slate-400/20 border-slate-400 text-white",
  Entrenador: "bg-orange-400/20 border-orange-400 text-orange-300",
  Electrico: "bg-yellow-400/20 border-yellow-400 text-yellow-300",
  Fuego: "bg-red-500/20 border-red-500 text-red-300",
  Agua: "bg-blue-500/20 border-blue-500 text-blue-300",
};

export default function CreateCarta() {
  const navigate = useNavigate();

  const [categorias, setCategorias] = useState([]);
  const [condiciones, setCondiciones] = useState([]);
  const [estados, setEstados] = useState([]);

  const [files, setFiles] = useState([]);
  const [fileURLs, setFileURLs] = useState([]);

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    idCondicion: "",
    idEstadoCarta: "",
    categorias: [],
    idUsuario: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await CategoriasService.getCategorias();
        const condRes = await CondicionService.getCondiciones();
        const estRes = await EstadoCartaService.getEstadoCartas();

        setCategorias(catRes.data?.data || []);
        setCondiciones(condRes.data?.data || []);
        setEstados(estRes.data?.data || []);

        setForm((prev) => ({ ...prev, idUsuario: 1 }));
      } catch {
        toast.error("Error cargando datos");
      }
    };

    fetchData();
  }, []);

  /* 🔥 VALIDACIONES */
  const validateField = (field, value) => {
    let message = "";

    if (field === "nombre" && !value) {
      message = "Debes ingresar un nombre";
    }

    if (field === "descripcion" && value.length < 20) {
      message = "Mínimo 20 caracteres";
    }

    if (field === "idCondicion" && !value) {
      message = "Selecciona una condición";
    }

    if (field === "idEstadoCarta" && !value) {
      message = "Selecciona un estado";
    }

    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleCategoria = (idCategoria) => {
    setForm((prev) => ({
      ...prev,
      categorias: prev.categorias.includes(idCategoria)
        ? prev.categorias.filter((c) => c !== idCategoria)
        : [...prev.categorias, idCategoria],
    }));
  };

  /* 📸 MULTI IMAGES */
  const handleChangeImage = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const previews = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );

    setFiles((prev) => [...prev, ...selectedFiles]);
    setFileURLs((prev) => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setFileURLs((prev) => prev.filter((_, i) => i !== index));
  };

  /* 🚀 SUBMIT */
  const handleSubmit = async () => {

    const newErrors = {};

    if (!form.nombre) newErrors.nombre = "Nombre requerido";
    if (form.descripcion.length < 20) newErrors.descripcion = "Mínimo 20 caracteres";
    if (!form.idCondicion) newErrors.idCondicion = "Selecciona condición";
    if (!form.idEstadoCarta) newErrors.idEstadoCarta = "Selecciona estado";
    if (form.categorias.length === 0) newErrors.categorias = "Selecciona categoría";
    if (files.length === 0) newErrors.imagenes = "Agrega al menos una imagen";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    try {
      const response = await CartaService.createCarta(form);

      if (response?.data?.data) {
        const idCarta = response.data.data.idCarta;

        for (const file of files) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("idCarta", idCarta);

          await ImageService.createImage(formData);
        }

        toast.success("Carta creada correctamente");
        navigate("/carta");
      }
    } catch {
      toast.error("Error al crear carta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] flex flex-col items-center py-10 px-4">

      <div className="w-full max-w-2xl mb-5">
        <Link to="/carta">
          <Button variant="ghost" className="text-white/40 hover:text-white flex gap-2">
            <ArrowLeft className="w-4 h-4" /> Volver
          </Button>
        </Link>
      </div>

      <Card className="w-full max-w-2xl border !bg-[#0d1424]/90 rounded-2xl shadow-2xl">

        <CardHeader className="text-center pt-8">
          <div className="flex justify-center gap-2">
            <Sparkles className="text-yellow-400" />
            <CardTitle className="text-white text-2xl">
              Nueva Carta
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-5 px-7 pb-8">

          {/* NOMBRE */}
          <div>
            <Label className="text-white/60 text-xs flex gap-1">
              <BadgeCheck className="w-3 h-3 text-yellow-400" />
              Nombre *
            </Label>
            <Input
              value={form.nombre}
              onBlur={(e) => validateField("nombre", e.target.value)}
              onChange={(e) => handleChange("nombre", e.target.value)}
              className="bg-white/5 text-white rounded-xl h-11"
            />
            {errors.nombre && <p className="text-red-400 text-xs">{errors.nombre}</p>}
          </div>

          {/* SELECTS */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <select
                value={form.idCondicion || ""}
                onBlur={(e) => validateField("idCondicion", e.target.value)}
                onChange={(e) =>
                  handleChange("idCondicion", e.target.value ? Number(e.target.value) : "")
                }
                className="bg-[#020617] text-white p-2 rounded-xl w-full"
              >
                <option value="">Condición</option>
                {condiciones.map((c) => (
                  <option key={c.idCondicion} value={c.idCondicion}>
                    {c.descripcion}
                  </option>
                ))}
              </select>
              {errors.idCondicion && <p className="text-red-400 text-xs">{errors.idCondicion}</p>}
            </div>

            <div>
              <select
                value={form.idEstadoCarta || ""}
                onBlur={(e) => validateField("idEstadoCarta", e.target.value)}
                onChange={(e) =>
                  handleChange("idEstadoCarta", e.target.value ? Number(e.target.value) : "")
                }
                className="bg-[#020617] text-white p-2 rounded-xl w-full"
              >
                <option value="">Estado</option>
                {estados.map((e) => (
                  <option key={e.idEstadoCarta} value={e.idEstadoCarta}>
                    {e.descripcion}
                  </option>
                ))}
              </select>
              {errors.idEstadoCarta && <p className="text-red-400 text-xs">{errors.idEstadoCarta}</p>}
            </div>
          </div>

          {/* DESCRIPCIÓN */}
          <textarea
            placeholder="Describe la carta..."
            value={form.descripcion}
            onBlur={(e) => validateField("descripcion", e.target.value)}
            onChange={(e) => handleChange("descripcion", e.target.value)}
            className="w-full bg-white/5 text-white p-3 rounded-xl placeholder:text-white/30"
          />
          {errors.descripcion && <p className="text-red-400 text-xs">{errors.descripcion}</p>}

          {/* CATEGORÍAS */}
          <div>
            <div className="flex flex-wrap gap-2">
              {categorias.map((cat) => {
                const selected = form.categorias.includes(cat.idCategoria);
                const style = categoriaStyles[cat.descripcion] || "";

                return (
                  <button
                    key={cat.idCategoria}
                    type="button"
                    onClick={() => toggleCategoria(cat.idCategoria)}
                    className={`px-3 py-2 rounded-full border-2 text-xs font-bold transition
                      ${selected ? style : "bg-white/5 text-white border-white/20"}
                    `}
                  >
                    {cat.descripcion}
                  </button>
                );
              })}
            </div>
            {errors.categorias && <p className="text-red-400 text-xs">{errors.categorias}</p>}
          </div>

          {/* IMÁGENES */}
          <div>
            <Label className="text-white/60 text-xs flex gap-1">
              <ImagePlus className="w-3 h-3 text-pink-400" />
              Imágenes
            </Label>

            {fileURLs.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-3">
                {fileURLs.map((src, i) => (
                  <div key={i} className="relative group">
                    <div className="w-28 h-40 rounded-xl overflow-hidden border border-white/20">
                      <img src={src} className="w-full h-full object-cover" />
                    </div>

                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-3 h-3 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div
              className="mt-3 w-28 h-40 border-2 border-dashed border-white/20 rounded-xl flex items-center justify-center cursor-pointer"
              onClick={() => document.getElementById("image").click()}
            >
              <span className="text-white/30 text-xs text-center">
                Subir imágenes
              </span>
            </div>

            <input
              id="image"
              type="file"
              multiple
              className="hidden"
              accept="image/*"
              onChange={handleChangeImage}
            />

            {errors.imagenes && <p className="text-red-400 text-xs">{errors.imagenes}</p>}
          </div>

          {/* BOTONES */}
          <div className="flex gap-3">
            <Link to="/carta" className="flex-1">
              <Button className="w-full bg-white/5 text-white/60">
                Cancelar
              </Button>
            </Link>

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-yellow-400 text-black flex gap-2 items-center justify-center"
            >
              <Save className="w-4 h-4" />
              {loading ? "Guardando..." : "Guardar"}
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}