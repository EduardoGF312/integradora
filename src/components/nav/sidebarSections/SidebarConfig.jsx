import React, { forwardRef, useEffect, useState } from "react";
import {BsMoon, BsSun, BsSearch} from 'react-icons/bs'


const SidebarConfig = forwardRef((props, ref) => {

  useEffect(() =>{
    handleVisualizar()
  }, [])

  const isDarkMode = localStorage.getItem('theme') === 'dark'
  const [visualizar, setVisualizar] = useState({ //Variable de estado que almacena el tipo de visualización de pacientes y registros (tabla o tarjetas)
    visualizarPacientes: 'tabla',
    visualizarRegistros: 'tarjetas'
  })

  const {visualizarPacientes, visualizarRegistros} = visualizar

  function handleThemeToggle(theme){
    props.setTheme(theme)
    localStorage.setItem('theme', theme)
  }

  function handleVisualizar(){ //Función para definir el tipo de visualización por defecto de pacientes y registros si no está ya definido
    if(localStorage.getItem('visualizarPacientes')){
      setVisualizar({...visualizar, visualizarPacientes: localStorage.getItem('visualizarPacientes')})
    }else{
      localStorage.setItem('visualizarRegistros', visualizarRegistros)
      localStorage.setItem('visualizarPacientes', visualizarPacientes)
    }
    
    if(localStorage.getItem('visualizarRegistros')){
      setVisualizar({...visualizar, visualizarRegistros: localStorage.getItem('visualizarRegistros')})
    }else{
      localStorage.setItem('visualizarRegistros', visualizarRegistros)
      localStorage.setItem('visualizarPacientes', visualizarPacientes)
    }
  }

  function handleVisualizarToggle(tipoInformacion, tipoVisualizacion){
    switch (tipoInformacion) {
      case 'registros':
        if(tipoVisualizacion === 'tabla'){
          setVisualizar({...visualizar, visualizarRegistros: 'tabla'})
          localStorage.setItem('visualizarRegistros', 'tabla')
        }else{
          setVisualizar({...visualizar, visualizarRegistros: 'tarjetas'})
          localStorage.setItem('visualizarRegistros', 'tarjetas')
        }
        break;
      case 'pacientes':
        if(tipoVisualizacion === 'tabla'){
          setVisualizar({...visualizar, visualizarPacientes: 'tabla'})
          localStorage.setItem('visualizarPacientes', 'tabla')
        }else{
          setVisualizar({...visualizar, visualizarPacientes: 'tarjetas'})
          localStorage.setItem('visualizarPacientes', 'tarjetas')
        }
        break;
      default:
        break;
    }
  }

  return (
    <div className="sidebar-section !-translate-x-full" ref={ref}>
      <h2 className="px-5 text-lg font-medium ">Configuración</h2>
      <hr className="mt-4 mb-2 border-green-500 dark:border-green-100"></hr>

      {/* <BsSearch className=" absolute mt-[1.4rem] ml-5" /><input placeholder="Buscar en configuración" className="sidebar-input"/>  */}

      {isDarkMode ? <button onClick={() => handleThemeToggle('light')} className='py-2 px-4 ml-4 bg-zinc-700 rounded mt-4'>Cambiar tema <BsMoon className="inline-block ml-2 mb-1.5 text-sm"/></button> : <button onClick={() => handleThemeToggle('dark')} className='py-2 px-4 ml-4 bg-green-200 rounded mt-4'>Cambiar tema <BsSun className="inline-block mb-1 ml-2"/></button>} 
      <div className="mt-6 py-3 border-y border-green-300 dark:border-zinc-600">
        <p className="mb-3">Visualizar registros</p>
        <button className={`py-2 px-3 text-xs mx-2 rounded ${visualizarRegistros === 'tabla' ? 'bg-green-200 dark:bg-zinc-700' : ''}`} onClick={()=> handleVisualizarToggle('registros', 'tabla')}>Tabla</button>
        <button className={`py-2 px-3 text-xs mx-2 rounded ${visualizarRegistros === 'tarjetas' ? 'bg-green-200 dark:bg-zinc-700' : ''}`} onClick={()=> handleVisualizarToggle('registros', 'tarjetas')}>Tarjetas</button>
      </div>  
      <div className="py-3 border-b border-green-300 dark:border-zinc-600">
        <p className="mb-3">Visualizar pacientes</p>
        <button className={`py-2 px-3 text-xs mx-2 rounded ${visualizarPacientes === 'tabla' ? 'bg-green-200 dark:bg-zinc-700' : ''}`} onClick={()=> handleVisualizarToggle('pacientes', 'tabla')}>Tabla</button>
        <button className={`py-2 px-3 text-xs mx-2 rounded ${visualizarPacientes === 'tarjetas' ? 'bg-green-200 dark:bg-zinc-700' : ''}`} onClick={()=> handleVisualizarToggle('pacientes', 'tarjetas')}>Tarjetas</button>
      </div>  

    </div>
  );
});

export default SidebarConfig;
