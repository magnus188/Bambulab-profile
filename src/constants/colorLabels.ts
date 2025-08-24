// Comprehensive list of color labels for 3D printing filaments
// Designed to be robust and reusable for any filament type

export interface ColorLabel {
  name: string;
  hex?: string; // Optional hex color code for UI display
  description?: string; // Optional description for special finishes
  category: 'basic' | 'metallic' | 'transparent' | 'special' | 'natural';
}

// Comprehensive color labels organized by category
export const COLOR_LABELS: ColorLabel[] = [
  // Basic solid colors
  { name: 'Black', hex: '#000000', category: 'basic' },
  { name: 'White', hex: '#FFFFFF', category: 'basic' },
  { name: 'Gray', hex: '#808080', category: 'basic' },
  { name: 'Light Gray', hex: '#D3D3D3', category: 'basic' },
  { name: 'Dark Gray', hex: '#404040', category: 'basic' },
  { name: 'Red', hex: '#FF0000', category: 'basic' },
  { name: 'Dark Red', hex: '#8B0000', category: 'basic' },
  { name: 'Light Red', hex: '#FFB6C1', category: 'basic' },
  { name: 'Blue', hex: '#0000FF', category: 'basic' },
  { name: 'Navy Blue', hex: '#000080', category: 'basic' },
  { name: 'Light Blue', hex: '#ADD8E6', category: 'basic' },
  { name: 'Sky Blue', hex: '#87CEEB', category: 'basic' },
  { name: 'Royal Blue', hex: '#4169E1', category: 'basic' },
  { name: 'Green', hex: '#008000', category: 'basic' },
  { name: 'Dark Green', hex: '#006400', category: 'basic' },
  { name: 'Light Green', hex: '#90EE90', category: 'basic' },
  { name: 'Forest Green', hex: '#228B22', category: 'basic' },
  { name: 'Lime Green', hex: '#32CD32', category: 'basic' },
  { name: 'Yellow', hex: '#FFFF00', category: 'basic' },
  { name: 'Light Yellow', hex: '#FFFFE0', category: 'basic' },
  { name: 'Golden Yellow', hex: '#FFD700', category: 'basic' },
  { name: 'Orange', hex: '#FFA500', category: 'basic' },
  { name: 'Dark Orange', hex: '#FF8C00', category: 'basic' },
  { name: 'Light Orange', hex: '#FFEFD5', category: 'basic' },
  { name: 'Purple', hex: '#800080', category: 'basic' },
  { name: 'Dark Purple', hex: '#4B0082', category: 'basic' },
  { name: 'Light Purple', hex: '#DDA0DD', category: 'basic' },
  { name: 'Violet', hex: '#8A2BE2', category: 'basic' },
  { name: 'Pink', hex: '#FFC0CB', category: 'basic' },
  { name: 'Hot Pink', hex: '#FF69B4', category: 'basic' },
  { name: 'Light Pink', hex: '#FFB6C1', category: 'basic' },
  { name: 'Magenta', hex: '#FF00FF', category: 'basic' },
  { name: 'Cyan', hex: '#00FFFF', category: 'basic' },
  { name: 'Teal', hex: '#008080', category: 'basic' },
  { name: 'Turquoise', hex: '#40E0D0', category: 'basic' },
  { name: 'Brown', hex: '#A52A2A', category: 'basic' },
  { name: 'Dark Brown', hex: '#654321', category: 'basic' },
  { name: 'Light Brown', hex: '#D2B48C', category: 'basic' },
  { name: 'Beige', hex: '#F5F5DC', category: 'basic' },
  { name: 'Tan', hex: '#D2B48C', category: 'basic' },
  { name: 'Ivory', hex: '#FFFFF0', category: 'basic' },
  { name: 'Cream', hex: '#FFFDD0', category: 'basic' },

  // Natural/material colors
  { name: 'Natural', hex: '#F5F5DC', description: 'Translucent/clear natural color', category: 'natural' },
  { name: 'Clear', hex: '#F0F8FF', description: 'Transparent', category: 'natural' },
  { name: 'Transparent', hex: '#F0F8FF', description: 'See-through', category: 'natural' },
  { name: 'Translucent', hex: '#F5F5F5', description: 'Semi-transparent', category: 'natural' },
  { name: 'Crystal Clear', hex: '#F0F8FF', description: 'Ultra-clear transparent', category: 'natural' },
  { name: 'Frosted', hex: '#F5F5F5', description: 'Matte translucent finish', category: 'natural' },

  // Metallic finishes
  { name: 'Silver', hex: '#C0C0C0', description: 'Metallic silver finish', category: 'metallic' },
  { name: 'Gold', hex: '#FFD700', description: 'Metallic gold finish', category: 'metallic' },
  { name: 'Copper', hex: '#B87333', description: 'Metallic copper finish', category: 'metallic' },
  { name: 'Bronze', hex: '#CD7F32', description: 'Metallic bronze finish', category: 'metallic' },
  { name: 'Aluminum', hex: '#B8B8B8', description: 'Metallic aluminum finish', category: 'metallic' },
  { name: 'Steel', hex: '#A8A8A8', description: 'Metallic steel finish', category: 'metallic' },
  { name: 'Chrome', hex: '#C8C8C8', description: 'Metallic chrome finish', category: 'metallic' },
  { name: 'Brass', hex: '#B5A642', description: 'Metallic brass finish', category: 'metallic' },
  { name: 'Titanium', hex: '#A8A8A8', description: 'Metallic titanium finish', category: 'metallic' },
  { name: 'Gunmetal', hex: '#2C3539', description: 'Dark metallic finish', category: 'metallic' },

  // Transparent variations
  { name: 'Transparent Red', hex: '#FF6B6B', description: 'See-through red', category: 'transparent' },
  { name: 'Transparent Blue', hex: '#6BB6FF', description: 'See-through blue', category: 'transparent' },
  { name: 'Transparent Green', hex: '#6BFF6B', description: 'See-through green', category: 'transparent' },
  { name: 'Transparent Yellow', hex: '#FFFF6B', description: 'See-through yellow', category: 'transparent' },
  { name: 'Transparent Orange', hex: '#FFB56B', description: 'See-through orange', category: 'transparent' },
  { name: 'Transparent Purple', hex: '#B56BFF', description: 'See-through purple', category: 'transparent' },
  { name: 'Transparent Pink', hex: '#FF6BB5', description: 'See-through pink', category: 'transparent' },
  { name: 'Transparent Black', hex: '#404040', description: 'Tinted transparent black', category: 'transparent' },
  { name: 'Smoke', hex: '#696969', description: 'Translucent gray/black', category: 'transparent' },

  // Special effect colors
  { name: 'Glow in the Dark', hex: '#E0FFE0', description: 'Phosphorescent material', category: 'special' },
  { name: 'Glow Green', hex: '#ADFF2F', description: 'Green glow in the dark', category: 'special' },
  { name: 'Glow Blue', hex: '#87CEEB', description: 'Blue glow in the dark', category: 'special' },
  { name: 'UV Reactive', hex: '#DA70D6', description: 'Changes color under UV light', category: 'special' },
  { name: 'Color Changing', hex: '#FF69B4', description: 'Temperature sensitive color change', category: 'special' },
  { name: 'Marble', hex: '#F0F0F0', description: 'Marble-like pattern', category: 'special' },
  { name: 'Wood Tone', hex: '#DEB887', description: 'Wood-like appearance', category: 'special' },
  { name: 'Carbon Fiber', hex: '#1C1C1C', description: 'Carbon fiber pattern', category: 'special' },
  { name: 'Silk', hex: '#FFF8DC', description: 'Silk-like sheen', category: 'special' },
  { name: 'Matte', hex: '#D3D3D3', description: 'Non-reflective finish', category: 'special' },
  { name: 'Satin', hex: '#F5F5F5', description: 'Semi-gloss finish', category: 'special' },
  { name: 'Glossy', hex: '#FFFFFF', description: 'High-gloss finish', category: 'special' },
  { name: 'Pearl', hex: '#F0F8FF', description: 'Pearl-like shimmer', category: 'special' },
  { name: 'Rainbow', hex: '#FF6B6B', description: 'Multi-color rainbow effect', category: 'special' },
  { name: 'Galaxy', hex: '#483D8B', description: 'Sparkly space-like appearance', category: 'special' },
  { name: 'Glitter', hex: '#FFD700', description: 'Sparkly glitter finish', category: 'special' },
  { name: 'Sparkle', hex: '#C0C0C0', description: 'Metallic sparkle finish', category: 'special' },
];

