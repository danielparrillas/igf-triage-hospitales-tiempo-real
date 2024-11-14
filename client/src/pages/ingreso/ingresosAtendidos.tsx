// /frontend/src/App.tsx
import React, { useEffect, useState } from 'react';
import { useSocket } from '../../hooks/useSocket.ts'
import IngresoList from '../../components/IngresoList.tsx'
import { Ingreso } from './index'

const IngresosAtendidos: React.FC = () => {
  const [ingresos, setIngresos] = useState<Ingreso[]>([]);
  const socket = useSocket()

  useEffect(() => {
    socket?.on('updateIngresos', (updatedIngresos: Ingreso[]) => {

      setIngresos(updatedIngresos);
    });


    return () => {
      socket?.off('updateIngresos');
    };
  }, [socket]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Ingresos Asignados a Doctores Disponibles</h1>
      <IngresoList ingresos={ingresos} />
    </div>
  );
};

export default IngresosAtendidos;
