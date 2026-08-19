/**
 * Utility functions for handling PDF files, specifically parsing base64 Data URLs,
 * creating Blobs, and managing Object URLs for safe previewing.
 */

/**
 * Converts a base64 Data URL into a Blob object.
 * @param {string} base64Url - The data URL (e.g., "data:application/pdf;base64,...")
 * @returns {Blob} The binary Blob representation of the file.
 */
export const base64ToBlob = (base64Url) => {
  try {
    const arr = base64Url.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    
    if (!mimeMatch) throw new Error("Invalid base64 URL format");
    
    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new Blob([u8arr], { type: mime });
  } catch (error) {
    console.error("Error converting base64 to Blob:", error);
    throw error;
  }
};

/**
 * Safely opens a base64 PDF in a new browser tab.
 * Creates an Object URL from a Blob to bypass modern browser restrictions
 * on navigating directly to data URLs.
 * 
 * @param {string} base64Url - The PDF data URL.
 */
export const openPdfPreview = (url) => {
  if (!url) {
    alert("No file available for preview.");
    return;
  }

  // If base64 Data URL, convert to Blob URL and open
  if (url.startsWith('data:application/pdf')) {
    try {
      const blob = base64ToBlob(url);
      const blobUrl = URL.createObjectURL(blob);
      
      const newWindow = window.open(blobUrl, '_blank');
      
      if (newWindow) {
        setTimeout(() => {
          URL.revokeObjectURL(blobUrl);
        }, 60000);
      } else {
        alert("Please allow popups to preview the catalogue.");
        URL.revokeObjectURL(blobUrl);
      }
    } catch (error) {
      console.error("Preview generation failed:", error);
      alert("Failed to generate PDF preview. The file might be corrupted.");
    }
  } else {
    // Standard URL path (e.g. /catalogues/summer-2025.pdf)
    const newWindow = window.open(url, '_blank');
    if (!newWindow) {
      alert("Please allow popups to preview the catalogue.");
    }
  }
};
