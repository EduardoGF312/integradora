import React, { useState, useEffect } from 'react'
import { BsFillHeartPulseFill, BsSearch } from 'react-icons/bs'
import { TbTemperatureCelsius } from 'react-icons/tb'
import { AiOutlineLoading, AiOutlinePlus } from 'react-icons/ai'
import { SiOxygen } from 'react-icons/si'
import { MdOutlineDateRange } from 'react-icons/md'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function RegistroCard({ nombre, oximetria, frecuencia, temperatura, fecha, id, handleEliminar }) {

  const navigate = useNavigate()

  return (
    <div className='p-4 rounded shadow w-3/4 mx-auto my-10 bg-white dark:bg-zinc-800 snap-center'>
      <h1 className='text-xl font-semibold text-center'>{nombre ? nombre : '. . .'}</h1>
      <div className='grid sm:grid-cols-3 gap-4 mt-6 text-center'>
        <p className='col-span-2 sm:col-span-1'>Oximetría<br />
          <SiOxygen className=' text-xl inline-block mb-1 mr-1' /> : {oximetria ? oximetria : '. . .'}
        </p>
        <p className='col-span-2 sm:col-span-1'>Frecuencia cardiaca <br />
          <BsFillHeartPulseFill className=' text-xl inline-block mb-0.5 mr-1' /> : {frecuencia ? frecuencia : '. . .'}
        </p>
        <p>Temperatura <br />
          <TbTemperatureCelsius className=' text-xl inline-block mb-0.5 mr-1' /> : {temperatura ? temperatura : '. . .'}
        </p>
        <p className='text-center text-lg col-span-3 mt-4 mb-3'>Fecha: {fecha ? fecha : '. . .'}<MdOutlineDateRange className='text-xl inline-block mb-1.5 ml-2' /></p>
      </div>
      <div className='text-center mt-6 flex justify-center gap-6'>
        <button className='btn btn-red' onClick={() => handleEliminar(id)}>Eliminar</button>
        <button className='btn btn-teal !px-5' onClick={() => navigate(`/ver/registro/${id}`)}>Ver</button>
      </div>
    </div>
  )
}

function VisualizarRegistros() {

  const [registros, setRegistros] = useState()
  const [buscar, setBuscar] = useState({
    buscarTipo: 'nombre',
    buscarValor: ''
  })
  const [visualizarRegistros, setVisualizarRegistros] = useState(localStorage.getItem('visualizarRegistros'))

  const colorScheme = localStorage.getItem('theme') //Para cambiar el color del calendario y del toast en input type="date"

  const navigate = useNavigate()

  useEffect(() => {
    getRegistros()
    
  }, [])

  async function getRegistros() {
    const registrosVal = await axios.get("https://pruebasint323.fly.dev/registros");
    setRegistros(registrosVal.data);
  }

  async function handleEliminar(id) {
    try {
      const eliminarRegistro = await axios.delete(`https://pruebasint323.fly.dev/registros/eliminar/${id}`)
      notify(eliminarRegistro.status)
      getRegistros()
    } catch (error) {
      console.error(error)
      notify(500)
    }
  }

  function notify(num) {
    if (num >= 200 && num < 300) {
      toast.warning(
        'Registro eliminado',
        {
          autoClose: 500,
        },

      )
    } else {
      toast.error('¡Ha ocurrido un error!', {
        autoClose: 500
      })
    }
  }

  const registrosCards = registros 
  ? registros.map(r => (
    <RegistroCard key={r._id} nombre={r.alumno} oximetria={r.oximetria} frecuencia={r.frecuencia} fecha={r.fecha} id={r._id} handleEliminar={handleEliminar}/>
  ))
  : <div className='h-full w-full grid justify-center items-center'>
      <AiOutlineLoading className=" text-center text-7xl animate-spin inline-block -mt-20" />
    </div> 
  

  return (
    <>
      <div className='container h-5/6'>
        <h1 className='container-title'>Historial de registros</h1>
        <div className='w-full sm:w-3/4 overflow-y-auto snap-y h-4/5 sm:h-3/4 mx-auto mt-8 rounded bg-green-100 dark:bg-zinc-900 scrollbar-thin scrollbar-thumb-green-400 dark:scrollbar-thumb-zinc-700 relative'>
          
          <div className='top-0 left-0 sticky group w-full sm:w-1/2 h-14'>
            <input className='form-input !border-none !pl-10 !bg-green-300 dark:!bg-zinc-700 placeholder:!text-green-700 dark:placeholder:!text-zinc-200 !mt-0 border-r !rounded-r-none !rounded-br opacity-50 hover:opacity-100 focus:opacity-100 -translate-y-7 group-hover:translate-y-0 group-active:translate-y-0 focus:translate-y-0 peer !duration-200 absolute !w-full' placeholder='Buscar'/>
            <BsSearch className='absolute ml-3 mt-2.5 z-10 opacity-50 -translate-y-8 group-hover:translate-y-0 peer-focus:translate-y-0 peer-focus:opacity-100 group-hover:opacity-100 transition !duration-200'/>
          </div>
          <button className='btn btn-green absolute right-0 mr-4 -mt-4 text-lg sm:text-xl md:text-2xl' onClick={()=> navigate('/registrar/manual')}><AiOutlinePlus /></button>
            {registrosCards}

        </div>
      </div>
      <ToastContainer theme={colorScheme} position="top-center"/>
    </>
  )
}

export default VisualizarRegistros
