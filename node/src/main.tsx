import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import '/public/css/app.css';



import Frontend from './componentes/Frontend';
import Home  from './paginas/Home'; 
import Error404 from './paginas/Error404';
import Login from './paginas/Login';
import { AuthProvider } from './context/AuthProvider';

const router = createBrowserRouter(
  [
    {
      path:'/',
      element: <Frontend />,
      children:
      [
        {
          index:true,
          element: <Home /> 
        },{
          path:"/login",
          element:<Login />
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

 