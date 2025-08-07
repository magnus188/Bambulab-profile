import { getMaterials, getComprehensiveMaterialOptions } from '../src/services/profileService';
import { getAllMaterialNames } from '../src/constants/materials';

// Mock Firebase
jest.mock('../src/lib/firebase', () => ({
  db: {},
  storage: {}
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  orderBy: jest.fn(),
  where: jest.fn(),
  addDoc: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn(),
  serverTimestamp: jest.fn(),
  increment: jest.fn()
}));

jest.mock('firebase/storage', () => ({
  ref: jest.fn(),
  uploadBytes: jest.fn(),
  getDownloadURL: jest.fn()
}));

describe('Enhanced Profile Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getMaterials', () => {
    test('should include predefined materials from constants', async () => {
      const { getDocs } = require('firebase/firestore');
      getDocs.mockResolvedValue({
        forEach: jest.fn()
      });

      const materials = await getMaterials();
      const predefinedMaterials = getAllMaterialNames();
      
      expect(materials.length).toBeGreaterThanOrEqual(predefinedMaterials.length);
      
      // Check that all predefined materials are included
      predefinedMaterials.forEach(material => {
        expect(materials).toContain(material);
      });
    });

    test('should combine predefined and dynamic materials', async () => {
      const { getDocs } = require('firebase/firestore');
      
      const mockDynamicMaterials = ['Custom Material 1', 'Custom Material 2'];
      getDocs.mockResolvedValue({
        forEach: (callback: (doc: any) => void) => {
          mockDynamicMaterials.forEach(material => {
            callback({
              data: () => ({ material })
            });
          });
        }
      });

      const materials = await getMaterials();
      
      // Should include both predefined and dynamic materials
      expect(materials).toContain('PLA'); // Predefined
      expect(materials).toContain('Custom Material 1'); // Dynamic
      expect(materials).toContain('Custom Material 2'); // Dynamic
    });

    test('should not duplicate materials between predefined and dynamic', async () => {
      const { getDocs } = require('firebase/firestore');
      
      getDocs.mockResolvedValue({
        forEach: (callback: (doc: any) => void) => {
          // Mock some existing predefined materials coming from dynamic source
          callback({ data: () => ({ material: 'PLA' }) });
          callback({ data: () => ({ material: 'ABS' }) });
          callback({ data: () => ({ material: 'Custom Material' }) });
        }
      });

      const materials = await getMaterials();
      const predefinedMaterials = getAllMaterialNames();
      
      // Count occurrences of PLA (should be only 1)
      const plaCount = materials.filter(m => m === 'PLA').length;
      expect(plaCount).toBe(1);
      
      // Should still include custom material
      expect(materials).toContain('Custom Material');
    });

    test('should return sorted materials', async () => {
      const { getDocs } = require('firebase/firestore');
      getDocs.mockResolvedValue({
        forEach: jest.fn()
      });

      const materials = await getMaterials();
      const sortedMaterials = [...materials].sort();
      expect(materials).toEqual(sortedMaterials);
    });
  });

  describe('getComprehensiveMaterialOptions', () => {
    test('should return options with predefined materials', async () => {
      const { getDocs } = require('firebase/firestore');
      getDocs.mockResolvedValue({
        forEach: jest.fn()
      });

      const options = await getComprehensiveMaterialOptions();
      
      expect(options.length).toBeGreaterThan(0);
      expect(options.some(opt => opt.value === 'PLA')).toBe(true);
      expect(options.some(opt => opt.value === 'ABS')).toBe(true);
      expect(options.some(opt => opt.value === 'PETG')).toBe(true);
    });

    test('should include colored material variants', async () => {
      const { getDocs } = require('firebase/firestore');
      getDocs.mockResolvedValue({
        forEach: jest.fn()
      });

      const options = await getComprehensiveMaterialOptions();
      
      // Should include colored variants for popular materials
      expect(options.some(opt => opt.value.includes('PLA Black'))).toBe(true);
      expect(options.some(opt => opt.value.includes('ABS Red'))).toBe(true);
      expect(options.some(opt => opt.value.includes('PETG Metallic'))).toBe(true); // PETG has metallic colors
    });

    test('should add dynamic materials with custom category', async () => {
      const { getDocs } = require('firebase/firestore');
      
      getDocs.mockResolvedValue({
        forEach: (callback: (doc: any) => void) => {
          callback({ data: () => ({ material: 'Custom Exotic Material' }) });
        }
      });

      const options = await getComprehensiveMaterialOptions();
      
      const customOption = options.find(opt => opt.value === 'Custom Exotic Material');
      expect(customOption).toBeDefined();
      expect(customOption?.category).toBe('custom');
    });

    test('should not duplicate options', async () => {
      const { getDocs } = require('firebase/firestore');
      
      getDocs.mockResolvedValue({
        forEach: (callback: (doc: any) => void) => {
          // Try to add a predefined material again
          callback({ data: () => ({ material: 'PLA' }) });
        }
      });

      const options = await getComprehensiveMaterialOptions();
      
      // Count occurrences of PLA options
      const plaOptions = options.filter(opt => opt.value === 'PLA');
      expect(plaOptions.length).toBe(1);
    });

    test('should return sorted options', async () => {
      const { getDocs } = require('firebase/firestore');
      getDocs.mockResolvedValue({
        forEach: jest.fn()
      });

      const options = await getComprehensiveMaterialOptions();
      const labels = options.map(opt => opt.label);
      const sortedLabels = [...labels].sort();
      expect(labels).toEqual(sortedLabels);
    });
  });
});