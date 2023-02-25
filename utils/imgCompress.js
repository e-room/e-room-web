import imageCompression from "browser-image-compression";

export default async (file) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 700,
    useWebWorker: true,
  };
  return await imageCompression(file, options);
};
