import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { Layout } from './components/Layout/Layout'
import { Home } from './components/Home/Home'
import { PageNotFound } from './components/Home/PageNotFound'
const rutas = createBrowserRouter ([
{
element: <Layout /> ,
children: [
// Ruta principal
{ index: true , element: <Home /> },
// Ruta comodín (404)
{ path: "*" , element: <PageNotFound /> }
]
}
])
createRoot ( document . getElementById ( 'root' )). render (
<StrictMode >
<RouterProvider router ={ rutas } />
</ StrictMode>,
)
