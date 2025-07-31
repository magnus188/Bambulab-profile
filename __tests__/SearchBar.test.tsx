import { render, screen, fireEvent } from '@testing-library/react'
import SearchBar from '../src/components/SearchBar'

describe('SearchBar', () => {
  test('renders search input', () => {
    const mockOnSearchChange = jest.fn()
    
    render(
      <SearchBar searchTerm="" onSearchChange={mockOnSearchChange} />
    )

    const searchInput = screen.getByPlaceholderText('Search profiles...')
    expect(searchInput).toBeInTheDocument()
  })

  test('calls onSearchChange when user types', () => {
    const mockOnSearchChange = jest.fn()
    
    render(
      <SearchBar searchTerm="" onSearchChange={mockOnSearchChange} />
    )

    const searchInput = screen.getByPlaceholderText('Search profiles...')
    fireEvent.change(searchInput, { target: { value: 'PLA' } })

    expect(mockOnSearchChange).toHaveBeenCalledWith('PLA')
  })
})
