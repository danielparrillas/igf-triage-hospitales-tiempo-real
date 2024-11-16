import React from 'react';

// Define las propiedades del componente
interface BadgeEstadoProps {
  estado: number; // Se usa un número simple para el estado
}

const BadgeEstado: React.FC<BadgeEstadoProps> = ({ estado }) => {
  // Configuración de estados con etiquetas y estilos de Tailwind
  const estadoConfig: Record<number, { label: string; color: string }> = {
    0: { label: 'Pendiente', color: 'bg-gray-200 text-gray-800' },
    1: { label: 'Datos', color: 'bg-blue-200 text-blue-800' },
    2: { label: 'En espera', color: 'bg-yellow-200 text-yellow-800' },
    3: { label: 'Atención', color: 'bg-green-200 text-green-800' },
    4: { label: 'Finalizado', color: 'bg-purple-200 text-purple-800' },
  };

  // Obtiene la configuración según el estado o un valor predeterminado
  const { label, color } = estadoConfig[estado] || {
    label: 'Desconocido',
    color: 'bg-red-200 text-red-800',
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${color}`}
    >
      {label}
    </span>
  );
};

export default BadgeEstado;
