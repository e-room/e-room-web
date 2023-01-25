import formidable from "formidable";
import FormData from "form-data";
import fs from "fs";
import axios from "axios";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const upload = async (req, res) => {
  const fileData = await new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm({
      maxFileSize: 5 * 1024 * 1024,
      keepExtensions: true,
      multiples: true,
    });

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      return resolve({ files, fields });
    });
  });

  const formData = new FormData();
  const fields = fileData.fields;
  const files = fileData.files;

  for (let i = 0; i < files.length; i++) {
    const readStream = fs.createReadStream(files[i].reviewImageList.filepath);
    formData.append("reviewImageList", readStream);
  }
  formData.append("request", JSON.stringify(fields.request));

  const api = await axios.post(
    `${process.env.NEXT_PUBLIC_API_HOST}/building/room/review`,
    formData,
    {
      headers: {
        responseType: "stream",
        "Content-Type": "multipart/form-data",
      },
    }
  );

  const status = api.status;

  if (status === 200) {
    res.status(status).json({ success: true });
  } else {
    return res.status(500).json("Unknown Error");
  }
};

export default upload;
