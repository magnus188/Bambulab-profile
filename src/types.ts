import { Timestamp } from 'firebase/firestore';

export interface FilamentProfile {
  id: string;
  name: string;
  producer: string;
  material: string;
  description: string;
  fileUrl: string;
  fileName: string;
  uploadedBy: string;
  uploadedAt: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  downloadCount: number;
  upvotes: number;
  downvotes: number;
  votedUsers: { [userId: string]: 'up' | 'down' };
}

export interface UploadProfileData {
  name: string;
  producer: string;
  material: string;
  description: string;
  file: File;
}
