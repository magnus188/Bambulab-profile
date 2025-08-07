import { FilamentProfile, UploadProfileData } from '../src/types/index'

describe('Types', () => {
  test('FilamentProfile has required properties', () => {
    const profile: FilamentProfile = {
      id: '1',
      name: 'Test Profile',
      producer: 'Test Producer',
      material: 'PLA',
      description: 'Test description',
      fileUrl: 'https://example.com/file.zip',
      fileName: 'test.zip',
      fileType: 'json',
      printerType: 'A1',
      uploadedBy: 'user123',
      uploadedAt: new Date() as any,
      createdAt: new Date() as any,
      updatedAt: new Date() as any,
      downloadCount: 0,
      upvotes: 0,
      downvotes: 0,
      votedUsers: {}
    }

    expect(profile.id).toBe('1')
    expect(profile.name).toBe('Test Profile')
    expect(profile.material).toBe('PLA')
    expect(profile.fileType).toBe('json')
  })

  test('UploadProfileData has required properties', () => {
    const mockFile = new File(['test'], 'test.zip', { type: 'application/zip' })
    
    const uploadData: UploadProfileData = {
      name: 'Test Profile',
      producer: 'Test Producer', 
      material: 'PLA',
      description: 'Test description',
      printerType: 'A1',
      file: mockFile
    }

    expect(uploadData.name).toBe('Test Profile')
    expect(uploadData.file.name).toBe('test.zip')
  })

  test('FilamentProfile supports bbsflmt file type', () => {
    const profile: FilamentProfile = {
      id: '2',
      name: 'BBSFLMT Profile',
      producer: 'Test Producer',
      material: 'PETG',
      description: 'Test bbsflmt description',
      fileUrl: 'https://example.com/file.bbsflmt',
      fileName: 'test.bbsflmt',
      fileType: 'bbsflmt',
      printerType: 'P1P',
      uploadedBy: 'user456',
      uploadedAt: new Date() as any,
      createdAt: new Date() as any,
      updatedAt: new Date() as any,
      downloadCount: 0,
      upvotes: 0,
      downvotes: 0,
      votedUsers: {}
    }

    expect(profile.fileType).toBe('bbsflmt')
    expect(profile.fileName).toBe('test.bbsflmt')
  })
})
