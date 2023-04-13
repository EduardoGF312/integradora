import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {toast, ToastContainer} from 'react-toastify'


const initialState = {
    _id: "",
    fecha: "",
    nombre: "",
    apellido: "",
    genero: "",
    edad: "",
    carrera: "",
    cuatrimestre: "",
    grupo: "",
    padecimiento: "",
    medicamento: "",
    observaciones: "",
}

const ModificarPaciente = () => {

    const colorScheme = localStorage.getItem('theme')

    const {id} = useParams()

    const [paciente, setPaciente] = useState(initialState)

    const navigate = useNavigate()
    
    useEffect(()=>{
        getPaciente()
    }, [])

    async function getPaciente(){
        try {
            const pacienteVal = await axios.get(`https://pruebasint323.fly.dev/pacientes/ver/${id}`)
            setPaciente(pacienteVal.data)
        } catch (error) {
            console.error(error)
        }
    }

    async function handleEliminar(){
        try {
          const eliminarPaciente = await axios.delete(`https://pruebasint323.fly.dev/pacientes/eliminar/${id}`)
          notify(eliminarPaciente.status)
          setTimeout(() => {
            navigate('/visualizar/pacientes')
          }, 1500);
        } catch (error) {
          console.error(error)
          notify(500)
        }
      }

      async function handleSubmit(e){
        e.preventDefault()

        const {fecha, nombre, apellido, genero, edad, carrera, cuatrimestre, grupo, padecimiento, medicamento, observaciones} = paciente
        const postObj = {
            fecha: fecha,
            nombre: nombre,
            apellido: apellido,
            genero: genero,
            edad: edad,
            carrera: carrera,
            cuatrimestre: cuatrimestre,
            grupo: grupo,
            padecimiento: padecimiento,
            medicamento: medicamento,
            observaciones: observaciones
        }

        try {
          const modificarPaciente = await axios.patch(`https://pruebasint323.fly.dev/pacientes/modificar/${id}`, postObj)
          notify(modificarPaciente.status)
          setTimeout(() => {
            navigate('/visualizar/pacientes')
          }, 1500);
        } catch (error) {
          console.error(error)
        }

      }

      function handleChange(e){
        const {name, value} = e.target
        setPaciente({...paciente, [name]: value})
      }
    
      function notify(num){
        console.log(num)
        if(num >= 200 && num < 300){
            toast.info(
                'Paciente modificado',
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

    const { fecha, nombre, apellido, genero, edad, carrera, cuatrimestre, grupo, padecimiento, medicamento, observaciones} = paciente


  return (
    <>
        <div className='container'>
            <h2 className='container-title mb-6'>{nombre ? nombre : '. . . '} {apellido ? apellido : '. . .'}</h2>
            <form onSubmit={handleSubmit}>
                <div className='sm:border border-green-200 dark:border-zinc-600 shadow rounded p-6 w-11/12 mx-auto'> 
                    <p className='my-2 text-lg'><b className='mr-4'>Fecha de registro:</b><input name='fecha' className="form-input !text-start" type="date" value={fecha} style={colorScheme === 'dark' ? {colorScheme: 'dark'} : {}} onChange={handleChange}></input></p>
                    <p className='my-2 text-lg'><b className='mr-4'>Nombre:</b><input name="nombre" type="text" className="form-input !text-start !bg-transparent !pb-0.5" value={nombre} onChange={handleChange}/></p>
                    <p className='my-2 text-lg'><b className='mr-4'>Apellido:</b><input name="apellido" type="text" className="form-input !text-start !bg-transparent !pb-0.5" value={apellido} onChange={handleChange}/></p>
                    <p className='my-2 text-lg'><b className='mr-4'>Género:</b><input name="genero" type="text" className="form-input !text-start !bg-transparent !pb-0.5" value={genero} onChange={handleChange}/></p>
                    <p className='my-2 text-lg'><b className='mr-4'>Edad:</b><input name="edad" type="text" className="form-input !text-start !bg-transparent !pb-0.5" value={edad} onChange={handleChange}/></p>
                    <p className='my-2 text-lg'><b className='mr-4'>Carrera:</b><input name="carrera" type="text" className="form-input !text-start !bg-transparent !pb-0.5" value={carrera} onChange={handleChange}/></p>
                    <p className='my-2 text-lg'><b className='mr-4'>Cuatrimestre:</b><input name="cuatrimestre" type="text" className="form-input !text-start !bg-transparent !pb-0.5" value={cuatrimestre} onChange={handleChange}/></p>
                    <p className='my-2 text-lg'><b className='mr-4'>Grupo:</b><input name="grupo" type="text" className="form-input !text-start !bg-transparent !pb-0.5" value={grupo} onChange={handleChange}/></p>
                    <p className='my-2 text-lg'><b className='mr-4'>Padecimiento:</b><input name="padecimiento" type="text" className="form-input !text-start !bg-transparent !pb-0.5" value={padecimiento} onChange={handleChange}/></p>
                    <p className='my-2 text-lg'><b className='mr-4'>Medicamento:</b><input name="medicamento" type="text" className="form-input !text-start !bg-transparent !pb-0.5" value={medicamento} onChange={handleChange}/></p>
                    <p className='my-2 text-lg'><b className='mr-4'>Observaciones:</b><input name="observaciones" type="text" className="form-input !text-start !bg-transparent !pb-0.5" value={observaciones} onChange={handleChange}/></p>
                </div>
                <div className='mt-6 flex justify-center gap-6'>
                    <button className='btn btn-slate !px-3' type='button' onClick={()=> navigate('/visualizar/pacientes')}>Volver</button>
                    <button className='btn btn-red' type='button' onClick={handleEliminar}>Eliminar</button>
                    <button className='btn btn-green !px-3' type='submit'>Aceptar</button>
                </div>      
            </form>
        </div>
        <ToastContainer theme={colorScheme} position="top-center"/>
    </>
  )
}

export default ModificarPaciente
