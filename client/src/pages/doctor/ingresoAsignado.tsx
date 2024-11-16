// src/components/IngresoDetail.tsx
import React, { useEffect, useState } from "react";
import { Ingreso,Doctor,Paciente } from '../ingreso'
import { getIngresoConDoctorAsignado } from '../../services/ingresoService.ts'
import UrgenciaBadge from '../../components/urgencia-badge.tsx'
import { useSocket } from '../../hooks/useSocket.ts'
import { getDoctor } from '../../services/doctorService.ts'
import BadgeEstado from '../../components/estado-badge.tsx'






const IngresoAsignadoDetails: React.FC = () => {
  const [ingreso, setIngreso] = useState<Ingreso | null>(null);
  const [loading, setLoading] = useState(true);
  const socket = useSocket();
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  useEffect(() => {


    const fetchIngreso = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("auth") ??'').user

        if(user.role == 0 || user.role == 1){
          console.log('user role')
      console.log(user.role)
          return}

      const doctor = await getDoctor(user.id)
        setDoctor(doctor)
        console.log("doctor", doctor)

        const response:Ingreso  =  await getIngresoConDoctorAsignado(doctor.id);

        setIngreso(response)
      } catch (error) {
        console.error("Error fetching ingreso data:", error);
      } finally {
        setLoading(false);
      }
    };

    socket?.on('nuevoPacienteAsignado',(nuevoIngresoAsignado:Ingreso) =>{
      if(nuevoIngresoAsignado == null ) {

        setIngreso(null);
      }else{
        setIngreso(nuevoIngresoAsignado)
      }

    })

    fetchIngreso();

    console.log("socket cambio")


  }, [socket,ingreso]);


  const finalizarConsultaPorIngreso = () => {
    const idDoctor = doctor?.id
    const idIngreso = ingreso?.id
    console.log(idDoctor);
    socket?.emit('consultaFinalizo',{idDoctor,idIngreso})


  }

  if (loading) {
    return <p>Cargando ingreso...</p>;
  }

  if (!ingreso) {
    return <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-6 bg-white shadow-md rounded-md">
        <h1 className="text-xl font-semibold text-gray-800">
          No tienes ingresos asignados
        </h1>
      </div>
    </div>
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
                  <BadgeEstado estado={ingreso.estado} />
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
