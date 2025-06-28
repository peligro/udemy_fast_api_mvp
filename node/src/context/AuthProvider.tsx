import { useState, createContext } from 'react';
import type { ReactNode } from 'react';
import type { AlertCustomInterface } from '../custom/AlertCustom';
import AlertCustom from '../custom/AlertCustom';

// Define el tipo para el contexto de autenticación
type AuthContextType = {
  auth: boolean;
  handleIniciarSesion: (id:string, nombre:string, token:string, perfil_id_:string) => void;
  handleEstasLogueado: () => void;
  handleCerrarSesion:()=>void;
  handleValidarAcceso:(perfil_id:string)=>void;

   //modal
  showConfirm: (confirmData: Omit<AlertCustomInterface, 'estado'>) => void;
  confirmData: AlertCustomInterface | null;
  setConfirmData: React.Dispatch<React.SetStateAction<AlertCustomInterface | null>>;
 
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
  
  //modal
  const [confirmData, setConfirmData] = useState<AlertCustomInterface | null>(null);
    const handleIniciarSesion=(id:string, nombre:string, token:string, perfil_id:string)=>
    {
        localStorage.setItem('menu_flaites_id', id);
        localStorage.setItem('menu_flaites_nombre', nombre);
        localStorage.setItem('menu_flaites_token', token);
        localStorage.setItem('menu_flaites_perfil_id', perfil_id);
        setAuth(true);
    };
    const handleValidarAcceso=(perfil_id:string)=>
    {
        if(localStorage.getItem('menu_flaites_perfil_id')!=perfil_id)
        {
            window.location.href="/error";
        }
         
    };
    const handleEstasLogueado=()=>
    {
        if(!auth && localStorage.getItem('menu_flaites_id')==null)
        {
            window.location.href="/login";
        }
        setAuth(true);
    };
    //modal
   const showConfirm = (confirmData: Omit<AlertCustomInterface, 'estado'>) => {
    setConfirmData({ ...confirmData, estado: true });
  };

  const handleCerrarSesion = () => {
    showConfirm({
      titulo: "Confirmar",
      detalle: "¿Realmente desea cerrar la sesión?",
      headerBg: "bg-info",
      esConfirm: true,
      onConfirm: () => {
        localStorage.clear();
        setAuth(false);
        window.location.href="/login";
      },
      onClose: () => setConfirmData(null)
    });
  };
    /*
    const handleCerrarSesion=()=>
    {
        if(window.confirm("¿Realmente desea cerrar la sesión?"))
        {
            localStorage.clear();
            setAuth(false);
            window.location.href="/login";
        }
    };
    */
  return (
    //showConfirm, confirmData, setConfirmData para modal
    <AuthContext.Provider value={{ 
      auth, 
      handleIniciarSesion, 
      handleEstasLogueado, 
      handleCerrarSesion,
      handleValidarAcceso,
      showConfirm,
      confirmData,
      setConfirmData
    }}>
      {children}
      {confirmData && (
        <AlertCustom 
          estado={confirmData.estado}
          titulo={confirmData.titulo}
          detalle={confirmData.detalle}
          onClose={confirmData.onClose}
          onConfirm={confirmData.onConfirm}
          headerBg={confirmData.headerBg}
          esConfirm={confirmData.esConfirm}
        />
      )}
    </AuthContext.Provider>
    /*
    <AuthContext.Provider value={{ auth, handleIniciarSesion, handleEstasLogueado, handleCerrarSesion  }}>
      {children}
    </AuthContext.Provider>*/
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
