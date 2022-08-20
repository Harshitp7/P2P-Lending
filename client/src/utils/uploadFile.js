
export default async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'P2pLending')
    const response = await fetch('https://api.cloudinary.com/v1_1/ddxohc53h/image/upload', {
        method: 'POST',
        body: formData,
    });
    const json = await response.json();
    console.log({json});
    return json?.secure_url;
}