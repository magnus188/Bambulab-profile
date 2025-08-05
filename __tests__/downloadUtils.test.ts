import { simpleDownload, downloadFileFromUrl } from '../src/utils/downloadUtils'

// Mock fetch for testing
global.fetch = jest.fn()
global.URL.createObjectURL = jest.fn()
global.URL.revokeObjectURL = jest.fn()

describe('downloadUtils', () => {
  beforeEach(() => {
    // Mock DOM methods
    document.createElement = jest.fn()
    document.body.appendChild = jest.fn()
    document.body.removeChild = jest.fn()
    
    // Reset mocks
    jest.clearAllMocks()
  })

  test('simpleDownload creates and clicks download link', () => {
    const mockLink = {
      href: '',
      download: '',
      setAttribute: jest.fn(),
      style: { display: '' },
      click: jest.fn(),
    }
    
    ;(document.createElement as jest.Mock).mockReturnValue(mockLink)

    simpleDownload('https://example.com/file.zip', 'test-file.zip')

    expect(document.createElement).toHaveBeenCalledWith('a')
    expect(mockLink.href).toBe('https://example.com/file.zip')
    expect(mockLink.download).toBe('test-file.zip')
    expect(mockLink.click).toHaveBeenCalled()
  })

  test('downloadFileFromUrl uses fetch approach successfully', async () => {
    // Mock successful fetch response
    const mockBlob = new Blob(['file content'], { type: 'application/json' })
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      blob: () => Promise.resolve(mockBlob)
    })

    const mockLink = {
      href: '',
      download: '',
      setAttribute: jest.fn(),
      style: { display: '' },
      click: jest.fn(),
    }
    
    ;(document.createElement as jest.Mock).mockReturnValue(mockLink)
    ;(global.URL.createObjectURL as jest.Mock).mockReturnValue('blob:url')

    await downloadFileFromUrl('https://example.com/test.json', 'test.json')

    expect(global.fetch).toHaveBeenCalledWith('https://example.com/test.json', {
      method: 'GET',
      mode: 'cors',
      credentials: 'omit'
    })
    expect(mockLink.download).toBe('test.json')
    expect(mockLink.click).toHaveBeenCalled()
    expect(global.URL.createObjectURL).toHaveBeenCalled()
  })

  test('downloadFileFromUrl falls back to direct download when fetch fails', async () => {
    // Mock fetch to fail
    ;(global.fetch as jest.Mock).mockRejectedValue(new Error('Fetch failed'))

    const mockLink = {
      href: '',
      download: '',
      setAttribute: jest.fn(),
      style: { display: '' },
      click: jest.fn(),
    }
    
    ;(document.createElement as jest.Mock).mockReturnValue(mockLink)

    await downloadFileFromUrl('https://example.com/test.json', 'test.json')

    expect(mockLink.href).toBe('https://example.com/test.json')
    expect(mockLink.download).toBe('test.json')
    expect(mockLink.setAttribute).toHaveBeenCalledWith('rel', 'noopener noreferrer')
    expect(mockLink.setAttribute).not.toHaveBeenCalledWith('target', '_blank')
    expect(mockLink.click).toHaveBeenCalled()
  })

  test('downloadFileFromUrl handles Firebase URLs with special parameters', async () => {
    // Mock fetch to fail to test fallback strategies
    ;(global.fetch as jest.Mock).mockRejectedValue(new Error('Fetch failed'))

    const mockLink = {
      href: '',
      download: '',
      setAttribute: jest.fn(),
      style: { display: '' },
      click: jest.fn(),
    }
    
    // Mock createElement to fail for direct download but succeed for modified URL
    let callCount = 0
    ;(document.createElement as jest.Mock).mockImplementation(() => {
      callCount++
      if (callCount === 1) {
        // First call (direct download) - simulate failure
        throw new Error('Direct download failed')
      }
      return mockLink // Second call (modified URL) - succeed
    })

    await downloadFileFromUrl('https://firebasestorage.googleapis.com/test.json', 'test.json')

    // Should attempt modified URL with Firebase parameters
    expect(mockLink.href).toContain('alt=media&disposition=attachment&filename=test.json')
    expect(mockLink.download).toBe('test.json')
  })

  test('downloadFileFromUrl throws error when all strategies fail', async () => {
    // Mock all approaches to fail
    ;(global.fetch as jest.Mock).mockRejectedValue(new Error('Fetch failed'))
    ;(document.createElement as jest.Mock).mockImplementation(() => {
      throw new Error('DOM manipulation failed')
    })

    await expect(downloadFileFromUrl('https://example.com/test.json', 'test.json'))
      .rejects
      .toThrow('Download failed. Please try again or contact support if the issue persists.')
  })
})
