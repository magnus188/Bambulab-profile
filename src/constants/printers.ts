export const BAMBU_LAB_PRINTERS = [
  'All',
  'A1 mini',
  'A1',
  'H2D',
  'P1P',
  'P1S',
  'X1 Carbon',
  'X1E'
] as const;

export type PrinterType = typeof BAMBU_LAB_PRINTERS[number];

export const DEFAULT_PRINTER_TYPE = 'All';