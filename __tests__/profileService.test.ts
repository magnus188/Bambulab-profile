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

  test('uploadProfile succeeds with valid data', async () => {
    const { addDoc } = require('firebase/firestore')
    const { uploadBytes, getDownloadURL } = require('firebase/storage')
    
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
      printerType: 'A1',
      file: mockFile
    }

    const result = await uploadProfile(profileData)
    expect(result).toBe('new-profile-id')
    expect(addDoc).toHaveBeenCalled()
  })
})
