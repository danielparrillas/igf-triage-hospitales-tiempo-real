// /frontend/src/components/IngresoList.tsx
import React from 'react';
import {Ingreso} from '../pages/ingreso/index'
import UrgenciaBadge from './urgencia-badge.tsx'



interface IngresoListProps {
  ingresos: Ingreso[];
}

const IngresoList: React.FC<IngresoListProps> = ({ ingresos }) => {
  return (
    <ul className="w-full max-w-lg bg-white rounded-lg shadow-md p-4">
      {ingresos.length > 0 ? (
        ingresos.map((ingreso) => (
          <li
            key={ingreso.id}
            className="flex justify-between items-center p-4 mb-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100"
          >
            <div>
              <p className="text-gray-700 font-semibold">
                Paciente : <span className="text-blue-500">{ingreso.paciente.nombre}</span>
              </p>
              <p className="text-gray-600">
                Doctor ID: <span
                className="text-green-500">{ingreso.doctor ? ingreso.doctor.nombre : 'No asignado'}</span>
              </p>
            </div>
            <p className="text-sm font-medium text-gray-500">
              Estado: {ingreso.estado}
            </p>

            <p className="text-sm text-gray-600">
              Urgencia:
              <span className={`ml-2 px-2 py-1 rounded text-white`}>
              <UrgenciaBadge urgencia={ingreso.urgencia} />
              </span>
            </p>
          </li>
        ))
        ) : (
        <p className="text-gray-500 text-center">No hay ingresos asignados.</p>
        )}
    </ul>
  );
};

export default IngresoList;
