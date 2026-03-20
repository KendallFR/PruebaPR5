import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { Home } from './components/Home/Home'
import { PageNotFound } from './components/Home/PageNotFound'
import TableUsuarios from './components/Usuario/TableUsuarios'
import { DetailUsuario } from './components/Usuario/DetailUsuario'
import { ListCartas } from './components/Carta/ListCartas'
import { DetailCarta } from './components/Carta/DetailCarta'
import { ListSubastasActivas } from './components/Subasta/ListSubastaActivas'
import { ListSubastasFinalizadas } from './components/Subasta/ListSubastasFinalizadas'
import { DetailSubasta } from './components/Subasta/DetailSubasta'
import TablePujas from './components/Puja/TablePujas'
import { CreateUsuario } from './components/Usuario/CreateUsuario'
import { UpdateUsuario } from './components/Usuario/UpdateUsuario'
import { DeleteUsuario } from './components/Usuario/DeleteUsuario'
import { CartaSubastas } from './components/Carta/CartaSubastas'
import { CreateSubasta } from './components/Subasta/CreateSubasta'
import  CartaCRUD  from './components/Carta/CrearCarta'
import { Toaster } from 'react-hot-toast'





const rutas = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      // Ruta principal
      { index: true, element: <Home /> },

      // Ruta comodín (404)
      { path: "*", element: <PageNotFound /> },
       //Rutas componentes
      {path:"usuario/table", element: <TableUsuarios/>},
      {path:"usuario/detail/:id", element: <DetailUsuario/>},
      {path:"carta", element: <ListCartas/>},
      {path:"carta/detail/:id", element: <DetailCarta/>},
      {path:"subasta/SubastasActivas", element: <ListSubastasActivas/>},
      {path:"subasta/SubastasFinalizadas", element: <ListSubastasFinalizadas/>},
      {path:"subasta/detail/:id", element: <DetailSubasta/>},
      {path:"puja/table/:id", element: <TablePujas/>},
      {path:"usuario/create", element: <CreateUsuario/>},
      {path:"usuario/edit/:id", element: <UpdateUsuario/>},
      {path: "usuario/delete/:id", element: <DeleteUsuario />},
      {path: "carta/:id/subastas", element: <CartaSubastas />},
      {path: "subasta/create", element: <CreateSubasta/>},
      {path: "carta/crear", element: <CartaCRUD/>}
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position="top-middle" reverseOrder={false} />
    <RouterProvider router={rutas} />
  </StrictMode>,
)


