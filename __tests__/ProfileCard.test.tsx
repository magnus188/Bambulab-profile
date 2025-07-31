import { render, screen } from '@testing-library/react'
import ProfileCard from '../src/components/ProfileCard'
import { FilamentProfile } from '../src/types'

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
    name: 'Test PLA Profile',
    producer: 'Test Producer',
    material: 'PLA',
    description: 'A test filament profile',
    fileUrl: 'https://example.com/test.zip',
    fileName: 'test-profile.zip',
    uploadedBy: 'user123',
    uploadedAt: new Date() as any,
    createdAt: new Date() as any,
    updatedAt: new Date() as any,
    downloadCount: 42,
    upvotes: 5,
    downvotes: 1,
    votedUsers: {}
  }

  test('renders profile information', () => {
    render(<ProfileCard profile={mockProfile} />)

    expect(screen.getByText('Test PLA Profile')).toBeInTheDocument()
    expect(screen.getByText(/Test Producer/)).toBeInTheDocument() // matches "by Test Producer"
    expect(screen.getByText('PLA')).toBeInTheDocument()
  })

  test('displays download count and votes', () => {
    render(<ProfileCard profile={mockProfile} />)

    expect(screen.getByText('42')).toBeInTheDocument() // download count
    expect(screen.getByText('4')).toBeInTheDocument()  // net votes (5-1=4)
  })
})
