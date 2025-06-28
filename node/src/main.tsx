import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import '/public/css/app.css';


import Frontend from './componentes/Frontend';
import Home  from './paginas/Home'; 
import Error404 from './paginas/Error404';
import Login from './paginas/Login';
import { AuthProvider } from './context/AuthProvider';
import Perfiles, {loader as perfilesListar}  from './paginas/Perfiles';
import Error405 from './paginas/Error405';

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
          path:'*',
          element: <Error404 />
        }
      ]
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

 