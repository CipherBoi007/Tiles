export const uploadFile = async (file) => {
  if (!file) {
    throw new Error("No file provided");
  }

  const formData = new FormData();
  formData.append('file', file);

  const token = sessionStorage.getItem('adminToken');

  const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/upload`, {
    method: 'POST',
    headers: {
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('File upload failed');
  }

  const data = await response.json();
  return data.url;
};
