import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import '/public/css/app.css';


import Frontend from './componentes/Frontend';
import Home  from './paginas/Home'; 

import Login from './paginas/Login';
import { AuthProvider } from './context/AuthProvider';
import Perfiles, {loader as perfilesListar}  from './paginas/Perfiles';
import Usuarios, {loader as usuariosListar} from './paginas/Usuarios';
import Categorias, {loader as categoriasListar}  from './paginas/negocios/Categorias';

import Restablecer from './paginas/restablecer/Restablecer';

import RecoveryUpdate from './paginas/restablecer/RecoveryUpdate';
import Negocios, {loader as negociosListar} from './paginas/negocios/Negocios';
import NegociosFormulario, {loader as negociosFormularioListar} from './paginas/negocios/NegociosFormulario';
import Carta, {loader as cartaFormularioListar} from './paginas/carta/Carta';
import Error404 from './paginas/Error404';
import Error405 from './paginas/Error405';
import PlatosCategorias, {loader as platosCategoriasListar} from './paginas/negocios/PlatosCategorias';
import Platos, {loader as platosListar}  from './paginas/clientes/Platos';
const router = createBrowserRouter(
  [
    {
      path:'/',
      element: <Frontend />,
      children:
      [
        {
          index:true,
          element: <Home />,
          errorElement:<Error405 />
        },{
          path:"/login",
          element:<Login />,
          errorElement:<Error405 />
        },
        {
          path:"/perfiles",
          element:<Perfiles />,
          loader:perfilesListar,
          errorElement:<Error405 />
        },
        {
          path:"/usuarios",
          element:<Usuarios />,
          loader: usuariosListar,
          errorElement: <Error405 />
        },
        {
          path:"/negocios/categorias",
          element: <Categorias />,
          loader: categoriasListar,
          errorElement: <Error405 />
        },
        {
          path:"/negocios/listar",
          element: <Negocios />,
          loader: negociosListar,
          errorElement: <Error405 />
        },
        {
          path:"/negocios/formulario",
          element: <NegociosFormulario />,
          loader: negociosFormularioListar,
          errorElement: <Error405 />
        },
        {
          path:"/negocios/platos-categorias",
          element: <PlatosCategorias />,
          loader: platosCategoriasListar,
          errorElement: <Error405 />
        },
        {
          path:"/mi-negocio",
          element: <Platos/>,
          loader: platosListar, 
          errorElement:<Error405 />
        },
        {
          path:'*',
          element: <Error404 />
        }
      ]
    },
    {
      path:"/restablecer",
      element: <Restablecer />
    },
    {
      path:"/recovery/update/:token",
      element: <RecoveryUpdate />
    },
    {
          path:"/carta/:slug",
          element: <Carta />,
          loader: cartaFormularioListar,
          errorElement: <Error405 />
        }
  ]);

const rootElement = document.getElementById("root");

if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
       <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>     
    );
} else {
    console.error("No se encontró el elemento con id 'root'.");
}

 