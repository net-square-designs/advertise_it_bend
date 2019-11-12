import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();
/**
 * @type {typeof cloudinary}
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export { cloudinary as imageService };
