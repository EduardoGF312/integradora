import React, { useEffect, useState } from "react";
import { BsEye, BsPen, BsTrash, BsSearch} from "react-icons/bs";
import { AiOutlineLoading, AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const VisualizarPacientes = () => {

  const colorScheme = localStorage.getItem('theme') //Para cambiar el color del calendario y del toast en input type="date"

  const [pacientes, setPacientes] = useState()
  const [buscar, setBuscar] = useState({
    buscarTipo: 'nombre',
    buscarValor: ''
  })


  const navigate = useNavigate()

  useEffect(() => {
    getPacientes();
  }, []);

  async function getPacientes() {
    try {
      const pacientesVal = await axios.get("https://pruebasint323.fly.dev/pacientes");
      setPacientes(pacientesVal.data);
    } catch (error) {
      console.error(error)
    }
  }

  async function handleEliminar(id){
    console.log(id)
    try {
      const eliminarPaciente = await axios.delete(`https://pruebasint323.fly.dev/pacientes/eliminar/${id}`)
      notify(eliminarPaciente.status)
      getPacientes()
    } catch (error) {
      console.error(error)
      notify(500)
    }
  }

  function notify(num){
    if(num >= 200 && num < 300){
        toast.warning(
            'Paciente eliminado',
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
  function handleChange(e){
    const {value} = e.target
    setBuscar({...buscar, buscarValor: value.toLowerCase()})
  }
  function handleBuscarToggle(){
    buscarTipo === 'nombre' ? setBuscar({...buscar, buscarTipo: 'apellido'}) : setBuscar({...buscar, buscarTipo: 'nombre'})
  }


  const {buscarTipo, buscarValor} = buscar

  const pacientesRows = pacientes 
  ? 
    buscarTipo === 'nombre' 
    ? pacientes.filter(pac => pac.nombre.toLowerCase().includes(buscarValor)).reverse().map(p => (
        <tr className="hover:bg-green-50 dark:hover:bg-zinc-700 transition text-sm sm:text-base" key={p._id}>
          <td className="py-2">{p.nombre ? p.nombre : '. . .'}</td> 
          <td className="py-2">{p.apellido ? p.apellido : '. . .'}</td> 
          <td className="py-2">{p.edad ? p.edad : '. . .'}</td> 
          <td className="py-2">{p.carrera ? p.carrera : '. . .'}</td> 
          <td className="py-2">{p.cuatrimestre ? p.cuatrimestre + ' °' : '. . .'} {p.grupo}</td> 
          <td className="py-2">
            <button className='btn btn-red m-2' onClick={() => handleEliminar(p._id)}><BsTrash /></button>
            <button className='btn btn-teal m-2' onClick={() => navigate(`/ver/paciente/${p._id}`)}><BsEye /></button>
            <button className='btn btn-blue m-2' onClick={()=> navigate(`/modificar/paciente/${p._id}`)}><BsPen /></button>
          </td>
        </tr>
      )) 
    : pacientes.filter(pac => pac.apellido.toLowerCase().includes(buscarValor)).reverse().map(p => (
      <tr className="hover:bg-green-50 dark:hover:bg-zinc-700 transition text-sm sm:text-base" key={p._id}>
        <td className="py-2">{p.nombre ? p.nombre : '. . .'}</td> 
        <td className="py-2">{p.apellido ? p.apellido : '. . .'}</td> 
        <td className="py-2">{p.edad ? p.edad : '. . .'}</td> 
        <td className="py-2">{p.carrera ? p.carrera : '. . .'}</td> 
        <td className="py-2">{p.cuatrimestre ? p.cuatrimestre + ' °' : '. . .'} {p.grupo}</td> 
        <td className="py-2">
          <button className='btn btn-red m-2' onClick={() => handleEliminar(p._id)}><BsTrash /></button>
          <button className='btn btn-teal m-2' onClick={() => navigate(`/ver/paciente/${p._id}`)}><BsEye /></button>
          <button className='btn btn-blue m-2' onClick={()=> navigate(`/modificar/paciente/${p._id}`)}><BsPen /></button>
        </td>
      </tr>
    ))

  : (
    <tr>
      <td className="py-14 text-center" colSpan="100%">
        <h1>No hay pacientes registrados</h1>
      </td>
    </tr>
  );

  return (
    <>
      <div className="container !py-10 ">
        <h1 className="container-title mb-5">Lista de pacientes</h1>
        <div className="w-11/12 mx-auto flex justify-between mt-8">

          <div className='w-3/4 md:w-1/2 justify-self-start'>
            <input className='form-input !border-none !rounded-b !pl-10 !bg-green-200 dark:!bg-zinc-700 placeholder:!text-green-700 dark:placeholder:!text-zinc-200 !mt-0 opacity-50 hover:opacity-100 focus:opacity-100 !duration-200 !w-full' 
            placeholder={buscarTipo === 'nombre' ? 'Buscar por nombre' : 'Buscar por apellido'} 
            value={buscarValor}
            onChange={handleChange}
            />
            <button className='absolute ml-3 z-10 opacity-50 -translate-y-[1.625rem] peer-focus:opacity-100 transition !duration-200 flex' onClick={handleBuscarToggle}>
              <BsSearch/>
              <p className='ml-1.5 -mt-[0.285rem]'>{buscarTipo === 'nombre' ? 'N' : 'A'}</p>
            </button>
          </div>

          <button className=" btn btn-green text-lg sm:text-xl md:text-2xl" onClick={()=> navigate('/registrar/paciente')}><AiOutlinePlus /></button>
        </div>
        {/* <hr className='my-2 w-1/2  mx-auto'/> */}
        <div className=" overflow-x-auto w-11/12 mx-auto mt-4 styled-scrollbar">

          <table className="table-auto rounded w-full min-w-max text-center">
            <thead className="border-b border-green-300 dark:border-zinc-400">
              <tr className="hover:bg-green-50 dark:hover:bg-zinc-700 transition text-xs sm:text-base">
                <th className="p-2">Nombre</th>
                <th className="p-2">Apellido</th>
                <th className="p-2">Edad</th>
                <th className="p-2">Carrera</th>
                <th className="p-2">Grado y grupo</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pacientesRows}
            </tbody>
          </table>
        </div>
        <ToastContainer theme={colorScheme} position="top-center" />
      </div>
    </>
  );
};

export default VisualizarPacientes;
