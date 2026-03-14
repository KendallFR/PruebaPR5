import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { Home } from './components/Home/Home'
import { PageNotFound } from './components/Home/PageNotFound'
import TableMovies from './components/Movie/TableMovies'
import { ListMovies } from './components/Movie/ListMovies'
import { DetailMovie } from './components/Movie/DetailMovie'
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




const rutas = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      // Ruta principal
      { index: true, element: <Home /> },

      // Ruta comodín (404)
      { path: "*", element: <PageNotFound /> },
       //Rutas componentes
      {path:"movie/table", element: <TableMovies/>},
      {path:"movie", element: <ListMovies/>},
      {path:"movie/detail/:id", element: <DetailMovie />},
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
      {path: "usuario/delete/:id", element: <DeleteUsuario />}
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={rutas} />
  </StrictMode>,
)
