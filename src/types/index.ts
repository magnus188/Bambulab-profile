export interface FilamentProfile {
  id: string;
  name: string;
  producer: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: Date;
  metadata?: {
    fileSize: number;
    fileType: string;
  };
}

export interface UploadProfileData {
  name: string;
  producer: string;
  file: File;
}
