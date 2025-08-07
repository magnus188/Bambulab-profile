import { render, waitFor } from '@testing-library/react'
import UploadModal from '../src/components/UploadModal'

// Mock the services
jest.mock('../src/services/profileService', () => ({
  getProducers: jest.fn(),
  getComprehensiveMaterialOptions: jest.fn(),
  uploadProfile: jest.fn(),
  updateProfile: jest.fn(),
}))

// Mock the Auth context
jest.mock('../src/contexts/AuthContext', () => ({
  useAuth: jest.fn(() => ({
    user: { uid: 'test-user' }
  }))
}))

describe('UploadModal', () => {
  const mockProps = {
    isOpen: true,
    onClose: jest.fn(),
    onUploadSuccess: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('loads materials and producers on open', async () => {
    const { getProducers, getComprehensiveMaterialOptions } = require('../src/services/profileService')
    
    // Mock the service responses
    getProducers.mockResolvedValue(['Producer A', 'Producer B'])
    getComprehensiveMaterialOptions.mockResolvedValue([
      { value: 'PLA', label: 'PLA', category: 'standard' },
      { value: 'ABS', label: 'ABS', category: 'standard' },
      { value: 'PETG', label: 'PETG', category: 'standard' }
    ])

    render(<UploadModal {...mockProps} />)

    // Wait for the useEffect to complete
    await waitFor(() => {
      expect(getProducers).toHaveBeenCalledTimes(1)
      expect(getComprehensiveMaterialOptions).toHaveBeenCalledTimes(1)
    })
  })

  test('fetches data even when modal is closed (component still mounted)', async () => {
    const { getProducers, getComprehensiveMaterialOptions } = require('../src/services/profileService')
    
    // Mock the service responses
    getProducers.mockResolvedValue(['Producer A'])
    getComprehensiveMaterialOptions.mockResolvedValue([
      { value: 'PLA', label: 'PLA', category: 'standard' }
    ])
    
    render(<UploadModal {...mockProps} isOpen={false} />)

    // Even when closed, the component is mounted and useEffect runs
    await waitFor(() => {
      expect(getProducers).toHaveBeenCalledTimes(1)
      expect(getComprehensiveMaterialOptions).toHaveBeenCalledTimes(1)
    })
  })
})