// Helper functions for easier access
export const getColorsByCategory = (category: ColorLabel['category']): ColorLabel[] => {
  return COLOR_LABELS.filter(color => color.category === category);
};

export const getBasicColors = (): ColorLabel[] => {
  return getColorsByCategory('basic');
};

export const getMetallicColors = (): ColorLabel[] => {
  return getColorsByCategory('metallic');
};

export const getTransparentColors = (): ColorLabel[] => {
  return getColorsByCategory('transparent');
};

export const getSpecialColors = (): ColorLabel[] => {
  return getColorsByCategory('special');
};

export const getNaturalColors = (): ColorLabel[] => {
  return getColorsByCategory('natural');
};

export const getAllColorNames = (): string[] => {
  return COLOR_LABELS.map(color => color.name).sort();
};

export const getColorByName = (name: string): ColorLabel | undefined => {
  return COLOR_LABELS.find(color => color.name.toLowerCase() === name.toLowerCase());
};

// Get color options formatted for dropdowns
export const getColorOptions = (): Array<{ value: string; label: string; category: string }> => {
  return COLOR_LABELS.map(color => ({
    value: color.name,
    label: color.name,
    category: color.category
  }));
};

// Categories for organizing the color picker UI
export const COLOR_CATEGORIES = [
  { key: 'basic', label: 'Basic Colors', description: 'Standard solid colors' },
  { key: 'natural', label: 'Natural/Clear', description: 'Transparent and natural finishes' },
  { key: 'metallic', label: 'Metallic', description: 'Metallic finishes and effects' },
  { key: 'transparent', label: 'Transparent', description: 'See-through colored materials' },
  { key: 'special', label: 'Special Effects', description: 'Special finishes and effects' }
] as const;