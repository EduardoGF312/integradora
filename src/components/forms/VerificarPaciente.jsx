import React, { useEffect, useRef, useState } from 'react'
import { BsChevronLeft, BsDash } from 'react-icons/bs'
import {MdOutlineArrowRight} from 'react-icons/md'
import {useNavigate} from 'react-router-dom'
import { DateTime } from 'luxon'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'


const initialState = {
    nombre: '',
    apellido: '',
    genero: '',
    edad: '',
    carrera: '',
    cuatrimestre: '',
    grupo: '',
    padecimiento: '',
    medicamento: '',
    observaciones: ''
}

const VerificarPaciente = ({setForm}) => {

    const colorScheme = localStorage.getItem('theme') //Para cambiar el color del calendario y del toast en input type="date"3

    const [datos, setDatos] = useState(initialState)

    const navigate = useNavigate()

    const fecha = useRef()

    useEffect(()=>{ //Obteniendo todos los datos en el sessionStorage
        const datosGeneral = JSON.parse(sessionStorage.getItem('pacienteGeneral'))
        const datosCurricular = JSON.parse(sessionStorage.getItem('pacienteCurricular'))
        const datosHMedica = JSON.parse(sessionStorage.getItem('pacienteHMedica'))

        const {nombre, apellido, genero, edad} = datosGeneral
        const {carrera, cuatrimestre, grupo} = datosCurricular
        const {padecimiento, medicamento, observaciones} = datosHMedica

        setDatos({nombre, apellido, genero, edad, carrera, cuatrimestre, grupo, padecimiento, medicamento, observaciones})

    }, [])

    async function handleSubmit(){ //Subir la información a la base de datos con axios
        const {nombre, apellido, genero, edad, carrera, cuatrimestre, grupo, padecimiento, medicamento, observaciones} = datos
        const fechaVal = fecha.current.value
        const postObj = {
            fecha: fechaVal,
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
            const response = await axios.post('https://pruebasint323.fly.dev/pacientes', postObj)
            notify(response.status)
            
        } catch (error) {
            console.error(error)
            notify(500)
        }

        console.log(fechaVal)
        console.log(datos)

    }
    function handleCancelar(){
        sessionStorage.clear()
        navigate('/')
    }

    function notify(num){
        if(num >= 200 && num < 300){
            toast.success(
                'Registro agregado',
                {
                  onClose:() =>{
                    setTimeout(() => {
                        sessionStorage.clear()
                        navigate('/visualizar/pacientes')
                    }, 2000);
                  },
                  autoClose:500,
                },
      
              )
        }else{
            toast.error('¡Ha ocurrido un error!',{
                autoClose: 500
            })
        }
    }

    const {nombre, apellido, genero, edad, carrera, cuatrimestre, grupo, padecimiento, medicamento, observaciones} = datos

  return (
    <>
    <button className="self-center justify-self-center text-4xl group" onClick={()=> setForm('hmedica')}>
        <BsChevronLeft className=" group-hover:-translate-x-1.5 group-hover:scale-105 transition"/>
    </button>
    <div className="p-2 sm:p-6 pb-8 sm:border border-green-200 dark:border-zinc-600 rounded shadow col-span-8 overflow-x-auto styled-scrollbar" onSubmit={handleSubmit}>

        <h1 className='text-lg sm:text-2xl mb-4 text-center'>¿La información es correcta?</h1>

        <h2 className=' font-semibold text-base sm:text-lg mb-2'><MdOutlineArrowRight className='inline-block mb-1 text-xl' /> Información general</h2>
        <p className='ml-6 text-xs sm:text-base'><BsDash className='inline-block mb-0.5'/><b className='mr-2'>Fecha de registro: </b><input type='date' ref={fecha} className='form-input !border-none !rounded !mt-0 !py-0' style={colorScheme === 'dark' ? {colorScheme: 'dark'} : {}} defaultValue={DateTime.now().toISODate()}/></p>
        <p className='ml-6 text-xs sm:text-base'><BsDash className='inline-block mb-0.5'/> <b className=' mr-2'>Nombre completo: </b>{nombre ? nombre : '. . .'} {apellido ? apellido : '. . .'}</p>
        <p className='ml-6 text-xs sm:text-base'><BsDash className='inline-block mb-0.5'/> <b className=' mr-2'>Genero: </b>{genero ? genero : '. . .'} <b className='ml-4 mr-2'>Edad: </b> {edad ? edad : '. . .'}</p>

        <h2 className=' font-semibold text-base sm:text-lg mt-3 mb-2'><MdOutlineArrowRight className='inline-block mb-1 text-xl' /> Información curricular</h2>
        <p className='ml-6 text-xs sm:text-base'><BsDash className='inline-block mb-0.5'/> <b className=' mr-2'>Carrera: </b>{carrera ? carrera : '. . .'}</p>
        <p className='ml-6 text-xs sm:text-base'><BsDash className='inline-block mb-0.5'/> <b className=' mr-2'>Grado y grupo: </b>{cuatrimestre > 0 ? cuatrimestre + ' °' : '. . .'} {grupo}</p>

        <h2 className=' font-semibold text-base sm:text-lg mt-3 mb-2'><MdOutlineArrowRight className='inline-block mb-1 text-xl' /> Historia médica</h2>
        <p className='ml-6 text-xs sm:text-base'><BsDash className='inline-block mb-0.5'/> <b className=' mr-2'>Padecimiento: </b>{padecimiento ? padecimiento : '. . .'}</p>
        <p className='ml-6 text-xs sm:text-base'><BsDash className='inline-block mb-0.5'/> <b className=' mr-2'>Medicamento: </b>{medicamento ? medicamento: '. . .'}</p>
        <p className='ml-6 text-xs sm:text-base'><BsDash className='inline-block mb-0.5'/> <b className=' mr-2'>Observaciones: </b>{observaciones ? observaciones : '. . .'}</p>

    </div>
    <div />


    <div className='col-span-10 text-center mt-6 grid justify-center sm:block gap-4'>
        <button className='btn btn-red w-fit !px-3 sm:px-2' onClick={handleCancelar}>Cancelar</button>
        <button className='btn btn-green !px-6 sm:ml-6 w-fit sm:px-2' onClick={handleSubmit}>Subir</button>
    </div>

    <ToastContainer position='top-center' theme={colorScheme} />
    
    </>
  )
}

export default VerificarPaciente
