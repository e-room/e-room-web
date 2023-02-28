import imageCompression from "browser-image-compression";

export default async (file) => {
  const options = {
    maxSizeMB: 1.2,
    maxWidthOrHeight: 900,
    useWebWorker: true,
  };
  return await imageCompression(file, options);
};
