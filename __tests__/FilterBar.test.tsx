import { render, screen } from '@testing-library/react'
import FilterBar from '../src/components/FilterBar'

// Mock the Dropdown component since it's complex
jest.mock('../src/components/Dropdown', () => {
  return function MockDropdown({ value }: { value: string }) {
    return <div data-testid="dropdown">{value}</div>
  }
})

describe('FilterBar', () => {
  const defaultProps = {
    producers: ['Producer A', 'Producer B'],
    selectedProducer: 'all',
    onProducerChange: jest.fn(),
    materials: ['PLA', 'PETG'],
    selectedMaterial: 'all',
    onMaterialChange: jest.fn(),
    fileTypes: ['json', 'bbsflmt'],
    selectedFileType: 'all',
    onFileTypeChange: jest.fn(),
    sortBy: 'newest' as const,
    onSortChange: jest.fn(),
  }

  test('renders filter labels', () => {
    render(<FilterBar {...defaultProps} />)

    expect(screen.getByText('Producer:')).toBeInTheDocument()
    expect(screen.getByText('Material:')).toBeInTheDocument()
    expect(screen.getByText('File Type:')).toBeInTheDocument()
    expect(screen.getByText('Sort by:')).toBeInTheDocument()
  })

  test('displays current filter values', () => {
    render(<FilterBar {...defaultProps} />)

    const dropdowns = screen.getAllByTestId('dropdown')
    expect(dropdowns).toHaveLength(4) // producer, material, file type, sort
  })
})
