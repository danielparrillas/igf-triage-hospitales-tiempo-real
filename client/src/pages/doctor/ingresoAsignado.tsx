// src/components/IngresoDetail.tsx
import React, { useEffect, useState } from "react";
import { Ingreso,Doctor,Paciente } from '../ingreso'
import { getIngresoConDoctorAsignado } from '../../services/ingresoService.ts'
import UrgenciaBadge from '../../components/urgencia-badge.tsx'
import { useSocket } from '../../hooks/useSocket.ts'






const IngresoAsignadoDetails: React.FC = () => {
  const [ingreso, setIngreso] = useState<Ingreso | null>(null);
  const [loading, setLoading] = useState(true);
  const socket = useSocket();


  useEffect(() => {


    const fetchIngreso = async () => {
      try {
        const doctorId = JSON.parse(localStorage.getItem("auth") ??'').user.id
        /*console.log("id de doctor");
        console.log(JSON.parse(localStorage.getItem("auth") ??'').user.id);*/



        const response:Ingreso  =  await getIngresoConDoctorAsignado(doctorId);

        setIngreso(response)
      } catch (error) {
        console.error("Error fetching ingreso data:", error);
      } finally {
        setLoading(false);
      }
    };

    socket?.on('nuevoPacienteAsignado',(nuevoIngresoAsignado:Ingreso) =>{
      console.log(nuevoIngresoAsignado)
      if(nuevoIngresoAsignado == null ) {
        console.log("No se encontraron ingreso")
        setIngreso(null);
      }else{
        setIngreso(nuevoIngresoAsignado)
      }

    })

    fetchIngreso();

    console.log("socket cambio")

    return () =>{
      socket?.off('nuevoPacienteAsignado');
    }
  }, [socket]);


  const finalizarConsultaPorIngreso = () => {
    const idDoctor = JSON.parse(localStorage.getItem("auth") ??'').user.id
    const idIngreso = ingreso?.id
    socket?.emit('consultaFinalizo',{idDoctor,idIngreso})


  }

  if (loading) {
    return <p>Cargando ingreso...</p>;
  }

  if (!ingreso) {
    return <p>Error: Ingreso no encontrado.</p>;
  }

  return (<>


      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4  rounded">
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6">Detalles del Ingreso</h2>

              <div className="mb-3">
                <p><strong>Razón:</strong> {ingreso.razon}</p>
                <p><strong>Fecha:</strong> {new Date(ingreso.fecha).toLocaleString()}</p>
                <p><strong>Peso:</strong> {ingreso.peso} kg</p>
                <p><strong>Altura:</strong> {ingreso.altura} m</p>
                <p><strong>Temperatura:</strong> {ingreso.temperatura} °C</p>
                <p><strong>Presión:</strong> {ingreso.presion}</p>
                <p><strong>Síntomas:</strong> {ingreso.sintomas}</p>
                <p><strong>Urgencia:</strong> <UrgenciaBadge urgencia={ingreso.urgencia} /></p>
                <p>
                  <strong>Estado:</strong> {['Pendiente', 'Datos', 'En espera', 'Atención', 'Finalizado'][ingreso.estado]}
                </p>
              </div>
            </div>

            <button
              onClick={() => finalizarConsultaPorIngreso()}
              className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'}>Finalizar
              atencion
            </button>
          </div>


          <div className="p-4  rounded">

            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mt-6 mb-4">Datos del Paciente</h3>
              <div className="mb-3">
                <p><strong>Nombre:</strong> {ingreso.paciente.nombre}</p>
                <p><strong>Fecha de
                  Nacimiento:</strong> {new Date(ingreso.paciente.fechaNacimiento).toLocaleDateString()}</p>
                <p><strong>Sexo:</strong> {ingreso.paciente.sexo === 0 ? "Hombre" : "Mujer"}</p>
                <p><strong>DUI:</strong> {ingreso.paciente.dui}</p>
              </div>
            </div>
          </div>
        </div>



      </div>
    </>
  );
};

export default IngresoAsignadoDetails;
