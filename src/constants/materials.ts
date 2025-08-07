// Comprehensive list of 3D printing materials and their corresponding color labels
// Designed for Bambulab printers and common filament types

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

// Special finish colors
export const SPECIAL_COLORS: MaterialColor[] = [
  { name: 'Silk Black', hex: '#1a1a1a', description: 'Glossy silk finish' },
  { name: 'Silk White', hex: '#FAFAFA', description: 'Glossy silk finish' },
  { name: 'Silk Red', hex: '#DC143C', description: 'Glossy silk finish' },
  { name: 'Silk Blue', hex: '#0047AB', description: 'Glossy silk finish' },
  { name: 'Silk Green', hex: '#228B22', description: 'Glossy silk finish' },
  { name: 'Silk Gold', hex: '#FFD700', description: 'Glossy silk finish' },
  { name: 'Silk Silver', hex: '#C0C0C0', description: 'Glossy silk finish' },
  { name: 'Matte Black', hex: '#2B2B2B', description: 'Non-reflective matte finish' },
  { name: 'Matte White', hex: '#F8F8F8', description: 'Non-reflective matte finish' },
  { name: 'Metallic Silver', hex: '#C0C0C0', description: 'Metallic finish' },
  { name: 'Metallic Gold', hex: '#FFD700', description: 'Metallic finish' },
  { name: 'Metallic Copper', hex: '#B87333', description: 'Metallic finish' },
  { name: 'Glow Green', hex: '#00FF00', description: 'Glow-in-the-dark' },
  { name: 'Glow Blue', hex: '#00BFFF', description: 'Glow-in-the-dark' },
  { name: 'Carbon Fiber Black', hex: '#1C1C1C', description: 'Carbon fiber reinforced' },
  { name: 'Wood Natural', hex: '#DEB887', description: 'Wood-filled filament' },
  { name: 'Metal Bronze', hex: '#CD7F32', description: 'Metal-filled filament' },
  { name: 'Metal Steel', hex: '#71797E', description: 'Metal-filled filament' }
];

