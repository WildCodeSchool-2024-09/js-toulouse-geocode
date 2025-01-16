import type { RequestHandler } from "express";
import type { UploadedFile } from "express-fileupload";
import sharp from "sharp";

interface ImageDimensions {
  width: number;
  height: number;
}

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MaxFileSize = 5 * 1024 * 1024;
const MIN_WIDTH = 200;
const MIN_HEIGHT = 200;
const MAX_WIDTH = 20000;
const MAX_HEIGHT = 20000;

async function getImageDimensions(buffer: Buffer): Promise<ImageDimensions> {
  const metadata = await sharp(buffer).metadata();
  if (!metadata.width || !metadata.height) {
    throw new Error("Impossible de lire les dimensions de l'image");
  }
  return {
    width: metadata.width,
    height: metadata.height,
  };
}

const validatePhoto: RequestHandler = async (req, res, next) => {
  try {
    const photoFile = req.files?.photo as UploadedFile;
    if (!photoFile) {
      res.status(400).json({ error: "Pas de fichier à traiter" });
    }
    if (!ALLOWED_MIME_TYPES.includes(photoFile.mimetype)) {
      res.status(400).json({
        error:
          "Type de fichier non autorisé. Formats acceptés: JPEG, PNG, WEBP",
      });
      return;
    }
    if (photoFile.size > MaxFileSize) {
      res.status(420).json({
        error: "Fichier trop volumineux. Taille maximale: 5 MO",
      });
      return;
    }
    const dimensions = await getImageDimensions(photoFile.data);

    if (dimensions.width < MIN_WIDTH || dimensions.width > MAX_WIDTH) {
      res.status(420).json({
        error: `La largeur de l'image doit être comprise entre ${MIN_WIDTH}px et ${MAX_WIDTH}px`,
      });
      return;
    }

    if (dimensions.height < MIN_HEIGHT || dimensions.height > MAX_HEIGHT) {
      res.status(420).json({
        error: `La hauteur de l'image doit être comprise entre ${MIN_HEIGHT}px et ${MAX_HEIGHT}px`,
      });
      return;
    }

    res.status(200);
    next();
  } catch (error) {
    console.error("Erreur de traitement du fichier:", error);
    res.status(500).json({ error: "Erreur interne" });
    return;
  }
};

export default { validatePhoto };
