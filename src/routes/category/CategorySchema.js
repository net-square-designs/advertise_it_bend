// /* eslint-disable require-jsdoc */
import Joi from '@hapi/joi';

/**
 * Schemas for all the endpoints relating to categories
 */
class CategorySchema {
  /**
   * @description The schema used to validate the process of creating a new category
   */
  static get createCategory() {
    return Joi.object({
      name: Joi.string()
        .min(3)
        .max(25)
        .required(),
      image: Joi.string()
        .min(3)
        .max(90),
    });
  }

  /**
   * @description The schema used to validate optional/required params in the categories
   * related endpoint
   */
  static get productParams() {
    return Joi.object({
      categoryId: Joi.number().integer(),
    });
  }
}

export default CategorySchema;
