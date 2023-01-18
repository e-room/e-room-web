import axios from "axios";
import formidable from "formidable";
import FormData from "form-data";
import fs from "fs";
const baseURL = process.env.NEXT_PUBLIC_API_HOST + `/building/room/review`;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  // let uploadPhotoAddress = baseURL;
  // if (req.method === "POST") {
  //   const { data } = await axios.post(uploadPhotoAddress, req, {
  //     responseType: "stream",
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //       // "Content-Type": req.headers["content-type"], // which is multipart/form-data with boundary included
  //       mocking: 239,
  //     },
  //   });
  //   data.pipe(res);
  // } else {
  //   return res.status(405).json({ message: "Method Not Allowed" });
  // }

  //////////////////////////////////////////////////////////
  const fileData = await new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm({
      maxFileSize: 5 * 1024 * 1024,
      keepExtensions: true,
    });

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      return resolve(files);
    });
  });

  const formData = new FormData();
  const file = fileData.file;
  const readStream = fs.createReadStream(file.filepath);

  formData.append("file", readStream);

  const api = await axios.post(baseURL, formData, {
    headers: {
      "Content-Type": "multipart/form-data; boundary=" + formData.getBoundary(),
    },
  });

  const status = api.status;
  const data = await api.json();

  console.log(data);

  if (status === 200) {
    res.status(status).json({ success: true });
  } else {
    return res.status(500).json("Unknown Error");
  }
}
