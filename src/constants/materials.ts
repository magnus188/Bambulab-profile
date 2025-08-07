// Comprehensive list of main 3D printing filament types for Bambulab printers
// Focuses on base materials without variants (no PLA+, Wood PLA, etc.)

export interface MaterialColor {
  name: string;
  hex?: string; // Optional hex color code for UI display
  description?: string; // Optional description for special finishes
}

export interface Material {
  id: string;
  name: string;
  description: string;
  category: 'standard' | 'engineering' | 'specialty' | 'support';
  printingTemp?: { min: number; max: number }; // Typical printing temperature range
  colors: MaterialColor[];
}

// Standard color palette used across most materials
export const STANDARD_COLORS: MaterialColor[] = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Gray', hex: '#808080' },
  { name: 'Light Gray', hex: '#D3D3D3' },
  { name: 'Dark Gray', hex: '#404040' },
  { name: 'Natural', hex: '#F5F5DC', description: 'Translucent/clear natural color' },
  { name: 'Clear', hex: '#F0F8FF', description: 'Transparent' },
  { name: 'Red', hex: '#FF0000' },
  { name: 'Blue', hex: '#0000FF' },
  { name: 'Green', hex: '#008000' },
  { name: 'Yellow', hex: '#FFFF00' },
  { name: 'Orange', hex: '#FFA500' },
  { name: 'Purple', hex: '#800080' },
  { name: 'Pink', hex: '#FFC0CB' },
  { name: 'Brown', hex: '#A52A2A' },
  { name: 'Beige', hex: '#F5F5DC' }
];

