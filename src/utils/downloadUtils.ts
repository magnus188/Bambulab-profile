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
  
  // Strategy 1: Try fetch with blob approach first (most reliable for forcing downloads)
  try {
    console.log('Attempting fetch download with forced download...');
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
    console.log('Fetch download failed, trying direct download:', fetchError);
  }
  
  // Strategy 2: Try direct download with anchor tag (without target="_blank")
  try {
    console.log('Attempting direct download with anchor tag...');
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    // Removed target="_blank" to prevent opening in new tab
    link.setAttribute('rel', 'noopener noreferrer');
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('Direct download completed');
    return;
  } catch (directError) {
    console.log('Direct download failed:', directError);
  }
  
  // Strategy 3: Try with modified URL for Firebase storage (force download)
  try {
    console.log('Attempting download with modified URL...');
    // For Firebase storage URLs, we can add query parameter to force download
    let modifiedUrl = fileUrl;
    if (fileUrl.includes('firebasestorage.googleapis.com')) {
      const separator = fileUrl.includes('?') ? '&' : '?';
      modifiedUrl = `${fileUrl}${separator}alt=media&disposition=attachment&filename=${encodeURIComponent(fileName)}`;
    }
    
    const link = document.createElement('a');
    link.href = modifiedUrl;
    link.download = fileName;
    link.setAttribute('rel', 'noopener noreferrer');
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('Modified URL download completed');
    return;
  } catch (modifiedError) {
    console.log('Modified URL download failed:', modifiedError);
  }
  
  // Strategy 4: Final fallback - inform user that download failed
  console.error('All download methods failed');
  throw new Error('Download failed. Please try again or contact support if the issue persists.');
};
