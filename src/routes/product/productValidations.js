// import { isArray } from 'util';
import formatJoiErrors from '../../utils/formatJoiErrors';
import ProductSchema from './ProductSchema';
import { AppResponse } from '../../helpers/AppResponse';

// import { numberify } from '../../utils/objectHelper';

const { createProduct, productParams, productQuery } = ProductSchema;
// const { productImages } = ProductImageSchema;
// ProductImageSchema

const validateCreateProduct = async (req, res, next) => {
  // console.log(res.locals.imageFiles);
  try {
    await createProduct.validateAsync(req.body, {
      abortEarly: false,
    });

    return next();
  } catch (errors) {
    return AppResponse.badRequest(res, {
      errors: formatJoiErrors(errors),
    });
  }
};

const validateProductImages = async (req, res, next) => {
  const imageFiles = req.files.images;

  const kb = 1000;
  const mb = 1000 * kb;
  const max = 3;
  const maxImageSize = max * mb;

  const types = ['image/png', 'image/jpeg', 'image/gif'];
  let detailsObject = {};
  const detailsArray = [];

  if (imageFiles.length < 1) {
    const key = 'imageFiles';
    const value = 'No image files uploaded';

    detailsObject = {
      [key]: value,
    };
    detailsArray.push({ message: value, key });
  }

  if (imageFiles.length > 4) {
    const key = 'imageFiles';
    const value = 'Max of 4 files supported';

    detailsObject = {
      [key]: value,
    };
    detailsArray.push({ message: value, key });
  }

  imageFiles.map((file, i) => {
    const index = i + 1;

    if (!types.includes(file.type)) {
      const key = `image${index}`;
      const value = `image ${index} is not a valid image`;

      detailsObject = {
        [key]: value,
      };
      detailsArray.push({ message: value, key });
    }

    if (file.size > maxImageSize) {
      const key = `image${index}`;
      const value = `image ${index} is larger than ${max}mb`;

      detailsObject = {
        [key]: value,
      };
      detailsArray.push({ message: value, key });
    }
    return null;
  });

  if (detailsArray.length > 0) {
    return AppResponse.badRequest(res, {
      errors: {
        detailsArray,
        detailsObject,
      },
    });
  }

  res.locals.imageFiles = imageFiles;

  return next();
};

const validateProductParams = async (req, res, next) => {
  try {
    // @ts-ignore
    await productParams.validateAsync(req.params, {
      abortEarly: false,
    });
    return next();
  } catch (errors) {
    return AppResponse.badRequest(res, {
      errors: formatJoiErrors(errors),
    });
  }
};

const validateProductQuery = async (req, res, next) => {
  try {
    // @ts-ignore
    await productQuery.validateAsync(req.query, {
      abortEarly: false,
    });
    return next();
  } catch (errors) {
    return AppResponse.badRequest(res, {
      errors: formatJoiErrors(errors),
    });
  }
};

export {
  validateCreateProduct,
  validateProductParams,
  validateProductQuery,
  validateProductImages,
};
