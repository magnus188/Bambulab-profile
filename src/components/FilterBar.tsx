"use client";
import Dropdown from './Dropdown';

interface FilterBarProps {
  producers: string[];
  selectedProducer: string;
  onProducerChange: (producer: string) => void;
  materials: string[];
  selectedMaterial: string;
  onMaterialChange: (material: string) => void;
  fileTypes: string[];
  selectedFileType: string;
  onFileTypeChange: (fileType: string) => void;
  printerTypes: string[];
  selectedPrinterType: string;
  onPrinterTypeChange: (printerType: string) => void;
  sortBy: 'newest' | 'votes' | 'downloads';
  onSortChange: (sort: 'newest' | 'votes' | 'downloads') => void;
}

export default function FilterBar({ 
  producers, 
  selectedProducer, 
  onProducerChange, 
  materials, 
  selectedMaterial, 
  onMaterialChange,
  fileTypes,
  selectedFileType,
  onFileTypeChange,
  printerTypes,
  selectedPrinterType,
  onPrinterTypeChange,
  sortBy,
  onSortChange 
}: FilterBarProps) {
  const handleProducerChange = (value: string | string[]) => {
    onProducerChange(Array.isArray(value) ? value[0] : value);
  };

  const handleMaterialChange = (value: string | string[]) => {
    onMaterialChange(Array.isArray(value) ? value[0] : value);
  };

  const handleFileTypeChange = (value: string | string[]) => {
    onFileTypeChange(Array.isArray(value) ? value[0] : value);
  };

  const handlePrinterTypeChange = (value: string | string[]) => {
    onPrinterTypeChange(Array.isArray(value) ? value[0] : value);
  };

  const handleSortChange = (value: string | string[]) => {
    onSortChange(Array.isArray(value) ? value[0] as 'newest' | 'votes' | 'downloads' : value as 'newest' | 'votes' | 'downloads');
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center items-center py-4">
      <div className="w-48">
        <label className="mr-2 font-medium">Producer:</label>
        <Dropdown
          options={[{ value: 'all', label: 'All Producers' }, ...Array.from(new Set(producers.filter(p => typeof p === 'string' && p.toLowerCase() !== 'all'))).map(p => ({ value: p, label: p }))]}
          value={selectedProducer}
          onChange={handleProducerChange}
          placeholder="Select producer..."
        />
      </div>
      <div className="w-48">
        <label className="mr-2 font-medium">Material:</label>
        <Dropdown
          options={[{ value: 'all', label: 'All Materials' }, ...Array.from(new Set(materials.filter(m => typeof m === 'string' && m.toLowerCase() !== 'all'))).map(m => ({ value: m, label: m }))]}
          value={selectedMaterial}
          onChange={handleMaterialChange}
          placeholder="Select material..."
        />
      </div>
      <div className="w-48">
        <label className="mr-2 font-medium">File Type:</label>
        <Dropdown
          options={[{ value: 'all', label: 'All Types' }, ...Array.from(new Set(fileTypes.filter(ft => typeof ft === 'string' && ft.toLowerCase() !== 'all'))).map(ft => ({ value: ft, label: ft.toUpperCase() }))]}
          value={selectedFileType}
          onChange={handleFileTypeChange}
          placeholder="Select file type..."
        />
      </div>
      <div className="w-48">
        <label className="mr-2 font-medium">Printer Type:</label>
        <Dropdown
          options={[{ value: 'all', label: 'All Printers' }, ...Array.from(new Set(printerTypes.filter(pt => typeof pt === 'string' && pt.toLowerCase() !== 'all'))).map(pt => ({ value: pt, label: pt }))]}
          value={selectedPrinterType}
          onChange={handlePrinterTypeChange}
          placeholder="Select printer type..."
          multi={false}
          allowAll={true}
        />
      </div>
      <div className="w-48">
        <label className="mr-2 font-medium">Sort by:</label>
        <Dropdown
          options={[
            { value: 'newest', label: 'Newest' },
            { value: 'votes', label: 'Most Voted' },
            { value: 'downloads', label: 'Most Downloaded' }
          ]}
          value={sortBy}
          onChange={handleSortChange}
          placeholder="Sort by..."
        />
      </div>
    </div>
  );
}
