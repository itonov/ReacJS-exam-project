class ImageService {
    static getImageBase64(imageCloudId) {
        return fetch('http://localhost:9999/feed/image/base64', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({imageCloudId})
            }
        );
    }
}

export default ImageService;