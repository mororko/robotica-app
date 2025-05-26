// src/utils/paths.ts
export const robotRoutes = {
  forklift: {
    "Mover Pallet Abajo": "lm2,lm1",
    "Mover Pallet Arriba": "lm1,lm2",
  },
  mouse: {
    "Mover Estantería al Fondo": "10000004,10000001",
    "Mover Estantería al Frente": "10000001,10000004",
  },
} as const
