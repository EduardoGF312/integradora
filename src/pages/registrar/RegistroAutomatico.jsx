// import React from 'react'
// import {BsFillHeartPulseFill} from 'react-icons/bs'
// import {TbTemperatureCelsius} from 'react-icons/tb'
// import {SiOxygen} from 'react-icons/si'
// import { DateTime } from 'luxon'

// function BarraCircular({id, name, valor}){

//   const svgStyles = {
//     width: '8rem',
//     height: '8rem',
//     marginInline: 'auto',
//     marginTop: '-4rem'
//   }

//   return(
//     <>
//       <svg viewBox="0 0 100 100" style={svgStyles}>
//         <g fill="none" stroke="#ddd">
//           <circle cx="50" cy="100" r="40" strokeWidth="5" />
//           <circle cx="50" cy="100" r="40" strokeWidth="5" id={id} className="stroke-green-400"
//           // strokeDasharray="125.6 "
//           // strokeDasharray={valor}
//           strokeDasharray="252"
//           />
//         </g>
//       </svg>
//       <p className='absolute -translate-y-8 w-full'>90</p>
//       <p>{name}</p>
//     </>
//   )
// }

// const RegistroAutomatico = () => {

//   const colorScheme = localStorage.getItem('theme') //Solo para cambiar el color del calendario en input type="date"

//   function handleSubmit(e){
//     e.preventDefault()
//   }
  
//   return (
//     <>
//     <div className='container'>
//       <h1 className='container-title mb-6'>Agregar registro</h1>
//       <form className=" p-6 pb-8 mb-2 border border-green-200 dark:border-zinc-600 rounded shadow grid grid-cols-3 gap-4 gap-y-10 w-11/12 mx-auto" onSubmit={handleSubmit}>

//         <div className='col-span-3 grid grid-cols-2 gap-4'>
//           <div className='text-center'>
//             <label>Fecha</label><br />
//             <input type='date' className='form-input w-3/4' style={colorScheme === 'dark' ? {colorScheme: 'dark'} : {}}  value={DateTime.now().toISODate()}/>
//           </div>
//           <div className='text-center'>
//             <label>Alumno</label><br />
//             <select className='form-input w-3/4'>
//               <option>Ángel Uriel González Urrutia</option>
//             </select>
//           </div>
//         </div>
//         <div className='text-center relative'>
//           <BarraCircular id="oximetria" name="Oximetría"/>
//         </div>
//         <div className='text-center relative'>
//           <BarraCircular id="presion" name="Frecuencia cardiaca" />
//         </div>
//         <div className='text-center relative'>
//           <BarraCircular id="temperatura" name="Temperatura" />
//         </div>
//         <div className='text-center col-span-3'>
//           <label htmlFor=''>Observaciones</label><br />
//           <textarea placeholder='Observaciones' className='form-input h-16 resize-none !text-justify w-5/6 styled-scrollbar'/>
//         </div>
//         <div className='col-span-3 text-center'>
//               <button className='btn btn-green mx-4 !px-6' type='submit'>Aceptar</button>
//               <button className='btn btn-red mx-4 !px-6'>Cancelar</button>
//           </div>

//       </form>
//     </div>
//     </>
//   )
// }

// export default RegistroAutomatico

import React, { useState, useEffect } from 'react'
import { BsFillHeartPulseFill } from 'react-icons/bs'
import { TbTemperatureCelsius } from 'react-icons/tb'
import { SiOxygen } from 'react-icons/si'
import { DateTime } from 'luxon'
import axios from "axios";
import { useNavigate } from 'react-router-dom'

function BarraCircular({ id, name, valor }) {

  const svgStyles = {
    width: '8rem',
    height: '8rem',
    marginInline: 'auto',
    marginTop: '-4rem'
  }

  let barraValor = 0;

  if (id === "frecuencia") {
    if (valor < 0) {
      valor = 0;
    } else if (valor > 250) {
      valor = 250;
    }
    barraValor = 125.6 + ((valor * 126.4) / 250);
  } else if (id === "oximetria") {
    if (valor < 0) {
      valor = 0;
    } else if (valor > 100) {
      valor = 100;
    }
    barraValor = 125.6 + ((valor * 126.4) / 100);
  }else if (id === "temperatura"){
    barraValor = 125.6 + ((valor * 126.4) / 40);
  }


  return (
    <>
      <svg viewBox="0 0 100 100" style={svgStyles}>
        <g fill="none" stroke="#ddd">
          <circle cx="50" cy="100" r="40" strokeWidth="5" />
          <circle cx="50" cy="100" r="40" strokeWidth="5" id={id} className="stroke-green-400"
            // strokeDasharray="125.6 "
            strokeDasharray={barraValor}
          />
          <text></text>
        </g>
      </svg>
      <p className='absolute -translate-y-8 w-full'>{valor}</p>
      <p>{name}</p>
    </>
  )
}

