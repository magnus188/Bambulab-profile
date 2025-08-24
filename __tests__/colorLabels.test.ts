import {
  COLOR_LABELS,
  getColorsByCategory,
  getBasicColors,
  getMetallicColors,
  getTransparentColors,
  getSpecialColors,
  getNaturalColors,
  getAllColorNames,
  getColorByName,
  getColorOptions,
  COLOR_CATEGORIES
} from '../src/constants/colorLabels';

describe('Color Labels', () => {
  test('COLOR_LABELS contains comprehensive list of colors', () => {
    expect(COLOR_LABELS).toBeDefined();
    expect(COLOR_LABELS.length).toBeGreaterThan(80); // We have 90+ colors
    
    // Check that all colors have required properties
    COLOR_LABELS.forEach(color => {
      expect(color.name).toBeDefined();
      expect(typeof color.name).toBe('string');
      expect(color.category).toBeDefined();
      expect(['basic', 'metallic', 'transparent', 'special', 'natural']).toContain(color.category);
    });
  });

  test('getColorsByCategory returns correct colors', () => {
    const basicColors = getColorsByCategory('basic');
    const metallicColors = getColorsByCategory('metallic');
    
    expect(basicColors.length).toBeGreaterThan(0);
    expect(metallicColors.length).toBeGreaterThan(0);
    
    basicColors.forEach(color => {
      expect(color.category).toBe('basic');
    });
    
    metallicColors.forEach(color => {
      expect(color.category).toBe('metallic');
    });
  });

  test('helper functions return expected results', () => {
    const basicColors = getBasicColors();
    const metallicColors = getMetallicColors();
    const transparentColors = getTransparentColors();
    const specialColors = getSpecialColors();
    const naturalColors = getNaturalColors();
    
    expect(basicColors.length).toBeGreaterThan(20); // Many basic colors
    expect(metallicColors.length).toBeGreaterThan(5); // Several metallic colors
    expect(transparentColors.length).toBeGreaterThan(5); // Several transparent colors
    expect(specialColors.length).toBeGreaterThan(10); // Many special colors
    expect(naturalColors.length).toBeGreaterThan(3); // Natural/clear colors
    
    // Check categories are correct
    basicColors.forEach(color => expect(color.category).toBe('basic'));
    metallicColors.forEach(color => expect(color.category).toBe('metallic'));
    transparentColors.forEach(color => expect(color.category).toBe('transparent'));
    specialColors.forEach(color => expect(color.category).toBe('special'));
    naturalColors.forEach(color => expect(color.category).toBe('natural'));
  });

  test('getAllColorNames returns sorted array of color names', () => {
    const colorNames = getAllColorNames();
    
    expect(colorNames.length).toBe(COLOR_LABELS.length);
    expect(colorNames).toContain('Black');
    expect(colorNames).toContain('White');
    expect(colorNames).toContain('Red');
    expect(colorNames).toContain('Blue');
    expect(colorNames).toContain('Green');
    
    // Check if sorted
    const sortedNames = [...colorNames].sort();
    expect(colorNames).toEqual(sortedNames);
  });

  test('getColorByName finds colors correctly', () => {
    const blackColor = getColorByName('Black');
    const whiteColor = getColorByName('White');
    const nonExistentColor = getColorByName('NonExistent');
    
    expect(blackColor).toBeDefined();
    expect(blackColor?.name).toBe('Black');
    expect(blackColor?.hex).toBe('#000000');
    
    expect(whiteColor).toBeDefined();
    expect(whiteColor?.name).toBe('White');
    expect(whiteColor?.hex).toBe('#FFFFFF');
    
    expect(nonExistentColor).toBeUndefined();
  });

  test('getColorByName is case insensitive', () => {
    const blackLower = getColorByName('black');
    const blackUpper = getColorByName('BLACK');
    const blackMixed = getColorByName('BlAcK');
    
    expect(blackLower).toBeDefined();
    expect(blackLower?.name).toBe('Black');
    expect(blackUpper).toBeDefined();
    expect(blackUpper?.name).toBe('Black');
    expect(blackMixed).toBeDefined();
    expect(blackMixed?.name).toBe('Black');
  });

  test('getColorOptions returns properly formatted options', () => {
    const colorOptions = getColorOptions();
    
    expect(colorOptions.length).toBe(COLOR_LABELS.length);
    
    colorOptions.forEach(option => {
      expect(option.value).toBeDefined();
      expect(option.label).toBeDefined();
      expect(option.category).toBeDefined();
      expect(typeof option.value).toBe('string');
      expect(typeof option.label).toBe('string');
      expect(['basic', 'metallic', 'transparent', 'special', 'natural']).toContain(option.category);
    });
    
    // Check specific colors are included
    const blackOption = colorOptions.find(opt => opt.value === 'Black');
    const whiteOption = colorOptions.find(opt => opt.value === 'White');
    
    expect(blackOption).toBeDefined();
    expect(blackOption?.label).toBe('Black');
    expect(blackOption?.category).toBe('basic');
    
    expect(whiteOption).toBeDefined();
    expect(whiteOption?.label).toBe('White');
    expect(whiteOption?.category).toBe('basic');
  });

  test('COLOR_CATEGORIES is properly defined', () => {
    expect(COLOR_CATEGORIES).toBeDefined();
    expect(COLOR_CATEGORIES.length).toBe(5);
    
    const expectedCategories = ['basic', 'natural', 'metallic', 'transparent', 'special'];
    const actualKeys = COLOR_CATEGORIES.map(cat => cat.key);
    
    expectedCategories.forEach(expected => {
      expect(actualKeys).toContain(expected);
    });
    
    COLOR_CATEGORIES.forEach(category => {
      expect(category.key).toBeDefined();
      expect(category.label).toBeDefined();
      expect(category.description).toBeDefined();
      expect(typeof category.key).toBe('string');
      expect(typeof category.label).toBe('string');
      expect(typeof category.description).toBe('string');
    });
  });

  test('all category types are covered in colors', () => {
    const categoryKeys = COLOR_CATEGORIES.map(cat => cat.key);
    const usedCategories = new Set(COLOR_LABELS.map(color => color.category));
    
    categoryKeys.forEach(key => {
      expect(usedCategories.has(key)).toBe(true);
    });
  });

  test('essential colors are included', () => {
    const colorNames = getAllColorNames();
    
    // Essential basic colors
    const essentialColors = [
      'Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple', 'Pink', 'Brown',
      'Gray', 'Natural', 'Clear', 'Transparent'
    ];
    
    essentialColors.forEach(color => {
      expect(colorNames).toContain(color);
    });
  });

  test('metallic colors have proper descriptions', () => {
    const metallicColors = getMetallicColors();
    
    metallicColors.forEach(color => {
      expect(color.description).toBeDefined();
      expect(color.description?.toLowerCase()).toContain('metallic');
    });
  });

  test('transparent colors have proper descriptions', () => {
    const transparentColors = getTransparentColors();
    
    transparentColors.forEach(color => {
      expect(color.description).toBeDefined();
      expect(color.description?.toLowerCase()).toMatch(/transparent|see-through|translucent/);
    });
  });

  test('special colors have unique effects', () => {
    const specialColors = getSpecialColors();
    
    // Check for specific special effect colors
    const specialNames = specialColors.map(color => color.name);
    expect(specialNames).toContain('Glow in the Dark');
    expect(specialNames).toContain('Color Changing');
    expect(specialNames).toContain('UV Reactive');
    expect(specialNames).toContain('Carbon Fiber');
    expect(specialNames).toContain('Marble');
  });
});