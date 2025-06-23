import { useState, createContext } from 'react';
import type { ReactNode } from 'react';

// Define el tipo para el contexto de autenticación
type AuthContextType = {
  auth: boolean;
  handleIniciarSesion: (id:string, nombre:string, token:string) => void;
  handleEstasLogueado: () => void;
  handleCerrarSesion:()=>void;
};

// Proporciona un valor predeterminado para el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define el tipo para las props de AuthProvider
type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<boolean>(
    localStorage.getItem('menu_flaites_id') != null
  );
    const handleIniciarSesion=(id:string, nombre:string, token:string)=>
    {
        localStorage.setItem('menu_flaites_id', id);
        localStorage.setItem('menu_flaites_nombre', nombre);
        localStorage.setItem('menu_flaites_token', token);
        localStorage.setItem('menu_flaites_perfil_id', '');
        setAuth(true);
    };
    const handleEstasLogueado=()=>
    {
        if(!auth && localStorage.getItem('menu_flaites_id')==null)
        {
            window.location.href="/login";
        }
        setAuth(true);
    };
    const handleCerrarSesion=()=>
    {
        if(window.confirm("¿Realmente desea cerrar la sesión?"))
        {
            localStorage.clear();
            setAuth(false);
            window.location.href="/login";
        }
    };
  return (
    <AuthContext.Provider value={{ auth, handleIniciarSesion, handleEstasLogueado, handleCerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;

/*

import { useState, createContext } from 'react';
import type { ReactNode } from 'react';

// Define el tipo para el contexto de autenticación
type AuthContextType = {
  auth: boolean;
};

// Proporciona un valor predeterminado para el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define el tipo para las props de AuthProvider
type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<boolean>(
    localStorage.getItem('menu_flaites_id') != null
  );

  return (
    <AuthContext.Provider value={{ auth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
*/