const initialState = {
  fecha: DateTime.now().toISODate(),
  alumno: '',
  oximetria: '',
  frecuencia: '',
  temperatura: '',
  observaciones: ''
}

const RegistroAutomatico = () => {
  const [bpm, setBPM] = useState(null);
  const [spo2, setSpO2] = useState(null);
  const [contador, setContador] = useState(0);
  const [temp, setTemp] = useState(null);

  const [datos, setDatos] = useState(initialState)
  const [alumnos, setAlumnos] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://ny3.blynk.cloud/external/api/get?token=ik86R45NKaQc25kh2ziw2-wjIjEX1gz8&v1&v2&v3&v4');
        const bpmValue = response.data.v1;
        const spo2Value = response.data.v2;
        const contadorValue = response.data.v3;
        const tempValue = response.data.v4;
        setBPM(bpmValue);
        setSpO2(spo2Value);
        setContador(contadorValue);
        setTemp(tempValue);
      } catch (error) {
        console.log(error);
      }
    };

    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  const colorScheme = localStorage.getItem('theme') //Solo para cambiar el color del calendario en input type="date"

  function handleSubmit(e) {
    e.preventDefault()
  }

  function handleChange(e){
    const {name, value} = e.target

    setDatos({...datos, [name]: value})
  }

  function handleCancel(){
    setDatos(initialState)
    navigate('/')
  }

  const {fecha, alumno, oximetria, frecuencia, temperatura, observaciones} = datos


  return (
    <>
      <div className='container'>
        <h1 className='container-title mb-6'>Agregar registro</h1>
        <form className=" p-2 sm:p-6 pb-8 mb-2 sm:border border-green-200 dark:border-zinc-600 rounded shadow grid sm:grid-cols-3 gap-4 gap-y-10 w-11/12 mx-auto" onSubmit={handleSubmit}>

          <div className='col-span-3 grid sm:grid-cols-2 gap-4'>
            <div className='text-center'>
              <label>Fecha</label><br />
              <input type='date' className='form-input w-3/4' style={colorScheme === 'dark' ? { colorScheme: 'dark' } : {}} value={fecha} name="fecha" onChange={handleChange} />
            </div>
            <div className='text-center'>
              <label>Alumno</label><br />
              <select className='form-input w-3/4'>
                <option>Ángel Uriel González Urrutia</option>
              </select>
            </div>
          </div>
          {/* {contador == 50 ? ( */}
            <div className='grid sm:grid-cols-3 gap-4 sm:gap-0 col-span-3'>
              <div className='text-center relative'>
                <BarraCircular id="oximetria" name="Oximetría" valor={spo2} />
              </div>
              <div className='text-center relative'>
                <BarraCircular id="frecuencia" name="Frecuencia Cardiaca" valor={bpm} />
              </div>
              <div className='text-center relative'>
                <BarraCircular id="temperatura" name="Temperatura" valor={temp} />
              </div>
            </div>
          {/* ) : (
            <div className='grid col-span-3'>
              <div className='text-center relative'>
                <p style={{fontWeight: 'bold'}}>Recolectando muestras {contador} de 50</p>
              </div>
            </div>
          )} */}

          {/* <div className='text-center relative'>
            <BarraCircular id="temperatura" name="Temperatura" />
          </div> */}
          <div className='text-center col-span-3'>
            <label htmlFor=''>Observaciones</label><br />
            <textarea placeholder='Observaciones' className='form-input h-16 resize-none !text-justify w-5/6 styled-scrollbar' />
          </div>
          <div className='col-span-3 text-center'>
            <button className='btn btn-red mx-4 !px-6 mt-5 sm:mt-0' onClick={handleCancel}>Cancelar</button>
            <button className='btn btn-green mx-4 !px-6' type='submit'>Aceptar</button>
          </div>

        </form>
      </div>
    </>
  )
}

export default RegistroAutomatico
