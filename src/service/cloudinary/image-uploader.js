import axios from "axios";

export default class ImageUploader {
  async upload(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );
    const response = await axios({
      method: "POST",
      url: process.env.REACT_APP_CLOUDINARY_UPLOAD_URL,
      data: formData,
    });

    return response.data.url;
  }
}
