/**
 * Simple download function that creates an anchor tag and clicks it
 */
export const simpleDownload = (fileUrl: string, fileName: string): void => {
  const link = document.createElement('a');
  link.href = fileUrl;
  link.download = fileName;
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Downloads a file from a URL using fetch to force download behavior
 */
export const downloadFileFromUrl = async (fileUrl: string, fileName: string): Promise<void> => {
  try {
    // Try fetch approach to force download
    const response = await fetch(fileUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const blob = await response.blob();
    
    // Force download by setting blob type to octet-stream
    const downloadBlob = new Blob([blob], { type: 'application/octet-stream' });
    
    const link = document.createElement('a');
    const objectUrl = URL.createObjectURL(downloadBlob);
    link.href = objectUrl;
    link.download = fileName;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the object URL
    setTimeout(() => {
      URL.revokeObjectURL(objectUrl);
    }, 100);
    
  } catch (error) {
    // Fallback: direct download
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
