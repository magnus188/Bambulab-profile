import { render, screen } from '@testing-library/react'
import ProfileCard from '../src/components/ProfileCard'
import { FilamentProfile } from '../src/types/index'

// Mock the AuthContext
jest.mock('../src/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    loading: false,
  }),
}))

// Mock the profileService
jest.mock('../src/services/profileService', () => ({
  voteOnProfile: jest.fn(),
  removeVote: jest.fn(),
}))

describe('ProfileCard', () => {
  const mockProfile: FilamentProfile = {
    id: '1',
    name: 'Test Profile',
    producer: 'Test Producer',
    material: 'PLA',
    description: 'Test description',
    fileUrl: 'https://example.com/file.json',
    fileName: 'test.json',
    fileType: 'json',
    printerType: 'A1',
    uploadedBy: 'user1',
    uploadedAt: { toDate: () => new Date(), seconds: 0, nanoseconds: 0 } as any,
    createdAt: { toDate: () => new Date(), seconds: 0, nanoseconds: 0 } as any,
    updatedAt: { toDate: () => new Date(), seconds: 0, nanoseconds: 0 } as any,
    downloadCount: 42,
    upvotes: 5,
    downvotes: 1,
    votedUsers: {}
  };

  test('renders profile information', () => {
    render(<ProfileCard profile={mockProfile} />)

    expect(screen.getByText('Test Profile')).toBeInTheDocument()
    expect(screen.getByText(/Test Producer/)).toBeInTheDocument() // matches "by Test Producer"
    expect(screen.getByText('PLA')).toBeInTheDocument()
    expect(screen.getByText('JSON')).toBeInTheDocument() // file type tag
  })

  test('displays download count and votes', () => {
    render(<ProfileCard profile={mockProfile} />)

    expect(screen.getByText('42')).toBeInTheDocument() // download count
    expect(screen.getByText('4')).toBeInTheDocument()  // net votes (5-1=4)
  })
})
