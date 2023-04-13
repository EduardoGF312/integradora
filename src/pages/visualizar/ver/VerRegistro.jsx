import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify'
import axios from 'axios'

const initialState = {
  _id: "",
  fecha: "",
  alumno: "",
  oximetria: "",
  frecuencia: "",
  temperatura: "",
  observaciones: "",
    
}

const VerRegistro = () => {
  const colorScheme = localStorage.getItem('theme')

  const {id} = useParams()

  const [registro, setRegistro] = useState(initialState)

  const navigate = useNavigate()
  
  useEffect(()=>{
      getRegistro()
  }, [])

  async function getRegistro(){
      try {
          const registroVal = await axios.get(`https://pruebasint323.fly.dev/registros/ver/${id}`)
          setRegistro(registroVal.data)
      } catch (error) {
          console.error(error)
      }
  }

  async function handleEliminar(){
      try {
        const eliminarRegistro = await axios.delete(`https://pruebasint323.fly.dev/registros/eliminar/${id}`)
        notify(eliminarRegistro.status)
        setTimeout(() => {
          navigate('/visualizar/registros')
        }, 1500);
      } catch (error) {
        console.error(error)
        notify(500)
      }
    }
  
    function notify(num){
      if(num >= 200 && num < 300){
          toast.warning(
              'Registro eliminado',
              {
                autoClose:500,
              },
    
            )
      }else{
          toast.error('¡Ha ocurrido un error!',{
              autoClose: 500
          })
      }
  }

  const {fecha, alumno, oximetria, frecuencia, temperatura, observaciones} = registro

  return (
    <>
      <div className='container'>
      <h2 className='container-title mb-6'>{alumno ? alumno : '. . .'}</h2>
            <div className='sm:border border-green-200 dark:border-zinc-600 shadow rounded p-6 w-11/12 mx-auto'> 
                <p className='my-2 text-lg'><b className='mr-2'>Fecha de registro:</b> {fecha ? fecha : '. . .'}</p>
                <p className='my-2 text-lg'><b className='mr-2'>Nombre del alumno:</b> {alumno ? alumno : '. . .'}</p>
                <p className='my-2 text-lg'><b className='mr-2'>Oximetría:</b> {oximetria ? oximetria : '. . .'}</p>
                <p className='my-2 text-lg'><b className='mr-2'>Frecuencia:</b> {frecuencia ? frecuencia : '. . .'}</p>
                <p className='my-2 text-lg'><b className='mr-2'>Temperatura:</b> {temperatura ? temperatura : '. . .'}</p>
                <p className='my-2 text-lg'><b className='mr-2'>Observaciones:</b> {observaciones ? observaciones : '. . .'}</p>
            </div>
            <div className='mt-6 flex justify-center gap-6'>
                <button className='btn btn-slate !px-3' onClick={()=> navigate('/visualizar/registros')}>Volver</button>
                <button className='btn btn-red' onClick={handleEliminar}>Eliminar</button>
            </div>
      </div>
      <ToastContainer theme={colorScheme} position="top-center" />
    </>
  )
}

export default VerRegistro
