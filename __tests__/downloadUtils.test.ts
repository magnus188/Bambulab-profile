import { simpleDownload } from '../src/utils/downloadUtils'

describe('downloadUtils', () => {
  beforeEach(() => {
    // Mock DOM methods
    document.createElement = jest.fn()
    document.body.appendChild = jest.fn()
    document.body.removeChild = jest.fn()
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
})
