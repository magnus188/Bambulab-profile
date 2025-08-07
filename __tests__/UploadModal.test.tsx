import { render, waitFor } from '@testing-library/react'
import UploadModal from '../src/components/UploadModal'

// Mock the services
jest.mock('../src/services/profileService', () => ({
  getProducers: jest.fn(),
  getMaterials: jest.fn(),
  getPrinterTypes: jest.fn(),
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
    const { getProducers, getMaterials, getPrinterTypes } = require('../src/services/profileService')
    
    // Mock the service responses
    getProducers.mockResolvedValue(['Producer A', 'Producer B'])
    getMaterials.mockResolvedValue(['PLA', 'ABS', 'PETG'])
    getPrinterTypes.mockResolvedValue(['All', 'A1', 'P1P', 'X1 Carbon'])

    render(<UploadModal {...mockProps} />)

    // Wait for the useEffect to complete
    await waitFor(() => {
      expect(getProducers).toHaveBeenCalledTimes(1)
      expect(getMaterials).toHaveBeenCalledTimes(1)
      expect(getPrinterTypes).toHaveBeenCalledTimes(1)
    })
  })

  test('fetches data even when modal is closed (component still mounted)', async () => {
    const { getProducers, getMaterials, getPrinterTypes } = require('../src/services/profileService')
    
    // Mock the service responses
    getProducers.mockResolvedValue(['Producer A'])
    getMaterials.mockResolvedValue(['PLA'])
    getPrinterTypes.mockResolvedValue(['All', 'A1'])
    
    render(<UploadModal {...mockProps} isOpen={false} />)

    // Even when closed, the component is mounted and useEffect runs
    await waitFor(() => {
      expect(getProducers).toHaveBeenCalledTimes(1)
      expect(getMaterials).toHaveBeenCalledTimes(1)
      expect(getPrinterTypes).toHaveBeenCalledTimes(1)
    })
  })
})