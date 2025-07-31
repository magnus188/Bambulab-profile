import { uploadProfile } from '../src/services/profileService'

// Mock Firebase
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  serverTimestamp: jest.fn(() => new Date()),
}))

jest.mock('firebase/storage', () => ({
  ref: jest.fn(),
  uploadBytes: jest.fn(),
  getDownloadURL: jest.fn(),
}))

describe('profileService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('uploadProfile throws error for duplicate name', async () => {
    const { getDocs } = require('firebase/firestore')
    
    // Mock that a profile already exists
    getDocs.mockResolvedValue({
      empty: false,
      docs: [{ id: 'existing-profile' }]
    })

    const mockFile = new File(['test'], 'test.zip', { type: 'application/zip' })
    const profileData = {
      name: 'Existing Profile',
      producer: 'Test Producer',
      material: 'PLA',
      description: 'Test description',
      file: mockFile
    }

    await expect(uploadProfile(profileData)).rejects.toThrow(
      'A profile with the name "Existing Profile" already exists.'
    )
  })

  test('uploadProfile succeeds with unique name', async () => {
    const { getDocs, addDoc } = require('firebase/firestore')
    const { uploadBytes, getDownloadURL } = require('firebase/storage')
    
    // Mock that no profile exists
    getDocs.mockResolvedValue({ empty: true })
    
    // Mock successful upload
    uploadBytes.mockResolvedValue({ ref: 'mock-ref' })
    getDownloadURL.mockResolvedValue('https://example.com/file.zip')
    addDoc.mockResolvedValue({ id: 'new-profile-id' })

    const mockFile = new File(['test'], 'test.zip', { type: 'application/zip' })
    const profileData = {
      name: 'New Profile',
      producer: 'Test Producer',
      material: 'PLA',
      description: 'Test description',
      file: mockFile
    }

    const result = await uploadProfile(profileData)
    expect(result).toBe('new-profile-id')
    expect(addDoc).toHaveBeenCalled()
  })
})
