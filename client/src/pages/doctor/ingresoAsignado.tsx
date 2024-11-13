// src/components/IngresoDetail.tsx
import React, { useEffect, useState } from "react";
import { Ingreso,Doctor,Paciente } from '../ingreso'
import { getIngresoConDoctorAsignado } from '../../services/ingresoService.ts'






const IngresoAsignadoDetails: React.FC = () => {
  const [ingreso, setIngreso] = useState<Ingreso | null>(null);
  const [loading, setLoading] = useState(true);


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

    fetchIngreso();
  }, []);

  if (loading) {
    return <p>Cargando ingreso...</p>;
  }

  if (!ingreso) {
    return <p>Error: Ingreso no encontrado.</p>;
  }

  return (
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
        <p><strong>Urgencia:</strong> {["Resucitación", "Emergencia", "Urgencia", "Urgencia Menor", "Sin Urgencia"][ingreso.urgencia - 1]}</p>
        <p><strong>Estado:</strong> {["Pendiente", "Datos", "En espera", "Atención", "Finalizado"][ingreso.estado]}</p>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-4">Datos del Paciente</h3>
      <div className="mb-3">
        <p><strong>Nombre:</strong> {ingreso.paciente.nombre}</p>
        <p><strong>Fecha de Nacimiento:</strong> {new Date(ingreso.paciente.fechaNacimiento).toLocaleDateString()}</p>
        <p><strong>Sexo:</strong> {ingreso.paciente.sexo === 0 ? "Hombre" : "Mujer"}</p>
        <p><strong>DUI:</strong> {ingreso.paciente.dui}</p>
      </div>
    </div>
  );
};

export default IngresoAsignadoDetails;
