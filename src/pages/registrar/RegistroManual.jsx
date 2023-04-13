import React, { useState, useEffect } from 'react'
import { BsFillHeartPulseFill } from 'react-icons/bs'
import { TbTemperatureCelsius } from 'react-icons/tb'
import { SiOxygen } from 'react-icons/si'
import { DateTime } from 'luxon'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

// import Swal from 'sweetalert2'



const initialState = {
  fecha: DateTime.now().toISODate(),
  alumno: '',
  oximetria: '',
  frecuencia: '',
  temperatura: '',
  observaciones: ''

}

const RegistroManual = () => {

  const [datos, setDatos] = useState(initialState)
  const [alumnos, setAlumnos] = useState([])

  const navigate = useNavigate()

  const colorScheme = localStorage.getItem('theme') //Solo para cambiar el color del calendario en input type="date"

  useEffect(() => {
    getAlumnos()
  }, [])

  async function getAlumnos() {
    const pacientesVal = await axios.get("https://pruebasint323.fly.dev/pacientes");
    // setPacientes(pacientesVal.data);
    setAlumnos(pacientesVal.data)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const { fecha, alumno, oximetria, frecuencia, temperatura, observaciones } = datos
    const postObj = {
      fecha: fecha,
      nombre: alumno.split('-')[0],
      apellido: alumno.split('-')[1],
      oximetria: oximetria,
      frecuencia: frecuencia,
      temperatura: temperatura,
      observaciones: observaciones
    }

    try {
      const response = await axios.post('https://pruebasint323.fly.dev/registros', postObj)
      console.log(response)
      notify(response.status)
    } catch (err) {
      console.error(err)
      notify(500)
    }
  }

  function notify(num) {
    if (num >= 200 && num < 300) {
      toast.success(
        'Registro agregado',
        {
          onClose: () => {
            setTimeout(() => {
              navigate('/visualizar/registros')
            }, 2000);
          },
          autoClose: 500,
        },

      )

      // Swal.fire({
      //   title: 'Error!',
      //   text: 'Do you want to continue',
      //   icon: 'success',
      //   confirmButtonText: 'Cool'
      // })
    } else {
      toast.error('¡Ha ocurrido un error!', {
        autoClose: 500
      })
    }
  }

  function handleChange(e) {
    const { name, value } = e.target

    setDatos({ ...datos, [name]: value })
  }
  function handleCancel() {
    setDatos(initialState)
    navigate('/')
  }

  const alumnosOpc = alumnos
    ? alumnos.map(a => (
      <option key={a._id} value={`${a.nombre}-${a.apellido}`}> {`${a.nombre} ${a.apellido}`}</option>
    ))
    : <option value="">----</option>

  const { fecha, alumno, oximetria, frecuencia, temperatura, observaciones } = datos

  return (
    <>
      <div className='container'>
        <h1 className='container-title mb-6'>Agregar registro</h1>
        <form className=" p-2 sm:p-6 pb-8 mb-2 sm:border border-green-200 dark:border-zinc-600 rounded shadow grid sm:grid-cols-3 gap-4 gap-y-10 w-11/12 mx-auto" onSubmit={handleSubmit}>

          <div className='col-span-3 grid sm:grid-cols-2 gap-4'>
            <div className='text-center'>
              <label htmlFor='fecha'>Fecha</label><br />
              <input type='date' className='form-input w-3/4' style={colorScheme === 'dark' ? { colorScheme: 'dark' } : {}} value={fecha} name='fecha' onChange={handleChange} />
            </div>
            <div className='text-center'>
              <label htmlFor='alumno'>Alumno</label><br />
              <select className='form-input w-3/4' value={alumno} name='alumno' onChange={handleChange}>
                <option value=''>----</option>
                {alumnosOpc}
              </select>
            </div>
          </div>
          <div className="col-span-3 grid sm:grid-cols-3 gap-4 sm:gap-0">
            <div className='text-center'>
              <label htmlFor='oximetria'>Oximetría <SiOxygen className='inline-block ml-3 text-xl' /></label><br />
              <input type='number' placeholder='95' className='form-input w-3/5' value={oximetria} name='oximetria' onChange={handleChange} />
            </div>
            <div className='text-center'>
              <label htmlFor=''>Frecuencia Cardiaca <BsFillHeartPulseFill className='inline-block ml-3 text-xl' /></label><br />
              <input type='number' placeholder='110' className='form-input w-3/5' value={frecuencia} name='frecuencia' onChange={handleChange} />
            </div>
            <div className='text-center'>
              <label htmlFor=''>Temperatura</label> <TbTemperatureCelsius className='inline-block ml-3 text-xl' /><br />
              <input type='number' placeholder='37' className='form-input w-3/5' value={temperatura} name='temperatura' onChange={handleChange} />
            </div>
          </div>
          <div className='text-center col-span-3'>
            <label htmlFor='observaciones'>Observaciones</label><br />
            <textarea placeholder='Observaciones' className='form-input h-16 resize-none !text-justify w-5/6 styled-scrollbar' value={observaciones} name='observaciones' onChange={handleChange} />
          </div>
          <div className='col-span-3 text-center'>
            <button className='btn btn-red mx-4 !px-6' type='reset' onClick={handleCancel}>Cancelar</button>
            <button className='btn btn-green mx-4 !px-6 mt-5 sm:mt-0' type='submit'>Aceptar</button>
          </div>
        </form>
        <ToastContainer theme={colorScheme} position="top-center" />
      </div>
    </>
  )
}

export default RegistroManual
