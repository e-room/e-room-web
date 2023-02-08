import imageCompression from "browser-image-compression";

export default async (file) => {
  const options = {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 375,
    useWebWorker: true,
  };
  return await imageCompression(file, options);
};
