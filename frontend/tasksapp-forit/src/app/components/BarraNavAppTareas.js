//Componente de la Barra de navegación
"use client"
import Link from 'next/link';
import "@/styles/navbar.css";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';



function BarraNavAppTareas () {
  const [isClient, setIsClient] = useState(false)
  const pathname = usePathname()
 
  useEffect(() => {
    setIsClient(true)
  }, [])
 
  return (
    <>
    {isClient == true ?
    <nav className="navigation">
      <Link href="/" className="brand-name">
        SGP Tareas
      </Link>
      
      {/*Links del menu de navegacion*/}
      <div
        className="navigation-menu">
        <ul>
          <li>
          {pathname !== '/app-tareas' ? (<Link href="/app-tareas">Home</Link>) : null}
          </li>          
          <li>
          {pathname !== '/app-tareas/iniciar_sesion' && pathname !== '/app-tareas/tareas'  ? (<Link href="/app-tareas/iniciar_sesion">Iniciar sesión</Link>) : null}
          </li>
          <li>
          {pathname !== '/app-tareas/registro' && pathname !== '/app-tareas/tareas' ? (<Link href="/app-tareas/registro">Registrarse</Link>) : null}
          </li>
          <li>
          {pathname !== '/app-tareas' && pathname !== '/app-tareas/registro' && pathname !== '/app-tareas/iniciar_sesion' ? (<Link href="/app-tareas/cerrar-sesion">Cerrar sesión</Link>) : null}
          </li>
         </ul>
      </div>
    </nav> :
    " "}
    </>
  );  
}

export default BarraNavAppTareas;
