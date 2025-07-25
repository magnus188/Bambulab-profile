export interface FilamentProfile {
  id: string;
  name: string;
  producer: string;
  material: string; // e.g., PLA, PETG, ABS
  printers: string[];
  fileName: string;
  fileUrl: string;
  uploadedAt: Date;
  metadata?: {
    fileSize: number;
    fileType: string;
  };
  configFileName?: string;
  configFileUrl?: string;
  configMetadata?: {
    fileSize: number;
    fileType: string;
  };
  configPrinters?: string[];
}

export interface UploadProfileData {
  name: string;
  producer: string;
  material: string;
  printers: string[];
  file: File;
}
