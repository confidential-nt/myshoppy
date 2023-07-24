import axios from "axios";

export default class ImageUploader {
  async upload(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "q6nxw20m");
    const response = await axios({
      method: "POST",
      url: "https://api.cloudinary.com/v1_1/dypkkfbys/image/upload",
      data: formData,
    });

    return response.data.url;
  }
}
