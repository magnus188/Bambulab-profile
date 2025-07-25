"use client";
import Dropdown from './Dropdown';

interface FilterBarProps {
  producers: string[];
  selectedProducer: string;
  onProducerChange: (producer: string) => void;
  materials: string[];
  selectedMaterial: string;
  onMaterialChange: (material: string) => void;
  printers: string[];
  selectedPrinter: string;
  onPrinterChange: (printer: string) => void;
}

export default function FilterBar({ producers, selectedProducer, onProducerChange, materials, selectedMaterial, onMaterialChange, printers, selectedPrinter, onPrinterChange }: FilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center items-center py-4">
      <div className="w-48">
        <label className="mr-2 font-medium">Printer:</label>
        <Dropdown
          options={[{ value: 'all', label: 'All Printers' }, ...printers.filter(p => p.toLowerCase() !== 'all').map(p => ({ value: p, label: p }))]}
          value={selectedPrinter}
          onChange={onPrinterChange}
          placeholder="Select printer..."
        />
      </div>
      <div className="w-48">
        <label className="mr-2 font-medium">Producer:</label>
        <Dropdown
          options={[{ value: 'all', label: 'All Producers' }, ...producers.filter(p => p.toLowerCase() !== 'all').map(p => ({ value: p, label: p }))]}
          value={selectedProducer}
          onChange={onProducerChange}
          placeholder="Select producer..."
        />
      </div>
      <div className="w-48">
        <label className="mr-2 font-medium">Material:</label>
        <Dropdown
          options={[{ value: 'all', label: 'All Materials' }, ...materials.filter(m => m.toLowerCase() !== 'all').map(m => ({ value: m, label: m }))]}
          value={selectedMaterial}
          onChange={onMaterialChange}
          placeholder="Select material..."
        />
      </div>
    </div>
  );
}
