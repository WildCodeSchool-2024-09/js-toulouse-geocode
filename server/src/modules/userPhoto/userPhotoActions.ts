import { v2 as cloudinary } from "cloudinary";
import type { RequestHandler } from "express";
import type { UploadedFile } from "express-fileupload";
import UserPhotoRepository from "./userPhotoRepository";

const browse: RequestHandler = async (req, res) => {
  try {
    const { user_id } = req.params;
    const result = await UserPhotoRepository.readPhoto(
      Number.parseInt(user_id),
    );

    res.status(200).json({ url: result[0].url });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Something went wrong while fetching the photo" });
  }
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const update: RequestHandler = async (req, res) => {
  try {
    const { user_id } = req.params;
    const file = Array.isArray(req.files?.photo)
      ? req.files.photo[0]
      : (req.files?.photo as UploadedFile | undefined);

    if (!file) {
      res.status(400).json({ error: "Pas de fichier à traiter" });
      return;
    }

    cloudinary.uploader
      .upload_stream(
        {
          folder: "user-photos",
        },
        async (error, result) => {
          if (error) {
            console.error(error);
            res.status(500).json({
              error: "Something went wrong while uploading the photo",
            });
            return;
          }

          if (result) {
            const updateResult = await UserPhotoRepository.updatePhoto(
              Number.parseInt(user_id),
              result.secure_url,
            );
            res.status(200).json(updateResult.insertId);
          }
        },
      )
      .end(file.data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Something went wrong while uploading the photo" });
  }
};

const deleteAction: RequestHandler = async (req, res) => {
  try {
    const { user_id } = req.params;
    const result = await UserPhotoRepository.deletePhoto(
      Number.parseInt(user_id),
    );
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Something went wrong while deleting the photo" });
  }
};

export default { browse, update, deleteAction };
