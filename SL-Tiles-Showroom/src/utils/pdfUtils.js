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
export const openPdfPreview = (base64Url) => {
  if (!base64Url) {
    alert("No file available for preview.");
    return;
  }

  // Validate MIME type
  if (!base64Url.startsWith('data:application/pdf')) {
    alert("Invalid format: The file is not a valid PDF.");
    return;
  }

  try {
    const blob = base64ToBlob(base64Url);
    const blobUrl = URL.createObjectURL(blob);
    
    const newWindow = window.open(blobUrl, '_blank');
    
    if (newWindow) {
      // Clean up the object URL after 1 minute to ensure the new tab has fully loaded it
      // while preventing memory leaks.
      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
      }, 60000);
    } else {
      alert("Please allow popups to preview the catalogue.");
      // Since window didn't open, revoke immediately
      URL.revokeObjectURL(blobUrl);
    }
  } catch (error) {
    console.error("Preview generation failed:", error);
    alert("Failed to generate PDF preview. The file might be corrupted.");
  }
};
