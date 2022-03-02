export const separateBase64 = (image: string) => {
    const array = image.split(','); // data:image/png;base64,"code base64..."

    const preextension = array[0].split('/'); // data:image/png;base64
    const extension = preextension[1].split(';'); // png;base64
    
    // return [extension, "code base 64"] 
    return [extension[0], array[1]];
}