import sha1 from 'js-sha1'
import { utcToUnixTimestamp } from './dateTimeUtils';

export const uploadFile =  async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'P2pLending')
    const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/auto/upload`, {
        method: 'POST',
        body: formData,
    });
    const json = await response.json();
    console.log({uploadRes : json});
    return json?.secure_url;
}

export const deleteFile = async (url) => {
    console.log({urlToDelete : url});
    const folder = process.env.REACT_APP_CLOUDINARY_FOLDER;
    const public_id = folder +  url.split(folder)[1].split('.')[0];
    const timestamp = utcToUnixTimestamp(Date.now())
    const signature = sha1(`public_id=${public_id}&timestamp=${timestamp}${process.env.REACT_APP_CLOUDINARY_API_SECRET}`);
    console.log({public_id, timestamp, signature});
    const formData = new FormData();
    formData.append('public_id', public_id);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);
    formData.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/destroy`, {  
        method: 'POST',
        body: formData,
    });

    const json = await response.json();

    console.log({deleteRes : json});
    if(json?.result === 'ok') {
        return true;
    }
    return false;
}

