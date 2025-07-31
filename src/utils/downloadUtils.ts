/**
 * Simple download function that creates an anchor tag and clicks it
 */
export const simpleDownload = (fileUrl: string, fileName: string): void => {
  console.log('Simple download attempt for:', fileName);
  const link = document.createElement('a');
  link.href = fileUrl;
  link.download = fileName;
  link.setAttribute('target', '_blank');
  link.style.display = 'none';
  
  document.body.appendChild(link);
  console.log('Created link:', link.href, link.download);
  link.click();
  console.log('Clicked link');
  document.body.removeChild(link);
  console.log('Simple download completed');
};

/**
 * Downloads a file from a URL using multiple fallback strategies
 * This ensures the file is downloaded rather than opened in the browser
 */
export const downloadFileFromUrl = async (fileUrl: string, fileName: string): Promise<void> => {
  console.log('Starting download for:', fileName, 'from URL:', fileUrl);
  
  // Strategy 1: Try direct download with anchor tag first (simplest)
  try {
    console.log('Attempting direct download with anchor tag...');
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('Direct download completed');
    return;
  } catch (directError) {
    console.log('Direct download failed, trying fetch approach:', directError);
  }
  
  // Strategy 2: Try fetch with blob approach
  try {
    console.log('Attempting fetch download...');
    const response = await fetch(fileUrl, {
      method: 'GET',
      mode: 'cors',
      credentials: 'omit'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const blob = await response.blob();
    console.log('Got blob from fetch:', blob.size, 'bytes');
    
    // Force download by setting blob type to octet-stream
    const downloadBlob = new Blob([blob], { type: 'application/octet-stream' });
    
    const link = document.createElement('a');
    const objectUrl = URL.createObjectURL(downloadBlob);
    link.href = objectUrl;
    link.download = fileName;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    console.log('Clicking blob download link...');
    link.click();
    document.body.removeChild(link);
    
    // Clean up the object URL after a short delay
    setTimeout(() => {
      URL.revokeObjectURL(objectUrl);
    }, 100);
    
    console.log('Fetch download completed successfully');
    return;
  } catch (fetchError) {
    console.error('Fetch download failed:', fetchError);
  }
  
  // Strategy 3: Final fallback - open in new window/tab
  console.log('All download methods failed, opening in new tab...');
  try {
    window.open(fileUrl, '_blank', 'noopener,noreferrer');
    console.log('Opened file in new tab');
  } catch (openError) {
    console.error('Even opening in new tab failed:', openError);
    throw new Error('All download methods failed');
  }
};