// Comprehensive list of main 3D printing filament types
export const MATERIALS: Material[] = [
  {
    id: 'pla',
    name: 'PLA',
    description: 'Polylactic Acid - Biodegradable, easy to print, low warping',
    category: 'standard',
    printingTemp: { min: 190, max: 220 },
    colors: STANDARD_COLORS
  },
  {
    id: 'abs',
    name: 'ABS',
    description: 'Acrylonitrile Butadiene Styrene - Strong, flexible, higher temperature resistance',
    category: 'standard',
    printingTemp: { min: 220, max: 260 },
    colors: STANDARD_COLORS
  },
  {
    id: 'petg',
    name: 'PETG',
    description: 'Polyethylene Terephthalate Glycol - Chemical resistant, crystal clear options',
    category: 'standard',
    printingTemp: { min: 220, max: 250 },
    colors: [
      ...STANDARD_COLORS,
      { name: 'Crystal Clear', hex: '#F0F8FF', description: 'Ultra-clear transparent' }
    ]
  },
  {
    id: 'tpu',
    name: 'TPU',
    description: 'Thermoplastic Polyurethane - Flexible, rubber-like properties',
    category: 'specialty',
    printingTemp: { min: 210, max: 230 },
    colors: [
      ...STANDARD_COLORS.filter(c => !c.name.includes('Clear')),
      { name: 'Transparent', hex: '#F0F8FF', description: 'Clear flexible' }
    ]
  },
  {
    id: 'tpe',
    name: 'TPE',
    description: 'Thermoplastic Elastomer - Flexible material similar to TPU',
    category: 'specialty',
    printingTemp: { min: 200, max: 240 },
    colors: STANDARD_COLORS.filter(c => !c.name.includes('Clear'))
  },
  {
    id: 'asa',
    name: 'ASA',
    description: 'Acrylonitrile Styrene Acrylate - UV resistant, outdoor applications',
    category: 'engineering',
    printingTemp: { min: 240, max: 270 },
    colors: STANDARD_COLORS.filter(c => !c.name.includes('Clear'))
  },
  {
    id: 'pc',
    name: 'PC',
    description: 'Polycarbonate - High strength, high temperature resistance',
    category: 'engineering',
    printingTemp: { min: 270, max: 310 },
    colors: [
      { name: 'Natural', hex: '#F5F5DC' },
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Clear', hex: '#F0F8FF', description: 'Transparent' }
    ]
  },
  {
    id: 'pa',
    name: 'PA',
    description: 'Polyamide (Nylon) - High strength, chemical resistance, low friction',
    category: 'engineering',
    printingTemp: { min: 250, max: 290 },
    colors: [
      { name: 'Natural', hex: '#F5F5DC' },
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Red', hex: '#FF0000' },
      { name: 'Blue', hex: '#0000FF' }
    ]
  },
  {
    id: 'pp',
    name: 'PP',
    description: 'Polypropylene - Chemical resistant, low density, living hinge applications',
    category: 'engineering',
    printingTemp: { min: 220, max: 250 },
    colors: [
      { name: 'Natural', hex: '#F5F5DC' },
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Blue', hex: '#0000FF' }
    ]
  },
  {
    id: 'pom',
    name: 'POM',
    description: 'Polyoxymethylene (Delrin) - High stiffness, low friction, dimensional stability',
    category: 'engineering',
    printingTemp: { min: 210, max: 230 },
    colors: [
      { name: 'Natural', hex: '#F5F5DC' },
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' }
    ]
  },
  {
    id: 'peek',
    name: 'PEEK',
    description: 'Polyetheretherketone - Ultra-high performance, chemical resistance, high temperature',
    category: 'engineering',
    printingTemp: { min: 380, max: 420 },
    colors: [
      { name: 'Natural', hex: '#E6D2B5', description: 'Tan/beige natural color' },
      { name: 'Black', hex: '#000000' }
    ]
  },
  {
    id: 'pei',
    name: 'PEI',
    description: 'Polyetherimide (Ultem) - High temperature, flame retardant, aerospace grade',
    category: 'engineering',
    printingTemp: { min: 340, max: 380 },
    colors: [
      { name: 'Natural', hex: '#DAA520', description: 'Amber natural color' },
      { name: 'Black', hex: '#000000' }
    ]
  },
  {
    id: 'psu',
    name: 'PSU',
    description: 'Polysulfone - High temperature resistance, transparent, chemical resistance',
    category: 'engineering',
    printingTemp: { min: 320, max: 360 },
    colors: [
      { name: 'Natural', hex: '#FFF8DC', description: 'Translucent amber' },
      { name: 'Black', hex: '#000000' }
    ]
  },
  {
    id: 'pps',
    name: 'PPS',
    description: 'Polyphenylene Sulfide - Chemical resistance, high temperature, dimensional stability',
    category: 'engineering',
    printingTemp: { min: 300, max: 340 },
    colors: [
      { name: 'Natural', hex: '#F5F5DC' },
      { name: 'Black', hex: '#000000' }
    ]
  },
  {
    id: 'pva',
    name: 'PVA',
    description: 'Polyvinyl Alcohol - Water-soluble support material',
    category: 'support',
    printingTemp: { min: 190, max: 220 },
    colors: [
      { name: 'Natural', hex: '#F5F5DC', description: 'Water-soluble' },
      { name: 'White', hex: '#FFFFFF', description: 'Water-soluble' }
    ]
  },
  {
    id: 'hips',
    name: 'HIPS',
    description: 'High Impact Polystyrene - Lightweight support material, dissolves in limonene',
    category: 'support',
    printingTemp: { min: 220, max: 250 },
    colors: [
      { name: 'Natural', hex: '#F5F5DC' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#000000' }
    ]
  },
  {
    id: 'bvoh',
    name: 'BVOH',
    description: 'Butenediol Vinyl Alcohol - Water-soluble support, better temperature resistance than PVA',
    category: 'support',
    printingTemp: { min: 190, max: 220 },
    colors: [
      { name: 'Natural', hex: '#F5F5DC', description: 'Water-soluble' },
      { name: 'White', hex: '#FFFFFF', description: 'Water-soluble' }
    ]
  }
];

// Helper functions for easier access
export const getMaterialById = (id: string): Material | undefined => {
  return MATERIALS.find(material => material.id === id);
};

export const getMaterialsByCategory = (category: Material['category']): Material[] => {
  return MATERIALS.filter(material => material.category === category);
};

export const getAllMaterialNames = (): string[] => {
  return MATERIALS.map(material => material.name).sort();
};

export const getAllColorsForMaterial = (materialName: string): MaterialColor[] => {
  const material = MATERIALS.find(m => m.name === materialName);
  return material ? material.colors : [];
};

export const getColoredMaterialOptions = (): Array<{ value: string; label: string; category?: string }> => {
  const options: Array<{ value: string; label: string; category?: string }> = [];
  
  MATERIALS.forEach(material => {
    // Add base material option
    options.push({
      value: material.name,
      label: material.name,
      category: material.category
    });
    
    // Add colored variants for common materials only
    if (['PLA', 'ABS', 'PETG'].includes(material.name)) {
      material.colors.forEach(color => {
        if (color.name !== 'Natural' && color.name !== 'Clear') {
          options.push({
            value: `${material.name} ${color.name}`,
            label: `${material.name} ${color.name}`,
            category: material.category
          });
        }
      });
    }
  });
  
  return options.sort((a, b) => a.label.localeCompare(b.label));
};