// Comprehensive materials list
export const MATERIALS: Material[] = [
  {
    id: 'pla',
    name: 'PLA',
    description: 'Polylactic Acid - Biodegradable, easy to print, low warping',
    category: 'standard',
    printingTemp: { min: 190, max: 220 },
    colors: [
      ...STANDARD_COLORS,
      ...SPECIAL_COLORS.filter(c => 
        c.name.includes('Silk') || 
        c.name.includes('Matte') || 
        c.name.includes('Metallic') ||
        c.name.includes('Glow') ||
        c.name.includes('Wood') ||
        c.name.includes('Metal')
      )
    ]
  },
  {
    id: 'abs',
    name: 'ABS',
    description: 'Acrylonitrile Butadiene Styrene - Strong, flexible, higher temperature resistance',
    category: 'standard',
    printingTemp: { min: 220, max: 260 },
    colors: [
      ...STANDARD_COLORS,
      ...SPECIAL_COLORS.filter(c => 
        c.name.includes('Matte') || 
        c.name.includes('Metallic')
      )
    ]
  },
  {
    id: 'petg',
    name: 'PETG',
    description: 'Polyethylene Terephthalate Glycol - Chemical resistant, crystal clear options',
    category: 'standard',
    printingTemp: { min: 220, max: 250 },
    colors: [
      ...STANDARD_COLORS,
      { name: 'Crystal Clear', hex: '#F0F8FF', description: 'Ultra-clear transparent' },
      { name: 'Frost Clear', hex: '#F5F5F5', description: 'Translucent frosted' },
      ...SPECIAL_COLORS.filter(c => c.name.includes('Metallic'))
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
      { name: 'Shore 95A Natural', hex: '#F5F5DC', description: 'Medium flexibility' },
      { name: 'Shore 85A Natural', hex: '#F5F5DC', description: 'High flexibility' },
      { name: 'Transparent', hex: '#F0F8FF', description: 'Clear flexible' }
    ]
  },
  {
    id: 'asa',
    name: 'ASA',
    description: 'Acrylonitrile Styrene Acrylate - UV resistant, outdoor applications',
    category: 'engineering',
    printingTemp: { min: 240, max: 270 },
    colors: [
      ...STANDARD_COLORS.filter(c => !c.name.includes('Clear')),
      { name: 'UV Stable Black', hex: '#000000', description: 'Enhanced UV resistance' },
      { name: 'UV Stable White', hex: '#FFFFFF', description: 'Enhanced UV resistance' }
    ]
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
    name: 'PA (Nylon)',
    description: 'Polyamide - High strength, chemical resistance, low friction',
    category: 'engineering',
    printingTemp: { min: 250, max: 290 },
    colors: [
      { name: 'Natural', hex: '#F5F5DC' },
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Red', hex: '#FF0000' },
      { name: 'Blue', hex: '#0000FF' },
      ...SPECIAL_COLORS.filter(c => c.name.includes('Carbon Fiber'))
    ]
  },
  {
    id: 'pa-cf',
    name: 'PA-CF',
    description: 'Carbon Fiber Reinforced Nylon - Ultra-high strength and stiffness',
    category: 'engineering',
    printingTemp: { min: 270, max: 300 },
    colors: [
      { name: 'Carbon Black', hex: '#1C1C1C', description: 'Carbon fiber reinforced' },
      { name: 'Natural CF', hex: '#2F2F2F', description: 'Carbon fiber reinforced' }
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
    id: 'pla-plus',
    name: 'PLA+',
    description: 'Enhanced PLA - Improved strength and temperature resistance',
    category: 'standard',
    printingTemp: { min: 200, max: 230 },
    colors: STANDARD_COLORS
  },
  {
    id: 'wood-pla',
    name: 'Wood PLA',
    description: 'Wood-filled PLA - Contains real wood particles, can be sanded and stained',
    category: 'specialty',
    printingTemp: { min: 190, max: 220 },
    colors: [
      { name: 'Wood Natural', hex: '#DEB887', description: 'Natural wood color' },
      { name: 'Light Wood', hex: '#F5DEB3', description: 'Light wood tone' },
      { name: 'Dark Wood', hex: '#8B4513', description: 'Dark wood tone' },
      { name: 'Cherry Wood', hex: '#DE3163', description: 'Cherry wood tone' },
      { name: 'Walnut Wood', hex: '#704214', description: 'Walnut wood tone' }
    ]
  },
  {
    id: 'metal-pla',
    name: 'Metal PLA',
    description: 'Metal-filled PLA - Contains metal particles, can be polished',
    category: 'specialty',
    printingTemp: { min: 190, max: 220 },
    colors: [
      { name: 'Stainless Steel', hex: '#71797E', description: 'Steel-filled' },
      { name: 'Copper', hex: '#B87333', description: 'Copper-filled' },
      { name: 'Bronze', hex: '#CD7F32', description: 'Bronze-filled' },
      { name: 'Aluminum', hex: '#C0C0C0', description: 'Aluminum-filled' }
    ]
  },
  {
    id: 'glow-pla',
    name: 'Glow PLA',
    description: 'Glow-in-the-dark PLA - Phosphorescent pigments for glowing effect',
    category: 'specialty',
    printingTemp: { min: 190, max: 220 },
    colors: [
      { name: 'Glow Green', hex: '#00FF00', description: 'Green glow-in-the-dark' },
      { name: 'Glow Blue', hex: '#00BFFF', description: 'Blue glow-in-the-dark' },
      { name: 'Glow Yellow', hex: '#FFFF00', description: 'Yellow glow-in-the-dark' },
      { name: 'Glow Purple', hex: '#8A2BE2', description: 'Purple glow-in-the-dark' }
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
    
    // Add colored variants for popular materials
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