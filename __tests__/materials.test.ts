import {
  MATERIALS,
  STANDARD_COLORS,
  SPECIAL_COLORS,
  getMaterialById,
  getMaterialsByCategory,
  getAllMaterialNames,
  getAllColorsForMaterial,
  getColoredMaterialOptions
} from '../src/constants/materials';

describe('Materials Constants', () => {
  describe('Basic data structure validation', () => {
    test('MATERIALS should be a non-empty array', () => {
      expect(Array.isArray(MATERIALS)).toBe(true);
      expect(MATERIALS.length).toBeGreaterThan(0);
    });

    test('each material should have required properties', () => {
      MATERIALS.forEach(material => {
        expect(material).toHaveProperty('id');
        expect(material).toHaveProperty('name');
        expect(material).toHaveProperty('description');
        expect(material).toHaveProperty('category');
        expect(material).toHaveProperty('colors');
        
        expect(typeof material.id).toBe('string');
        expect(typeof material.name).toBe('string');
        expect(typeof material.description).toBe('string');
        expect(['standard', 'engineering', 'specialty', 'support']).toContain(material.category);
        expect(Array.isArray(material.colors)).toBe(true);
      });
    });

    test('STANDARD_COLORS should contain basic colors', () => {
      const colorNames = STANDARD_COLORS.map(c => c.name);
      expect(colorNames).toContain('Black');
      expect(colorNames).toContain('White');
      expect(colorNames).toContain('Red');
      expect(colorNames).toContain('Blue');
      expect(colorNames).toContain('Green');
    });

    test('SPECIAL_COLORS should contain special finishes', () => {
      const colorNames = SPECIAL_COLORS.map(c => c.name);
      expect(colorNames.some(name => name.includes('Silk'))).toBe(true);
      expect(colorNames.some(name => name.includes('Matte'))).toBe(true);
      expect(colorNames.some(name => name.includes('Metallic'))).toBe(true);
      expect(colorNames.some(name => name.includes('Glow'))).toBe(true);
    });
  });

  describe('Material specific tests', () => {
    test('should include common 3D printing materials', () => {
      const materialNames = MATERIALS.map(m => m.name);
      expect(materialNames).toContain('PLA');
      expect(materialNames).toContain('ABS');
      expect(materialNames).toContain('PETG');
      expect(materialNames).toContain('TPU');
      expect(materialNames).toContain('ASA');
      expect(materialNames).toContain('PC');
      expect(materialNames).toContain('PA (Nylon)');
    });

    test('should include support materials', () => {
      const supportMaterials = getMaterialsByCategory('support');
      expect(supportMaterials.length).toBeGreaterThan(0);
      
      const supportNames = supportMaterials.map(m => m.name);
      expect(supportNames).toContain('PVA');
      expect(supportNames).toContain('HIPS');
    });

    test('should include specialty materials', () => {
      const specialtyMaterials = getMaterialsByCategory('specialty');
      expect(specialtyMaterials.length).toBeGreaterThan(0);
      
      const specialtyNames = specialtyMaterials.map(m => m.name);
      expect(specialtyNames).toContain('TPU');
      expect(specialtyNames).toContain('Wood PLA');
      expect(specialtyNames).toContain('Metal PLA');
      expect(specialtyNames).toContain('Glow PLA');
    });
  });

  describe('Helper functions', () => {
    test('getMaterialById should return correct material', () => {
      const pla = getMaterialById('pla');
      expect(pla).toBeDefined();
      expect(pla?.name).toBe('PLA');
      expect(pla?.category).toBe('standard');
      
      const nonexistent = getMaterialById('nonexistent');
      expect(nonexistent).toBeUndefined();
    });

    test('getMaterialsByCategory should filter correctly', () => {
      const standardMaterials = getMaterialsByCategory('standard');
      expect(standardMaterials.length).toBeGreaterThan(0);
      standardMaterials.forEach(material => {
        expect(material.category).toBe('standard');
      });

      const engineeringMaterials = getMaterialsByCategory('engineering');
      expect(engineeringMaterials.length).toBeGreaterThan(0);
      engineeringMaterials.forEach(material => {
        expect(material.category).toBe('engineering');
      });
    });

    test('getAllMaterialNames should return sorted names', () => {
      const names = getAllMaterialNames();
      expect(names.length).toBe(MATERIALS.length);
      
      // Check if sorted
      const sortedNames = [...names].sort();
      expect(names).toEqual(sortedNames);
      
      // Check if all unique
      const uniqueNames = new Set(names);
      expect(uniqueNames.size).toBe(names.length);
    });

    test('getAllColorsForMaterial should return colors for existing material', () => {
      const plaColors = getAllColorsForMaterial('PLA');
      expect(plaColors.length).toBeGreaterThan(0);
      expect(plaColors.some(c => c.name === 'Black')).toBe(true);
      expect(plaColors.some(c => c.name === 'White')).toBe(true);
      
      const nonexistentColors = getAllColorsForMaterial('NonexistentMaterial');
      expect(nonexistentColors).toEqual([]);
    });

    test('getColoredMaterialOptions should include base materials and colored variants', () => {
      const options = getColoredMaterialOptions();
      expect(options.length).toBeGreaterThan(0);
      
      // Check for base materials
      expect(options.some(opt => opt.value === 'PLA')).toBe(true);
      expect(options.some(opt => opt.value === 'ABS')).toBe(true);
      expect(options.some(opt => opt.value === 'PETG')).toBe(true);
      
      // Check for colored variants
      expect(options.some(opt => opt.value.includes('PLA Black'))).toBe(true);
      expect(options.some(opt => opt.value.includes('ABS Red'))).toBe(true);
      
      // Check sorting
      const labels = options.map(opt => opt.label);
      const sortedLabels = [...labels].sort();
      expect(labels).toEqual(sortedLabels);
    });
  });

  describe('Data consistency', () => {
    test('all materials should have unique IDs', () => {
      const ids = MATERIALS.map(m => m.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    test('all materials should have unique names', () => {
      const names = MATERIALS.map(m => m.name);
      const uniqueNames = new Set(names);
      expect(uniqueNames.size).toBe(names.length);
    });

    test('colors should have valid hex codes when provided', () => {
      MATERIALS.forEach(material => {
        material.colors.forEach(color => {
          if (color.hex) {
            expect(color.hex).toMatch(/^#[0-9A-Fa-f]{6}$/);
          }
        });
      });
    });

    test('printing temperatures should be valid when provided', () => {
      MATERIALS.forEach(material => {
        if (material.printingTemp) {
          expect(material.printingTemp.min).toBeGreaterThan(0);
          expect(material.printingTemp.max).toBeGreaterThan(material.printingTemp.min);
          expect(material.printingTemp.max).toBeLessThan(500); // Reasonable upper limit
        }
      });
    });
  });

  describe('Coverage tests', () => {
    test('should have materials for all categories', () => {
      const categories = ['standard', 'engineering', 'specialty', 'support'] as const;
      categories.forEach(category => {
        const materialsInCategory = getMaterialsByCategory(category);
        expect(materialsInCategory.length).toBeGreaterThan(0);
      });
    });

    test('should include common color variations', () => {
      const pla = getMaterialById('pla');
      expect(pla).toBeDefined();
      
      const plaColorNames = pla!.colors.map(c => c.name);
      expect(plaColorNames).toContain('Black');
      expect(plaColorNames).toContain('White');
      expect(plaColorNames).toContain('Red');
      expect(plaColorNames).toContain('Blue');
      expect(plaColorNames).toContain('Green');
    });
  });
});