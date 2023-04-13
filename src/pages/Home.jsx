import React, { useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineTeam, AiOutlineArrowRight, AiOutlineDiff, AiOutlineQuestionCircle } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import axios from "axios";


const Home = () => {
  const [mensaje, setMensaje] = useState("");
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [pacientes, setPacientes] = useState("");
  const [registros, setRegistros] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    const getCurrentHour = () => {
      const now = new Date();
      const hour = now.getHours();
      return hour;
    };

    const updateImageSrc = () => {
      const hour = getCurrentHour();
      console.log(hour)

      if (hour >= 0 && hour < 7) {
        setMensaje("Buenas noches!"); // Mensaje para la imagen de la noche
      } else if (hour >= 7 && hour < 12) {
        setMensaje("Buenos dias!"); // Mensaje para la imagen de la noche
      } else if (hour >= 12 && hour < 16) {
        setMensaje("Buenas tardes!"); // Mensaje para la imagen de la noche
      } else {
        setMensaje("Buenas noches!"); // Mensaje para la imagen de la noche
      }
    };


    const fetchData = async () => {
      try {
        const response = await axios.get('https://pruebasint323.fly.dev/pacientes');
        const response2 = await axios.get('https://pruebasint323.fly.dev/registros');
        const pacientesNumber = response.data.length;
        const registrosNumber = response2.data.length;
        setPacientes(pacientesNumber);
        setRegistros(registrosNumber);
      } catch (error) {
        console.log(error);
      }
    };

    updateImageSrc();

    // Configuramos el intervalo para llamar a fetchData() cada 1000 ms (1 segundo)
    const interval = setInterval(fetchData, 1000);

    // Limpiamos el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  function handleAgregar() {
    navigate('registrar/automatico')
  }

  function handleNewPaciente() {
    navigate('registrar/paciente')
  }

  function handlePacientes() {
    navigate('visualizar/pacientes')
  }

  function handleRegistros() {
    navigate('visualizar/registros')
  }

  return (
    // <div className="relative w-full h-full">

    //   {/* IMAGEN QUE CAMBIA DEPENDIENDO DE LA HORA */}
    //   <h1 className='mt-4 text-4xl'><img src={imageSrc} alt="Imagen de fondo" className="inline-block rounded rounded-xl w-16 ml-3 -mt-8" /> {mensaje}</h1>

    //   {/* BOTON PARA IR A AGREGAR NUEVO REGISTRO */}
    //   <button className="absolute top-0 right-0 btn btn-green text-lg sm:text-xl md:text-xl p-2 sm:px-4 md:px-6 sm:py-2 md:py-3 flex items-center gap-1" onClick={handleAgregar}>
    //     <AiOutlinePlus className="inline-block transform -translate-x-1 mb-1" />
    //     <span className="hidden sm:block">Nuevo registro</span>
    //   </button>

    //   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    //     {/* CARTA PARA MOSTRAR NUMERO DE PACIENTES */}
    //     <div className="fondo container flex justify-center items-center w-full sm:w-full h-40 sm:h-40 sm:rounded-2xl p-6 relative top-8">
    //       <AiOutlineTeam className="absolute top-9 left-4 sm:left-10 text-7xl" />
    //       <div className="ml-12 sm:ml-0">
    //         <p className="text-gray-500 text-sm sm:text-lg">Número de pacientes</p>
    //         <h1 className="font-bold text-3xl sm:text-4xl">2</h1>
    //       </div>
    //       <p className="text-green-300 mt-4 sm:absolute sm:bottom-4 sm:right-4 cursor-pointer hover:scale-105" onClick={handlePacientes}>Ver todos <AiOutlineArrowRight className="inline-block hover:translate-x-1.5 hover:scale-105 transition" /></p>
    //     </div>

    //     {/* CARTA PARA MOSTRAR REGISTROS */}
    //     <div className="fondo container flex justify-center items-center w-full sm:w-full h-40 sm:h-40 sm:rounded-2xl p-6 relative top-60 right-[104%]">
    //       <AiOutlineDiff className="absolute top-12 left-4 sm:left-10 text-7xl" />
    //       <div className="ml-12 sm:ml-0">
    //         <p className="text-gray-500 text-sm sm:text-lg">Número de registros</p>
    //         <h1 className="font-bold text-3xl sm:text-4xl">20</h1>
    //       </div>
    //       <p className="text-green-300 mt-4 sm:absolute sm:bottom-4 sm:right-4 cursor-pointer hover:scale-105" onClick={handleRegistros}>Ver todos <AiOutlineArrowRight className="inline-block hover:translate-x-1.5 hover:scale-105 transition" /></p>
    //     </div>

    //     {/* CARD YO NEED HELP? */}
    //     <div className="fondo justify-center items-center w-full sm:rounded-2xl sm:w-full p-6 relative -top-36 left-[104%] h-[64%]">
    //       <h1 className="text-gray-500 text-sm sm:text-2xl font-bold mb-5">¿Necesitas ayuda?</h1>
    //       <div className="">
    //         <p className="text-3xl sm:text-xl">Tenemos para ti la seccion de ayuda, no dudes en usarla si te encuentras atascado en el sistema</p>
    //         <p className="text-green-300 mt-5 cursor-pointer" onClick={handleRegistros}>Ayuda <AiOutlineArrowRight className="inline-block hover:translate-x-1.5 hover:scale-105 transition" /></p>
    //       </div>
    //     </div>
    //   </div>

    // </div>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 w-full h-full items-center 2xl:w-screen 2xl:h-screen">

      {/* Mensaje en el lado izquierdo */}
      <div className="flex flex-col">
        <h1 className="text-dark text-4xl sm:text-4xl 2xl:text-5xl font-bold">{mensaje}</h1>
      </div>

      {/* Botón en el lado derecho */}
      <div className="flex justify-end">
        <button onClick={handleAgregar} className="shadow-lg btn btn-green px-6 py-3 sm:rounded-2xl text-lg sm:text-xl md:text-xl p-2 sm:px-4 md:px-6 sm:py-2 md:py-3 flex items-center gap-1 mr-5">
          <p className="cursor-pointer"><AiOutlinePlus className="inline-block transform -translate-x-1 mb-1" /> Nuevo registro</p>
        </button>

        <button onClick={handleNewPaciente} className="shadow-lg btn btn-blue px-6 py-3 sm:rounded-2xl text-lg sm:text-xl md:text-xl p-2 sm:px-4 md:px-6 sm:py-2 md:py-3 flex items-center gap-1">
          <p className="cursor-pointer"><AiOutlinePlus className="inline-block transform -translate-x-1 mb-1" /> Nuevo paciente</p>
        </button>
      </div>

      {/* PRIMERA CARTA */}
      <div className="fondo p-8 2xl:p-14  sm:rounded-sm shadow-md flex -mt-10 2xl:-mt-60">
        {/* Contenido de la primera carta */}
        <AiOutlineTeam className="w-20 h-20 2xl:w-32 2xl:h-32 mr-10 2xl:mr-14" />
        <div className="flex flex-col">
          <p className="dark:text-gray-500 text-green-900 text-xl sm:text-2xl 2xl:text-3xl dark:font-medium">Número de pacientes</p>
          <h1 className="dark:text-white text-green-600 font-bold text-3xl sm:text-4xl mb-4 2xl:text-5xl">{pacientes}</h1>
          <p className="mas cursor-pointer font-bold 2xl:text-xl" onClick={handlePacientes}>Ver todos <AiOutlineArrowRight className="inline-block hover:translate-x-1.5 hover:scale-105 transition" /></p>
        </div>
      </div>

      {/* SEGUNDA CARTA */}
      <div className="fondo p-8 2xl:p-14 sm:rounded-sm shadow-md flex -mt-10 2xl:-mt-60">
        {/* Contenido de la segunda carta */}
        <AiOutlineDiff className="w-20 h-20 2xl:w-28 2xl:h-28 mr-10 2xl:mr-14" />
        <div className="flex flex-col">
          <p className=" dark:text-gray-500 text-green-900 text-xl sm:text-2xl 2xl:text-3xl dark:font-medium">Número de registros</p>
          <h1 className="dark:text-white text-green-600 font-bold text-3xl sm:text-4xl mb-4 2xl:text-5xl">{registros}</h1>
          <p className="mas cursor-pointer font-bold 2xl:text-xl" onClick={handleRegistros}>Ver todos <AiOutlineArrowRight className="inline-block hover:translate-x-1.5 hover:scale-105 transition" /></p>
        </div>

      </div>

      {/* TERCERA CARTA */}
      <div className="fondo col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 p-5 2xl:p-10 sm:rounded-sm shadow-md -mt-16 2xl:-mt-80" style={{ gridColumn: "span 2 / span 1" }}>
        {/* Contenido de la tercera carta */}
        <h1 className="dark:text-gray-500 text-green-600 text-xl sm:text-2xl 2xl:text-3xl mb-5 dark:font-medium">¿Necesitas ayuda?</h1>
        <p className="text-black dark:text-white text-lg sm:text-lg 2xl:text-2xl mb-5">Tenemos para ti la seccion de ayuda, no dudes en usarla si te encuentras atascado en el sistema</p>
        <p className="mas cursor-pointer font-bold 2xl:text-xl" onClick={handleRegistros}>Ayuda <AiOutlineArrowRight className="inline-block hover:translate-x-1.5 hover:scale-105 transition" /></p>
      </div>

    </div>


  );
};

export default Home;
