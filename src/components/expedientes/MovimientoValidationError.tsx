'use client';

import React from 'react';

const MOTIVOS_ENTRADA = ['rescate', 'retorno'];
const MOTIVOS_SALIDA = ['adopcion', 'defuncion', 'extravio'];

interface MovimientoValidationErrorProps {
  tipo_movimiento: string;
  motivo: string;
}

export const MovimientoValidationError: React.FC<MovimientoValidationErrorProps> = ({
  tipo_movimiento,
  motivo,
}) => {
  if (!tipo_movimiento || !motivo) return null;

  const tipo = tipo_movimiento.toLowerCase();
  const motivoNorm = motivo.toLowerCase();

  if (tipo === 'entrada' && !MOTIVOS_ENTRADA.includes(motivoNorm)) {
    return (
      <p className="text-red-600 text-sm mt-1">
        El tipo <strong>Entrada</strong> solo acepta los motivos: <strong>Rescate</strong> y <strong>Retorno</strong>.
      </p>
    );
  }

  if (tipo === 'salida' && !MOTIVOS_SALIDA.includes(motivoNorm)) {
    return (
      <p className="text-red-600 text-sm mt-1">
        El tipo <strong>Salida</strong> solo acepta los motivos: <strong>Adopción</strong>, <strong>Defunción</strong> y <strong>Extravío</strong>.
      </p>
    );
  }

  return null;
};

export const getMotivosPermitidos = (tipo_movimiento: string) => {
  const tipo = tipo_movimiento.toLowerCase();
  if (tipo === 'entrada') return MOTIVOS_ENTRADA;
  if (tipo === 'salida') return MOTIVOS_SALIDA;
  return [];
};
