import { useEffect, useState } from "react";
import CartaService from "../../services/CartaService";

const BASE_URL = import.meta.env.VITE_BASE_URL + "uploads";

export function CartaCRUD() {

  const [cartas, setCartas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    idCarta: null,
    nombre: "",
    descripcion: "",
    idUsuario: 1,
    idEstadoCarta: 1,
    idCondicion: 1,
    imagenFile: null,
    categorias: []
  });

  //  CARGAR CARTAS
  const loadCartas = () => {
    CartaService.getCartas()
      .then(res => {
        console.log("CARTAS:", res.data);
        setCartas(res.data.data || res.data);
      })
      .catch(console.log);
  };

  //  CARGAR CATEGORÍAS
  const loadCategorias = () => {
    CartaService.getCategorias()
      .then(res => {
        console.log("CATEGORIAS:", res.data);
        setCategorias(res.data.data || res.data);
      })
      .catch(console.log);
  };

  useEffect(() => {
    loadCartas();
    loadCategorias();
  }, []);

  //  FILTRO
  const filteredCartas = cartas.filter(c =>
    c.nombre?.toLowerCase().includes(search.toLowerCase()) ||
    c.idCarta?.toString().includes(search)
  );

  //  SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("nombre", form.nombre);
    data.append("descripcion", form.descripcion);
    data.append("idUsuario", form.idUsuario);
    data.append("idEstadoCarta", form.idEstadoCarta);
    data.append("idCondicion", form.idCondicion);

    if (form.imagenFile) {
      data.append("imagen", form.imagenFile);
    }

    form.categorias.forEach(id => {
      data.append("categorias[]", id);
    });

    const action = editing
      ? CartaService.updateCarta(form.idCarta, data)
      : CartaService.createCarta(data);

    action.then(() => {
      resetForm();
      loadCartas();
    });
  };

  //  EDITAR
  const handleEdit = (c) => {
    setForm({
      idCarta: c.idCarta,
      nombre: c.nombre,
      descripcion: c.descripcion,
      idUsuario: c.idUsuario,
      idEstadoCarta: c.idEstadoCarta,
      idCondicion: c.idCondicion,
      imagenFile: null,
      categorias: c.categorias?.map(cat => cat.idCategoria) || []
    });
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🗑 ELIMINAR
  const handleDelete = (id) => {
    if (confirm("¿Eliminar carta?")) {
      CartaService.deleteCarta(id).then(loadCartas);
    }
  };

  //  RESET
  const resetForm = () => {
    setForm({
      idCarta: null,
      nombre: "",
      descripcion: "",
      idUsuario: 1,
      idEstadoCarta: 1,
      idCondicion: 1,
      imagenFile: null,
      categorias: []
    });
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 text-white p-6">

      <h1 className="text-3xl font-bold text-center text-yellow-400 mb-6">
        🃏 Gestión de Cartas Pokémon
      </h1>

      {/*  BUSCADOR */}
      <input
        placeholder="Buscar por nombre o ID..."
        className="w-full max-w-xl mx-auto mb-6 block p-3 rounded-xl bg-gray-800"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/*  FORM */}
      <div className="bg-gray-800 p-6 rounded-2xl max-w-xl mx-auto mb-10">

        <h2 className="mb-4 text-xl">
          {editing ? "Editar Carta" : "Crear Carta"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            placeholder="Nombre"
            className="p-2 rounded bg-gray-700"
            value={form.nombre}
            onChange={e => setForm({ ...form, nombre: e.target.value })}
          />

          <input
            placeholder="Descripción"
            className="p-2 rounded bg-gray-700"
            value={form.descripcion}
            onChange={e => setForm({ ...form, descripcion: e.target.value })}
          />

          {/*  IMAGEN */}
          <input
            type="file"
            accept="image/*"
            className="bg-gray-700 p-2 rounded"
            onChange={e => setForm({ ...form, imagenFile: e.target.files[0] })}
          />

          {/*  CATEGORÍAS */}
          <div>
            <p className="mb-2 text-sm text-gray-300">Categorías:</p>

            <select
              multiple
              className="p-2 rounded bg-gray-700 w-full h-32"
              value={form.categorias}
              onChange={(e) => {
                const selected = Array.from(
                  e.target.selectedOptions,
                  opt => parseInt(opt.value)
                );
                setForm({ ...form, categorias: selected });
              }}
            >
              {categorias.map(cat => (
                <option key={cat.idCategoria} value={cat.idCategoria}>
                  {cat.nombre || cat.descripcion || cat.descripcionCategoria}
                </option>
              ))}
            </select>

            <p className="text-xs text-gray-400 mt-1">
              Usa Ctrl para seleccionar múltiples
            </p>
          </div>

          <div className="flex justify-center gap-3">
            <button className="bg-yellow-400 text-black px-4 py-2 rounded-xl">
              {editing ? "Actualizar" : "Crear"}
            </button>

            {editing && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 px-4 py-2 rounded-xl"
              >
                Cancelar
              </button>
            )}
          </div>

        </form>
      </div>

      {/*  CARDS */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">

        {filteredCartas.map(c => (
          <div
            key={c.idCarta}
            className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition"
          >

            {/*  IMAGEN */}
            <div className="h-48 flex items-center justify-center bg-gray-100">
              <img
                src={
                  c.imagenes?.length > 0
                    ? `${BASE_URL}/${c.imagenes[0].imagen}`
                    : "https://via.placeholder.com/200"
                }
                alt={c.nombre}
                className="h-full object-contain"
              />
            </div>

            <div className="p-4 relative">

              <span className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 text-xs rounded">
                #{c.idCarta}
              </span>

              <h3 className="font-bold">{c.nombre}</h3>
              <p className="text-sm opacity-80">{c.descripcion}</p>

              {/*  CATEGORÍAS EN CARTA */}
              <div className="flex flex-wrap gap-1 mt-2">
                {c.categorias && c.categorias.length > 0 ? (
                  c.categorias.map(cat => (
                    <span
                      key={cat.idCategoria}
                      className="bg-blue-500 text-xs px-2 py-1 rounded"
                    >
                      {cat.nombre || cat.descripcion || cat.descripcionCategoria}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-gray-400">
                    Sin categorías
                  </span>
                )}
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(c)}
                  className="bg-blue-600 px-3 py-1 rounded"
                >
                  ✏️
                </button>

                <button
                  onClick={() => handleDelete(c.idCarta)}
                  className="bg-red-600 px-3 py-1 rounded"
                >
                  🗑
                </button>
              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}